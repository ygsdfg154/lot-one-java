package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lotone.admin.entity.Recording;
import com.lotone.admin.service.RecordingService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/recording")
public class RecordingController extends BaseController<Recording, RecordingService> {

    /**
     * 分页查询录音/安防文件
     */
    @GetMapping("/page")
    public R<Map<String, Object>> page(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String imei,
            @RequestParam(required = false) String recordingName,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {

        LambdaQueryWrapper<Recording> wrapper = new LambdaQueryWrapper<>();
        if (imei != null && !imei.isEmpty()) {
            wrapper.eq(Recording::getImei, imei);
        }
        if (recordingName != null && !recordingName.isEmpty()) {
            wrapper.like(Recording::getRecordingName, recordingName);
        }
        if (startTime != null) {
            wrapper.ge(Recording::getCreatedAt, startTime);
        }
        if (endTime != null) {
            wrapper.le(Recording::getCreatedAt, endTime);
        }
        wrapper.orderByDesc(Recording::getCreatedAt);

        Page<Recording> pageResult = service.page(new Page<>(page, pageSize), wrapper);

        Map<String, Object> result = new HashMap<>();
        result.put("list", pageResult.getRecords());
        result.put("total", pageResult.getTotal());
        result.put("page", page);
        result.put("pageSize", pageSize);
        return R.success(result);
    }

    /**
     * 按设备查询录音
     */
    @GetMapping("/byDevice")
    public R<Map<String, Object>> byDevice(
            @RequestParam String imei,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {
        return page(page, pageSize, imei, null, null, null);
    }

    /**
     * 录音详情
     */
    @GetMapping("/detail")
    public R<Recording> detail(@RequestParam Long id) {
        Recording recording = service.getById(id);
        if (recording == null) {
            return R.fail("录音不存在");
        }
        return R.success(recording);
    }

    /**
     * 录音统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics(
            @RequestParam(required = false) String imei) {
        LambdaQueryWrapper<Recording> wrapper = new LambdaQueryWrapper<>();
        if (imei != null && !imei.isEmpty()) {
            wrapper.eq(Recording::getImei, imei);
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", service.count(wrapper));

        // 总时长
        try {
            List<Recording> all = service.list(wrapper);
            int totalDuration = all.stream()
                    .mapToInt(r -> r.getDuration() != null ? r.getDuration() : 0)
                    .sum();
            stats.put("totalDuration", totalDuration);
            stats.put("totalDurationFormatted", formatDuration(totalDuration));
        } catch (Exception e) {
            stats.put("totalDuration", 0);
            stats.put("totalDurationFormatted", "0秒");
        }

        return R.success(stats);
    }

    /**
     * 格式化时长
     */
    private String formatDuration(int seconds) {
        if (seconds < 60) {
            return seconds + "秒";
        } else if (seconds < 3600) {
            return (seconds / 60) + "分" + (seconds % 60) + "秒";
        } else {
            return (seconds / 3600) + "小时" + ((seconds % 3600) / 60) + "分";
        }
    }
}
