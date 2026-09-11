package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.Device;
import com.lotone.admin.service.DeviceService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/device")
public class DeviceController extends BaseController<Device, DeviceService> {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 设备详情（含实时位置）
     */
    @GetMapping("/detail")
    public R<Map<String, Object>> detail(@RequestParam String deviceId) {
        Device device = service.getOne(new LambdaQueryWrapper<Device>().eq(Device::getDeviceId, deviceId));
        if (device == null) {
            return R.fail("设备不存在");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("device", device);

        // 查询实时位置（MongoDB）
        try {
            Query query = new Query(Criteria.where("deviceId").is(deviceId));
            Map status = mongoTemplate.findOne(query, Map.class, "device_status");
            result.put("realtime", status != null ? status : new HashMap<>());
        } catch (Exception e) {
            result.put("realtime", new HashMap<>());
        }

        return R.success(result);
    }

    /**
     * 设备状态统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Map<String, Object> stats = new HashMap<>();

        long total = service.count();
        long activated = service.count(new LambdaQueryWrapper<Device>().eq(Device::getActivationStatus, (byte) 1));
        long waitActive = service.count(new LambdaQueryWrapper<Device>().eq(Device::getActivationStatus, (byte) 0));
        long expired = service.count(new LambdaQueryWrapper<Device>()
                .isNotNull(Device::getExpireTime)
                .lt(Device::getExpireTime, LocalDateTime.now()));

        stats.put("total", total);
        stats.put("activated", activated);
        stats.put("waitActive", waitActive);
        stats.put("expired", expired);

        // 在线设备数（从MongoDB统计）
        try {
            long online = mongoTemplate.count(new Query(Criteria.where("online").is(true)), "device_status");
            stats.put("online", online);
            stats.put("offline", total - online);
        } catch (Exception e) {
            stats.put("online", 0);
            stats.put("offline", total);
        }

        return R.success(stats);
    }

    /**
     * 批量启用/禁用设备
     */
    @PostMapping("/batchToggle")
    public R<String> batchToggle(@RequestBody Map<String, Object> params) {
        List<String> deviceIds = (List<String>) params.get("deviceIds");
        Integer status = params.get("status") != null ? Integer.parseInt(params.get("status").toString()) : null;

        if (deviceIds == null || deviceIds.isEmpty() || status == null) {
            return R.fail("参数不完整");
        }

        for (String deviceId : deviceIds) {
            Device device = new Device();
            device.setDisableStatus(status.byteValue());
            device.setUpdatedAt(LocalDateTime.now());
            service.update(device, new LambdaQueryWrapper<Device>().eq(Device::getDeviceId, deviceId));
        }

        return R.success("批量操作成功，共" + deviceIds.size() + "台设备");
    }

    /**
     * 设备实时位置批量查询
     */
    @PostMapping("/realtime/batch")
    public R<List<Map<String, Object>>> realtimeBatch(@RequestBody List<String> deviceIds) {
        List<Map<String, Object>> result = new ArrayList<>();
        if (deviceIds == null || deviceIds.isEmpty()) {
            return R.success(result);
        }
        try {
            Query query = new Query(Criteria.where("deviceId").in(deviceIds));
            List<Map> statuses = mongoTemplate.find(query, Map.class, "device_status");
            for (Map status : statuses) {
                result.add(new HashMap<>(status));
            }
        } catch (Exception e) {
            // ignore
        }
        return R.success(result);
    }

    /**
     * 重置设备激活状态
     */
    @PostMapping("/resetActivation")
    public R<String> resetActivation(@RequestParam String deviceId) {
        Device device = new Device();
        device.setActivationStatus((byte) 0);
        device.setActiveTime(null);
        device.setUpdatedAt(LocalDateTime.now());
        service.update(device, new LambdaQueryWrapper<Device>().eq(Device::getDeviceId, deviceId));
        return R.success("重置成功");
    }
}
