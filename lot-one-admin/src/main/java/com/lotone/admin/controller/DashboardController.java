package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.Device;
import com.lotone.admin.service.DeviceService;
import com.lotone.admin.vo.ActiveTrendItem;
import com.lotone.admin.vo.DashboardAlarmItem;
import com.lotone.admin.vo.DashboardOverview;
import com.lotone.admin.vo.MileageRankItem;
import com.lotone.common.result.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * 首页概览（6卡片 + 双排行榜）
     */
    @GetMapping("/overview")
    public R<DashboardOverview> overview() {
        DashboardOverview vo = new DashboardOverview();

        long total = deviceService.count();
        long activated = deviceService.count(
                new LambdaQueryWrapper<Device>().isNotNull(Device::getActiveTime));
        long waitActive = deviceService.count(
                new LambdaQueryWrapper<Device>().isNull(Device::getActiveTime));
        long expired = deviceService.count(
                new LambdaQueryWrapper<Device>()
                        .isNotNull(Device::getExpireTime)
                        .lt(Device::getExpireTime, LocalDateTime.now()));

        vo.setDeviceCount((int) total);
        vo.setActivationCount((int) activated);
        vo.setWaitActiveCount((int) waitActive);
        vo.setExpiredCount((int) expired);
        // 在线/离线状态待 iot-worker 完善后从 Redis/Mongo 获取
        vo.setOnlineCount(0);
        vo.setOfflineCount((int) total);
        // 里程排行榜待 iot-worker 完善后对接
        vo.setTotalMileageRank(new ArrayList<>());
        vo.setTodayMileageRank(new ArrayList<>());

        return R.success(vo);
    }

    /**
     * 最近告警列表（待 iot-worker 完善后从 MongoDB/Kafka 对接）
     */
    @GetMapping("/alarm/recent")
    public R<List<DashboardAlarmItem>> recentAlarms(@RequestParam(defaultValue = "10") int limit) {
        return R.success(new ArrayList<>());
    }

    /**
     * 设备激活趋势
     * trendType: day(默认近30天) / month(近12个月) / year(近5年)
     */
    @GetMapping("/active/trend")
    public R<List<ActiveTrendItem>> activeTrend(
            @RequestParam(required = false) String trendType,
            @RequestParam(required = false) String startTime,
            @RequestParam(required = false) String endTime) {

        if (trendType == null) trendType = "day";
        LocalDate end = (endTime != null && !endTime.isEmpty())
                ? parseDate(endTime, trendType) : LocalDate.now();
        LocalDate start = (startTime != null && !startTime.isEmpty())
                ? parseDate(startTime, trendType) : calcStart(end, trendType);

        String dateFormat = getDateFormat(trendType);
        String sql = "SELECT DATE_FORMAT(active_time, '" + dateFormat + "') as period, COUNT(*) as cnt " +
                "FROM lot_device WHERE active_time IS NOT NULL " +
                "AND active_time BETWEEN ? AND ? " +
                "GROUP BY period ORDER BY period ASC";

        Map<String, Integer> countMap = new HashMap<>();
        try {
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql,
                    java.sql.Timestamp.valueOf(start.atStartOfDay()),
                    java.sql.Timestamp.valueOf(end.plusDays(1).atStartOfDay()));
            for (Map<String, Object> row : rows) {
                String period = row.get("period").toString();
                Integer cnt = ((Number) row.get("cnt")).intValue();
                countMap.put(period, cnt);
            }
        } catch (Exception e) {
            // 查询失败返回空趋势
        }

        List<ActiveTrendItem> items = new ArrayList<>();
        DateTimeFormatter outputFmt = getOutputFormatter(trendType);
        LocalDate cur = start;
        while (!cur.isAfter(end)) {
            String key = cur.format(outputFmt);
            ActiveTrendItem item = new ActiveTrendItem();
            item.setDate(key);
            item.setActiveNum(countMap.getOrDefault(key, 0));
            items.add(item);
            cur = nextPeriod(cur, trendType);
        }

        return R.success(items);
    }

    private LocalDate parseDate(String dateStr, String trendType) {
        try {
            switch (trendType) {
                case "month":
                    return LocalDate.parse(dateStr + "-01", DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                case "year":
                    return LocalDate.parse(dateStr + "-01-01", DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                default:
                    return LocalDate.parse(dateStr, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            }
        } catch (Exception e) {
            return LocalDate.now();
        }
    }

    private LocalDate calcStart(LocalDate end, String trendType) {
        switch (trendType) {
            case "month": return end.minusMonths(11).withDayOfMonth(1);
            case "year": return end.minusYears(5).withDayOfYear(1);
            default: return end.minusDays(29);
        }
    }

    private String getDateFormat(String trendType) {
        switch (trendType) {
            case "month": return "%Y-%m";
            case "year": return "%Y";
            default: return "%Y-%m-%d";
        }
    }

    private DateTimeFormatter getOutputFormatter(String trendType) {
        switch (trendType) {
            case "month": return DateTimeFormatter.ofPattern("yyyy-MM");
            case "year": return DateTimeFormatter.ofPattern("yyyy");
            default: return DateTimeFormatter.ofPattern("yyyy-MM-dd");
        }
    }

    private LocalDate nextPeriod(LocalDate cur, String trendType) {
        switch (trendType) {
            case "month": return cur.plusMonths(1);
            case "year": return cur.plusYears(1);
            default: return cur.plusDays(1);
        }
    }
}
