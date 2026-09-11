package com.lotone.query.controller;

import com.lotone.common.result.R;
import com.lotone.query.service.TrackQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/query/api")
public class TrackController {

    @Autowired
    private TrackQueryService trackQueryService;

    /**
     * 轨迹查询
     */
    @GetMapping("/track/{deviceId}")
    public R<List<Map<String, Object>>> getTrack(
            @PathVariable String deviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime,
            @RequestParam(defaultValue = "true") boolean simplify) {
        List<Map<String, Object>> track = trackQueryService.queryTrack(deviceId, startTime, endTime, simplify);
        return R.success(track);
    }

    /**
     * 最新位置
     */
    @GetMapping("/track/latest/{deviceId}")
    public R<Map<String, Object>> getLatestLocation(@PathVariable String deviceId) {
        Map<String, Object> location = trackQueryService.queryLatest(deviceId);
        return R.success(location);
    }

    /**
     * 批量查询最新位置
     */
    @PostMapping("/track/latest/batch")
    public R<List<Map<String, Object>>> getLatestLocationBatch(@RequestBody List<String> deviceIds) {
        List<Map<String, Object>> locations = trackQueryService.queryLatestBatch(deviceIds);
        return R.success(locations);
    }

    /**
     * 里程统计
     */
    @GetMapping("/stats/mileage/{deviceId}")
    public R<Map<String, Object>> getMileageStats(
            @PathVariable String deviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {
        Map<String, Object> stats = trackQueryService.queryMileageStats(deviceId, startTime, endTime);
        return R.success(stats);
    }

    /**
     * 在线时长统计
     */
    @GetMapping("/stats/online/{deviceId}")
    public R<Map<String, Object>> getOnlineStats(
            @PathVariable String deviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {
        Map<String, Object> stats = trackQueryService.queryOnlineStats(deviceId, startTime, endTime);
        return R.success(stats);
    }

    /**
     * 报警记录查询
     */
    @GetMapping("/alarm/{deviceId}")
    public R<List<Map<String, Object>>> getAlarms(
            @PathVariable String deviceId,
            @RequestParam(required = false) String alarmType,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {
        List<Map<String, Object>> alarms = trackQueryService.queryAlarms(deviceId, alarmType, startTime, endTime, page, pageSize);
        return R.success(alarms);
    }

    /**
     * 报警统计
     */
    @GetMapping("/alarm/stats/{deviceId}")
    public R<Map<String, Object>> getAlarmStats(
            @PathVariable String deviceId,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {
        Map<String, Object> stats = trackQueryService.queryAlarmStats(deviceId, startTime, endTime);
        return R.success(stats);
    }

    /**
     * 上下线日志
     */
    @GetMapping("/online/log/{deviceId}")
    public R<List<Map<String, Object>>> getOnlineLogs(
            @PathVariable String deviceId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {
        List<Map<String, Object>> logs = trackQueryService.queryOnlineLogs(deviceId, page, pageSize);
        return R.success(logs);
    }

    /**
     * 综合统计（里程+在线+报警）
     */
    @GetMapping("/stats/summary/{deviceId}")
    public R<Map<String, Object>> getSummary(
            @PathVariable String deviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {
        Map<String, Object> summary = new java.util.HashMap<>();
        summary.put("mileage", trackQueryService.queryMileageStats(deviceId, startTime, endTime));
        summary.put("online", trackQueryService.queryOnlineStats(deviceId, startTime, endTime));
        summary.put("alarm", trackQueryService.queryAlarmStats(deviceId, startTime, endTime));
        summary.put("latest", trackQueryService.queryLatest(deviceId));
        return R.success(summary);
    }

    /**
     * 轨迹回放（返回带索引的轨迹点，支持前端按帧播放）
     */
    @GetMapping("/track/playback/{deviceId}")
    public R<Map<String, Object>> playback(
            @PathVariable String deviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime,
            @RequestParam(defaultValue = "1") int speed,
            @RequestParam(defaultValue = "true") boolean simplify) {
        List<Map<String, Object>> track = trackQueryService.queryTrack(deviceId, startTime, endTime, simplify);

        // 计算回放参数
        Map<String, Object> result = new java.util.HashMap<>();
        result.put("deviceId", deviceId);
        result.put("startTime", startTime.toString());
        result.put("endTime", endTime.toString());
        result.put("pointCount", track.size());
        result.put("playbackSpeed", speed);
        result.put("estimatedDuration", track.size() > 0 ? (track.size() * 10 / speed) + "秒" : "0秒");
        result.put("track", track);

        // 起点和终点
        if (!track.isEmpty()) {
            result.put("startPoint", track.get(0));
            result.put("endPoint", track.get(track.size() - 1));
        }

        return R.success(result);
    }

    /**
     * 轨迹数据导出（CSV格式）
     */
    @GetMapping("/track/export/{deviceId}")
    public void exportTrack(
            @PathVariable String deviceId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime,
            jakarta.servlet.http.HttpServletResponse response) {
        try {
            List<Map<String, Object>> track = trackQueryService.queryTrack(deviceId, startTime, endTime, false);

            response.setContentType("text/csv;charset=UTF-8");
            response.setHeader("Content-Disposition", "attachment; filename=track_" + deviceId + "_" + System.currentTimeMillis() + ".csv");

            // 写入BOM，确保Excel正确识别UTF-8
            response.getWriter().write("\uFEFF");
            // 表头
            response.getWriter().write("时间,纬度,经度,海拔,速度(km/h),方向,报警标志,状态\n");
            // 数据
            for (Map<String, Object> point : track) {
                response.getWriter().write(String.format("%s,%s,%s,%s,%s,%s,%s,%s\n",
                        point.get("time") != null ? point.get("time") : "",
                        point.get("latitude") != null ? point.get("latitude") : "",
                        point.get("longitude") != null ? point.get("longitude") : "",
                        point.get("altitude") != null ? point.get("altitude") : "",
                        point.get("speed") != null ? point.get("speed") : "",
                        point.get("direction") != null ? point.get("direction") : "",
                        point.get("alarmFlag") != null ? point.get("alarmFlag") : "",
                        point.get("status") != null ? point.get("status") : ""));
            }
            response.getWriter().flush();
        } catch (Exception e) {
            try {
                response.sendError(500, "导出失败: " + e.getMessage());
            } catch (Exception ex) {
                // ignore
            }
        }
    }

    /**
     * 报警数据导出（CSV格式）
     */
    @GetMapping("/alarm/export/{deviceId}")
    public void exportAlarms(
            @PathVariable String deviceId,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime,
            jakarta.servlet.http.HttpServletResponse response) {
        try {
            List<Map<String, Object>> alarms = trackQueryService.queryAlarms(deviceId, null, startTime, endTime, 1, 10000);

            response.setContentType("text/csv;charset=UTF-8");
            response.setHeader("Content-Disposition", "attachment; filename=alarm_" + deviceId + "_" + System.currentTimeMillis() + ".csv");

            response.getWriter().write("\uFEFF");
            response.getWriter().write("报警时间,报警类型,报警名称,级别,状态,纬度,经度,速度,消息\n");
            for (Map<String, Object> alarm : alarms) {
                response.getWriter().write(String.format("%s,%s,%s,%s,%s,%s,%s,%s,%s\n",
                        alarm.get("alarmTime") != null ? alarm.get("alarmTime") : "",
                        alarm.get("alarmType") != null ? alarm.get("alarmType") : "",
                        alarm.get("alarmName") != null ? alarm.get("alarmName") : "",
                        alarm.get("level") != null ? alarm.get("level") : "",
                        alarm.get("status") != null ? alarm.get("status") : "",
                        alarm.get("latitude") != null ? alarm.get("latitude") : "",
                        alarm.get("longitude") != null ? alarm.get("longitude") : "",
                        alarm.get("speed") != null ? alarm.get("speed") : "",
                        alarm.get("message") != null ? String.valueOf(alarm.get("message")).replace(",", "，") : ""));
            }
            response.getWriter().flush();
        } catch (Exception e) {
            try {
                response.sendError(500, "导出失败: " + e.getMessage());
            } catch (Exception ex) {
                // ignore
            }
        }
    }
}
