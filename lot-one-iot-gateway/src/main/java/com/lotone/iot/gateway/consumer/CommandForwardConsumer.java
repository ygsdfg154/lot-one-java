package com.lotone.iot.gateway.consumer;

import com.alibaba.fastjson.JSON;
import com.lotone.iot.gateway.service.ClusterCommandRouter;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Map;

@Slf4j
@Component
public class CommandForwardConsumer {

    @Autowired
    private ClusterCommandRouter clusterCommandRouter;

    /**
     * 消费转发过来的指令（集群内跨网关节点指令路由）
     */
    @KafkaListener(topics = "device-command-forward", groupId = "iot-gateway-forward-group", concurrency = "1")
    public void consumeForwardedCommand(ConsumerRecord<String, String> record) {
        try {
            Map<String, Object> forwardMsg = JSON.parseObject(record.value(), Map.class);
            log.debug("Received forwarded command: targetGateway={}, deviceId={}",
                    forwardMsg.get("targetGateway"), forwardMsg.get("deviceId"));
            clusterCommandRouter.handleForwardedCommand(forwardMsg);
        } catch (Exception e) {
            log.error("Consume forwarded command failed: key={}", record.key(), e);
        }
    }
}
