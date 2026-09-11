package com.lotone.iot.worker.service;

import com.lotone.iot.worker.dto.AlarmEvent;
import com.lotone.iot.worker.dto.TelemetryData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class AlarmDetectionService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private MongoStorageService mongoStorageService;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Value("${iot.worker.alarm.enabled:true}")
    private boolean alarmEnabled;

    @Value("${iot.worker.alarm.dedup-minutes:5}")
    private long dedupMinutes;

    private static final String DEDUP_KEY_PREFIX = "alarm:dedup:";
    private static final String ALARM_TOPIC = "alarm-event";

    /** 报警规则缓存（产品ID -> 规则列表） */
    private final ConcurrentHashMap<Integer, List<Map<String, Object>>> ruleCache = new ConcurrentHashMap<>();
    private volatile long lastCacheTime = 0;
    private static final long CACHE_TTL_MS = 5 * 60 * 1000; // 5分钟缓存

    /** 围栏状态缓存（deviceId:fenceId -> 是否在围栏内），用于判断进/出围栏 */
    private final ConcurrentHashMap<String, Boolean> fenceStatusCache = new ConcurrentHashMap<>();

    /**
     * 检测报警
     */
    public List<AlarmEvent> detect(TelemetryData data) {
        if (!alarmEnabled) return new ArrayList<>();

        List<AlarmEvent> events = new ArrayList<>();

        try {
            // 1. 超速报警
            AlarmEvent speedAlarm = detectSpeedAlarm(data);
            if (speedAlarm != null) events.add(speedAlarm);

            // 2. SOS报警（从 alarmFlag 判断）
            AlarmEvent sosAlarm = detectSosAlarm(data);
            if (sosAlarm != null) events.add(sosAlarm);

            // 3. 低电报警
            AlarmEvent lowBatteryAlarm = detectLowBatteryAlarm(data);
            if (lowBatteryAlarm != null) events.add(lowBatteryAlarm);

            // 4. 围栏报警（进/出围栏）
            List<AlarmEvent> fenceAlarms = detectFenceAlarm(data);
            if (fenceAlarms != null && !fenceAlarms.isEmpty()) events.addAll(fenceAlarms);

            // 去重并保存
            for (AlarmEvent event : events) {
                if (shouldDedup(event)) {
                    log.debug("Alarm dedup skipped: deviceId={}, alarmCode={}", event.getDeviceId(), event.getAlarmCode());
                    continue;
                }
                saveAndPublish(event);
            }

        } catch (Exception e) {
            log.error("Alarm detection failed: deviceId={}", data.getDeviceId(), e);
        }

        return events;
    }

    /**
     * 超速报警
     */
    private AlarmEvent detectSpeedAlarm(TelemetryData data) {
        try {
            if (data.getSpeed() == null) return null;
            // 默认超速阈值 100 km/h，可从报警规则表配置
            double speedLimit = 100.0;
            // 尝试从规则表获取超速阈值
            try {
                List<Map<String, Object>> rules = getRulesByType("SPEED");
                if (!rules.isEmpty()) {
                    String val = (String) rules.get(0).get("default_alarm_value");
                    if (val != null && !val.isEmpty()) {
                        speedLimit = Double.parseDouble(val);
                    }
                }
            } catch (Exception ignored) {}

            if (data.getSpeed() > speedLimit) {
                AlarmEvent event = new AlarmEvent();
                event.setDeviceId(data.getDeviceId());
                event.setAlarmCode("SPEED");
                event.setAlarmName("超速报警");
                event.setAlarmType("SPEED");
                event.setLevel("WARNING");
                event.setStatus("NEW");
                event.setMessage("设备超速: " + data.getSpeed() + " km/h, 阈值: " + speedLimit + " km/h");
                event.setLatitude(data.getLatitude());
                event.setLongitude(data.getLongitude());
                event.setSpeed(data.getSpeed());
                event.setAlarmTime(data.getTimeAsLocalDateTime() != null ? data.getTimeAsLocalDateTime() : LocalDateTime.now());
                return event;
            }
        } catch (Exception e) {
            log.warn("Speed alarm detection failed: deviceId={}", data.getDeviceId(), e);
        }
        return null;
    }

    /**
     * SOS报警（JT808 alarmFlag 第0位）
     */
    private AlarmEvent detectSosAlarm(TelemetryData data) {
        try {
            if (data.getAlarmFlag() == null) return null;
            // bit0: 紧急报警/SOS
            if ((data.getAlarmFlag() & 0x01) != 0) {
                AlarmEvent event = new AlarmEvent();
                event.setDeviceId(data.getDeviceId());
                event.setAlarmCode("SOS");
                event.setAlarmName("SOS紧急报警");
                event.setAlarmType("SOS");
                event.setLevel("CRITICAL");
                event.setStatus("NEW");
                event.setMessage("设备触发SOS紧急报警");
                event.setLatitude(data.getLatitude());
                event.setLongitude(data.getLongitude());
                event.setSpeed(data.getSpeed());
                event.setAlarmTime(data.getTimeAsLocalDateTime() != null ? data.getTimeAsLocalDateTime() : LocalDateTime.now());
                return event;
            }
        } catch (Exception e) {
            log.warn("SOS alarm detection failed: deviceId={}", data.getDeviceId(), e);
        }
        return null;
    }

    /**
     * 低电报警（JT808 status 第3位）
     */
    private AlarmEvent detectLowBatteryAlarm(TelemetryData data) {
        try {
            if (data.getStatus() == null) return null;
            // bit3: 低电报警
            if ((data.getStatus() & 0x08) != 0) {
                AlarmEvent event = new AlarmEvent();
                event.setDeviceId(data.getDeviceId());
                event.setAlarmCode("LOW_BATTERY");
                event.setAlarmName("低电报警");
                event.setAlarmType("BATTERY");
                event.setLevel("WARNING");
                event.setStatus("NEW");
                event.setMessage("设备电量低");
                event.setLatitude(data.getLatitude());
                event.setLongitude(data.getLongitude());
                event.setAlarmTime(data.getTimeAsLocalDateTime() != null ? data.getTimeAsLocalDateTime() : LocalDateTime.now());
                return event;
            }
        } catch (Exception e) {
            log.warn("Low battery alarm detection failed: deviceId={}", data.getDeviceId(), e);
        }
        return null;
    }

    /**
     * 围栏报警（进/出围栏）
     */
    private List<AlarmEvent> detectFenceAlarm(TelemetryData data) {
        List<AlarmEvent> events = new ArrayList<>();
        try {
            if (data.getLatitude() == null || data.getLongitude() == null) return events;

            // 查询设备关联的启用围栏
            String sql = "SELECT f.id, f.fence_name, f.fence_shape_type, f.fence_radius, " +
                    "f.center_lat, f.center_lng, f.enter_alarm_enable, f.get_out_alarm_enable " +
                    "FROM lot_fence f " +
                    "INNER JOIN lot_fence_device fd ON f.id = fd.fence_id " +
                    "WHERE fd.device_id = ? AND f.enabled = 1";
            List<Map<String, Object>> fences = jdbcTemplate.queryForList(sql, data.getDeviceId());

            for (Map<String, Object> fence : fences) {
                Integer fenceId = ((Number) fence.get("id")).intValue();
                String fenceName = (String) fence.get("fence_name");
                Integer shapeType = fence.get("fence_shape_type") != null ? ((Number) fence.get("fence_shape_type")).intValue() : null;
                boolean inFence = false;

                if (shapeType != null && shapeType == 1) {
                    // 圆形围栏
                    Double centerLat = fence.get("center_lat") != null ? ((Number) fence.get("center_lat")).doubleValue() : null;
                    Double centerLng = fence.get("center_lng") != null ? ((Number) fence.get("center_lng")).doubleValue() : null;
                    Integer radius = fence.get("fence_radius") != null ? ((Number) fence.get("fence_radius")).intValue() : null;
                    if (centerLat != null && centerLng != null && radius != null) {
                        double dist = haversineDistance(data.getLatitude(), data.getLongitude(), centerLat, centerLng);
                        inFence = dist <= radius;
                    }
                } else if (shapeType != null && shapeType == 2) {
                    // 多边形围栏
                    String pointSql = "SELECT lat, lng FROM lot_fence_point WHERE fence_id = ? ORDER BY seq_num";
                    List<Map<String, Object>> points = jdbcTemplate.queryForList(pointSql, fenceId);
                    if (points.size() >= 3) {
                        List<double[]> polygon = new ArrayList<>();
                        for (Map<String, Object> p : points) {
                            double lat = ((Number) p.get("lat")).doubleValue();
                            double lng = ((Number) p.get("lng")).doubleValue();
                            polygon.add(new double[]{lng, lat});
                        }
                        inFence = isPointInPolygon(data.getLongitude(), data.getLatitude(), polygon);
                    }
                }

                // 判断进/出围栏
                String cacheKey = data.getDeviceId() + ":" + fenceId;
                Boolean lastInFence = fenceStatusCache.get(cacheKey);
                fenceStatusCache.put(cacheKey, inFence);

                if (lastInFence != null) {
                    Long enterEnable = fence.get("enter_alarm_enable") != null ? ((Number) fence.get("enter_alarm_enable")).longValue() : 0L;
                    Long outEnable = fence.get("get_out_alarm_enable") != null ? ((Number) fence.get("get_out_alarm_enable")).longValue() : 0L;

                    if (!lastInFence && inFence && enterEnable == 1) {
                        // 进入围栏
                        AlarmEvent event = buildFenceAlarm(data, "FENCE_ENTER", "进入围栏报警",
                                "设备进入围栏: " + fenceName, fenceId, fenceName);
                        events.add(event);
                    } else if (lastInFence && !inFence && outEnable == 1) {
                        // 离开围栏
                        AlarmEvent event = buildFenceAlarm(data, "FENCE_EXIT", "离开围栏报警",
                                "设备离开围栏: " + fenceName, fenceId, fenceName);
                        events.add(event);
                    }
                }
            }
        } catch (Exception e) {
            log.warn("Fence alarm detection failed: deviceId={}", data.getDeviceId(), e);
        }
        return events;
    }

    /**
     * 构建围栏报警事件
     */
    private AlarmEvent buildFenceAlarm(TelemetryData data, String code, String name, String message,
                                        Integer fenceId, String fenceName) {
        AlarmEvent event = new AlarmEvent();
        event.setDeviceId(data.getDeviceId());
        event.setAlarmCode(code);
        event.setAlarmName(name);
        event.setAlarmType("FENCE");
        event.setLevel("WARNING");
        event.setStatus("NEW");
        event.setMessage(message);
        event.setLatitude(data.getLatitude());
        event.setLongitude(data.getLongitude());
        event.setSpeed(data.getSpeed());
        event.setAlarmTime(data.getTimeAsLocalDateTime() != null ? data.getTimeAsLocalDateTime() : LocalDateTime.now());
        // 额外信息
        event.setExtra(Map.of("fenceId", fenceId, "fenceName", fenceName));
        return event;
    }

    /**
     * Haversine 距离计算（米）
     */
    private double haversineDistance(double lat1, double lng1, double lat2, double lng2) {
        double R = 6371000.0;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    /**
     * 点在多边形内判断（射线法）
     */
    private boolean isPointInPolygon(double lng, double lat, List<double[]> polygon) {
        if (polygon == null || polygon.size() < 3) return false;
        int count = 0;
        for (int i = 0; i < polygon.size(); i++) {
            double[] p1 = polygon.get(i);
            double[] p2 = polygon.get((i + 1) % polygon.size());
            if (((p1[1] > lat) != (p2[1] > lat))) {
                double xIntersect = (lat - p1[1]) * (p2[0] - p1[0]) / (p2[1] - p1[1]) + p1[0];
                if (lng < xIntersect) count++;
            }
        }
        return count % 2 != 0;
    }

    /**
     * 报警去重
     */
    private boolean shouldDedup(AlarmEvent event) {
        String key = DEDUP_KEY_PREFIX + event.getDeviceId() + ":" + event.getAlarmCode();
        try {
            Boolean exists = redisTemplate.hasKey(key);
            if (Boolean.TRUE.equals(exists)) {
                return true;
            }
            redisTemplate.opsForValue().set(key, "1", dedupMinutes, TimeUnit.MINUTES);
            return false;
        } catch (Exception e) {
            log.warn("Alarm dedup check failed: key={}", key, e);
            return false;
        }
    }

    /**
     * 保存并发布报警事件
     */
    private void saveAndPublish(AlarmEvent event) {
        try {
            // 保存到 MongoDB
            mongoStorageService.saveAlarmEvent(event);

            // 发布到 Kafka
            try {
                String json = com.fasterxml.jackson.databind.ObjectMapper.class.getDeclaredConstructor().newInstance()
                        .writeValueAsString(event);
                kafkaTemplate.send(ALARM_TOPIC, event.getDeviceId(), json);
            } catch (Exception e) {
                log.warn("Publish alarm to kafka failed: deviceId={}", event.getDeviceId(), e);
            }
        } catch (Exception e) {
            log.error("Save alarm event failed: deviceId={}", event.getDeviceId(), e);
        }
    }

    /**
     * 按类型获取报警规则
     */
    private List<Map<String, Object>> getRulesByType(String alarmType) {
        // 简单缓存
        long now = System.currentTimeMillis();
        if (now - lastCacheTime > CACHE_TTL_MS) {
            ruleCache.clear();
            lastCacheTime = now;
        }
        return ruleCache.computeIfAbsent(0, k -> {
            try {
                String sql = "SELECT * FROM lot_alarm_rule WHERE status = 1 AND alarm_type = ?";
                return jdbcTemplate.queryForList(sql, alarmType);
            } catch (Exception e) {
                log.warn("Load alarm rules failed: type={}", alarmType, e);
                return new ArrayList<>();
            }
        });
    }
}
