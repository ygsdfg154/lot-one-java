package com.lotone.device.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.lotone.common.result.R;
import com.lotone.device.service.AppUserDeviceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/app/trip")
public class AppTripController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private AppUserDeviceService userDeviceService;

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    /**
     * 行程列表（按日期分组）
     * 查询指定设备在时间范围内的行程，按天分组
     */
    @GetMapping("/list")
    public R<List<Map<String, Object>>> tripList(
            @RequestParam String deviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {

        // 验证设备归属
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }

        try {
            LocalDateTime startTime = startDate.atStartOfDay();
            LocalDateTime endTime = endDate.atTime(23, 59, 59);

            Query query = new Query();
            query.addCriteria(Criteria.where("deviceId").is(deviceId));
            query.addCriteria(Criteria.where("timestamp").gte(startTime).lte(endTime));
            query.with(Sort.by(Sort.Direction.ASC, "timestamp"));
            query.limit(10000); // 限制最大点数

            List<Map> points = mongoTemplate.find(query, Map.class, "device_telemetry");

            // 按日期分组
            Map<String, List<Map>> grouped = points.stream()
                    .filter(p -> p.get("timestamp") != null)
                    .collect(Collectors.groupingBy(p -> {
                        Object ts = p.get("timestamp");
                        if (ts instanceof LocalDateTime) {
                            return ((LocalDateTime) ts).toLocalDate().format(DATE_FORMAT);
                        }
                        return ts.toString().substring(0, 10);
                    }));

            // 构建行程列表
            List<Map<String, Object>> trips = new ArrayList<>();
            for (Map.Entry<String, List<Map>> entry : grouped.entrySet()) {
                List<Map> dayPoints = entry.getValue();
                if (dayPoints.isEmpty()) continue;

                // 计算里程（简化：相邻点距离累加）
                double totalDistance = 0;
                double maxSpeed = 0;
                double totalSpeed = 0;
                int speedCount = 0;

                for (int i = 1; i < dayPoints.size(); i++) {
                    Map prev = dayPoints.get(i - 1);
                    Map curr = dayPoints.get(i);
                    if (prev.get("latitude") != null && curr.get("latitude") != null) {
                        double dist = haversine(
                                ((Number) prev.get("latitude")).doubleValue(),
                                ((Number) prev.get("longitude")).doubleValue(),
                                ((Number) curr.get("latitude")).doubleValue(),
                                ((Number) curr.get("longitude")).doubleValue()
                        );
                        totalDistance += dist;
                    }
                    if (curr.get("speed") != null) {
                        double speed = ((Number) curr.get("speed")).doubleValue();
                        maxSpeed = Math.max(maxSpeed, speed);
                        totalSpeed += speed;
                        speedCount++;
                    }
                }

                Map<String, Object> trip = new HashMap<>();
                trip.put("date", entry.getKey());
                trip.put("pointCount", dayPoints.size());
                trip.put("distance", Math.round(totalDistance * 100.0) / 100.0); // 公里
                trip.put("distanceFormatted", formatDistance(totalDistance));
                trip.put("maxSpeed", Math.round(maxSpeed * 10.0) / 10.0);
                trip.put("avgSpeed", speedCount > 0 ? Math.round(totalSpeed / speedCount * 10.0) / 10.0 : 0);
                trip.put("startTime", dayPoints.get(0).get("timestamp"));
                trip.put("endTime", dayPoints.get(dayPoints.size() - 1).get("timestamp"));
                trips.add(trip);
            }

            // 按日期降序
            trips.sort((a, b) -> ((String) b.get("date")).compareTo((String) a.get("date")));
            return R.success(trips);
        } catch (Exception e) {
            log.error("Get trip list failed: deviceId={}", deviceId, e);
            return R.success(new ArrayList<>());
        }
    }

    /**
     * 行程详情（轨迹点）
     */
    @GetMapping("/detail")
    public R<Map<String, Object>> tripDetail(
            @RequestParam String deviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {

        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }

        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("deviceId").is(deviceId));
            query.addCriteria(Criteria.where("timestamp").gte(startTime).lte(endTime));
            query.with(Sort.by(Sort.Direction.ASC, "timestamp"));
            query.limit(5000);

            List<Map> points = mongoTemplate.find(query, Map.class, "device_telemetry");

            // 简化轨迹点
            List<Map<String, Object>> track = new ArrayList<>();
            for (Map p : points) {
                Map<String, Object> point = new HashMap<>();
                point.put("lat", p.get("latitude"));
                point.put("lng", p.get("longitude"));
                point.put("speed", p.get("speed"));
                point.put("direction", p.get("direction"));
                point.put("timestamp", p.get("timestamp"));
                track.add(point);
            }

            Map<String, Object> result = new HashMap<>();
            result.put("deviceId", deviceId);
            result.put("pointCount", track.size());
            result.put("track", track);
            if (!track.isEmpty()) {
                result.put("startPoint", track.get(0));
                result.put("endPoint", track.get(track.size() - 1));
            }
            return R.success(result);
        } catch (Exception e) {
            log.error("Get trip detail failed: deviceId={}", deviceId, e);
            return R.success(new HashMap<>());
        }
    }

    /**
     * 行程统计（总览）
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> tripStatistics(
            @RequestParam String deviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {

        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }

        try {
            LocalDateTime startTime = startDate.atStartOfDay();
            LocalDateTime endTime = endDate.atTime(23, 59, 59);

            Query query = new Query();
            query.addCriteria(Criteria.where("deviceId").is(deviceId));
            query.addCriteria(Criteria.where("timestamp").gte(startTime).lte(endTime));
            query.with(Sort.by(Sort.Direction.ASC, "timestamp"));

            List<Map> points = mongoTemplate.find(query, Map.class, "device_telemetry");

            double totalDistance = 0;
            double maxSpeed = 0;
            int activePoints = 0; // 速度>0的点数

            for (int i = 1; i < points.size(); i++) {
                Map prev = points.get(i - 1);
                Map curr = points.get(i);
                if (prev.get("latitude") != null && curr.get("latitude") != null) {
                    totalDistance += haversine(
                            ((Number) prev.get("latitude")).doubleValue(),
                            ((Number) prev.get("longitude")).doubleValue(),
                            ((Number) curr.get("latitude")).doubleValue(),
                            ((Number) curr.get("longitude")).doubleValue()
                    );
                }
                if (curr.get("speed") != null) {
                    double speed = ((Number) curr.get("speed")).doubleValue();
                    maxSpeed = Math.max(maxSpeed, speed);
                    if (speed > 0) activePoints++;
                }
            }

            Map<String, Object> stats = new HashMap<>();
            stats.put("deviceId", deviceId);
            stats.put("startDate", startDate.toString());
            stats.put("endDate", endDate.toString());
            stats.put("totalPoints", points.size());
            stats.put("totalDistance", Math.round(totalDistance * 100.0) / 100.0);
            stats.put("totalDistanceFormatted", formatDistance(totalDistance));
            stats.put("maxSpeed", Math.round(maxSpeed * 10.0) / 10.0);
            stats.put("activePoints", activePoints);
            // 估算行驶时长（每个点按30秒间隔估算）
            stats.put("estimatedDuration", activePoints * 30);
            stats.put("estimatedDurationFormatted", formatDuration(activePoints * 30));
            return R.success(stats);
        } catch (Exception e) {
            log.error("Get trip statistics failed: deviceId={}", deviceId, e);
            return R.success(new HashMap<>());
        }
    }

    /**
     * Haversine 距离计算（公里）
     */
    private double haversine(double lat1, double lng1, double lat2, double lng2) {
        double R = 6371.0; // 地球半径（公里）
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private String formatDistance(double km) {
        if (km < 1) {
            return Math.round(km * 1000) + " 米";
        }
        return Math.round(km * 100.0) / 100.0 + " 公里";
    }

    private String formatDuration(int seconds) {
        if (seconds < 60) return seconds + "秒";
        if (seconds < 3600) return (seconds / 60) + "分" + (seconds % 60) + "秒";
        return (seconds / 3600) + "小时" + ((seconds % 3600) / 60) + "分";
    }
}
