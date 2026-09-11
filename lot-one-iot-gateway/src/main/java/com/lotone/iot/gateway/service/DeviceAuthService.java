package com.lotone.iot.gateway.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class DeviceAuthService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * 验证设备是否存在且有效
     * @param deviceId 设备ID（手机号/IMEI）
     * @return true=设备有效
     */
    public boolean validateDevice(String deviceId) {
        try {
            String sql = "SELECT id, device_id, activation_status, disable_status FROM lot_device WHERE device_id = ? LIMIT 1";
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, deviceId);
            if (rows.isEmpty()) {
                log.warn("Device not found in database: deviceId={}", deviceId);
                // 设备不存在时，默认允许注册（兼容自动注册场景）
                return true;
            }
            Map<String, Object> row = rows.get(0);
            // 检查是否被禁用
            Object disableStatus = row.get("disable_status");
            if (disableStatus != null && ((Number) disableStatus).intValue() == 1) {
                log.warn("Device is disabled: deviceId={}", deviceId);
                return false;
            }
            return true;
        } catch (Exception e) {
            log.error("Validate device failed: deviceId={}", deviceId, e);
            // 数据库异常时，默认允许（避免影响设备连接）
            return true;
        }
    }

    /**
     * 验证设备鉴权码
     * @param deviceId 设备ID
     * @param authCode 鉴权码
     * @return true=鉴权通过
     */
    public boolean validateAuthCode(String deviceId, String authCode) {
        try {
            // 从数据库查询设备鉴权码
            String sql = "SELECT auth_code FROM lot_device WHERE device_id = ? LIMIT 1";
            String dbAuthCode = null;
            try {
                dbAuthCode = jdbcTemplate.queryForObject(sql, String.class, deviceId);
            } catch (Exception e) {
                log.debug("Query device auth_code failed: deviceId={}", deviceId);
            }

            // 如果数据库没有配置鉴权码，默认通过
            if (dbAuthCode == null || dbAuthCode.isEmpty()) {
                log.info("Device has no auth_code configured, allow auth: deviceId={}", deviceId);
                return true;
            }

            // 比较鉴权码
            return dbAuthCode.equals(authCode);
        } catch (Exception e) {
            log.error("Validate auth code failed: deviceId={}", deviceId, e);
            return true; // 异常时默认通过
        }
    }

    /**
     * 设备注册成功后，更新设备激活状态
     */
    public void onDeviceRegistered(String deviceId) {
        try {
            String sql = "UPDATE lot_device SET activation_status = 1, active_time = NOW() WHERE device_id = ? AND activation_status = 0";
            int updated = jdbcTemplate.update(sql, deviceId);
            if (updated > 0) {
                log.info("Device activation status updated: deviceId={}", deviceId);
            }
        } catch (Exception e) {
            log.warn("Update device activation status failed: deviceId={}", deviceId, e);
        }
    }
}
