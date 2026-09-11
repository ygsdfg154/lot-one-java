package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.AlarmRule;
import com.lotone.admin.service.AlarmRuleService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/alarmRule")
public class AlarmRuleController extends BaseController<AlarmRule, AlarmRuleService> {

    /**
     * 启用/禁用规则
     */
    @PostMapping("/toggle")
    public R<String> toggle(@RequestParam Long id, @RequestParam Integer status) {
        AlarmRule rule = new AlarmRule();
        rule.setId(id);
        rule.setStatus(status);
        rule.setUpdatedAt(LocalDateTime.now());
        service.updateById(rule);
        return R.success(status == 1 ? "规则已启用" : "规则已禁用");
    }

    /**
     * 批量启用/禁用
     */
    @PostMapping("/batchToggle")
    public R<String> batchToggle(@RequestBody Map<String, Object> params) {
        List<Long> ids = (List<Long>) params.get("ids");
        Integer status = params.get("status") != null ? Integer.parseInt(params.get("status").toString()) : null;
        if (ids == null || ids.isEmpty() || status == null) {
            return R.fail("参数不完整");
        }
        for (Long id : ids) {
            AlarmRule rule = new AlarmRule();
            rule.setId(id);
            rule.setStatus(status);
            rule.setUpdatedAt(LocalDateTime.now());
            service.updateById(rule);
        }
        return R.success("批量操作成功，共" + ids.size() + "条规则");
    }

    /**
     * 规则测试（模拟报警判断）
     */
    @PostMapping("/test")
    public R<Map<String, Object>> testRule(@RequestBody Map<String, Object> params) {
        Long ruleId = params.get("ruleId") != null ? Long.parseLong(params.get("ruleId").toString()) : null;
        String testValue = params.get("testValue") != null ? params.get("testValue").toString() : null;

        if (ruleId == null || testValue == null) {
            return R.fail("参数不完整");
        }

        AlarmRule rule = service.getById(ruleId);
        if (rule == null) {
            return R.fail("规则不存在");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("ruleId", ruleId);
        result.put("ruleName", rule.getAlarmName());
        result.put("alarmCode", rule.getAlarmCode());
        result.put("defaultValue", rule.getDefaultAlarmValue());
        result.put("testValue", testValue);

        // 简单阈值比较测试
        boolean triggered = false;
        String reason = "";
        try {
            if (rule.getIsAlarmValue() != null && rule.getIsAlarmValue() == 1 && rule.getDefaultAlarmValue() != null) {
                double threshold = Double.parseDouble(rule.getDefaultAlarmValue());
                double value = Double.parseDouble(testValue);
                // 超速类：值大于阈值触发
                if ("SPEED".equalsIgnoreCase(rule.getAlarmCode()) || "OVER_SPEED".equalsIgnoreCase(rule.getAlarmCode())) {
                    triggered = value > threshold;
                    reason = triggered ? "速度" + value + " > 阈值" + threshold : "速度" + value + " <= 阈值" + threshold;
                }
                // 低电类：值小于阈值触发
                else if ("LOW_BATTERY".equalsIgnoreCase(rule.getAlarmCode()) || "BATTERY".equalsIgnoreCase(rule.getAlarmCode())) {
                    triggered = value < threshold;
                    reason = triggered ? "电量" + value + " < 阈值" + threshold : "电量" + value + " >= 阈值" + threshold;
                }
                // 默认：大于阈值
                else {
                    triggered = value > threshold;
                    reason = triggered ? "值" + value + " > 阈值" + threshold : "值" + value + " <= 阈值" + threshold;
                }
            } else {
                reason = "该规则不需要阈值，直接触发";
                triggered = true;
            }
        } catch (NumberFormatException e) {
            reason = "阈值或测试值不是数字，无法比较";
        }

        result.put("triggered", triggered);
        result.put("reason", reason);
        result.put("ruleEnabled", rule.getStatus() != null && rule.getStatus() == 1);

        return R.success(result);
    }

    /**
     * 查询启用的规则列表
     */
    @GetMapping("/enabled")
    public R<List<AlarmRule>> getEnabled() {
        List<AlarmRule> rules = service.list(
                new LambdaQueryWrapper<AlarmRule>()
                        .eq(AlarmRule::getStatus, 1)
                        .orderByAsc(AlarmRule::getSort));
        return R.success(rules);
    }

    /**
     * 按告警编码查询
     */
    @GetMapping("/byCode")
    public R<AlarmRule> getByCode(@RequestParam String alarmCode) {
        AlarmRule rule = service.getOne(
                new LambdaQueryWrapper<AlarmRule>().eq(AlarmRule::getAlarmCode, alarmCode));
        return R.success(rule);
    }
}
