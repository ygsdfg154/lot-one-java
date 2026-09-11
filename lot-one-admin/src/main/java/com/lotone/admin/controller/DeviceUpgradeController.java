package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lotone.admin.entity.DeviceUpgrade;
import com.lotone.admin.entity.DeviceUpgradeLog;
import com.lotone.admin.mapper.DeviceUpgradeLogMapper;
import com.lotone.admin.mapper.DeviceUpgradeMapper;
import com.lotone.common.result.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/deviceUpgrade")
public class DeviceUpgradeController {

    @Autowired
    private DeviceUpgradeMapper upgradeMapper;

    @Autowired
    private DeviceUpgradeLogMapper upgradeLogMapper;

    /**
     * 升级任务列表（分页）
     */
    @GetMapping("/page")
    public R<Map<String, Object>> page(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) Byte status,
            @RequestParam(required = false) String firmwareVersion) {

        LambdaQueryWrapper<DeviceUpgrade> wrapper = new LambdaQueryWrapper<>();
        if (status != null) wrapper.eq(DeviceUpgrade::getStatus, status);
        if (firmwareVersion != null && !firmwareVersion.isEmpty()) {
            wrapper.like(DeviceUpgrade::getFirmwareVersion, firmwareVersion);
        }
        wrapper.orderByDesc(DeviceUpgrade::getId);

        Page<DeviceUpgrade> pageResult = upgradeMapper.selectPage(new Page<>(page, pageSize), wrapper);

        Map<String, Object> result = new HashMap<>();
        result.put("list", pageResult.getRecords());
        result.put("total", pageResult.getTotal());
        result.put("page", page);
        result.put("pageSize", pageSize);
        return R.success(result);
    }

    /**
     * 升级任务详情
     */
    @GetMapping("/detail")
    public R<Map<String, Object>> detail(@RequestParam Long id) {
        DeviceUpgrade upgrade = upgradeMapper.selectById(id);
        if (upgrade == null) {
            return R.fail("升级任务不存在");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("upgrade", upgrade);

        // 查询升级日志统计
        Long total = upgradeLogMapper.selectCount(new LambdaQueryWrapper<DeviceUpgradeLog>()
                .eq(DeviceUpgradeLog::getUpgradeId, id));
        Long success = upgradeLogMapper.selectCount(new LambdaQueryWrapper<DeviceUpgradeLog>()
                .eq(DeviceUpgradeLog::getUpgradeId, id)
                .eq(DeviceUpgradeLog::getStatus, 2));
        Long fail = upgradeLogMapper.selectCount(new LambdaQueryWrapper<DeviceUpgradeLog>()
                .eq(DeviceUpgradeLog::getUpgradeId, id)
                .eq(DeviceUpgradeLog::getStatus, 3));
        Long inProgress = upgradeLogMapper.selectCount(new LambdaQueryWrapper<DeviceUpgradeLog>()
                .eq(DeviceUpgradeLog::getUpgradeId, id)
                .eq(DeviceUpgradeLog::getStatus, 1));

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("success", success);
        stats.put("fail", fail);
        stats.put("inProgress", inProgress);
        stats.put("pending", total - success - fail - inProgress);
        stats.put("successRate", total > 0 ? Math.round(success * 10000.0 / total) / 100.0 : 0);
        result.put("stats", stats);

        return R.success(result);
    }

    /**
     * 创建升级任务
     */
    @PostMapping("/create")
    public R<Map<String, Object>> create(@RequestBody DeviceUpgrade upgrade) {
        upgrade.setStatus((byte) 0);
        upgrade.setCreatedAt(LocalDateTime.now());
        upgrade.setSuccessCount(0);
        upgrade.setFailCount(0);
        upgradeMapper.insert(upgrade);

        Map<String, Object> result = new HashMap<>();
        result.put("id", upgrade.getId());
        result.put("message", "升级任务创建成功，待发布");
        return R.success(result);
    }

    /**
     * 发布升级任务
     */
    @PostMapping("/publish")
    public R<Void> publish(@RequestParam Long id) {
        DeviceUpgrade upgrade = upgradeMapper.selectById(id);
        if (upgrade == null) {
            return R.fail("升级任务不存在");
        }
        if (upgrade.getStatus() != 0) {
            return R.fail("只有待发布的任务才能发布");
        }

        upgrade.setStatus((byte) 1);
        upgrade.setPublishTime(LocalDateTime.now());
        upgrade.setUpdatedAt(LocalDateTime.now());
        upgradeMapper.updateById(upgrade);

        // TODO: 通过 Kafka 下发升级通知到设备
        // 这里可以发送到 device-command topic，网关收到后下发到设备

        return R.success();
    }

    /**
     * 取消升级任务
     */
    @PostMapping("/cancel")
    public R<Void> cancel(@RequestParam Long id) {
        DeviceUpgrade upgrade = upgradeMapper.selectById(id);
        if (upgrade == null) {
            return R.fail("升级任务不存在");
        }
        if (upgrade.getStatus() == 3 || upgrade.getStatus() == 4) {
            return R.fail("已完成或已取消的任务不能操作");
        }

        upgrade.setStatus((byte) 4);
        upgrade.setUpdatedAt(LocalDateTime.now());
        upgradeMapper.updateById(upgrade);
        return R.success();
    }

    /**
     * 升级日志列表（按任务）
     */
    @GetMapping("/logs")
    public R<Map<String, Object>> logs(
            @RequestParam Long upgradeId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) Byte status) {

        LambdaQueryWrapper<DeviceUpgradeLog> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(DeviceUpgradeLog::getUpgradeId, upgradeId);
        if (status != null) wrapper.eq(DeviceUpgradeLog::getStatus, status);
        wrapper.orderByDesc(DeviceUpgradeLog::getId);

        Page<DeviceUpgradeLog> pageResult = upgradeLogMapper.selectPage(new Page<>(page, pageSize), wrapper);

        Map<String, Object> result = new HashMap<>();
        result.put("list", pageResult.getRecords());
        result.put("total", pageResult.getTotal());
        result.put("page", page);
        result.put("pageSize", pageSize);
        return R.success(result);
    }

    /**
     * 设备查询最新固件（设备端调用）
     */
    @GetMapping("/latestFirmware")
    public R<Map<String, Object>> latestFirmware(
            @RequestParam String deviceId,
            @RequestParam String currentVersion,
            @RequestParam(required = false) String model) {

        // 查询已发布的升级任务
        LambdaQueryWrapper<DeviceUpgrade> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(DeviceUpgrade::getStatus, 1);
        wrapper.orderByDesc(DeviceUpgrade::getId);
        wrapper.last("LIMIT 1");

        DeviceUpgrade upgrade = upgradeMapper.selectOne(wrapper);
        if (upgrade == null) {
            return R.success(Map.of("needUpgrade", false, "message", "当前已是最新版本"));
        }

        // 检查版本是否需要升级
        if (upgrade.getFirmwareVersion().equals(currentVersion)) {
            return R.success(Map.of("needUpgrade", false, "message", "当前已是最新版本"));
        }

        // 检查目标型号
        if (upgrade.getTargetModel() != null && !upgrade.getTargetModel().isEmpty()
                && model != null && !model.equals(upgrade.getTargetModel())) {
            return R.success(Map.of("needUpgrade", false, "message", "当前设备型号不匹配"));
        }

        Map<String, Object> result = new HashMap<>();
        result.put("needUpgrade", true);
        result.put("upgradeId", upgrade.getId());
        result.put("firmwareVersion", upgrade.getFirmwareVersion());
        result.put("firmwareUrl", upgrade.getFirmwareUrl());
        result.put("firmwareSize", upgrade.getFirmwareSize());
        result.put("firmwareMd5", upgrade.getFirmwareMd5());
        result.put("description", upgrade.getDescription());
        return R.success(result);
    }

    /**
     * 设备上报升级进度
     */
    @PostMapping("/reportProgress")
    public R<Void> reportProgress(
            @RequestParam Long upgradeId,
            @RequestParam String deviceId,
            @RequestParam int progress,
            @RequestParam(required = false) String currentVersion,
            @RequestParam(required = false) String targetVersion) {

        // 查询或创建升级日志
        DeviceUpgradeLog log = upgradeLogMapper.selectOne(new LambdaQueryWrapper<DeviceUpgradeLog>()
                .eq(DeviceUpgradeLog::getUpgradeId, upgradeId)
                .eq(DeviceUpgradeLog::getDeviceId, deviceId));

        if (log == null) {
            log = new DeviceUpgradeLog();
            log.setUpgradeId(upgradeId);
            log.setDeviceId(deviceId);
            log.setStatus((byte) 1);
            log.setProgress(progress);
            log.setCurrentVersion(currentVersion);
            log.setTargetVersion(targetVersion);
            log.setStartTime(LocalDateTime.now());
            log.setCreatedAt(LocalDateTime.now());
            upgradeLogMapper.insert(log);
        } else {
            log.setProgress(progress);
            log.setStatus((byte) 1);
            upgradeLogMapper.updateById(log);
        }

        return R.success();
    }

    /**
     * 设备上报升级结果
     */
    @PostMapping("/reportResult")
    public R<Void> reportResult(
            @RequestParam Long upgradeId,
            @RequestParam String deviceId,
            @RequestParam boolean success,
            @RequestParam(required = false) String failReason,
            @RequestParam(required = false) String newVersion) {

        DeviceUpgradeLog log = upgradeLogMapper.selectOne(new LambdaQueryWrapper<DeviceUpgradeLog>()
                .eq(DeviceUpgradeLog::getUpgradeId, upgradeId)
                .eq(DeviceUpgradeLog::getDeviceId, deviceId));

        if (log == null) {
            log = new DeviceUpgradeLog();
            log.setUpgradeId(upgradeId);
            log.setDeviceId(deviceId);
            log.setCreatedAt(LocalDateTime.now());
        }

        log.setStatus(success ? (byte) 2 : (byte) 3);
        log.setProgress(success ? 100 : log.getProgress());
        log.setFailReason(failReason);
        log.setTargetVersion(newVersion);
        log.setCompleteTime(LocalDateTime.now());

        if (log.getId() == null) {
            upgradeLogMapper.insert(log);
        } else {
            upgradeLogMapper.updateById(log);
        }

        // 更新升级任务统计
        DeviceUpgrade upgrade = upgradeMapper.selectById(upgradeId);
        if (upgrade != null) {
            Long successCount = upgradeLogMapper.selectCount(new LambdaQueryWrapper<DeviceUpgradeLog>()
                    .eq(DeviceUpgradeLog::getUpgradeId, upgradeId)
                    .eq(DeviceUpgradeLog::getStatus, 2));
            Long failCount = upgradeLogMapper.selectCount(new LambdaQueryWrapper<DeviceUpgradeLog>()
                    .eq(DeviceUpgradeLog::getUpgradeId, upgradeId)
                    .eq(DeviceUpgradeLog::getStatus, 3));

            upgrade.setSuccessCount(successCount.intValue());
            upgrade.setFailCount(failCount.intValue());
            upgrade.setUpdatedAt(LocalDateTime.now());

            // 如果所有设备都完成了，标记任务完成
            if (upgrade.getTotalCount() != null && successCount + failCount >= upgrade.getTotalCount()) {
                upgrade.setStatus((byte) 3);
                upgrade.setCompleteTime(LocalDateTime.now());
            }

            upgradeMapper.updateById(upgrade);
        }

        return R.success();
    }

    /**
     * 升级统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalTasks", upgradeMapper.selectCount(null));
        stats.put("pending", upgradeMapper.selectCount(new LambdaQueryWrapper<DeviceUpgrade>()
                .eq(DeviceUpgrade::getStatus, 0)));
        stats.put("published", upgradeMapper.selectCount(new LambdaQueryWrapper<DeviceUpgrade>()
                .eq(DeviceUpgrade::getStatus, 1)));
        stats.put("inProgress", upgradeMapper.selectCount(new LambdaQueryWrapper<DeviceUpgrade>()
                .eq(DeviceUpgrade::getStatus, 2)));
        stats.put("completed", upgradeMapper.selectCount(new LambdaQueryWrapper<DeviceUpgrade>()
                .eq(DeviceUpgrade::getStatus, 3)));
        stats.put("cancelled", upgradeMapper.selectCount(new LambdaQueryWrapper<DeviceUpgrade>()
                .eq(DeviceUpgrade::getStatus, 4)));
        return R.success(stats);
    }
}
