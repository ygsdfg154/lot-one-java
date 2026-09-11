package com.lotone.iot.gateway.service;

import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class RedisDeviceSessionService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Value("${iot.gateway.tcp.port:8083}")
    private int gatewayPort;

    @Value("${spring.application.name:lot-one-iot-gateway}")
    private String gatewayName;

    private static final String DEVICE_ONLINE_KEY = "device:online:";
    private static final String GATEWAY_DEVICES_KEY = "gateway:devices:";
    private static final long ONLINE_TIMEOUT_SECONDS = 300; // 5分钟超时

    private String gatewayId;

    public RedisDeviceSessionService() {
        try {
            gatewayId = InetAddress.getLocalHost().getHostName() + ":" + gatewayPort;
        } catch (Exception e) {
            gatewayId = "unknown:" + gatewayPort;
        }
    }

    /**
     * 设备上线，注册到 Redis
     */
    public void deviceOnline(String phone) {
        try {
            Map<String, Object> sessionInfo = new HashMap<>();
            sessionInfo.put("phone", phone);
            sessionInfo.put("gatewayId", gatewayId);
            sessionInfo.put("gatewayName", gatewayName);
            sessionInfo.put("connectTime", LocalDateTime.now().toString());
            sessionInfo.put("lastHeartbeat", LocalDateTime.now().toString());
            sessionInfo.put("lastMessageTime", LocalDateTime.now().toString());
            sessionInfo.put("messageCount", 0);
            sessionInfo.put("online", true);

            String key = DEVICE_ONLINE_KEY + phone;
            redisTemplate.opsForValue().set(key, JSON.toJSONString(sessionInfo), ONLINE_TIMEOUT_SECONDS, TimeUnit.SECONDS);

            // 记录网关节点的设备列表
            redisTemplate.opsForSet().add(GATEWAY_DEVICES_KEY + gatewayId, phone);
            redisTemplate.expire(GATEWAY_DEVICES_KEY + gatewayId, ONLINE_TIMEOUT_SECONDS * 2, TimeUnit.SECONDS);

            log.debug("Device online registered in Redis: phone={}, gateway={}", phone, gatewayId);
        } catch (Exception e) {
            log.warn("Register device online in Redis failed: phone={}", phone, e);
        }
    }

    /**
     * 设备下线，从 Redis 移除
     */
    public void deviceOffline(String phone) {
        try {
            String key = DEVICE_ONLINE_KEY + phone;
            redisTemplate.delete(key);
            redisTemplate.opsForSet().remove(GATEWAY_DEVICES_KEY + gatewayId, phone);
            log.debug("Device offline removed from Redis: phone={}", phone);
        } catch (Exception e) {
            log.warn("Remove device offline from Redis failed: phone={}", phone, e);
        }
    }

    /**
     * 更新设备心跳
     */
    public void updateHeartbeat(String phone) {
        try {
            String key = DEVICE_ONLINE_KEY + phone;
            String json = redisTemplate.opsForValue().get(key);
            if (json != null) {
                Map<String, Object> sessionInfo = JSON.parseObject(json, Map.class);
                sessionInfo.put("lastHeartbeat", LocalDateTime.now().toString());
                redisTemplate.opsForValue().set(key, JSON.toJSONString(sessionInfo), ONLINE_TIMEOUT_SECONDS, TimeUnit.SECONDS);
            }
        } catch (Exception e) {
            log.debug("Update heartbeat in Redis failed: phone={}", phone, e);
        }
    }

    /**
     * 更新设备最后消息时间和消息计数
     */
    public void updateMessage(String phone) {
        try {
            String key = DEVICE_ONLINE_KEY + phone;
            String json = redisTemplate.opsForValue().get(key);
            if (json != null) {
                Map<String, Object> sessionInfo = JSON.parseObject(json, Map.class);
                sessionInfo.put("lastMessageTime", LocalDateTime.now().toString());
                int count = sessionInfo.get("messageCount") != null ?
                        ((Number) sessionInfo.get("messageCount")).intValue() + 1 : 1;
                sessionInfo.put("messageCount", count);
                redisTemplate.opsForValue().set(key, JSON.toJSONString(sessionInfo), ONLINE_TIMEOUT_SECONDS, TimeUnit.SECONDS);
            }
        } catch (Exception e) {
            log.debug("Update message in Redis failed: phone={}", phone, e);
        }
    }

    /**
     * 查询设备是否在线（跨网关节点）
     */
    public boolean isDeviceOnline(String phone) {
        try {
            String key = DEVICE_ONLINE_KEY + phone;
            return Boolean.TRUE.equals(redisTemplate.hasKey(key));
        } catch (Exception e) {
            log.warn("Check device online failed: phone={}", phone, e);
            return false;
        }
    }

    /**
     * 查询设备所在网关节点
     */
    public String getDeviceGateway(String phone) {
        try {
            String key = DEVICE_ONLINE_KEY + phone;
            String json = redisTemplate.opsForValue().get(key);
            if (json != null) {
                Map<String, Object> sessionInfo = JSON.parseObject(json, Map.class);
                return (String) sessionInfo.get("gatewayId");
            }
        } catch (Exception e) {
            log.warn("Get device gateway failed: phone={}", phone, e);
        }
        return null;
    }

    /**
     * 获取当前网关节点的在线设备数
     */
    public long getGatewayDeviceCount() {
        try {
            Long count = redisTemplate.opsForSet().size(GATEWAY_DEVICES_KEY + gatewayId);
            return count != null ? count : 0;
        } catch (Exception e) {
            return 0;
        }
    }

    /**
     * 获取集群总在线设备数（统计所有网关节点）
     */
    public long getClusterOnlineCount() {
        try {
            Set keys = redisTemplate.keys(DEVICE_ONLINE_KEY + "*");
            return keys != null ? keys.size() : 0;
        } catch (Exception e) {
            log.warn("Get cluster online count failed", e);
            return 0;
        }
    }

    public String getGatewayId() {
        return gatewayId;
    }
}
