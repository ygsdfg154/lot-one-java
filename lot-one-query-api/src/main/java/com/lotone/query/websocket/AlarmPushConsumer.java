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
public class AlarmPushConsumer {

    @Autowired
    private AlarmPushHandler alarmPushHandler;

    /**
     * 消费报警事件，推送到 WebSocket 客户端
     */
    @KafkaListener(topics = "alarm-event", groupId = "query-api-alarm-ws-group", concurrency = "1")
    public void consumeAlarm(ConsumerRecord<String, String> record) {
        try {
            Map<String, Object> alarm = JSON.parseObject(record.value(), Map.class);
            log.debug("Push alarm to websocket: deviceId={}, alarmCode={}",
                    alarm.get("deviceId"), alarm.get("alarmCode"));
            // 推送到所有连接
            alarmPushHandler.pushAlarm(alarm);
        } catch (Exception e) {
            log.warn("Push alarm to websocket failed: key={}", record.key(), e);
        }
    }
}
