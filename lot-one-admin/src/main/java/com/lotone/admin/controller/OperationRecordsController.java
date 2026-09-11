package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lotone.admin.entity.OperationRecords;
import com.lotone.admin.service.OperationRecordsService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/operationRecords")
public class OperationRecordsController extends BaseController<OperationRecords, OperationRecordsService> {

    /**
     * 分页查询操作日志
     */
    @GetMapping("/page")
    public R<Map<String, Object>> page(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String method,
            @RequestParam(required = false) String path,
            @RequestParam(required = false) Long status,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {

        LambdaQueryWrapper<OperationRecords> wrapper = new LambdaQueryWrapper<>();
        if (method != null && !method.isEmpty()) {
            wrapper.eq(OperationRecords::getMethod, method);
        }
        if (path != null && !path.isEmpty()) {
            wrapper.like(OperationRecords::getPath, path);
        }
        if (status != null) {
            wrapper.eq(OperationRecords::getStatus, status);
        }
        if (userId != null) {
            wrapper.eq(OperationRecords::getUserId, userId);
        }
        if (startTime != null) {
            wrapper.ge(OperationRecords::getCreatedAt, startTime);
        }
        if (endTime != null) {
            wrapper.le(OperationRecords::getCreatedAt, endTime);
        }
        wrapper.orderByDesc(OperationRecords::getCreatedAt);

        Page<OperationRecords> pageResult = service.page(new Page<>(page, pageSize), wrapper);

        Map<String, Object> result = new HashMap<>();
        result.put("list", pageResult.getRecords());
        result.put("total", pageResult.getTotal());
        result.put("page", page);
        result.put("pageSize", pageSize);
        return R.success(result);
    }

    /**
     * 操作统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Map<String, Object> stats = new HashMap<>();
        long total = service.count();
        long success = service.count(new LambdaQueryWrapper<OperationRecords>().eq(OperationRecords::getStatus, 200));
        long failed = total - success;

        // 平均延迟
        try {
            List<OperationRecords> all = service.list(new LambdaQueryWrapper<OperationRecords>()
                    .isNotNull(OperationRecords::getLatency)
                    .last("LIMIT 1000"));
            if (!all.isEmpty()) {
                double avgLatency = all.stream()
                        .mapToLong(r -> r.getLatency() != null ? r.getLatency() : 0)
                        .average()
                        .orElse(0);
                stats.put("avgLatency", Math.round(avgLatency));
            }
        } catch (Exception e) {
            stats.put("avgLatency", 0);
        }

        stats.put("total", total);
        stats.put("success", success);
        stats.put("failed", failed);
        return R.success(stats);
    }

    /**
     * 清空日志
     */
    @PostMapping("/clear")
    public R<String> clear() {
        service.remove(new LambdaQueryWrapper<>());
        return R.success("日志已清空");
    }
}
