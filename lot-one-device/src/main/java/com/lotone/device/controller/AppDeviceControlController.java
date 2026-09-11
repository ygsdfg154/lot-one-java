package com.lotone.device.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.alibaba.fastjson.JSON;
import com.lotone.common.result.R;
import com.lotone.device.service.AppUserDeviceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/app/device/control")
public class AppDeviceControlController {

    @Autowired
    private AppUserDeviceService userDeviceService;

    @Autowired(required = false)
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * 查询设备实时位置
     */
    @PostMapping("/queryLocation")
    public R<Map<String, Object>> queryLocation(@RequestParam String deviceId) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }
        return sendCommand(deviceId, "QUERY_LOCATION", "查询实时位置", null);
    }

    /**
     * 下发文本指令（透传文本到设备）
     */
    @PostMapping("/sendText")
    public R<Map<String, Object>> sendText(
            @RequestParam String deviceId,
            @RequestParam String text) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }
        Map<String, Object> params = new HashMap<>();
        params.put("text", text);
        params.put("flag", 0); // 0=终端显示 1=终端语音播报
        return sendCommand(deviceId, "SEND_TEXT", "下发文本", params);
    }

    /**
     * 设置终端参数
     */
    @PostMapping("/setParams")
    public R<Map<String, Object>> setParams(
            @RequestParam String deviceId,
            @RequestBody Map<String, Object> params) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }
        return sendCommand(deviceId, "SET_PARAMS", "设置终端参数", params);
    }

    /**
     * 查询终端参数
     */
    @PostMapping("/queryParams")
    public R<Map<String, Object>> queryParams(@RequestParam String deviceId) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }
        return sendCommand(deviceId, "QUERY_PARAMS", "查询终端参数", null);
    }

    /**
     * 临时位置跟踪控制（指定上报间隔和持续时间）
     */
    @PostMapping("/trackControl")
    public R<Map<String, Object>> trackControl(
            @RequestParam String deviceId,
            @RequestParam(defaultValue = "10") int interval,
            @RequestParam(defaultValue = "600") int duration) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }
        Map<String, Object> params = new HashMap<>();
        params.put("interval", interval); // 上报间隔（秒）
        params.put("duration", duration); // 持续时间（秒）
        params.put("flag", 0); // 0=按时间间隔 1=按距离
        return sendCommand(deviceId, "TRACK_CONTROL", "临时位置跟踪", params);
    }

    /**
     * 车辆控制（远程熄火/解锁等）
     */
    @PostMapping("/vehicleControl")
    public R<Map<String, Object>> vehicleControl(
            @RequestParam String deviceId,
            @RequestParam int controlType) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }
        Map<String, Object> params = new HashMap<>();
        params.put("controlType", controlType);
        // controlType: 1=远程熄火 2=远程解锁 3=远程锁车 4=远程启动
        String[] names = {"", "远程熄火", "远程解锁", "远程锁车", "远程启动"};
        String cmdName = controlType < names.length ? names[controlType] : "车辆控制";
        return sendCommand(deviceId, "VEHICLE_CONTROL", cmdName, params);
    }

    /**
     * 设备休眠
     */
    @PostMapping("/sleep")
    public R<Map<String, Object>> sleep(@RequestParam String deviceId) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }
        Map<String, Object> params = new HashMap<>();
        params.put("command", 0); // 0=休眠
        return sendCommand(deviceId, "SLEEP_WAKE", "设备休眠", params);
    }

    /**
     * 设备唤醒
     */
    @PostMapping("/wake")
    public R<Map<String, Object>> wake(@RequestParam String deviceId) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }
        Map<String, Object> params = new HashMap<>();
        params.put("command", 1); // 1=唤醒
        return sendCommand(deviceId, "SLEEP_WAKE", "设备唤醒", params);
    }

    /**
     * 查询指令执行结果
     */
    @GetMapping("/commandResult")
    public R<Map<String, Object>> commandResult(@RequestParam String requestId) {
        try {
            Map<String, Object> result = jdbcTemplate.queryForMap(
                    "SELECT request_id, device_id, cmd_name, result, reply, send_time, updated_at " +
                            "FROM lot_device_cmd_log WHERE request_id = ?", requestId);
            return R.success(result);
        } catch (Exception e) {
            return R.fail("指令记录不存在");
        }
    }

    /**
     * 查询设备的指令历史
     */
    @GetMapping("/commandHistory")
    public R<Map<String, Object>> commandHistory(
            @RequestParam String deviceId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }

        try {
            long total = jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM lot_device_cmd_log WHERE device_id = ?", Long.class, deviceId);

            List<Map<String, Object>> list = jdbcTemplate.queryForList(
                    "SELECT request_id, device_id, cmd_name, result, reply, send_time, updated_at " +
                            "FROM lot_device_cmd_log WHERE device_id = ? ORDER BY send_time DESC LIMIT ?, ?",
                    deviceId, (page - 1) * pageSize, pageSize);

            Map<String, Object> result = new HashMap<>();
            result.put("list", list);
            result.put("total", total);
            result.put("page", page);
            result.put("pageSize", pageSize);
            return R.success(result);
        } catch (Exception e) {
            log.error("Query command history failed", e);
            return R.fail("查询失败: " + e.getMessage());
        }
    }

    /**
     * 发送指令到Kafka
     */
    private R<Map<String, Object>> sendCommand(String deviceId, String cmdCode, String cmdName, Map<String, Object> params) {
        if (kafkaTemplate == null) {
            return R.fail("KafkaTemplate not available");
        }

        String requestId = UUID.randomUUID().toString().replace("-", "");

        Map<String, Object> command = new LinkedHashMap<>();
        command.put("requestId", requestId);
        command.put("deviceId", deviceId);
        command.put("cmdCode", cmdCode);
        command.put("cmdName", cmdName);
        command.put("params", params);
        command.put("operator", "APP_USER_" + StpUtil.getLoginIdAsLong());
        command.put("sendTime", LocalDateTime.now().toString());

        try {
            kafkaTemplate.send("device-command", deviceId, JSON.toJSONString(command));

            // 记录指令日志
            jdbcTemplate.update(
                    "INSERT INTO lot_device_cmd_log (request_id, device_id, cmd_name, cmd_type, operator, send_time, created_at) " +
                            "VALUES (?, ?, ?, ?, ?, ?, ?)",
                    requestId, deviceId, cmdName, cmdCode, "APP_USER_" + StpUtil.getLoginIdAsLong(),
                    LocalDateTime.now(), LocalDateTime.now());

            Map<String, Object> result = new HashMap<>();
            result.put("requestId", requestId);
            result.put("deviceId", deviceId);
            result.put("cmdCode", cmdCode);
            result.put("cmdName", cmdName);
            result.put("sendTime", LocalDateTime.now().toString());
            result.put("message", "指令已下发，设备可能需要几秒钟响应");
            return R.success(result);
        } catch (Exception e) {
            log.error("Send command failed: deviceId={}, cmdCode={}", deviceId, cmdCode, e);
            return R.fail("指令下发失败: " + e.getMessage());
        }
    }
}
