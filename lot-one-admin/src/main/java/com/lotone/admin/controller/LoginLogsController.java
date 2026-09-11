package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lotone.admin.entity.LoginLogs;
import com.lotone.admin.service.LoginLogsService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/loginLogs")
public class LoginLogsController extends BaseController<LoginLogs, LoginLogsService> {

    /**
     * 分页查询登录日志
     */
    @GetMapping("/page")
    public R<Map<String, Object>> page(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) Boolean status,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {

        LambdaQueryWrapper<LoginLogs> wrapper = new LambdaQueryWrapper<>();
        if (username != null && !username.isEmpty()) {
            wrapper.like(LoginLogs::getUsername, username);
        }
        if (status != null) {
            wrapper.eq(LoginLogs::getStatus, status);
        }
        if (startTime != null) {
            wrapper.ge(LoginLogs::getCreatedAt, startTime);
        }
        if (endTime != null) {
            wrapper.le(LoginLogs::getCreatedAt, endTime);
        }
        wrapper.orderByDesc(LoginLogs::getCreatedAt);

        Page<LoginLogs> pageResult = service.page(new Page<>(page, pageSize), wrapper);

        Map<String, Object> result = new HashMap<>();
        result.put("list", pageResult.getRecords());
        result.put("total", pageResult.getTotal());
        result.put("page", page);
        result.put("pageSize", pageSize);
        return R.success(result);
    }

    /**
     * 登录统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Map<String, Object> stats = new HashMap<>();
        long total = service.count();
        long success = service.count(new LambdaQueryWrapper<LoginLogs>().eq(LoginLogs::getStatus, true));
        long failed = service.count(new LambdaQueryWrapper<LoginLogs>().eq(LoginLogs::getStatus, false));

        stats.put("total", total);
        stats.put("success", success);
        stats.put("failed", failed);
        stats.put("successRate", total > 0 ? Math.round(success * 10000.0 / total) / 100.0 : 0);
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
