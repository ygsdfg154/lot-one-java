package com.lotone.device.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.lotone.common.result.R;
import com.lotone.device.entity.AppUserDevice;
import com.lotone.device.service.AppUserDeviceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/v1/alarm")
public class AppAlarmController {

    @Autowired
    private AppUserDeviceService userDeviceService;

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 报警列表（只返回当前用户绑定设备的报警）
     */
    @GetMapping("/list")
    public R<Map<String, Object>> list(
            @RequestParam(required = false) String deviceId,
            @RequestParam(required = false) String alarmType,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {
        Long userId = StpUtil.getLoginIdAsLong();

        // 获取用户绑定的设备ID列表
        List<AppUserDevice> bindings = userDeviceService.listByUserId(userId);
        List<String> deviceIds = bindings.stream()
                .map(AppUserDevice::getDeviceId)
                .collect(Collectors.toList());

        if (deviceIds.isEmpty()) {
            Map<String, Object> result = new HashMap<>();
            result.put("list", new ArrayList<>());
            result.put("total", 0);
            result.put("page", page);
            result.put("pageSize", pageSize);
            return R.success(result);
        }

        // 构建查询条件
        Criteria criteria = Criteria.where("deviceId").in(deviceIds);
        if (deviceId != null && !deviceId.isEmpty()) {
            criteria = criteria.and("deviceId").is(deviceId);
        }
        if (alarmType != null && !alarmType.isEmpty()) {
            criteria = criteria.and("alarmType").is(alarmType);
        }
        if (status != null && !status.isEmpty()) {
            criteria = criteria.and("status").is(status);
        }

        Query query = new Query(criteria)
                .with(Sort.by(Sort.Direction.DESC, "alarmTime"))
                .skip((long) (page - 1) * pageSize)
                .limit(pageSize);

        List<Map> alarms = mongoTemplate.find(query, Map.class, "alarm_event");
        long total = mongoTemplate.count(new Query(criteria), "alarm_event");

        Map<String, Object> result = new HashMap<>();
        result.put("list", alarms);
        result.put("total", total);
        result.put("page", page);
        result.put("pageSize", pageSize);
        return R.success(result);
    }

    /**
     * 报警详情
     */
    @GetMapping("/detail")
    public R<Map> detail(@RequestParam String id) {
        Long userId = StpUtil.getLoginIdAsLong();
        try {
            Map alarm = mongoTemplate.findById(id, Map.class, "alarm_event");
            if (alarm == null) {
                return R.fail("报警不存在");
            }
            // 校验设备归属
            String deviceId = (String) alarm.get("deviceId");
            AppUserDevice binding = userDeviceService.getOne(
                    new com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<AppUserDevice>()
                            .eq(AppUserDevice::getUserId, userId)
                            .eq(AppUserDevice::getDeviceId, deviceId));
            if (binding == null) {
                return R.fail("无权查看该报警");
            }
            return R.success(alarm);
        } catch (Exception e) {
            log.error("Get alarm detail failed: id={}", id, e);
            return R.fail("查询失败");
        }
    }

    /**
     * 标记报警已读
     */
    @PostMapping("/read")
    public R<String> read(@RequestParam String id) {
        Long userId = StpUtil.getLoginIdAsLong();
        try {
            Map alarm = mongoTemplate.findById(id, Map.class, "alarm_event");
            if (alarm == null) {
                return R.fail("报警不存在");
            }
            String deviceId = (String) alarm.get("deviceId");
            AppUserDevice binding = userDeviceService.getOne(
                    new com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<AppUserDevice>()
                            .eq(AppUserDevice::getUserId, userId)
                            .eq(AppUserDevice::getDeviceId, deviceId));
            if (binding == null) {
                return R.fail("无权操作该报警");
            }

            org.springframework.data.mongodb.core.query.Update update = new org.springframework.data.mongodb.core.query.Update();
            update.set("status", "READ");
            mongoTemplate.updateFirst(new Query(Criteria.where("_id").is(id)), update, "alarm_event");
            return R.success("标记成功");
        } catch (Exception e) {
            log.error("Mark alarm read failed: id={}", id, e);
            return R.fail("操作失败");
        }
    }

    /**
     * 报警统计（未读数、各类型数量）
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Long userId = StpUtil.getLoginIdAsLong();
        List<AppUserDevice> bindings = userDeviceService.listByUserId(userId);
        List<String> deviceIds = bindings.stream()
                .map(AppUserDevice::getDeviceId)
                .collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        if (deviceIds.isEmpty()) {
            result.put("unread", 0);
            result.put("total", 0);
            return R.success(result);
        }

        Criteria criteria = Criteria.where("deviceId").in(deviceIds);
        long total = mongoTemplate.count(new Query(criteria), "alarm_event");
        long unread = mongoTemplate.count(new Query(criteria.and("status").is("NEW")), "alarm_event");

        result.put("unread", unread);
        result.put("total", total);
        return R.success(result);
    }
}
