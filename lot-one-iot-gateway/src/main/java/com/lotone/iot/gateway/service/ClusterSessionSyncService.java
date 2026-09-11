package com.lotone.iot.gateway.service;

import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.net.InetAddress;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class ClusterSessionSyncService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired(required = false)
    private RedisMessageListenerContainer redisMessageListenerContainer;

    @Value("${iot.gateway.tcp.port:8083}")
    private int gatewayPort;

    private static final String CHANNEL = "iot-gateway-session-sync";

    private String gatewayId;

    /** 集群设备会话缓存（deviceId -> gatewayId） */
    private final ConcurrentHashMap<String, String> clusterDeviceSessions = new ConcurrentHashMap<>();

    /** 集群网关节点信息（gatewayId -> 节点信息） */
    private final ConcurrentHashMap<String, Map<String, Object>> clusterNodes = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        try {
            gatewayId = InetAddress.getLocalHost().getHostName() + ":" + gatewayPort;
        } catch (Exception e) {
            gatewayId = "unknown:" + gatewayPort;
        }

        // 订阅集群会话同步频道
        if (redisMessageListenerContainer != null) {
            redisMessageListenerContainer.addMessageListener(new MessageListener() {
                @Override
                public void onMessage(Message message, byte[] pattern) {
                    try {
                        String body = new String(message.getBody());
                        Map<String, Object> event = JSON.parseObject(body, Map.class);
                        handleSessionEvent(event);
                    } catch (Exception e) {
                        log.error("Handle session sync event failed", e);
                    }
                }
            }, new ChannelTopic(CHANNEL));
            log.info("Cluster session sync subscribed: channel={}, gatewayId={}", CHANNEL, gatewayId);
        } else {
            log.warn("RedisMessageListenerContainer not available, cluster session sync disabled");
        }

        // 发布网关节点上线事件
        publishNodeJoin();
    }

    /**
     * 发布设备上线事件
     */
    public void publishDeviceOnline(String deviceId, String phone) {
        try {
            Map<String, Object> event = Map.of(
                    "type", "DEVICE_ONLINE",
                    "gatewayId", gatewayId,
                    "deviceId", deviceId,
                    "phone", phone,
                    "timestamp", System.currentTimeMillis()
            );
            redisTemplate.convertAndSend(CHANNEL, JSON.toJSONString(event));
            clusterDeviceSessions.put(deviceId, gatewayId);
            log.debug("Publish device online: deviceId={}, gatewayId={}", deviceId, gatewayId);
        } catch (Exception e) {
            log.warn("Publish device online failed: deviceId={}", deviceId, e);
        }
    }

    /**
     * 发布设备下线事件
     */
    public void publishDeviceOffline(String deviceId, String phone) {
        try {
            Map<String, Object> event = Map.of(
                    "type", "DEVICE_OFFLINE",
                    "gatewayId", gatewayId,
                    "deviceId", deviceId,
                    "phone", phone,
                    "timestamp", System.currentTimeMillis()
            );
            redisTemplate.convertAndSend(CHANNEL, JSON.toJSONString(event));
            clusterDeviceSessions.remove(deviceId);
            log.debug("Publish device offline: deviceId={}, gatewayId={}", deviceId, gatewayId);
        } catch (Exception e) {
            log.warn("Publish device offline failed: deviceId={}", deviceId, e);
        }
    }

    /**
     * 发布网关节点上线事件
     */
    private void publishNodeJoin() {
        try {
            Map<String, Object> event = Map.of(
                    "type", "NODE_JOIN",
                    "gatewayId", gatewayId,
                    "timestamp", System.currentTimeMillis()
            );
            redisTemplate.convertAndSend(CHANNEL, JSON.toJSONString(event));
            log.info("Publish node join: gatewayId={}", gatewayId);
        } catch (Exception e) {
            log.warn("Publish node join failed", e);
        }
    }

    /**
     * 发布网关节点下线事件
     */
    public void publishNodeLeave() {
        try {
            Map<String, Object> event = Map.of(
                    "type", "NODE_LEAVE",
                    "gatewayId", gatewayId,
                    "timestamp", System.currentTimeMillis()
            );
            redisTemplate.convertAndSend(CHANNEL, JSON.toJSONString(event));
            log.info("Publish node leave: gatewayId={}", gatewayId);
        } catch (Exception e) {
            log.warn("Publish node leave failed", e);
        }
    }

    /**
     * 处理集群会话事件
     */
    private void handleSessionEvent(Map<String, Object> event) {
        String type = (String) event.get("type");
        String sourceGateway = (String) event.get("gatewayId");

        // 忽略自己发布的事件
        if (gatewayId.equals(sourceGateway)) {
            return;
        }

        switch (type) {
            case "DEVICE_ONLINE": {
                String deviceId = (String) event.get("deviceId");
                clusterDeviceSessions.put(deviceId, sourceGateway);
                log.debug("Cluster device online sync: deviceId={}, gatewayId={}", deviceId, sourceGateway);
                break;
            }
            case "DEVICE_OFFLINE": {
                String deviceId = (String) event.get("deviceId");
                clusterDeviceSessions.remove(deviceId);
                log.debug("Cluster device offline sync: deviceId={}", deviceId);
                break;
            }
            case "NODE_JOIN": {
                clusterNodes.put(sourceGateway, Map.of(
                        "gatewayId", sourceGateway,
                        "joinTime", event.get("timestamp"),
                        "status", "ONLINE"
                ));
                log.info("Cluster node join: gatewayId={}", sourceGateway);
                break;
            }
            case "NODE_LEAVE": {
                clusterNodes.remove(sourceGateway);
                // 移除该网关节点上的所有设备会话
                clusterDeviceSessions.entrySet().removeIf(entry -> sourceGateway.equals(entry.getValue()));
                log.info("Cluster node leave: gatewayId={}", sourceGateway);
                break;
            }
            default:
                log.warn("Unknown session event type: {}", type);
        }
    }

    /**
     * 查询设备所在网关节点（本地缓存）
     */
    public String getDeviceGatewayLocal(String deviceId) {
        return clusterDeviceSessions.get(deviceId);
    }

    /**
     * 获取集群在线网关节点列表
     */
    public Map<String, Map<String, Object>> getClusterNodes() {
        return new ConcurrentHashMap<>(clusterNodes);
    }

    /**
     * 获取集群设备会话数量
     */
    public int getClusterDeviceCount() {
        return clusterDeviceSessions.size();
    }

    public String getGatewayId() {
        return gatewayId;
    }
}
