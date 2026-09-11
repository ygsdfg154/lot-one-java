package com.lotone.query.controller;

import com.lotone.common.result.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/query/api/multi")
public class MultiTrackController {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 多设备轨迹查询（同时返回多个设备的轨迹点）
     */
    @PostMapping("/tracks")
    public R<Map<String, Object>> multiTracks(
            @RequestBody Map<String, Object> request) {

        @SuppressWarnings("unchecked")
        List<String> deviceIds = (List<String>) request.get("deviceIds");
        String startTimeStr = (String) request.get("startTime");
        String endTimeStr = (String) request.get("endTime");
        int maxPoints = request.get("maxPoints") != null ?
                ((Number) request.get("maxPoints")).intValue() : 1000;

        if (deviceIds == null || deviceIds.isEmpty()) {
            return R.fail("设备ID列表不能为空");
        }

        LocalDateTime startTime = startTimeStr != null ? LocalDateTime.parse(startTimeStr) :
                LocalDateTime.now().minusHours(24);
        LocalDateTime endTime = endTimeStr != null ? LocalDateTime.parse(endTimeStr) :
                LocalDateTime.now();

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("startTime", startTime);
        result.put("endTime", endTime);
        result.put("deviceCount", deviceIds.size());

        Map<String, Object> tracks = new LinkedHashMap<>();
        for (String deviceId : deviceIds) {
            try {
                Query query = new Query();
                query.addCriteria(Criteria.where("deviceId").is(deviceId));
                query.addCriteria(Criteria.where("timestamp").gte(startTime).lte(endTime));
                query.with(Sort.by(Sort.Direction.ASC, "timestamp"));
                query.limit(maxPoints);

                List<Map> points = mongoTemplate.find(query, Map.class, "device_telemetry");

                List<Map<String, Object>> track = new ArrayList<>();
                for (Map p : points) {
                    Map<String, Object> point = new HashMap<>();
                    point.put("lat", p.get("latitude"));
                    point.put("lng", p.get("longitude"));
                    point.put("speed", p.get("speed"));
                    point.put("timestamp", p.get("timestamp"));
                    track.add(point);
                }

                Map<String, Object> deviceTrack = new HashMap<>();
                deviceTrack.put("deviceId", deviceId);
                deviceTrack.put("pointCount", track.size());
                deviceTrack.put("track", track);

                // 计算里程
                double distance = calculateDistance(track);
                deviceTrack.put("distance", Math.round(distance * 100.0) / 100.0);

                tracks.put(deviceId, deviceTrack);
            } catch (Exception e) {
                log.warn("Query device track failed: deviceId={}", deviceId, e);
                Map<String, Object> deviceTrack = new HashMap<>();
                deviceTrack.put("deviceId", deviceId);
                deviceTrack.put("pointCount", 0);
                deviceTrack.put("track", new ArrayList<>());
                deviceTrack.put("distance", 0);
                deviceTrack.put("error", e.getMessage());
                tracks.put(deviceId, deviceTrack);
            }
        }

        result.put("tracks", tracks);
        return R.success(result);
    }

