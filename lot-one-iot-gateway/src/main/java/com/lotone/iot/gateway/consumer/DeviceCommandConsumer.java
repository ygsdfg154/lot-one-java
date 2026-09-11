package com.lotone.iot.gateway.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lotone.iot.gateway.dto.DeviceCommandDTO;
import com.lotone.iot.gateway.service.ClusterCommandRouter;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DeviceCommandConsumer {

    @Autowired
    private ClusterCommandRouter clusterCommandRouter;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "${iot.gateway.command.topic:device-command}", groupId = "iot-gateway-group")
    public void onCommand(ConsumerRecord<String, String> record, Acknowledgment ack) {
        try {
            String value = record.value();
            log.debug("Received device command: key={}, value={}", record.key(), value);

            DeviceCommandDTO cmd = objectMapper.readValue(value, DeviceCommandDTO.class);
            // 使用集群指令路由：自动判断设备在哪个网关节点
            clusterCommandRouter.routeCommand(cmd);

            ack.acknowledge();
        } catch (Exception e) {
            log.error("Process device command failed: key={}, value={}", record.key(), record.value(), e);
            // 处理失败也确认，避免阻塞队列；后续可加入死信队列
            ack.acknowledge();
        }
    }
}
