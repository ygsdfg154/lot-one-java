package com.lotone.iot.gateway.service;

import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class CommandTimeoutService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Value("${iot.gateway.command.reply-timeout-seconds:30}")
    private int replyTimeoutSeconds;

    @Value("${iot.gateway.command.result-topic:device-command-result}")
    private String resultTopic;

    /**
     * 定时扫描超时未应答的指令（每30秒执行一次）
     */
    @Scheduled(fixedDelay = 30000)
    public void checkTimeoutCommands() {
        try {
            // 查询超时未应答的指令（result 为空且 send_time 超过超时时间）
            String sql = "SELECT id, device_id, cmd_name, cmd_type, request_id, send_time " +
                    "FROM lot_device_cmd_log " +
                    "WHERE result IS NULL " +
                    "AND send_time < ? " +
                    "AND send_time > ? " +
                    "LIMIT 100";

            LocalDateTime timeoutThreshold = LocalDateTime.now().minusSeconds(replyTimeoutSeconds);
            LocalDateTime maxLookback = LocalDateTime.now().minusHours(24); // 只查24小时内的

            List<Map<String, Object>> timeoutCmds = jdbcTemplate.queryForList(sql, timeoutThreshold, maxLookback);

            if (timeoutCmds.isEmpty()) {
                return;
            }

            log.info("Found {} timeout commands", timeoutCmds.size());

            for (Map<String, Object> cmd : timeoutCmds) {
                try {
                    Long id = ((Number) cmd.get("id")).longValue();
                    String deviceId = (String) cmd.get("device_id");
                    String requestId = (String) cmd.get("request_id");
                    String cmdName = (String) cmd.get("cmd_name");

                    // 更新指令状态为超时
                    String updateSql = "UPDATE lot_device_cmd_log SET result = 'TIMEOUT', reply = '指令应答超时', updated_at = ? WHERE id = ?";
                    jdbcTemplate.update(updateSql, LocalDateTime.now(), id);

                    // 发送超时结果到 Kafka
                    Map<String, Object> result = new HashMap<>();
                    result.put("requestId", requestId);
                    result.put("deviceId", deviceId);
                    result.put("cmdName", cmdName);
                    result.put("success", false);
                    result.put("errorMsg", "指令应答超时");
                    result.put("timeout", true);
                    result.put("timestamp", System.currentTimeMillis());

                    kafkaTemplate.send(resultTopic, deviceId, JSON.toJSONString(result));

                    log.info("Command timeout: id={}, deviceId={}, requestId={}, cmdName={}",
                            id, deviceId, requestId, cmdName);

                } catch (Exception e) {
                    log.error("Process timeout command failed: id={}", cmd.get("id"), e);
                }
            }

        } catch (Exception e) {
            log.error("Check timeout commands failed", e);
        }
    }
}
