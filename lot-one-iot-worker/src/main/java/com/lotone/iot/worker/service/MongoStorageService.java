package com.lotone.iot.worker.service;

import com.lotone.iot.worker.dto.AlarmEvent;
import com.lotone.iot.worker.dto.TelemetryData;
import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class MongoStorageService {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 保存/更新设备最新位置（upsert）
     * collection: device_status
     */
    public void saveDeviceStatus(TelemetryData data) {
        try {
            Query query = new Query(Criteria.where("deviceId").is(data.getDeviceId()));
            Update update = new Update()
                    .set("deviceId", data.getDeviceId())
                    .set("latitude", data.getLatitude())
                    .set("longitude", data.getLongitude())
                    .set("altitude", data.getAltitude())
                    .set("speed", data.getSpeed())
                    .set("direction", data.getDirection())
                    .set("status", data.getStatus())
                    .set("alarmFlag", data.getAlarmFlag())
                    .set("lastTime", data.getTime())
                    .set("lastReceiveTime", data.getReceiveTime())
                    .set("online", true)
                    .set("updateTime", LocalDateTime.now());
            UpdateResult result = mongoTemplate.upsert(query, update, "device_status");
            log.debug("Upsert device status: deviceId={}, matched={}, modified={}",
                    data.getDeviceId(), result.getMatchedCount(), result.getModifiedCount());
        } catch (Exception e) {
            log.error("Save device status failed: deviceId={}", data.getDeviceId(), e);
        }
    }

    /**
     * 保存报警事件
     * collection: alarm_event
     */
    public void saveAlarmEvent(AlarmEvent event) {
        try {
            if (event.getCreateTime() == null) {
                event.setCreateTime(LocalDateTime.now());
            }
            mongoTemplate.save(event, "alarm_event");
            log.info("Saved alarm event: deviceId={}, alarmCode={}, type={}",
                    event.getDeviceId(), event.getAlarmCode(), event.getAlarmType());
        } catch (Exception e) {
            log.error("Save alarm event failed: deviceId={}", event.getDeviceId(), e);
        }
    }

    /**
     * 保存设备上下线日志
     * collection: device_online_log
     */
    public void saveOnlineLog(String deviceId, boolean online, String reason) {
        try {
            Map<String, Object> onlineLog = new HashMap<>();
            onlineLog.put("deviceId", deviceId);
            onlineLog.put("online", online);
            onlineLog.put("reason", reason);
            onlineLog.put("timestamp", System.currentTimeMillis());
            onlineLog.put("time", LocalDateTime.now());
            mongoTemplate.save(onlineLog, "device_online_log");
            log.info("Device online log: deviceId={}, online={}, reason={}", deviceId, online, reason);
        } catch (Exception e) {
            log.error("Save online log failed: deviceId={}", deviceId, e);
        }
    }

    /**
     * 查询设备最新位置
     */
    public Map<String, Object> getDeviceStatus(String deviceId) {
        try {
            Query query = new Query(Criteria.where("deviceId").is(deviceId));
            return mongoTemplate.findOne(query, Map.class, "device_status");
        } catch (Exception e) {
            log.error("Get device status failed: deviceId={}", deviceId, e);
            return null;
        }
    }
}
