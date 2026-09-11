package com.lotone.query.service;

import com.lotone.query.util.GeoUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class TrackQueryService {

    @Autowired
    @Qualifier("tdengineJdbcTemplate")
    private JdbcTemplate tdengineJdbcTemplate;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Value("${query.track.max-points:5000}")
    private int maxPoints;

    @Value("${query.track.simplify-min-distance:10}")
    private double simplifyMinDistance;

    private static final DateTimeFormatter TD_TIME_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * 查询轨迹（从TDengine）
     */
    public List<Map<String, Object>> queryTrack(String deviceId, LocalDateTime startTime, LocalDateTime endTime) {
        return queryTrack(deviceId, startTime, endTime, true);
    }

    /**
     * 查询轨迹
     * @param simplify 是否抽稀
     */
    public List<Map<String, Object>> queryTrack(String deviceId, LocalDateTime startTime, LocalDateTime endTime, boolean simplify) {
        try {
            String tableName = "dev_" + deviceId;
            String sql = "SELECT ts, latitude, longitude, altitude, speed, direction, alarm_flag, status, device_time " +
                    "FROM " + tableName + " " +
                    "WHERE ts BETWEEN ? AND ? " +
                    "ORDER BY ts ASC " +
                    "LIMIT " + maxPoints;

            List<Map<String, Object>> rows = tdengineJdbcTemplate.queryForList(sql,
                    java.sql.Timestamp.valueOf(startTime),
                    java.sql.Timestamp.valueOf(endTime));

            List<Map<String, Object>> track = new ArrayList<>();
            for (Map<String, Object> row : rows) {
                Map<String, Object> point = new HashMap<>();
                point.put("time", row.get("ts") != null ? row.get("ts").toString() : null);
                point.put("latitude", row.get("latitude"));
                point.put("longitude", row.get("longitude"));
                point.put("altitude", row.get("altitude"));
                point.put("speed", row.get("speed"));
                point.put("direction", row.get("direction"));
                point.put("alarmFlag", row.get("alarm_flag"));
                point.put("status", row.get("status"));
                track.add(point);
            }

            // 抽稀
            if (simplify && track.size() > 100) {
                int before = track.size();
                track = GeoUtils.simplifyByDistance(track, simplifyMinDistance);
                log.debug("Track simplified: device={}, before={}, after={}", deviceId, before, track.size());
            }

            log.debug("Query track: device={}, count={}", deviceId, track.size());
            return track;
        } catch (Exception e) {
            log.error("Query track from TDengine failed: device={}", deviceId, e);
            // 降级：从MongoDB查询（如果有历史数据）
            return queryTrackFromMongo(deviceId, startTime, endTime);
        }
    }

    /**
     * 从MongoDB查询轨迹（降级方案）
     */
    private List<Map<String, Object>> queryTrackFromMongo(String deviceId, LocalDateTime startTime, LocalDateTime endTime) {
        try {
            Query query = new Query(Criteria.where("deviceId").is(deviceId)
                    .and("timestamp").gte(startTime).lte(endTime));
            query.limit(maxPoints);
            List<Map> raw = mongoTemplate.find(query, Map.class, "device_telemetry");
            List<Map<String, Object>> result = new ArrayList<>();
            for (Map doc : raw) {
                result.add(new HashMap<>(doc));
            }
            return result;
        } catch (Exception e) {
            log.error("Query track from MongoDB also failed: device={}", deviceId, e);
            return new ArrayList<>();
        }
    }

    /**
     * 查询最新位置（从MongoDB device_status）
     */
    public Map<String, Object> queryLatest(String deviceId) {
        Query query = new Query(Criteria.where("deviceId").is(deviceId));
        Map result = mongoTemplate.findOne(query, Map.class, "device_status");
        return result != null ? new HashMap<>(result) : new HashMap<>();
    }

    /**
     * 批量查询最新位置
     */
    public List<Map<String, Object>> queryLatestBatch(List<String> deviceIds) {
        List<Map<String, Object>> result = new ArrayList<>();
        if (deviceIds == null || deviceIds.isEmpty()) {
            return result;
        }
        Query query = new Query(Criteria.where("deviceId").in(deviceIds));
        List<Map> raw = mongoTemplate.find(query, Map.class, "device_status");
        for (Map doc : raw) {
            result.add(new HashMap<>(doc));
        }
        return result;
    }

    /**
     * 里程统计（从TDengine聚合）
     */
    public Map<String, Object> queryMileageStats(String deviceId, LocalDateTime startDate, LocalDateTime endDate) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("deviceId", deviceId);
        stats.put("startDate", startDate.toLocalDate().toString());
        stats.put("endDate", endDate.toLocalDate().toString());

        try {
            // 先查询轨迹点，计算里程
            List<Map<String, Object>> track = queryTrack(deviceId, startDate, endDate, false);
            double totalMileage = GeoUtils.calculateMileage(track);
            stats.put("totalMileage", Math.round(totalMileage / 1000.0 * 100.0) / 100.0); // 公里
            stats.put("pointCount", track.size());

            // 计算行驶时长（速度>0的点的时间差）
            double driveSeconds = 0;
            for (int i = 1; i < track.size(); i++) {
                double speed = getDouble(track.get(i), "speed");
                if (speed > 0) {
                    // 简化：每个点算10秒（实际应该计算时间差）
                    driveSeconds += 10;
                }
            }
            stats.put("driveHours", Math.round(driveSeconds / 3600.0 * 100.0) / 100.0);

            // 平均速度
            if (driveSeconds > 0) {
                stats.put("avgSpeed", Math.round(totalMileage / driveSeconds * 3.6 * 100.0) / 100.0);
            } else {
                stats.put("avgSpeed", 0.0);
            }

            // 最大速度
            double maxSpeed = 0;
            for (Map<String, Object> point : track) {
                double speed = getDouble(point, "speed");
                if (speed > maxSpeed) maxSpeed = speed;
            }
            stats.put("maxSpeed", maxSpeed);

            // 按天统计里程
            List<Map<String, Object>> dailyMileage = calculateDailyMileage(track);
            stats.put("dailyMileage", dailyMileage);

            // 统计天数
            stats.put("days", dailyMileage.size());

        } catch (Exception e) {
            log.error("Query mileage stats failed: device={}", deviceId, e);
            stats.put("totalMileage", 0.0);
            stats.put("error", e.getMessage());
        }
        return stats;
    }

    /**
     * 按天计算里程
     */
    private List<Map<String, Object>> calculateDailyMileage(List<Map<String, Object>> track) {
        Map<String, List<Map<String, Object>>> dailyPoints = new java.util.LinkedHashMap<>();
        for (Map<String, Object> point : track) {
            String time = (String) point.get("time");
            if (time != null && time.length() >= 10) {
                String day = time.substring(0, 10);
                dailyPoints.computeIfAbsent(day, k -> new ArrayList<>()).add(point);
            }
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, List<Map<String, Object>>> entry : dailyPoints.entrySet()) {
            double mileage = GeoUtils.calculateMileage(entry.getValue());
            Map<String, Object> dayStats = new HashMap<>();
            dayStats.put("date", entry.getKey());
            dayStats.put("mileage", Math.round(mileage / 1000.0 * 100.0) / 100.0);
            dayStats.put("pointCount", entry.getValue().size());
            result.add(dayStats);
        }
        return result;
    }

    /**
     * 查询报警记录（从MongoDB）
     */
    public List<Map<String, Object>> queryAlarms(String deviceId, int page, int pageSize) {
        return queryAlarms(deviceId, null, null, null, page, pageSize);
    }

    /**
     * 查询报警记录（带筛选）
     */
    public List<Map<String, Object>> queryAlarms(String deviceId, String alarmType,
                                                    LocalDateTime startTime, LocalDateTime endTime,
                                                    int page, int pageSize) {
        Criteria criteria = Criteria.where("deviceId").is(deviceId);
        if (alarmType != null && !alarmType.isEmpty()) {
            criteria = criteria.and("alarmType").is(alarmType);
        }
        if (startTime != null) {
            criteria = criteria.and("alarmTime").gte(startTime);
        }
        if (endTime != null) {
            criteria = criteria.and("alarmTime").lte(endTime);
        }

        Query query = new Query(criteria)
                .skip((long) (page - 1) * pageSize)
                .limit(pageSize)
                .with(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "alarmTime"));

        List<Map> raw = mongoTemplate.find(query, Map.class, "alarm_event");
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map doc : raw) {
            result.add(new HashMap<>(doc));
        }
        return result;
    }

    /**
     * 报警统计
     */
    public Map<String, Object> queryAlarmStats(String deviceId, LocalDateTime startTime, LocalDateTime endTime) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("deviceId", deviceId);

        try {
            Criteria criteria = Criteria.where("deviceId").is(deviceId);
            if (startTime != null) criteria = criteria.and("alarmTime").gte(startTime);
            if (endTime != null) criteria = criteria.and("alarmTime").lte(endTime);

            long total = mongoTemplate.count(new Query(criteria), "alarm_event");
            stats.put("total", total);

            // 按类型统计
            List<Map> all = mongoTemplate.find(new Query(criteria), Map.class, "alarm_event");
            Map<String, Integer> typeCount = new HashMap<>();
            for (Map doc : all) {
                String type = (String) doc.get("alarmType");
                if (type != null) {
                    typeCount.merge(type, 1, Integer::sum);
                }
            }
            stats.put("byType", typeCount);

            // 未读数
            long unread = mongoTemplate.count(
                    new Query(criteria.and("status").is("NEW")), "alarm_event");
            stats.put("unread", unread);

        } catch (Exception e) {
            log.error("Query alarm stats failed: device={}", deviceId, e);
            stats.put("total", 0);
        }
        return stats;
    }

    /**
     * 查询上下线日志
     */
    public List<Map<String, Object>> queryOnlineLogs(String deviceId, int page, int pageSize) {
        Query query = new Query(Criteria.where("deviceId").is(deviceId))
                .skip((long) (page - 1) * pageSize)
                .limit(pageSize)
                .with(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "time"));
        List<Map> raw = mongoTemplate.find(query, Map.class, "device_online_log");
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map doc : raw) {
            result.add(new HashMap<>(doc));
        }
        return result;
    }

    /**
     * 在线时长统计
     */
    public Map<String, Object> queryOnlineStats(String deviceId, LocalDateTime startDate, LocalDateTime endDate) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("deviceId", deviceId);

        // 从TDengine统计在线时长（有数据点的时间范围）
        try {
            String tableName = "dev_" + deviceId;
            String sql = "SELECT MIN(ts) as first_time, MAX(ts) as last_time, COUNT(*) as point_count " +
                    "FROM " + tableName + " WHERE ts BETWEEN ? AND ?";
            List<Map<String, Object>> rows = tdengineJdbcTemplate.queryForList(sql,
                    java.sql.Timestamp.valueOf(startDate),
                    java.sql.Timestamp.valueOf(endDate));

            if (!rows.isEmpty()) {
                Map<String, Object> row = rows.get(0);
                stats.put("firstTime", row.get("first_time") != null ? row.get("first_time").toString() : null);
                stats.put("lastTime", row.get("last_time") != null ? row.get("last_time").toString() : null);
                stats.put("pointCount", row.get("point_count"));

                // 简化：按数据点数量估算在线时长（每10秒一个点）
                long pointCount = ((Number) row.get("point_count")).longValue();
                double onlineHours = pointCount * 10.0 / 3600.0;
                stats.put("onlineHours", Math.round(onlineHours * 100.0) / 100.0);
            }
        } catch (Exception e) {
            log.error("Query online stats failed: device={}", deviceId, e);
            stats.put("onlineHours", 0.0);
        }
        return stats;
    }

    private double getDouble(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val == null) return 0.0;
        if (val instanceof Number) return ((Number) val).doubleValue();
        try {
            return Double.parseDouble(val.toString());
        } catch (Exception e) {
            return 0.0;
        }
    }
}
