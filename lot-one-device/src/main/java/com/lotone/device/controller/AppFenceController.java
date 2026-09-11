package com.lotone.device.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.lotone.common.result.R;
import com.lotone.device.service.AppUserDeviceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/app/fence")
public class AppFenceController {

    @Autowired
    private AppUserDeviceService userDeviceService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 查询设备关联的围栏列表
     */
    @GetMapping("/list")
    public R<List<Map<String, Object>>> fenceList(@RequestParam String deviceId) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }

        try {
            // 查询设备关联的围栏ID
            List<Map<String, Object>> relations = jdbcTemplate.queryForList(
                    "SELECT fence_id FROM lot_fence_device WHERE device_id = ?", deviceId);

            if (relations.isEmpty()) {
                return R.success(new ArrayList<>());
            }

            List<Long> fenceIds = new ArrayList<>();
            for (Map<String, Object> rel : relations) {
                fenceIds.add(((Number) rel.get("fence_id")).longValue());
            }

            // 查询围栏详情
            String placeholders = String.join(",", Collections.nCopies(fenceIds.size(), "?"));
            List<Map<String, Object>> fences = jdbcTemplate.queryForList(
                    "SELECT id, fence_name, fence_type, status, description, created_at " +
                            "FROM lot_fence WHERE id IN (" + placeholders + ") AND status = 1 " +
                            "ORDER BY id DESC",
                    fenceIds.toArray());

            // 查询每个围栏的点位
            for (Map<String, Object> fence : fences) {
                Long fenceId = ((Number) fence.get("id")).longValue();
                List<Map<String, Object>> points = jdbcTemplate.queryForList(
                        "SELECT point_index, latitude, longitude FROM lot_fence_point " +
                                "WHERE fence_id = ? ORDER BY point_index ASC", fenceId);
                fence.put("points", points);
                fence.put("pointCount", points.size());
            }

            return R.success(fences);
        } catch (Exception e) {
            log.error("Query fence list failed: deviceId={}", deviceId, e);
            return R.fail("查询失败: " + e.getMessage());
        }
    }

    /**
     * 查询围栏详情
     */
    @GetMapping("/detail")
    public R<Map<String, Object>> fenceDetail(
            @RequestParam String deviceId,
            @RequestParam Long fenceId) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }

        try {
            // 验证设备是否关联该围栏
            Long count = jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM lot_fence_device WHERE device_id = ? AND fence_id = ?",
                    Long.class, deviceId, fenceId);
            if (count == null || count == 0) {
                return R.fail("设备未关联该围栏");
            }

            Map<String, Object> fence = jdbcTemplate.queryForMap(
                    "SELECT id, fence_name, fence_type, status, description, enter_alarm_enable, " +
                            "get_out_alarm_enable, created_at FROM lot_fence WHERE id = ?", fenceId);

            // 查询围栏点位
            List<Map<String, Object>> points = jdbcTemplate.queryForList(
                    "SELECT point_index, latitude, longitude FROM lot_fence_point " +
                            "WHERE fence_id = ? ORDER BY point_index ASC", fenceId);
            fence.put("points", points);
            fence.put("pointCount", points.size());

            return R.success(fence);
        } catch (Exception e) {
            log.error("Query fence detail failed: fenceId={}", fenceId, e);
            return R.fail("查询失败: " + e.getMessage());
        }
    }

    /**
     * 查询围栏报警记录
     */
    @GetMapping("/alarms")
    public R<Map<String, Object>> fenceAlarms(
            @RequestParam String deviceId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String alarmType) {

        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }

        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("deviceId").is(deviceId));
            query.addCriteria(Criteria.where("alarmType").in("ENTER_FENCE", "EXIT_FENCE"));
            if (alarmType != null && !alarmType.isEmpty()) {
                query.addCriteria(Criteria.where("alarmType").is(alarmType));
            }
            query.with(Sort.by(Sort.Direction.DESC, "timestamp"));

            long total = mongoTemplate.count(query, Map.class, "alarm_event");

            query.skip((long) (page - 1) * pageSize).limit(pageSize);
            List<Map> alarms = mongoTemplate.find(query, Map.class, "alarm_event");

            Map<String, Object> result = new HashMap<>();
            result.put("list", alarms);
            result.put("total", total);
            result.put("page", page);
            result.put("pageSize", pageSize);
            return R.success(result);
        } catch (Exception e) {
            log.error("Query fence alarms failed: deviceId={}", deviceId, e);
            return R.fail("查询失败: " + e.getMessage());
        }
    }

    /**
     * 围栏报警统计
     */
    @GetMapping("/alarmStats")
    public R<Map<String, Object>> alarmStats(@RequestParam String deviceId) {
        Long userId = StpUtil.getLoginIdAsLong();
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定");
        }

        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("deviceId").is(deviceId));
            query.addCriteria(Criteria.where("alarmType").in("ENTER_FENCE", "EXIT_FENCE"));

            long total = mongoTemplate.count(query, Map.class, "alarm_event");

            // 按类型统计
            long enterCount = mongoTemplate.count(
                    new Query().addCriteria(Criteria.where("deviceId").is(deviceId))
                            .addCriteria(Criteria.where("alarmType").is("ENTER_FENCE")),
                    Map.class, "alarm_event");
            long exitCount = mongoTemplate.count(
                    new Query().addCriteria(Criteria.where("deviceId").is(deviceId))
                            .addCriteria(Criteria.where("alarmType").is("EXIT_FENCE")),
                    Map.class, "alarm_event");

            // 最近7天统计
            LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
            long last7Days = mongoTemplate.count(
                    new Query().addCriteria(Criteria.where("deviceId").is(deviceId))
                            .addCriteria(Criteria.where("alarmType").in("ENTER_FENCE", "EXIT_FENCE"))
                            .addCriteria(Criteria.where("timestamp").gte(sevenDaysAgo.toString())),
                    Map.class, "alarm_event");

            Map<String, Object> stats = new HashMap<>();
            stats.put("total", total);
            stats.put("enterCount", enterCount);
            stats.put("exitCount", exitCount);
            stats.put("last7Days", last7Days);
            return R.success(stats);
        } catch (Exception e) {
            log.error("Query fence alarm stats failed: deviceId={}", deviceId, e);
            return R.fail("查询失败: " + e.getMessage());
        }
    }
}
