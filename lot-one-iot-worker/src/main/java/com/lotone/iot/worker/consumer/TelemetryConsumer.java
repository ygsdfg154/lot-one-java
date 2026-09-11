package com.lotone.iot.worker.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lotone.iot.worker.dto.AlarmEvent;
import com.lotone.iot.worker.dto.TelemetryData;
import com.lotone.iot.worker.service.AlarmDetectionService;
import com.lotone.iot.worker.service.DeviceStatusService;
import com.lotone.iot.worker.service.MongoStorageService;
import com.lotone.iot.worker.service.TdengineStorageService;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Slf4j
@Component
public class TelemetryConsumer {

    @Autowired
    private MongoStorageService mongoStorageService;

    @Autowired
    private TdengineStorageService tdengineStorageService;

    @Autowired
    private AlarmDetectionService alarmDetectionService;

    @Autowired
    private DeviceStatusService deviceStatusService;

    @Autowired
    private com.lotone.iot.worker.service.CommandResultService commandResultService;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final AtomicLong totalCount = new AtomicLong(0);
    private final AtomicLong errorCount = new AtomicLong(0);

    /**
     * 消费设备位置遥测数据
     * 处理链路：解析JSON → MongoDB更新最新位置 → TDengine写时序 → 报警判断 → 更新在线状态
     */
    @KafkaListener(topics = "device-telemetry", groupId = "iot-worker-group", concurrency = "2")
    public void consumeTelemetry(ConsumerRecord<String, String> record, Acknowledgment ack) {
        try {
            String value = record.value();
            log.debug("Received telemetry: key={}, value={}", record.key(), value);

            // 1. 解析 JSON
            TelemetryData data = objectMapper.readValue(value, TelemetryData.class);
            if (data.getDeviceId() == null || data.getDeviceId().isEmpty()) {
                log.warn("Telemetry data missing deviceId: {}", value);
                ack.acknowledge();
                return;
            }

            // 2. MongoDB 更新设备最新位置（upsert）
            mongoStorageService.saveDeviceStatus(data);

            // 3. TDengine 写入时序数据（批量缓存）
            tdengineStorageService.saveTelemetry(data);

            // 4. 报警判断（超速/SOS/低电）
            List<AlarmEvent> alarms = alarmDetectionService.detect(data);
            if (!alarms.isEmpty()) {
                log.info("Alarm detected: deviceId={}, count={}", data.getDeviceId(), alarms.size());
            }

            // 5. 更新设备在线状态
            deviceStatusService.updateOnlineStatus(data.getDeviceId());

            long count = totalCount.incrementAndGet();
            if (count % 100 == 0) {
                log.info("Telemetry processed: total={}, errors={}, currentDevice={}",
                        count, errorCount.get(), data.getDeviceId());
            }

            ack.acknowledge();
        } catch (Exception e) {
            errorCount.incrementAndGet();
            log.error("Process telemetry failed: key={}, value={}", record.key(), record.value(), e);
            // 处理失败也确认，避免阻塞队列；可加入死信队列后续处理
            ack.acknowledge();
        }
    }

    /**
     * 消费设备事件（上下线、注册等）
     */
    @KafkaListener(topics = "device-event", groupId = "iot-worker-group")
    public void consumeEvent(ConsumerRecord<String, String> record, Acknowledgment ack) {
        try {
            log.info("Received device event: key={}, value={}", record.key(), record.value());
            // 解析事件类型，处理上下线等
            try {
                java.util.Map<String, Object> event = objectMapper.readValue(record.value(), java.util.Map.class);
                String deviceId = (String) event.get("deviceId");
                String eventType = (String) event.get("eventType");
                if (deviceId != null && eventType != null) {
                    if ("ONLINE".equals(eventType)) {
                        deviceStatusService.updateOnlineStatus(deviceId);
                        mongoStorageService.saveOnlineLog(deviceId, true, eventType);
                    } else if ("OFFLINE".equals(eventType)) {
                        deviceStatusService.markOffline(deviceId, eventType);
                    }
                }
            } catch (Exception e) {
                log.warn("Parse device event failed: {}", record.value(), e);
            }
            ack.acknowledge();
        } catch (Exception e) {
            log.error("Process device event failed: key={}", record.key(), e);
            ack.acknowledge();
        }
    }

    /**
     * 消费指令下发结果，更新 lot_device_cmd_log
     */
    @KafkaListener(topics = "device-command-result", groupId = "iot-worker-group")
    public void consumeCommandResult(ConsumerRecord<String, String> record, Acknowledgment ack) {
        try {
            log.info("Received command result: key={}, value={}", record.key(), record.value());
            commandResultService.processResult(record.value());
            ack.acknowledge();
        } catch (Exception e) {
            log.error("Process command result failed: key={}", record.key(), e);
            ack.acknowledge();
        }
    }
}
