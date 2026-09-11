package com.lotone.iot.worker.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 规则引擎服务
 * 根据设备数据匹配规则条件，触发对应动作
 */
@Slf4j
@Service
public class RuleEngineService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired(required = false)
    private KafkaTemplate<String, String> kafkaTemplate;

    private static final String RULE_COLLECTION = "device_rule";
    private static final String RULE_LOG_COLLECTION = "device_rule_log";

    /** 启用的规则缓存 */
    private final List<JSONObject> enabledRules = new ArrayList<>();

    /** 规则触发去重（ruleId:deviceId -> lastTriggerTime） */
    private final ConcurrentHashMap<String, Long> triggerDedup = new ConcurrentHashMap<>();

    /** 默认去重间隔（毫秒） */
    private static final long DEFAULT_DEDUP_INTERVAL = 5 * 60 * 1000;

    /**
     * 执行规则引擎
     */
    public void execute(String deviceId, Map<String, Object> data) {
        if (enabledRules.isEmpty()) {
            loadEnabledRules();
        }

        for (JSONObject rule : enabledRules) {
            try {
                executeRule(deviceId, rule, data);
            } catch (Exception e) {
                log.error("Execute rule failed: ruleId={}, deviceId={}", rule.get("ruleId"), deviceId, e);
            }
        }
    }

    /**
     * 执行单条规则
     */
    private void executeRule(String deviceId, JSONObject rule, Map<String, Object> data) {
        String ruleId = rule.getString("ruleId");
        String ruleName = rule.getString("ruleName");

        // 检查目标设备范围
        if (!matchDeviceScope(rule, deviceId)) {
            return;
        }

        // 匹配条件
        JSONObject condition = rule.getJSONObject("condition");
        if (!matchCondition(condition, data)) {
            return;
        }

        // 去重检查
        String dedupKey = ruleId + ":" + deviceId;
        long dedupInterval = rule.getLongValue("dedupInterval");
        if (dedupInterval <= 0) dedupInterval = DEFAULT_DEDUP_INTERVAL;
        Long lastTrigger = triggerDedup.get(dedupKey);
        if (lastTrigger != null && System.currentTimeMillis() - lastTrigger < dedupInterval) {
            return;
        }
        triggerDedup.put(dedupKey, System.currentTimeMillis());

        // 执行动作
        JSONArray actions = rule.getJSONArray("actions");
        if (actions != null) {
            for (int i = 0; i < actions.size(); i++) {
                JSONObject action = actions.getJSONObject(i);
                executeAction(deviceId, ruleId, ruleName, action, data);
            }
        }

        // 记录规则执行日志
        recordRuleLog(ruleId, ruleName, deviceId, data);

        log.info("Rule triggered: ruleId={}, ruleName={}, deviceId={}", ruleId, ruleName, deviceId);
    }

    /**
     * 匹配设备范围
     */
    private boolean matchDeviceScope(JSONObject rule, String deviceId) {
        String scope = rule.getString("deviceScope");
        if (scope == null || "ALL".equals(scope)) {
            return true;
        }

        if ("SPECIFIC".equals(scope)) {
            List<String> deviceIds = rule.getJSONArray("deviceIds") != null ?
                    rule.getJSONArray("deviceIds").toJavaList(String.class) : Collections.emptyList();
            return deviceIds.contains(deviceId);
        }

        if ("GROUP".equals(scope)) {
            // TODO: 按设备分组匹配
            return true;
        }

        return true;
    }

    /**
     * 匹配条件
     */
    private boolean matchCondition(JSONObject condition, Map<String, Object> data) {
        if (condition == null || condition.isEmpty()) {
            return true;
        }

        String logic = condition.getString("logic");
        if (logic == null) logic = "AND";

        JSONArray rules = condition.getJSONArray("rules");
        if (rules == null || rules.isEmpty()) {
            return true;
        }

        boolean result = "AND".equals(logic);
        for (int i = 0; i < rules.size(); i++) {
            JSONObject rule = rules.getJSONObject(i);
            boolean matched = matchSingleRule(rule, data);

            if ("AND".equals(logic)) {
                result = result && matched;
                if (!result) break;
            } else {
                result = result || matched;
                if (result) break;
            }
        }

        return result;
    }

    /**
     * 匹配单个条件规则
     */
    private boolean matchSingleRule(JSONObject rule, Map<String, Object> data) {
        String field = rule.getString("field");
        String operator = rule.getString("operator");
        Object value = rule.get("value");

        if (field == null || operator == null) {
            return false;
        }

        Object fieldValue = data.get(field);
        if (fieldValue == null) {
            return false;
        }

        try {
            double numValue = ((Number) fieldValue).doubleValue();
            double targetValue = ((Number) value).doubleValue();

            switch (operator) {
                case ">": return numValue > targetValue;
                case ">=": return numValue >= targetValue;
                case "<": return numValue < targetValue;
                case "<=": return numValue <= targetValue;
                case "=": case "==": return numValue == targetValue;
                case "!=": return numValue != targetValue;
                case "between":
                    JSONArray range = (JSONArray) value;
                    return numValue >= range.getDoubleValue(0) && numValue <= range.getDoubleValue(1);
                default: return false;
            }
        } catch (Exception e) {
            // 字符串比较
            String strValue = String.valueOf(fieldValue);
            String targetStr = String.valueOf(value);
            switch (operator) {
                case "=": case "==": return strValue.equals(targetStr);
                case "!=": return !strValue.equals(targetStr);
                case "contains": return strValue.contains(targetStr);
                case "startsWith": return strValue.startsWith(targetStr);
                case "endsWith": return strValue.endsWith(targetStr);
                default: return false;
            }
        }
    }

    /**
     * 执行动作
     */
    private void executeAction(String deviceId, String ruleId, String ruleName,
                                JSONObject action, Map<String, Object> data) {
        String actionType = action.getString("type");
        if (actionType == null) return;

        switch (actionType) {
            case "ALARM":
                // 发送报警
                sendAlarm(deviceId, ruleId, ruleName, action, data);
                break;
            case "KAFKA":
                // 转发到Kafka
                forwardToKafka(deviceId, ruleId, action, data);
                break;
            case "COMMAND":
                // 下发指令
                sendCommand(deviceId, action);
                break;
            case "NOTIFY":
                // 发送通知
                sendNotification(deviceId, ruleId, ruleName, action, data);
                break;
            case "WEBHOOK":
                // Webhook回调
                triggerWebhook(deviceId, ruleId, action, data);
                break;
            default:
                log.warn("Unknown action type: {}", actionType);
        }
    }

    /**
     * 发送报警
     */
    private void sendAlarm(String deviceId, String ruleId, String ruleName,
                            JSONObject action, Map<String, Object> data) {
        try {
            JSONObject alarm = new JSONObject();
            alarm.put("deviceId", deviceId);
            alarm.put("alarmType", action.getString("alarmType") != null ?
                    action.getString("alarmType") : "RULE_TRIGGER");
            alarm.put("alarmLevel", action.getString("alarmLevel") != null ?
                    action.getString("alarmLevel") : "NORMAL");
            alarm.put("alarmName", ruleName);
            alarm.put("ruleId", ruleId);
            alarm.put("timestamp", LocalDateTime.now().toString());
            alarm.put("data", data);

            if (kafkaTemplate != null) {
                kafkaTemplate.send("alarm-event", deviceId, alarm.toJSONString());
            }
            log.info("Rule alarm sent: deviceId={}, ruleId={}", deviceId, ruleId);
        } catch (Exception e) {
            log.error("Send rule alarm failed: deviceId={}, ruleId={}", deviceId, ruleId, e);
        }
    }

    /**
     * 转发到Kafka
     */
    private void forwardToKafka(String deviceId, String ruleId, JSONObject action, Map<String, Object> data) {
        try {
            String topic = action.getString("topic");
            if (topic == null || kafkaTemplate == null) return;

            JSONObject forward = new JSONObject();
            forward.put("deviceId", deviceId);
            forward.put("ruleId", ruleId);
            forward.put("timestamp", LocalDateTime.now().toString());
            forward.put("data", data);

            kafkaTemplate.send(topic, deviceId, forward.toJSONString());
            log.debug("Rule forward to kafka: deviceId={}, topic={}", deviceId, topic);
        } catch (Exception e) {
            log.error("Rule forward to kafka failed: deviceId={}, ruleId={}", deviceId, ruleId, e);
        }
    }

    /**
     * 下发指令
     */
    private void sendCommand(String deviceId, JSONObject action) {
        try {
            String cmdCode = action.getString("cmdCode");
            if (cmdCode == null || kafkaTemplate == null) return;

            JSONObject command = new JSONObject();
            command.put("deviceId", deviceId);
            command.put("cmdCode", cmdCode);
            command.put("params", action.getJSONObject("params"));
            command.put("requestId", UUID.randomUUID().toString());
            command.put("timestamp", System.currentTimeMillis());

            kafkaTemplate.send("device-command", deviceId, command.toJSONString());
            log.info("Rule command sent: deviceId={}, cmdCode={}", deviceId, cmdCode);
        } catch (Exception e) {
            log.error("Rule command failed: deviceId={}", deviceId, e);
        }
    }

    /**
     * 发送通知
     */
    private void sendNotification(String deviceId, String ruleId, String ruleName,
                                   JSONObject action, Map<String, Object> data) {
        // TODO: 对接短信/推送/邮件通知
        log.info("Rule notification: deviceId={}, ruleId={}, ruleName={}", deviceId, ruleId, ruleName);
    }

    /**
     * Webhook回调
     */
    private void triggerWebhook(String deviceId, String ruleId, JSONObject action, Map<String, Object> data) {
        // TODO: 实现HTTP Webhook回调
        String url = action.getString("url");
        log.info("Rule webhook: deviceId={}, ruleId={}, url={}", deviceId, ruleId, url);
    }

    /**
     * 记录规则执行日志
     */
    private void recordRuleLog(String ruleId, String ruleName, String deviceId, Map<String, Object> data) {
        try {
            JSONObject log = new JSONObject();
            log.put("ruleId", ruleId);
            log.put("ruleName", ruleName);
            log.put("deviceId", deviceId);
            log.put("triggerTime", LocalDateTime.now().toString());
            log.put("data", data);
            mongoTemplate.save(log, RULE_LOG_COLLECTION);
        } catch (Exception e) {
            log.error("Record rule log failed: ruleId={}, deviceId={}", ruleId, deviceId, e);
        }
    }

    /**
     * 加载启用的规则
     */
    public void loadEnabledRules() {
        try {
            Query query = new Query(Criteria.where("status").is(1));
            List<Map> rules = mongoTemplate.find(query, Map.class, RULE_COLLECTION);
            enabledRules.clear();
            for (Map rule : rules) {
                enabledRules.add(new JSONObject(rule));
            }
            log.info("Loaded {} enabled rules", enabledRules.size());
        } catch (Exception e) {
            log.error("Load enabled rules failed", e);
        }
    }

    /**
     * 刷新规则缓存
     */
    public void refreshRules() {
        loadEnabledRules();
        triggerDedup.clear();
    }

    /**
     * 获取规则统计
     */
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("enabledRules", enabledRules.size());
        stats.put("totalRules", mongoTemplate.count(new Query(), RULE_COLLECTION));
        stats.put("totalTriggerLogs", mongoTemplate.count(new Query(), RULE_LOG_COLLECTION));
        stats.put("dedupCacheSize", triggerDedup.size());
        return stats;
    }
}
