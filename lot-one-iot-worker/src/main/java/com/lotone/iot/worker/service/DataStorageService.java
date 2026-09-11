package com.lotone.iot.worker.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import java.util.Map;

@Slf4j
@Service
public class DataStorageService {

    private final MongoTemplate mongoTemplate;

    public DataStorageService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void saveDeviceStatus(String deviceId, Map<String, Object> status) {
        status.put("deviceId", deviceId);
        mongoTemplate.save(status, "device_status");
        log.debug("Saved device status: {}", deviceId);
    }

    public void saveAlarmEvent(String deviceId, Map<String, Object> alarm) {
        alarm.put("deviceId", deviceId);
        mongoTemplate.save(alarm, "alarm_event");
        log.info("Saved alarm event: device={}, type={}", deviceId, alarm.get("type"));
    }

    public void saveOnlineLog(String deviceId, boolean online) {
        Map<String, Object> log = Map.of(
                "deviceId", deviceId,
                "online", online,
                "timestamp", System.currentTimeMillis()
        );
        mongoTemplate.save(log, "device_online_log");
    }
}
