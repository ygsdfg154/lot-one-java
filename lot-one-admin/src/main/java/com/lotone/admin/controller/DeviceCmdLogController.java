package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lotone.admin.entity.DeviceCmdLog;
import com.lotone.admin.service.DeviceCmdLogService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/deviceCmdLog")
public class DeviceCmdLogController extends BaseController<DeviceCmdLog, DeviceCmdLogService> {

    /**
     * 分页查询指令日志
     */
    @GetMapping("/page")
    public R<Map<String, Object>> page(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String deviceId,
            @RequestParam(required = false) String cmdType,
            @RequestParam(required = false) String result,
            @RequestParam(required = false) String operator,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {

        LambdaQueryWrapper<DeviceCmdLog> wrapper = new LambdaQueryWrapper<>();
        if (deviceId != null && !deviceId.isEmpty()) {
            wrapper.eq(DeviceCmdLog::getDeviceId, deviceId);
        }
        if (cmdType != null && !cmdType.isEmpty()) {
            wrapper.eq(DeviceCmdLog::getCmdType, cmdType);
        }
        if (result != null && !result.isEmpty()) {
            wrapper.eq(DeviceCmdLog::getResult, result);
        }
        if (operator != null && !operator.isEmpty()) {
            wrapper.like(DeviceCmdLog::getOperator, operator);
        }
        if (startTime != null) {
            wrapper.ge(DeviceCmdLog::getSendTime, startTime);
        }
        if (endTime != null) {
            wrapper.le(DeviceCmdLog::getSendTime, endTime);
        }
        wrapper.orderByDesc(DeviceCmdLog::getSendTime);

        Page<DeviceCmdLog> pageResult = service.page(new Page<>(page, pageSize), wrapper);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", pageResult.getRecords());
        resultMap.put("total", pageResult.getTotal());
        resultMap.put("page", page);
        resultMap.put("pageSize", pageSize);
        return R.success(resultMap);
    }

    /**
     * 按设备查询指令日志
     */
    @GetMapping("/byDevice")
    public R<Map<String, Object>> byDevice(
            @RequestParam String deviceId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {
        return page(page, pageSize, deviceId, null, null, null, null, null);
    }

    /**
     * 指令日志统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics(
            @RequestParam(required = false) String deviceId,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startTime,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endTime) {

        LambdaQueryWrapper<DeviceCmdLog> wrapper = new LambdaQueryWrapper<>();
        if (deviceId != null && !deviceId.isEmpty()) {
            wrapper.eq(DeviceCmdLog::getDeviceId, deviceId);
        }
        if (startTime != null) {
            wrapper.ge(DeviceCmdLog::getSendTime, startTime);
        }
        if (endTime != null) {
            wrapper.le(DeviceCmdLog::getSendTime, endTime);
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", service.count(wrapper));
        stats.put("success", service.count(wrapper.clone().eq(DeviceCmdLog::getResult, "SUCCESS")));
        stats.put("failed", service.count(wrapper.clone().eq(DeviceCmdLog::getResult, "FAILED")));
        stats.put("pending", service.count(wrapper.clone().isNull(DeviceCmdLog::getResult)));

        return R.success(stats);
    }

    /**
     * 指令详情
     */
    @GetMapping("/detail")
    public R<DeviceCmdLog> detail(@RequestParam Long id) {
        DeviceCmdLog log = service.getById(id);
        if (log == null) {
            return R.fail("指令日志不存在");
        }
        return R.success(log);
    }

    /**
     * 按 requestId 查询
     */
    @GetMapping("/byRequestId")
    public R<DeviceCmdLog> byRequestId(@RequestParam String requestId) {
        DeviceCmdLog log = service.getOne(
                new LambdaQueryWrapper<DeviceCmdLog>().eq(DeviceCmdLog::getRequestId, requestId));
        return R.success(log);
    }
}
