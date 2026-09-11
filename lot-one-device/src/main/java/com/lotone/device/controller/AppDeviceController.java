package com.lotone.device.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.lotone.common.result.R;
import com.lotone.device.dto.DeviceBindDTO;
import com.lotone.device.entity.AppUserDevice;
import com.lotone.device.service.AppUserDeviceService;
import com.lotone.device.vo.DeviceVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/device")
public class AppDeviceController {

    @Autowired
    private AppUserDeviceService userDeviceService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 绑定设备
     */
    @PostMapping("/bind")
    public R<String> bind(@RequestBody DeviceBindDTO dto) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (dto.getDeviceId() == null || dto.getDeviceId().isEmpty()) {
            return R.fail("设备号不能为空");
        }
        // 校验设备是否存在
        try {
            Integer count = jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM lot_device WHERE device_id = ?", Integer.class, dto.getDeviceId());
            if (count == null || count == 0) {
                return R.fail("设备不存在");
            }
        } catch (Exception e) {
            log.warn("Check device exists failed: {}", e.getMessage());
        }

        // 校验设备密码并绑定（内部校验 lot_device.login_password_hash）
        boolean success = userDeviceService.bindDevice(userId, dto.getDeviceId(), dto.getDeviceName(), dto.getPassword());
        if (!success) {
            return R.fail("设备绑定失败，可能密码错误或已被其他账号绑定");
        }
        return R.success("绑定成功");
    }

    /**
     * 解绑设备
     */
    @PostMapping("/unbind")
    public R<String> unbind(@RequestParam String deviceId) {
        Long userId = StpUtil.getLoginIdAsLong();
        boolean success = userDeviceService.unbindDevice(userId, deviceId);
        if (!success) {
            return R.fail("解绑失败，设备不属于当前账号");
        }
        return R.success("解绑成功");
    }

    /**
     * 切换默认设备
     */
    @PostMapping("/switchDefault")
    public R<String> switchDefault(@RequestParam String deviceId) {
        Long userId = StpUtil.getLoginIdAsLong();
        boolean success = userDeviceService.switchDefault(userId, deviceId);
        if (!success) {
            return R.fail("切换失败，设备不属于当前账号");
        }
        return R.success("切换成功");
    }

    /**
     * 我的设备列表
     */
    @GetMapping("/list")
    public R<List<DeviceVO>> list() {
        Long userId = StpUtil.getLoginIdAsLong();
        List<AppUserDevice> bindings = userDeviceService.listByUserId(userId);
        List<DeviceVO> result = new ArrayList<>();

        for (AppUserDevice binding : bindings) {
            DeviceVO vo = getDeviceDetail(binding.getDeviceId());
            if (vo != null) {
                vo.setIsDefault(binding.getIsDefault());
                vo.setBindTime(binding.getBindTime());
                if (binding.getDeviceName() != null && !binding.getDeviceName().isEmpty()) {
                    vo.setDeviceName(binding.getDeviceName());
                }
                result.add(vo);
            }
        }
        return R.success(result);
    }

    /**
     * 设备详情
     */
    @GetMapping("/detail")
    public R<DeviceVO> detail(@RequestParam String deviceId) {
        Long userId = StpUtil.getLoginIdAsLong();
        // 校验设备归属
        AppUserDevice binding = userDeviceService.getOne(
                new com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<AppUserDevice>()
                        .eq(AppUserDevice::getUserId, userId)
                        .eq(AppUserDevice::getDeviceId, deviceId));
        if (binding == null) {
            return R.fail("设备不属于当前账号");
        }

        DeviceVO vo = getDeviceDetail(deviceId);
        if (vo != null) {
            vo.setIsDefault(binding.getIsDefault());
            vo.setBindTime(binding.getBindTime());
        }
        return R.success(vo);
    }

    /**
     * 设备实时位置
     */
    @GetMapping("/realtime")
    public R<Map<String, Object>> realtime(@RequestParam String deviceId) {
        Long userId = StpUtil.getLoginIdAsLong();
        AppUserDevice binding = userDeviceService.getOne(
                new com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<AppUserDevice>()
                        .eq(AppUserDevice::getUserId, userId)
                        .eq(AppUserDevice::getDeviceId, deviceId));
        if (binding == null) {
            return R.fail("设备不属于当前账号");
        }

        Map<String, Object> status = getDeviceRealtimeStatus(deviceId);
        return R.success(status);
    }

    /**
     * 我的设备统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Long userId = StpUtil.getLoginIdAsLong();
        List<AppUserDevice> bindings = userDeviceService.listByUserId(userId);
        int total = bindings.size();
        int online = 0;
        for (AppUserDevice b : bindings) {
            Map<String, Object> status = getDeviceRealtimeStatus(b.getDeviceId());
            if (Boolean.TRUE.equals(status.get("online"))) {
                online++;
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("total", total);
        result.put("online", online);
        result.put("offline", total - online);
        return R.success(result);
    }

    /**
     * 从MySQL+MongoDB获取设备详情
     */
    private DeviceVO getDeviceDetail(String deviceId) {
        try {
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(
                    "SELECT * FROM lot_device WHERE device_id = ? LIMIT 1", deviceId);
            if (rows.isEmpty()) return null;

            Map<String, Object> row = rows.get(0);
            DeviceVO vo = new DeviceVO();
            vo.setDeviceId(getString(row, "device_id"));
            vo.setDeviceName(getString(row, "device_name"));
            vo.setDeviceType(getString(row, "device_type"));
            vo.setProductId(getInteger(row, "product_id"));
            vo.setProtocolType(getString(row, "protocol_type"));
            vo.setSimCard(getString(row, "sim_card"));
            vo.setImei(getString(row, "imei"));
            vo.setStatus(getInteger(row, "status"));
            vo.setActivationStatus(getInteger(row, "activation_status"));
            vo.setFirmwareVersion(getString(row, "firmware_version"));
            vo.setHardwareVersion(getString(row, "hardware_version"));

            // 从MongoDB获取实时状态
            Map<String, Object> realtime = getDeviceRealtimeStatus(deviceId);
            vo.setOnline((Boolean) realtime.get("online"));
            vo.setLatitude((Double) realtime.get("latitude"));
            vo.setLongitude((Double) realtime.get("longitude"));
            vo.setSpeed((Double) realtime.get("speed"));
            vo.setDirection((Integer) realtime.get("direction"));
            vo.setAltitude((Integer) realtime.get("altitude"));
            vo.setLastTime((String) realtime.get("lastTime"));

            return vo;
        } catch (Exception e) {
            log.error("Get device detail failed: deviceId={}", deviceId, e);
            return null;
        }
    }

    /**
     * 从MongoDB获取设备实时状态
     */
    private Map<String, Object> getDeviceRealtimeStatus(String deviceId) {
        Map<String, Object> result = new HashMap<>();
        result.put("online", false);
        try {
            Query query = new Query(Criteria.where("deviceId").is(deviceId));
            Map<String, Object> status = mongoTemplate.findOne(query, Map.class, "device_status");
            if (status != null) {
                result.put("online", status.get("online"));
                result.put("latitude", status.get("latitude"));
                result.put("longitude", status.get("longitude"));
                result.put("speed", status.get("speed"));
                result.put("direction", status.get("direction"));
                result.put("altitude", status.get("altitude"));
                result.put("lastTime", status.get("lastTime"));
                result.put("status", status.get("status"));
                result.put("alarmFlag", status.get("alarmFlag"));
            }
        } catch (Exception e) {
            log.warn("Get device realtime status failed: deviceId={}", deviceId, e);
        }
        return result;
    }

    private String getString(Map<String, Object> map, String key) {
        Object val = map.get(key);
        return val != null ? val.toString() : null;
    }

    private Integer getInteger(Map<String, Object> map, String key) {
        Object val = map.get(key);
        if (val == null) return null;
        if (val instanceof Number) return ((Number) val).intValue();
        try { return Integer.parseInt(val.toString()); } catch (Exception e) { return null; }
    }
}
