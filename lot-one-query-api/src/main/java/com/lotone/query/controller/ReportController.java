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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/query/api/report")
public class ReportController {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 设备日运行报告
     */
    @GetMapping("/daily")
    public R<Map<String, Object>> dailyReport(
            @RequestParam String deviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {

        LocalDateTime startTime = date.atStartOfDay();
        LocalDateTime endTime = date.atTime(23, 59, 59);

        return R.success(generateReport(deviceId, startTime, endTime, "daily"));
    }

    /**
     * 设备周运行报告
     */
    @GetMapping("/weekly")
    public R<Map<String, Object>> weeklyReport(
            @RequestParam String deviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate) {

        LocalDateTime startTime = startDate.atStartOfDay();
        LocalDateTime endTime = startDate.plusDays(7).atTime(23, 59, 59);

        return R.success(generateReport(deviceId, startTime, endTime, "weekly"));
    }

    /**
     * 设备月运行报告
     */
    @GetMapping("/monthly")
    public R<Map<String, Object>> monthlyReport(
            @RequestParam String deviceId,
            @RequestParam int year,
            @RequestParam int month) {

        LocalDateTime startTime = LocalDate.of(year, month, 1).atStartOfDay();
        LocalDateTime endTime = startTime.plusMonths(1).minusSeconds(1);

        return R.success(generateReport(deviceId, startTime, endTime, "monthly"));
    }

    /**
     * 多设备运行报告对比
     */
    @PostMapping("/compare")
    public R<List<Map<String, Object>>> compareReport(
            @RequestBody Map<String, Object> request) {

        @SuppressWarnings("unchecked")
        List<String> deviceIds = (List<String>) request.get("deviceIds");
        String startDateStr = (String) request.get("startDate");
        String endDateStr = (String) request.get("endDate");

        LocalDateTime startTime = startDateStr != null ?
                LocalDate.parse(startDateStr).atStartOfDay() :
                LocalDateTime.now().minusDays(7);
        LocalDateTime endTime = endDateStr != null ?
                LocalDate.parse(endDateStr).atTime(23, 59, 59) :
                LocalDateTime.now();

        List<Map<String, Object>> reports = new ArrayList<>();
        for (String deviceId : deviceIds) {
            reports.add(generateReport(deviceId, startTime, endTime, "compare"));
        }

        // 按里程降序
        reports.sort((a, b) -> Double.compare(
                ((Number) b.getOrDefault("totalDistance", 0)).doubleValue(),
                ((Number) a.getOrDefault("totalDistance", 0)).doubleValue()));

        return R.success(reports);
    }

    /**
     * 生成运行报告
     */
    private Map<String, Object> generateReport(
            String deviceId, LocalDateTime startTime, LocalDateTime endTime, String reportType) {

        Map<String, Object> report = new LinkedHashMap<>();
        report.put("deviceId", deviceId);
        report.put("reportType", reportType);
        report.put("startTime", startTime.toString());
        report.put("endTime", endTime.toString());

        try {
            // 查询轨迹数据
            Query trackQuery = new Query();
            trackQuery.addCriteria(Criteria.where("deviceId").is(deviceId));
            trackQuery.addCriteria(Criteria.where("timestamp").gte(startTime.toString()).lte(endTime.toString()));
            trackQuery.with(Sort.by(Sort.Direction.ASC, "timestamp"));
            trackQuery.limit(50000);

            List<Map> tracks = mongoTemplate.find(trackQuery, Map.class, "device_telemetry");

            // 计算统计数据
            double totalDistance = 0;
            double maxSpeed = 0;
            double totalSpeed = 0;
            int speedCount = 0;
            int activePoints = 0;
            int overspeedCount = 0;
            double overspeedThreshold = 100; // 超速阈值

            for (int i = 0; i < tracks.size(); i++) {
                Map p = tracks.get(i);
                if (p.get("speed") != null) {
                    double speed = ((Number) p.get("speed")).doubleValue();
                    maxSpeed = Math.max(maxSpeed, speed);
                    totalSpeed += speed;
                    speedCount++;
                    if (speed > 0) activePoints++;
                    if (speed > overspeedThreshold) overspeedCount++;
                }

                if (i > 0 && p.get("latitude") != null && tracks.get(i - 1).get("latitude") != null) {
                    Map prev = tracks.get(i - 1);
                    totalDistance += haversine(
                            ((Number) prev.get("latitude")).doubleValue(),
                            ((Number) prev.get("longitude")).doubleValue(),
                            ((Number) p.get("latitude")).doubleValue(),
                            ((Number) p.get("longitude")).doubleValue()
                    );
                }
            }

            report.put("totalDistance", Math.round(totalDistance * 100.0) / 100.0);
            report.put("totalDistanceFormatted", formatDistance(totalDistance));
            report.put("maxSpeed", Math.round(maxSpeed * 10.0) / 10.0);
            report.put("avgSpeed", speedCount > 0 ? Math.round(totalSpeed / speedCount * 10.0) / 10.0 : 0);
            report.put("activePoints", activePoints);
            report.put("totalPoints", tracks.size());
            report.put("overspeedCount", overspeedCount);
            report.put("estimatedDuration", activePoints * 30); // 按30秒/点估算
            report.put("estimatedDurationFormatted", formatDuration(activePoints * 30));

            // 按小时统计（日报用）
            if ("daily".equals(reportType)) {
                Map<Integer, Integer> hourlyPoints = new HashMap<>();
                Map<Integer, Double> hourlyDistance = new HashMap<>();
                for (int i = 0; i < tracks.size(); i++) {
                    Map p = tracks.get(i);
                    Object ts = p.get("timestamp");
                    if (ts != null) {
                        try {
                            int hour = LocalDateTime.parse(ts.toString()).getHour();
                            hourlyPoints.merge(hour, 1, Integer::sum);
                            if (i > 0 && p.get("latitude") != null && tracks.get(i - 1).get("latitude") != null) {
                                Map prev = tracks.get(i - 1);
                                double dist = haversine(
                                        ((Number) prev.get("latitude")).doubleValue(),
                                        ((Number) prev.get("longitude")).doubleValue(),
                                        ((Number) p.get("latitude")).doubleValue(),
                                        ((Number) p.get("longitude")).doubleValue()
                                );
                                hourlyDistance.merge(hour, dist, Double::sum);
                            }
                        } catch (Exception e) {
                            // ignore
                        }
                    }
                }
                report.put("hourlyPoints", hourlyPoints);
                report.put("hourlyDistance", hourlyDistance);
            }

            // 查询报警统计
            Query alarmQuery = new Query();
            alarmQuery.addCriteria(Criteria.where("deviceId").is(deviceId));
            alarmQuery.addCriteria(Criteria.where("timestamp").gte(startTime.toString()).lte(endTime.toString()));
            List<Map> alarms = mongoTemplate.find(alarmQuery, Map.class, "alarm_event");

            Map<String, Integer> alarmByType = new HashMap<>();
            for (Map alarm : alarms) {
                String type = (String) alarm.get("alarmType");
                if (type != null) {
                    alarmByType.merge(type, 1, Integer::sum);
                }
            }

            report.put("alarmCount", alarms.size());
            report.put("alarmByType", alarmByType);

            // 评分
            int score = calculateScore(totalDistance, maxSpeed, overspeedCount, alarms.size());
            report.put("score", score);
            report.put("scoreLevel", score >= 90 ? "优秀" : score >= 75 ? "良好" : score >= 60 ? "一般" : "较差");

        } catch (Exception e) {
            log.error("Generate report failed: deviceId={}", deviceId, e);
            report.put("error", e.getMessage());
        }

        return report;
    }

    /**
     * 计算运行评分（0-100）
     */
    private int calculateScore(double distance, double maxSpeed, int overspeedCount, int alarmCount) {
        int score = 100;
        // 超速扣分
        score -= overspeedCount * 5;
        // 报警扣分
        score -= alarmCount * 3;
        // 最高速度扣分（超过120额外扣分）
        if (maxSpeed > 120) score -= 10;
        // 里程加分（有行驶记录）
        if (distance > 0) score += 5;
        return Math.max(0, Math.min(100, score));
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

    private String formatDuration(int seconds) {
        if (seconds < 60) return seconds + "秒";
        if (seconds < 3600) return (seconds / 60) + "分" + (seconds % 60) + "秒";
        return (seconds / 3600) + "小时" + ((seconds % 3600) / 60) + "分";
    }
}
