package com.lotone.device.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.alibaba.fastjson.JSON;
import com.lotone.common.result.R;
import com.lotone.device.entity.AppUserDevice;
import com.lotone.device.service.AppUserDeviceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Slf4j
@RestController
@RequestMapping("/api/v1/share")
public class LocationShareController {

    @Autowired
    private AppUserDeviceService userDeviceService;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private MongoTemplate mongoTemplate;

    private static final String SHARE_KEY_PREFIX = "location:share:";
    private static final long DEFAULT_EXPIRE_HOURS = 24;

    /**
     * 创建位置分享
     */
    @PostMapping("/create")
    public R<Map<String, Object>> createShare(
            @RequestParam String deviceId,
            @RequestParam(required = false) Integer expireHours) {
        Long userId = StpUtil.getLoginIdAsLong();

        // 校验设备归属
        AppUserDevice binding = userDeviceService.getOne(
                new com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<AppUserDevice>()
                        .eq(AppUserDevice::getUserId, userId)
                        .eq(AppUserDevice::getDeviceId, deviceId));
        if (binding == null) {
            return R.fail("设备不属于当前账号");
        }

        // 生成分享 token
        String token = UUID.randomUUID().toString().replace("-", "");
        long expire = expireHours != null && expireHours > 0 ? expireHours : DEFAULT_EXPIRE_HOURS;

        // 存储分享信息到 Redis
        Map<String, Object> shareInfo = new HashMap<>();
        shareInfo.put("token", token);
        shareInfo.put("deviceId", deviceId);
        shareInfo.put("userId", userId);
        shareInfo.put("createTime", LocalDateTime.now().toString());
        shareInfo.put("expireHours", expire);

        redisTemplate.opsForValue().set(
                SHARE_KEY_PREFIX + token,
                JSON.toJSONString(shareInfo),
                expire,
                TimeUnit.HOURS);

        Map<String, Object> result = new HashMap<>();
        result.put("token", token);
        result.put("deviceId", deviceId);
        result.put("expireHours", expire);
        result.put("expireTime", LocalDateTime.now().plusHours(expire)
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        result.put("shareUrl", "/share/location?token=" + token);

        return R.success(result);
    }

    /**
     * 取消位置分享
     */
    @PostMapping("/cancel")
    public R<String> cancelShare(@RequestParam String token) {
        Long userId = StpUtil.getLoginIdAsLong();

        String key = SHARE_KEY_PREFIX + token;
        String json = redisTemplate.opsForValue().get(key);
        if (json == null) {
            return R.fail("分享不存在或已过期");
        }

        Map<String, Object> shareInfo = JSON.parseObject(json, Map.class);
        Long shareUserId = shareInfo.get("userId") != null ?
                Long.parseLong(shareInfo.get("userId").toString()) : null;
        if (shareUserId == null || !shareUserId.equals(userId)) {
            return R.fail("无权取消该分享");
        }

        redisTemplate.delete(key);
        return R.success("分享已取消");
    }

    /**
     * 查询分享位置（公开接口，不需要登录）
     */
    @GetMapping("/location")
    public R<Map<String, Object>> getShareLocation(@RequestParam String token) {
        String key = SHARE_KEY_PREFIX + token;
        String json = redisTemplate.opsForValue().get(key);
        if (json == null) {
            return R.fail("分享不存在或已过期");
        }

        Map<String, Object> shareInfo = JSON.parseObject(json, Map.class);
        String deviceId = (String) shareInfo.get("deviceId");

        // 从 MongoDB 查询最新位置
        Map<String, Object> location = new HashMap<>();
        try {
            Query query = new Query(Criteria.where("deviceId").is(deviceId));
            Map<String, Object> status = mongoTemplate.findOne(query, Map.class, "device_status");
            if (status != null) {
                location.put("deviceId", deviceId);
                location.put("latitude", status.get("latitude"));
                location.put("longitude", status.get("longitude"));
                location.put("speed", status.get("speed"));
                location.put("direction", status.get("direction"));
                location.put("altitude", status.get("altitude"));
                location.put("online", status.get("online"));
                location.put("lastTime", status.get("lastTime"));
                location.put("status", status.get("status"));
            }
        } catch (Exception e) {
            log.warn("Get share location failed: token={}, deviceId={}", token, deviceId, e);
        }

        // 返回分享信息（不暴露 userId）
        Map<String, Object> result = new HashMap<>();
        result.put("deviceId", deviceId);
        result.put("location", location);
        result.put("createTime", shareInfo.get("createTime"));
        result.put("expireHours", shareInfo.get("expireHours"));

        return R.success(result);
    }

    /**
     * 我的分享列表
     */
    @GetMapping("/myList")
    public R<Map<String, Object>> myShares() {
        Long userId = StpUtil.getLoginIdAsLong();
        // 注意：Redis 没有简单的按用户查询方式，这里返回空列表
        // 实际项目中应该用数据库存储分享记录
        Map<String, Object> result = new HashMap<>();
        result.put("list", new java.util.ArrayList<>());
        result.put("total", 0);
        return R.success(result);
    }
}
