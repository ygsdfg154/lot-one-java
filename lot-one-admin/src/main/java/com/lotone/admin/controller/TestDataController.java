package com.lotone.admin.controller;

import com.alibaba.fastjson.JSON;
import com.lotone.common.result.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/testData")
public class TestDataController {

    @Autowired(required = false)
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private MongoTemplate mongoTemplate;

    private static final Random RANDOM = new Random();

    /**
     * 生成模拟设备位置数据并发送到Kafka
     */
    @PostMapping("/generateLocation")
    public R<Map<String, Object>> generateLocation(
            @RequestParam(defaultValue = "10") int deviceCount,
            @RequestParam(defaultValue = "100") int pointsPerDevice,
            @RequestParam(defaultValue = "30.5") double baseLat,
            @RequestParam(defaultValue = "114.3") double baseLng) {

        if (kafkaTemplate == null) {
            return R.fail("KafkaTemplate not available");
        }

        int totalSent = 0;
        List<String> deviceIds = new ArrayList<>();

        for (int d = 0; d < deviceCount; d++) {
            String deviceId = "TEST" + String.format("%06d", d + 1);
            deviceIds.add(deviceId);

            double lat = baseLat + (RANDOM.nextDouble() - 0.5) * 0.1;
            double lng = baseLng + (RANDOM.nextDouble() - 0.5) * 0.1;
            double speed = RANDOM.nextDouble() * 80;
            double direction = RANDOM.nextDouble() * 360;

            for (int p = 0; p < pointsPerDevice; p++) {
                // 模拟移动
                lat += (RANDOM.nextDouble() - 0.5) * 0.001;
                lng += (RANDOM.nextDouble() - 0.5) * 0.001;
                speed = Math.max(0, speed + (RANDOM.nextDouble() - 0.5) * 10);
                direction = (direction + (RANDOM.nextDouble() - 0.5) * 30 + 360) % 360;

                Map<String, Object> telemetry = new LinkedHashMap<>();
                telemetry.put("deviceId", deviceId);
                telemetry.put("latitude", Math.round(lat * 1000000.0) / 1000000.0);
                telemetry.put("longitude", Math.round(lng * 1000000.0) / 1000000.0);
                telemetry.put("altitude", RANDOM.nextInt(100));
                telemetry.put("speed", Math.round(speed * 10.0) / 10.0);
                telemetry.put("direction", (int) direction);
                telemetry.put("alarmFlag", 0L);
                telemetry.put("status", 1L);
                telemetry.put("timestamp", LocalDateTime.now().minusSeconds(pointsPerDevice - p).toString());
                telemetry.put("deviceTime", LocalDateTime.now().minusSeconds(pointsPerDevice - p).toString());

                kafkaTemplate.send("device-telemetry", deviceId, JSON.toJSONString(telemetry));
                totalSent++;
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("deviceCount", deviceCount);
        result.put("pointsPerDevice", pointsPerDevice);
        result.put("totalSent", totalSent);
        result.put("deviceIds", deviceIds);
        result.put("topic", "device-telemetry");
        return R.success(result);
    }

    /**
     * 生成模拟报警数据
     */
    @PostMapping("/generateAlarm")
    public R<Map<String, Object>> generateAlarm(
            @RequestParam(defaultValue = "5") int alarmCount,
            @RequestParam(defaultValue = "TEST000001") String deviceId) {

        if (kafkaTemplate == null) {
            return R.fail("KafkaTemplate not available");
        }

        String[] alarmTypes = {"OVER_SPEED", "SOS", "LOW_BATTERY", "ENTER_FENCE", "EXIT_FENCE", "FATIGUE_DRIVING"};
        String[] alarmNames = {"超速报警", "SOS紧急报警", "低电报警", "进入围栏", "离开围栏", "疲劳驾驶"};

        List<Map<String, Object>> alarms = new ArrayList<>();
        for (int i = 0; i < alarmCount; i++) {
            int typeIndex = RANDOM.nextInt(alarmTypes.length);
            Map<String, Object> alarm = new LinkedHashMap<>();
            alarm.put("alarmId", UUID.randomUUID().toString());
            alarm.put("deviceId", deviceId);
            alarm.put("alarmType", alarmTypes[typeIndex]);
            alarm.put("alarmName", alarmNames[typeIndex]);
            alarm.put("alarmLevel", RANDOM.nextInt(3) + 1);
            alarm.put("latitude", 30.5 + (RANDOM.nextDouble() - 0.5) * 0.1);
            alarm.put("longitude", 114.3 + (RANDOM.nextDouble() - 0.5) * 0.1);
            alarm.put("speed", RANDOM.nextInt(120));
            alarm.put("timestamp", LocalDateTime.now().toString());
            alarm.put("description", "模拟" + alarmNames[typeIndex]);

            kafkaTemplate.send("alarm-event", deviceId, JSON.toJSONString(alarm));
            alarms.add(alarm);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("alarmCount", alarmCount);
        result.put("deviceId", deviceId);
        result.put("alarms", alarms);
        result.put("topic", "alarm-event");
        return R.success(result);
    }

    /**
     * 生成模拟设备在线状态到MongoDB
     */
    @PostMapping("/generateDeviceStatus")
    public R<Map<String, Object>> generateDeviceStatus(
            @RequestParam(defaultValue = "20") int deviceCount) {

        List<Map<String, Object>> devices = new ArrayList<>();
        for (int i = 0; i < deviceCount; i++) {
            String deviceId = "TEST" + String.format("%06d", i + 1);
            Map<String, Object> status = new LinkedHashMap<>();
            status.put("deviceId", deviceId);
            status.put("latitude", 30.5 + (RANDOM.nextDouble() - 0.5) * 0.2);
            status.put("longitude", 114.3 + (RANDOM.nextDouble() - 0.5) * 0.2);
            status.put("altitude", RANDOM.nextInt(200));
            status.put("speed", RANDOM.nextInt(100));
            status.put("direction", RANDOM.nextInt(360));
            status.put("online", RANDOM.nextBoolean());
            status.put("lastTime", LocalDateTime.now().minusMinutes(RANDOM.nextInt(60)).toString());
            status.put("lastHeartbeat", LocalDateTime.now().minusSeconds(RANDOM.nextInt(300)).toString());
            status.put("messageCount", RANDOM.nextInt(10000));
            status.put("updatedAt", System.currentTimeMillis());

            mongoTemplate.save(status, "device_status");
            devices.add(status);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("deviceCount", deviceCount);
        result.put("collection", "device_status");
        result.put("devices", devices);
        return R.success(result);
    }

    /**
     * 清理测试数据
     */
    @PostMapping("/cleanup")
    public R<Map<String, Object>> cleanup(
            @RequestParam(defaultValue = "TEST%") String deviceIdPattern) {

        // 清理 MongoDB
        long deletedStatus = mongoTemplate.remove(
                new org.springframework.data.mongodb.core.query.Query(
                        org.springframework.data.mongodb.core.query.Criteria.where("deviceId").regex("^TEST")),
                Map.class, "device_status").getDeletedCount();

        long deletedTelemetry = mongoTemplate.remove(
                new org.springframework.data.mongodb.core.query.Query(
                        org.springframework.data.mongodb.core.query.Criteria.where("deviceId").regex("^TEST")),
                Map.class, "device_telemetry").getDeletedCount();

        Map<String, Object> result = new HashMap<>();
        result.put("deletedStatus", deletedStatus);
        result.put("deletedTelemetry", deletedTelemetry);
        result.put("pattern", deviceIdPattern);
        return R.success(result);
    }

    /**
     * 生成完整测试场景（位置+报警+设备状态）
     */
    @PostMapping("/generateFullScenario")
    public R<Map<String, Object>> generateFullScenario(
            @RequestParam(defaultValue = "5") int deviceCount,
            @RequestParam(defaultValue = "50") int pointsPerDevice) {

        Map<String, Object> result = new HashMap<>();

        // 1. 生成设备状态
        R<Map<String, Object>> statusResult = generateDeviceStatus(deviceCount);
        result.put("deviceStatus", statusResult.getData());

        // 2. 生成位置数据
        R<Map<String, Object>> locationResult = generateLocation(deviceCount, pointsPerDevice, 30.5, 114.3);
        result.put("locationData", locationResult.getData());

        // 3. 为每个设备生成报警
        List<Map<String, Object>> allAlarms = new ArrayList<>();
        for (int i = 0; i < deviceCount; i++) {
            String deviceId = "TEST" + String.format("%06d", i + 1);
            R<Map<String, Object>> alarmResult = generateAlarm(2, deviceId);
            if (alarmResult.getData() != null) {
                allAlarms.addAll((List<Map<String, Object>>) alarmResult.getData().get("alarms"));
            }
        }
        result.put("alarms", allAlarms);
        result.put("totalAlarms", allAlarms.size());

        return R.success(result);
    }
}
