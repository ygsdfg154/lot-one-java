package com.lotone.iot.gateway.service;

import com.alibaba.fastjson.JSON;
import com.lotone.iot.gateway.dto.DeviceCommandDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class ClusterCommandRouter {

    @Autowired
    private RedisDeviceSessionService redisSessionService;

    @Autowired
    private CommandDispatcher commandDispatcher;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Value("${iot.gateway.tcp.port:8083}")
    private int gatewayPort;

    @Value("${iot.gateway.command.forward-topic:device-command-forward}")
    private String forwardTopic;

    private String currentGatewayId;

    public ClusterCommandRouter() {
        try {
            currentGatewayId = InetAddress.getLocalHost().getHostName() + ":" + gatewayPort;
        } catch (Exception e) {
            currentGatewayId = "unknown:" + gatewayPort;
        }
    }

    /**
     * 路由指令到设备所在网关节点（DTO版本）
     */
    public boolean routeCommand(DeviceCommandDTO cmd) {
        String paramsJson = cmd.getParams() != null ? JSON.toJSONString(cmd.getParams()) : null;
        return routeCommand(cmd.getDeviceId(), cmd.getCmdName(),
                cmd.getCmdCode(), cmd.getRequestId(), paramsJson);
    }

    /**
     * 路由指令到设备所在网关节点
     * @return true=已在当前节点下发 false=已转发到其他节点
     */
    public boolean routeCommand(String deviceId, String cmdName, String cmdType, String requestId, String params) {
        // 查询设备所在网关节点
        String deviceGateway = redisSessionService.getDeviceGateway(deviceId);

        if (deviceGateway == null) {
            // 设备不在线，尝试在当前节点查找（可能Redis未同步）
            log.warn("Device not found in Redis, try local: deviceId={}", deviceId);
            com.lotone.iot.gateway.dto.DeviceCommandDTO cmdDto = buildCommandDTO(deviceId, cmdName, cmdType, requestId, params);
            commandDispatcher.dispatch(cmdDto);
            return true;
        }

        if (currentGatewayId.equals(deviceGateway)) {
            // 设备在当前节点，直接下发
            log.debug("Device on current gateway, dispatch directly: deviceId={}, gateway={}", deviceId, currentGatewayId);
            com.lotone.iot.gateway.dto.DeviceCommandDTO cmdDto = buildCommandDTO(deviceId, cmdName, cmdType, requestId, params);
            commandDispatcher.dispatch(cmdDto);
            return true;
        } else {
            // 设备在其他节点，通过 Kafka 转发
            log.info("Device on other gateway, forward command: deviceId={}, targetGateway={}, currentGateway={}",
                    deviceId, deviceGateway, currentGatewayId);
            return forwardCommand(deviceGateway, deviceId, cmdName, cmdType, requestId, params);
        }
    }

    /**
     * 转发指令到目标网关节点
     */
    private boolean forwardCommand(String targetGateway, String deviceId, String cmdName,
                                   String cmdType, String requestId, String params) {
        try {
            Map<String, Object> forwardMsg = new HashMap<>();
            forwardMsg.put("targetGateway", targetGateway);
            forwardMsg.put("sourceGateway", currentGatewayId);
            forwardMsg.put("deviceId", deviceId);
            forwardMsg.put("cmdName", cmdName);
            forwardMsg.put("cmdType", cmdType);
            forwardMsg.put("requestId", requestId);
            forwardMsg.put("params", params);
            forwardMsg.put("forwardTime", System.currentTimeMillis());

            kafkaTemplate.send(forwardTopic, targetGateway, JSON.toJSONString(forwardMsg));
            log.info("Command forwarded: targetGateway={}, deviceId={}, requestId={}", targetGateway, deviceId, requestId);
            return true;
        } catch (Exception e) {
            log.error("Forward command failed: targetGateway={}, deviceId={}", targetGateway, deviceId, e);
            return false;
        }
    }

    /**
     * 处理转发过来的指令（由其他网关节点转发）
     */
    public void handleForwardedCommand(Map<String, Object> forwardMsg) {
        try {
            String targetGateway = (String) forwardMsg.get("targetGateway");
            if (!currentGatewayId.equals(targetGateway)) {
                // 不是发给当前节点的，忽略
                return;
            }

            String deviceId = (String) forwardMsg.get("deviceId");
            String cmdName = (String) forwardMsg.get("cmdName");
            String cmdType = (String) forwardMsg.get("cmdType");
            String requestId = (String) forwardMsg.get("requestId");
            String params = (String) forwardMsg.get("params");

            log.info("Handle forwarded command: deviceId={}, cmdName={}, requestId={}, sourceGateway={}",
                    deviceId, cmdName, requestId, forwardMsg.get("sourceGateway"));

            com.lotone.iot.gateway.dto.DeviceCommandDTO cmdDto = buildCommandDTO(deviceId, cmdName, cmdType, requestId, params);
            commandDispatcher.dispatch(cmdDto);
        } catch (Exception e) {
            log.error("Handle forwarded command failed", e);
        }
    }

    public String getCurrentGatewayId() {
        return currentGatewayId;
    }

    /**
     * 构建指令 DTO（将 String params 转为 Map）
     */
    private com.lotone.iot.gateway.dto.DeviceCommandDTO buildCommandDTO(
            String deviceId, String cmdName, String cmdType, String requestId, String params) {
        com.lotone.iot.gateway.dto.DeviceCommandDTO cmd = new com.lotone.iot.gateway.dto.DeviceCommandDTO();
        cmd.setDeviceId(deviceId);
        cmd.setCmdName(cmdName);
        cmd.setCmdCode(cmdType);
        cmd.setRequestId(requestId);
        // 将 String params 转为 Map
        if (params != null && !params.isEmpty()) {
            try {
                Map<String, Object> paramsMap = JSON.parseObject(params, Map.class);
                cmd.setParams(paramsMap);
            } catch (Exception e) {
                log.warn("Parse params failed: {}", params, e);
            }
        }
        return cmd;
    }
}