    /**
     * 多设备实时位置对比
     */
    @PostMapping("/realtime")
    public R<List<Map<String, Object>>> multiRealtime(@RequestBody List<String> deviceIds) {
        if (deviceIds == null || deviceIds.isEmpty()) {
            return R.fail("设备ID列表不能为空");
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (String deviceId : deviceIds) {
            try {
                Query query = new Query();
                query.addCriteria(Criteria.where("deviceId").is(deviceId));
                Map status = mongoTemplate.findOne(query, Map.class, "device_status");

                Map<String, Object> device = new HashMap<>();
                device.put("deviceId", deviceId);
                if (status != null) {
                    device.put("lat", status.get("latitude"));
                    device.put("lng", status.get("longitude"));
                    device.put("speed", status.get("speed"));
                    device.put("online", status.get("online"));
                    device.put("lastTime", status.get("lastTime"));
                    device.put("direction", status.get("direction"));
                } else {
                    device.put("online", false);
                    device.put("lat", null);
                    device.put("lng", null);
                }
                result.add(device);
            } catch (Exception e) {
                Map<String, Object> device = new HashMap<>();
                device.put("deviceId", deviceId);
                device.put("online", false);
                device.put("error", e.getMessage());
                result.add(device);
            }
        }
        return R.success(result);
    }

    /**
     * 多设备里程统计对比
     */
    @PostMapping("/mileageCompare")
    public R<List<Map<String, Object>>> mileageCompare(@RequestBody Map<String, Object> request) {
        @SuppressWarnings("unchecked")
        List<String> deviceIds = (List<String>) request.get("deviceIds");
        String startTimeStr = (String) request.get("startTime");
        String endTimeStr = (String) request.get("endTime");

        if (deviceIds == null || deviceIds.isEmpty()) {
            return R.fail("设备ID列表不能为空");
        }

        LocalDateTime startTime = startTimeStr != null ? LocalDateTime.parse(startTimeStr) :
                LocalDateTime.now().minusDays(7);
        LocalDateTime endTime = endTimeStr != null ? LocalDateTime.parse(endTimeStr) :
                LocalDateTime.now();

        List<Map<String, Object>> result = new ArrayList<>();
        for (String deviceId : deviceIds) {
            try {
                Query query = new Query();
                query.addCriteria(Criteria.where("deviceId").is(deviceId));
                query.addCriteria(Criteria.where("timestamp").gte(startTime).lte(endTime));
                query.with(Sort.by(Sort.Direction.ASC, "timestamp"));
                query.limit(5000);

                List<Map> points = mongoTemplate.find(query, Map.class, "device_telemetry");

                List<Map<String, Object>> track = new ArrayList<>();
                double maxSpeed = 0;
                double totalSpeed = 0;
                int speedCount = 0;
                for (Map p : points) {
                    Map<String, Object> point = new HashMap<>();
                    point.put("lat", p.get("latitude"));
                    point.put("lng", p.get("longitude"));
                    track.add(point);
                    if (p.get("speed") != null) {
                        double speed = ((Number) p.get("speed")).doubleValue();
                        maxSpeed = Math.max(maxSpeed, speed);
                        totalSpeed += speed;
                        speedCount++;
                    }
                }

                double distance = calculateDistance(track);

                Map<String, Object> stats = new HashMap<>();
                stats.put("deviceId", deviceId);
                stats.put("pointCount", points.size());
                stats.put("distance", Math.round(distance * 100.0) / 100.0);
                stats.put("distanceFormatted", formatDistance(distance));
                stats.put("maxSpeed", Math.round(maxSpeed * 10.0) / 10.0);
                stats.put("avgSpeed", speedCount > 0 ? Math.round(totalSpeed / speedCount * 10.0) / 10.0 : 0);
                result.add(stats);
            } catch (Exception e) {
                Map<String, Object> stats = new HashMap<>();
                stats.put("deviceId", deviceId);
                stats.put("pointCount", 0);
                stats.put("distance", 0);
                stats.put("error", e.getMessage());
                result.add(stats);
            }
        }

        // 按里程降序
        result.sort((a, b) -> Double.compare(
                ((Number) b.getOrDefault("distance", 0)).doubleValue(),
                ((Number) a.getOrDefault("distance", 0)).doubleValue()));
        return R.success(result);
    }

    /**
     * 计算轨迹总里程（公里）
     */
    private double calculateDistance(List<Map<String, Object>> track) {
        double total = 0;
        for (int i = 1; i < track.size(); i++) {
            Map<String, Object> prev = track.get(i - 1);
            Map<String, Object> curr = track.get(i);
            if (prev.get("lat") == null || curr.get("lat") == null) continue;
            double lat1 = ((Number) prev.get("lat")).doubleValue();
            double lng1 = ((Number) prev.get("lng")).doubleValue();
            double lat2 = ((Number) curr.get("lat")).doubleValue();
            double lng2 = ((Number) curr.get("lng")).doubleValue();
            total += haversine(lat1, lng1, lat2, lng2);
        }
        return total;
    }

    private double haversine(double lat1, double lng1, double lat2, double lng2) {
        double R = 6371.0;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private String formatDistance(double km) {
        if (km < 1) return Math.round(km * 1000) + " 米";
        return Math.round(km * 100.0) / 100.0 + " 公里";
    }
}
