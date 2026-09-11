package com.lotone.iot.worker.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@Service
public class CommandResultService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 处理指令下发结果，更新 lot_device_cmd_log
     */
    public void processResult(String json) {
        try {
            Map<String, Object> result = objectMapper.readValue(json, Map.class);
            String requestId = (String) result.get("requestId");
            String deviceId = (String) result.get("deviceId");
            Boolean success = result.get("success") != null ? (Boolean) result.get("success") : false;
            String reply = result.get("reply") != null ? result.get("reply").toString() : null;
            String errorMsg = result.get("errorMsg") != null ? result.get("errorMsg").toString() : null;

            if (requestId == null || requestId.isEmpty()) {
                log.warn("Command result missing requestId: {}", json);
                return;
            }

            // 查询指令日志
            String querySql = "SELECT id FROM lot_device_cmd_log WHERE request_id = ? LIMIT 1";
            Long logId = null;
            try {
                logId = jdbcTemplate.queryForObject(querySql, Long.class, requestId);
            } catch (Exception e) {
                log.warn("Command log not found for requestId: {}", requestId);
            }

            if (logId == null) {
                log.warn("Command log not found, requestId={}, deviceId={}", requestId, deviceId);
                return;
            }

            // 更新指令结果
            String resultStr = success ? "SUCCESS" : "FAILED";
            String replyContent = reply != null ? reply : (errorMsg != null ? errorMsg : "");

            String updateSql = "UPDATE lot_device_cmd_log SET result = ?, reply = ?, updated_at = ? WHERE id = ?";
            int updated = jdbcTemplate.update(updateSql, resultStr, replyContent, LocalDateTime.now(), logId);

            log.info("Command result updated: logId={}, requestId={}, deviceId={}, success={}, updated={}",
                    logId, requestId, deviceId, success, updated);

        } catch (Exception e) {
            log.error("Process command result failed: {}", json, e);
        }
    }
}
