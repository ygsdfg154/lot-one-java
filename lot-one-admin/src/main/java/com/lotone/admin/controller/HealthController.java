package com.lotone.admin.controller;

import com.lotone.common.result.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/health")
public class HealthController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired(required = false)
    private KafkaTemplate<String, String> kafkaTemplate;

    /**
     * 综合健康检查
     */
    @GetMapping("/check")
    public R<Map<String, Object>> check() {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("timestamp", LocalDateTime.now().toString());
        result.put("service", "lot-one-admin");
        result.put("status", "UP");

        // MySQL 检查
        Map<String, Object> mysql = new LinkedHashMap<>();
        try {
            Integer count = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            mysql.put("status", count != null && count == 1 ? "UP" : "DOWN");
            mysql.put("latency", "ok");
        } catch (Exception e) {
            mysql.put("status", "DOWN");
            mysql.put("error", e.getMessage());
            result.put("status", "DEGRADED");
        }
        result.put("mysql", mysql);

        // Redis 检查
        Map<String, Object> redis = new LinkedHashMap<>();
        try {
            String pong = redisTemplate.getConnectionFactory().getConnection().ping();
            redis.put("status", "PONG".equals(pong) ? "UP" : "DOWN");
            redis.put("response", pong);
        } catch (Exception e) {
            redis.put("status", "DOWN");
            redis.put("error", e.getMessage());
            result.put("status", "DEGRADED");
        }
        result.put("redis", redis);

        // Kafka 检查
        if (kafkaTemplate != null) {
            Map<String, Object> kafka = new LinkedHashMap<>();
            try {
                kafkaTemplate.send("health-check", "ping-" + System.currentTimeMillis());
                kafka.put("status", "UP");
            } catch (Exception e) {
                kafka.put("status", "DOWN");
                kafka.put("error", e.getMessage());
                result.put("status", "DEGRADED");
            }
            result.put("kafka", kafka);
        }

        // 业务数据统计
        Map<String, Object> stats = new LinkedHashMap<>();
        try {
            stats.put("deviceCount", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM lot_device", Long.class));
            stats.put("userCount", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM sys_users", Long.class));
            stats.put("orderCount", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM lot_order", Long.class));
        } catch (Exception e) {
            stats.put("error", e.getMessage());
        }
        result.put("businessStats", stats);

        return R.success(result);
    }

    /**
     * 简单健康检查（用于负载均衡）
     */
    @GetMapping("/ping")
    public R<String> ping() {
        return R.success("pong");
    }

    /**
     * 各模块状态汇总
     */
    @GetMapping("/modules")
    public R<Map<String, Object>> modules() {
        Map<String, Object> modules = new LinkedHashMap<>();
        modules.put("lot-one-admin", Map.of("port", 8081, "status", "UP", "description", "管理后台"));
        modules.put("lot-one-device", Map.of("port", 8082, "status", "UP", "description", "设备App后端"));
        modules.put("lot-one-gateway", Map.of("port", 8083, "status", "UP", "description", "API网关"));
        modules.put("lot-one-iot-gateway", Map.of("port", 8084, "status", "UP", "description", "IoT设备网关(TCP)"));
        modules.put("lot-one-iot-worker", Map.of("port", 8085, "status", "UP", "description", "数据处理服务"));
        modules.put("lot-one-query-api", Map.of("port", 8086, "status", "UP", "description", "查询API"));

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("total", modules.size());
        result.put("modules", modules);
        result.put("timestamp", LocalDateTime.now().toString());
        return R.success(result);
    }

    /**
     * 数据库表统计
     */
    @GetMapping("/dbStats")
    public R<Map<String, Object>> dbStats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        String[] tables = {"sys_users", "sys_authority", "lot_device", "lot_order", "lot_fence",
                "lot_alarm_rule", "lot_product", "lot_device_cmd_log", "lot_recording", "lot_device_group"};
        for (String table : tables) {
            try {
                Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM " + table, Long.class);
                stats.put(table, count);
            } catch (Exception e) {
                stats.put(table, "N/A");
            }
        }
        return R.success(stats);
    }
}
