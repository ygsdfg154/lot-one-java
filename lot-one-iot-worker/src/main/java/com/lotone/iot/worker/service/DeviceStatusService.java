package com.lotone.iot.worker.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class DeviceStatusService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private MongoStorageService mongoStorageService;

    @Value("${iot.worker.device.offline-timeout-seconds:300}")
    private long offlineTimeoutSeconds;

    private static final String ONLINE_KEY_PREFIX = "device:online:";
    private static final String LAST_HEARTBEAT_KEY_PREFIX = "device:last_heartbeat:";

    /**
     * 更新设备在线状态
     */
    public void updateOnlineStatus(String deviceId) {
        try {
            // 1. Redis 标记在线
            redisTemplate.opsForValue().set(ONLINE_KEY_PREFIX + deviceId, "1", offlineTimeoutSeconds + 60, TimeUnit.SECONDS);
            redisTemplate.opsForValue().set(LAST_HEARTBEAT_KEY_PREFIX + deviceId, String.valueOf(System.currentTimeMillis()), offlineTimeoutSeconds + 60, TimeUnit.SECONDS);

            // 2. 更新 MySQL 设备状态（异步，不阻塞主流程）
            try {
                String sql = "UPDATE lot_device SET activation_status = 1, updated_at = ? WHERE device_id = ? AND (activation_status != 1 OR activation_status IS NULL)";
                int updated = jdbcTemplate.update(sql, LocalDateTime.now(), deviceId);
                if (updated > 0) {
                    log.info("Device status updated to online: deviceId={}", deviceId);
                }
            } catch (Exception e) {
                log.warn("Update MySQL device status failed: deviceId={}", deviceId, e);
            }
        } catch (Exception e) {
            log.error("Update online status failed: deviceId={}", deviceId, e);
        }
    }

    /**
     * 检查设备是否在线
     */
    public boolean isOnline(String deviceId) {
        try {
            String val = redisTemplate.opsForValue().get(ONLINE_KEY_PREFIX + deviceId);
            return "1".equals(val);
        } catch (Exception e) {
            log.error("Check device online failed: deviceId={}", deviceId, e);
            return false;
        }
    }

    /**
     * 标记设备离线
     */
    public void markOffline(String deviceId, String reason) {
        try {
            redisTemplate.delete(ONLINE_KEY_PREFIX + deviceId);

            // 更新 MySQL
            try {
                String sql = "UPDATE lot_device SET activation_status = 2, updated_at = ? WHERE device_id = ? AND activation_status = 1";
                int updated = jdbcTemplate.update(sql, LocalDateTime.now(), deviceId);
                if (updated > 0) {
                    log.info("Device marked offline: deviceId={}, reason={}", deviceId, reason);
                    mongoStorageService.saveOnlineLog(deviceId, false, reason);
                }
            } catch (Exception e) {
                log.warn("Update MySQL device offline failed: deviceId={}", deviceId, e);
            }
        } catch (Exception e) {
            log.error("Mark device offline failed: deviceId={}", deviceId, e);
        }
    }

    /**
     * 定时检测离线设备（每60秒执行一次）
     */
    @Scheduled(fixedDelay = 60000)
    public void checkOfflineDevices() {
        try {
            // 扫描所有在线设备的最后心跳时间
            Set<String> keys = redisTemplate.keys(LAST_HEARTBEAT_KEY_PREFIX + "*");
            if (keys == null || keys.isEmpty()) return;

            long now = System.currentTimeMillis();
            long timeoutMs = offlineTimeoutSeconds * 1000;

            for (String key : keys) {
                try {
                    String val = redisTemplate.opsForValue().get(key);
                    if (val == null) continue;
                    long lastHeartbeat = Long.parseLong(val);
                    if (now - lastHeartbeat > timeoutMs) {
                        String deviceId = key.replace(LAST_HEARTBEAT_KEY_PREFIX, "");
                        markOffline(deviceId, "heartbeat_timeout");
                    }
                } catch (Exception e) {
                    log.warn("Check device heartbeat failed: key={}", key, e);
                }
            }
        } catch (Exception e) {
            log.error("Check offline devices failed", e);
        }
    }
}
