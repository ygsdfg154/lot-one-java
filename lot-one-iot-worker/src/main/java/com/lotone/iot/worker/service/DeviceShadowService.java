package com.lotone.iot.worker.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 设备影子服务
 * 存储设备的最新状态（reported）和平台期望状态（desired）
 * 设备离线时缓存指令，上线后自动同步
 */
@Slf4j
@Service
public class DeviceShadowService {

    @Autowired
    private MongoTemplate mongoTemplate;

    private static final String COLLECTION = "device_shadow";

    /** 本地缓存（deviceId -> shadow） */
    private final ConcurrentHashMap<String, JSONObject> shadowCache = new ConcurrentHashMap<>();

    /**
     * 获取设备影子
     */
    public JSONObject getShadow(String deviceId) {
        // 先查缓存
        JSONObject cached = shadowCache.get(deviceId);
        if (cached != null) {
            return cached;
        }

        // 查MongoDB
        Query query = new Query(Criteria.where("deviceId").is(deviceId));
        Map<String, Object> shadow = mongoTemplate.findOne(query, Map.class, COLLECTION);

        JSONObject result;
        if (shadow != null) {
            result = new JSONObject(shadow);
        } else {
            result = createDefaultShadow(deviceId);
        }

        shadowCache.put(deviceId, result);
        return result;
    }

    /**
     * 更新设备上报状态
     */
    public void updateReported(String deviceId, Map<String, Object> reported) {
        JSONObject shadow = getShadow(deviceId);
        JSONObject reportedObj = shadow.getJSONObject("reported");
        if (reportedObj == null) {
            reportedObj = new JSONObject();
            shadow.put("reported", reportedObj);
        }
        reportedObj.putAll(reported);
        reportedObj.put("updateTime", LocalDateTime.now().toString());

        // 更新版本号
        int version = shadow.getIntValue("version");
        shadow.put("version", version + 1);

        // 保存到MongoDB
        saveShadow(deviceId, shadow);

        // 检查是否有期望状态需要同步
        checkDesiredSync(deviceId, shadow);

        log.debug("Update reported: deviceId={}, keys={}", deviceId, reported.keySet());
    }

    /**
     * 更新平台期望状态
     */
    public void updateDesired(String deviceId, Map<String, Object> desired) {
        JSONObject shadow = getShadow(deviceId);
        JSONObject desiredObj = shadow.getJSONObject("desired");
        if (desiredObj == null) {
            desiredObj = new JSONObject();
            shadow.put("desired", desiredObj);
        }
        desiredObj.putAll(desired);
        desiredObj.put("updateTime", LocalDateTime.now().toString());

        // 更新版本号
        int version = shadow.getIntValue("version");
        shadow.put("version", version + 1);

        // 保存到MongoDB
        saveShadow(deviceId, shadow);

        log.info("Update desired: deviceId={}, keys={}", deviceId, desired.keySet());
    }

    /**
     * 清除期望状态（设备已同步）
     */
    public void clearDesired(String deviceId) {
        JSONObject shadow = getShadow(deviceId);
        shadow.put("desired", new JSONObject());

        int version = shadow.getIntValue("version");
        shadow.put("version", version + 1);

        saveShadow(deviceId, shadow);
        log.info("Clear desired: deviceId={}", deviceId);
    }

    /**
     * 设备上线时同步期望状态
     */
    public JSONObject syncOnDeviceOnline(String deviceId) {
        JSONObject shadow = getShadow(deviceId);
        JSONObject desired = shadow.getJSONObject("desired");

        if (desired != null && !desired.isEmpty()) {
            log.info("Sync desired on device online: deviceId={}, desiredKeys={}",
                    deviceId, desired.keySet());
            return desired;
        }
        return null;
    }

    /**
     * 检查期望状态是否需要同步
     */
    private void checkDesiredSync(String deviceId, JSONObject shadow) {
        JSONObject desired = shadow.getJSONObject("desired");
        JSONObject reported = shadow.getJSONObject("reported");

        if (desired == null || desired.isEmpty()) return;
        if (reported == null) return;

        // 检查期望状态是否已被设备上报（简单匹配）
        boolean allSynced = true;
        for (String key : desired.keySet()) {
            if ("updateTime".equals(key)) continue;
            Object desiredValue = desired.get(key);
            Object reportedValue = reported.get(key);
            if (reportedValue == null || !desiredValue.equals(reportedValue)) {
                allSynced = false;
                break;
            }
        }

        if (allSynced) {
            log.info("All desired synced, clear desired: deviceId={}", deviceId);
            clearDesired(deviceId);
        }
    }

    /**
     * 创建默认影子
     */
    private JSONObject createDefaultShadow(String deviceId) {
        JSONObject shadow = new JSONObject();
        shadow.put("deviceId", deviceId);
        shadow.put("version", 0);
        shadow.put("reported", new JSONObject());
        shadow.put("desired", new JSONObject());
        shadow.put("createTime", LocalDateTime.now().toString());
        shadow.put("updateTime", LocalDateTime.now().toString());
        return shadow;
    }

    /**
     * 保存影子到MongoDB
     */
    private void saveShadow(String deviceId, JSONObject shadow) {
        shadow.put("updateTime", LocalDateTime.now().toString());

        Query query = new Query(Criteria.where("deviceId").is(deviceId));
        Update update = new Update();
        for (Map.Entry<String, Object> entry : shadow.entrySet()) {
            if ("deviceId".equals(entry.getKey())) continue;
            update.set(entry.getKey(), entry.getValue());
        }
        update.setOnInsert("deviceId", deviceId);
        update.setOnInsert("createTime", LocalDateTime.now().toString());

        mongoTemplate.upsert(query, update, COLLECTION);

        // 更新缓存
        shadowCache.put(deviceId, shadow);
    }

    /**
     * 获取影子统计
     */
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new java.util.LinkedHashMap<>();
        stats.put("cachedShadows", shadowCache.size());
        stats.put("totalShadows", mongoTemplate.count(new Query(), COLLECTION));
        return stats;
    }

    /**
     * 清除缓存
     */
    public void clearCache(String deviceId) {
        shadowCache.remove(deviceId);
    }
}
