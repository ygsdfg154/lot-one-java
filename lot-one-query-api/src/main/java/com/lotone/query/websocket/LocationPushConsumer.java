package com.lotone.query.websocket;

import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Map;

@Slf4j
@Component
public class LocationPushConsumer {

    @Autowired
    private RealtimeLocationHandler realtimeLocationHandler;

    /**
     * 消费设备位置数据，推送到 WebSocket 订阅者
     */
    @KafkaListener(topics = "device-telemetry", groupId = "query-api-ws-group", concurrency = "1")
    public void consumeLocation(ConsumerRecord<String, String> record) {
        try {
            Map<String, Object> data = JSON.parseObject(record.value(), Map.class);
            String deviceId = (String) data.get("deviceId");
            if (deviceId == null || deviceId.isEmpty()) {
                return;
            }
            // 推送到订阅该设备的 WebSocket 客户端
            realtimeLocationHandler.pushLocation(deviceId, data);
        } catch (Exception e) {
            log.warn("Push location to websocket failed: key={}", record.key(), e);
        }
    }
}
