package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lotone.admin.entity.*;
import com.lotone.admin.service.*;
import com.lotone.common.result.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportAlertService reportAlertService;

    @Autowired
    private ReportMileageService reportMileageService;

    @Autowired
    private ReportTripService reportTripService;

    @Autowired
    private ReportBatteryService reportBatteryService;

    @Autowired
    private ReportStopService reportStopService;

    // ==================== 报警报表 ====================

    @GetMapping("/alert/page")
    public R<Map<String, Object>> alertPage(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String imei,
            @RequestParam(required = false) String alertType,
            @RequestParam(required = false) Byte alertLevel,
            @RequestParam(required = false) Byte isHandled,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {

        LambdaQueryWrapper<ReportAlert> wrapper = new LambdaQueryWrapper<>();
        if (imei != null) wrapper.eq(ReportAlert::getImei, imei);
        if (alertType != null) wrapper.eq(ReportAlert::getAlertType, alertType);
        if (alertLevel != null) wrapper.eq(ReportAlert::getAlertLevel, alertLevel);
        if (isHandled != null) wrapper.eq(ReportAlert::getIsHandled, isHandled);
        if (startTime != null) wrapper.ge(ReportAlert::getCreatedAt, startTime);
        if (endTime != null) wrapper.le(ReportAlert::getCreatedAt, endTime);
        wrapper.orderByDesc(ReportAlert::getCreatedAt);

        Page<ReportAlert> pageResult = reportAlertService.page(new Page<>(page, pageSize), wrapper);
        return R.success(buildPageResult(pageResult, page, pageSize));
    }

    @PostMapping("/alert/handle")
    public R<String> handleAlert(@RequestParam Long id, @RequestParam(required = false) String handler) {
        ReportAlert alert = new ReportAlert();
        alert.setId(id);
        alert.setIsHandled((byte) 1);
        alert.setHandler(handler != null ? handler : "admin");
        alert.setHandledAt(LocalDateTime.now());
        reportAlertService.updateById(alert);
        return R.success("报警已处理");
    }

    @GetMapping("/alert/statistics")
    public R<Map<String, Object>> alertStatistics(
            @RequestParam(required = false) String imei,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {

        LambdaQueryWrapper<ReportAlert> wrapper = new LambdaQueryWrapper<>();
        if (imei != null) wrapper.eq(ReportAlert::getImei, imei);
        if (startTime != null) wrapper.ge(ReportAlert::getCreatedAt, startTime);
        if (endTime != null) wrapper.le(ReportAlert::getCreatedAt, endTime);

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", reportAlertService.count(wrapper));
        stats.put("unhandled", reportAlertService.count(wrapper.clone().eq(ReportAlert::getIsHandled, (byte) 0)));
        stats.put("handled", reportAlertService.count(wrapper.clone().eq(ReportAlert::getIsHandled, (byte) 1)));
        stats.put("level1", reportAlertService.count(wrapper.clone().eq(ReportAlert::getAlertLevel, (byte) 1)));
        stats.put("level2", reportAlertService.count(wrapper.clone().eq(ReportAlert::getAlertLevel, (byte) 2)));
        stats.put("level3", reportAlertService.count(wrapper.clone().eq(ReportAlert::getAlertLevel, (byte) 3)));
        return R.success(stats);
    }

    // ==================== 里程报表 ====================

    @GetMapping("/mileage/page")
    public R<Map<String, Object>> mileagePage(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String imei,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {

        LambdaQueryWrapper<ReportMileage> wrapper = new LambdaQueryWrapper<>();
        if (imei != null) wrapper.eq(ReportMileage::getImei, imei);
        if (startDate != null) wrapper.ge(ReportMileage::getStatDate, startDate);
        if (endDate != null) wrapper.le(ReportMileage::getStatDate, endDate);
        wrapper.orderByDesc(ReportMileage::getStatDate);

        Page<ReportMileage> pageResult = reportMileageService.page(new Page<>(page, pageSize), wrapper);
        return R.success(buildPageResult(pageResult, page, pageSize));
    }

    @GetMapping("/mileage/summary")
    public R<Map<String, Object>> mileageSummary(
            @RequestParam String imei,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {

        List<ReportMileage> list = reportMileageService.list(
                new LambdaQueryWrapper<ReportMileage>()
                        .eq(ReportMileage::getImei, imei)
                        .between(ReportMileage::getStatDate, startDate, endDate)
                        .orderByAsc(ReportMileage::getStatDate));

        BigDecimal totalDaily = list.stream()
                .map(r -> r.getDailyMileage() != null ? r.getDailyMileage() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> result = new HashMap<>();
        result.put("imei", imei);
        result.put("startDate", startDate);
        result.put("endDate", endDate);
        result.put("totalMileage", totalDaily);
        result.put("days", list.size());
        result.put("avgDaily", list.size() > 0 ? totalDaily.divide(BigDecimal.valueOf(list.size()), 2, BigDecimal.ROUND_HALF_UP) : BigDecimal.ZERO);
        result.put("dailyList", list);
        return R.success(result);
    }

    // ==================== 行程报表 ====================

    @GetMapping("/trip/page")
    public R<Map<String, Object>> tripPage(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String imei,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {

        LambdaQueryWrapper<ReportTrip> wrapper = new LambdaQueryWrapper<>();
        if (imei != null) wrapper.eq(ReportTrip::getImei, imei);
        if (startTime != null) wrapper.ge(ReportTrip::getStartTime, startTime);
        if (endTime != null) wrapper.le(ReportTrip::getStartTime, endTime);
        wrapper.orderByDesc(ReportTrip::getStartTime);

        Page<ReportTrip> pageResult = reportTripService.page(new Page<>(page, pageSize), wrapper);
        return R.success(buildPageResult(pageResult, page, pageSize));
    }

    @GetMapping("/trip/summary")
    public R<Map<String, Object>> tripSummary(
            @RequestParam String imei,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {

        List<ReportTrip> list = reportTripService.list(
                new LambdaQueryWrapper<ReportTrip>()
                        .eq(ReportTrip::getImei, imei)
                        .between(ReportTrip::getStartTime, startTime, endTime));

        BigDecimal totalDistance = list.stream()
                .map(t -> t.getDistance() != null ? t.getDistance() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        int totalDuration = list.stream()
                .mapToInt(t -> t.getDuration() != null ? t.getDuration() : 0)
                .sum();
        BigDecimal maxSpeed = list.stream()
                .map(t -> t.getMaxSpeed() != null ? t.getMaxSpeed() : BigDecimal.ZERO)
                .max(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);

        Map<String, Object> result = new HashMap<>();
        result.put("imei", imei);
        result.put("tripCount", list.size());
        result.put("totalDistance", totalDistance);
        result.put("totalDuration", totalDuration);
        result.put("totalDurationHours", Math.round(totalDuration / 3600.0 * 100.0) / 100.0);
        result.put("maxSpeed", maxSpeed);
        return R.success(result);
    }

    // ==================== 电量报表 ====================

    @GetMapping("/battery/page")
    public R<Map<String, Object>> batteryPage(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String imei,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {

        LambdaQueryWrapper<ReportBattery> wrapper = new LambdaQueryWrapper<>();
        if (imei != null) wrapper.eq(ReportBattery::getImei, imei);
        if (startTime != null) wrapper.ge(ReportBattery::getCreatedAt, startTime);
        if (endTime != null) wrapper.le(ReportBattery::getCreatedAt, endTime);
        wrapper.orderByDesc(ReportBattery::getCreatedAt);

        Page<ReportBattery> pageResult = reportBatteryService.page(new Page<>(page, pageSize), wrapper);
        return R.success(buildPageResult(pageResult, page, pageSize));
    }

    // ==================== 停车报表 ====================

    @GetMapping("/stop/page")
    public R<Map<String, Object>> stopPage(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String imei,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {

        LambdaQueryWrapper<ReportStop> wrapper = new LambdaQueryWrapper<>();
        if (imei != null) wrapper.eq(ReportStop::getImei, imei);
        if (startTime != null) wrapper.ge(ReportStop::getStartTime, startTime);
        if (endTime != null) wrapper.le(ReportStop::getStartTime, endTime);
        wrapper.orderByDesc(ReportStop::getStartTime);

        Page<ReportStop> pageResult = reportStopService.page(new Page<>(page, pageSize), wrapper);
        return R.success(buildPageResult(pageResult, page, pageSize));
    }

    // ==================== 通用方法 ====================

    private Map<String, Object> buildPageResult(Page<?> pageResult, int page, int pageSize) {
        Map<String, Object> result = new HashMap<>();
        result.put("list", pageResult.getRecords());
        result.put("total", pageResult.getTotal());
        result.put("page", page);
        result.put("pageSize", pageSize);
        return result;
    }
}
