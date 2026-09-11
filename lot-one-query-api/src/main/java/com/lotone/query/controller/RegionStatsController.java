package com.lotone.query.controller;

import com.lotone.common.result.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/query/api/region")
public class RegionStatsController {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 按矩形区域统计设备数量
     * 传入经纬度范围，统计该区域内的在线/离线设备数
     */
    @GetMapping("/rectangleStats")
    public R<Map<String, Object>> rectangleStats(
            @RequestParam double minLat,
            @RequestParam double maxLat,
            @RequestParam double minLng,
            @RequestParam double maxLng) {

        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("latitude").gte(minLat).lte(maxLat));
            query.addCriteria(Criteria.where("longitude").gte(minLng).lte(maxLng));

            long total = mongoTemplate.count(query, Map.class, "device_status");

            // 在线设备
            Query onlineQuery = new Query();
            onlineQuery.addCriteria(Criteria.where("latitude").gte(minLat).lte(maxLat));
            onlineQuery.addCriteria(Criteria.where("longitude").gte(minLng).lte(maxLng));
            onlineQuery.addCriteria(Criteria.where("online").is(true));
            long online = mongoTemplate.count(onlineQuery, Map.class, "device_status");

            Map<String, Object> result = new HashMap<>();
            result.put("total", total);
            result.put("online", online);
            result.put("offline", total - online);
            result.put("onlineRate", total > 0 ? Math.round(online * 10000.0 / total) / 100.0 : 0);
            result.put("bounds", Map.of(
                    "minLat", minLat, "maxLat", maxLat,
                    "minLng", minLng, "maxLng", maxLng
            ));
            return R.success(result);
        } catch (Exception e) {
            log.error("Rectangle stats failed", e);
            return R.success(new HashMap<>());
        }
    }

    /**
     * 多区域批量统计
     * 传入多个矩形区域，批量统计每个区域的设备数
     */
    @PostMapping("/batchStats")
    public R<List<Map<String, Object>>> batchStats(@RequestBody List<Map<String, Object>> regions) {
        List<Map<String, Object>> results = new ArrayList<>();
        for (Map<String, Object> region : regions) {
            try {
                double minLat = ((Number) region.get("minLat")).doubleValue();
                double maxLat = ((Number) region.get("maxLat")).doubleValue();
                double minLng = ((Number) region.get("minLng")).doubleValue();
                double maxLng = ((Number) region.get("maxLng")).doubleValue();
                String regionName = (String) region.getOrDefault("name", "未命名区域");

                Query query = new Query();
                query.addCriteria(Criteria.where("latitude").gte(minLat).lte(maxLat));
                query.addCriteria(Criteria.where("longitude").gte(minLng).lte(maxLng));
                long total = mongoTemplate.count(query, Map.class, "device_status");

                Query onlineQuery = new Query();
                onlineQuery.addCriteria(Criteria.where("latitude").gte(minLat).lte(maxLat));
                onlineQuery.addCriteria(Criteria.where("longitude").gte(minLng).lte(maxLng));
                onlineQuery.addCriteria(Criteria.where("online").is(true));
                long online = mongoTemplate.count(onlineQuery, Map.class, "device_status");

                Map<String, Object> result = new HashMap<>();
                result.put("name", regionName);
                result.put("total", total);
                result.put("online", online);
                result.put("offline", total - online);
                results.add(result);
            } catch (Exception e) {
                log.warn("Batch stats region failed: {}", region.get("name"), e);
            }
        }
        // 按总数降序
        results.sort((a, b) -> Long.compare((Long) b.get("total"), (Long) a.get("total")));
        return R.success(results);
    }

    /**
     * 设备密度排行
     * 按经纬度网格统计，返回设备密度最高的前N个网格
     */
    @GetMapping("/densityRank")
    public R<List<Map<String, Object>>> densityRank(
            @RequestParam(defaultValue = "0.05") double gridSize,
            @RequestParam(defaultValue = "20") int topN) {

        try {
            List<Map> allDevices = mongoTemplate.findAll(Map.class, "device_status");

            // 按网格聚合
            Map<String, Map<String, Object>> gridMap = new HashMap<>();
            for (Map doc : allDevices) {
                Object latObj = doc.get("latitude");
                Object lngObj = doc.get("longitude");
                if (latObj == null || lngObj == null) continue;

                double lat = ((Number) latObj).doubleValue();
                double lng = ((Number) lngObj).doubleValue();

                int gridLat = (int) Math.floor(lat / gridSize);
                int gridLng = (int) Math.floor(lng / gridSize);
                String key = gridLat + "_" + gridLng;

                Map<String, Object> grid = gridMap.computeIfAbsent(key, k -> {
                    Map<String, Object> g = new HashMap<>();
                    g.put("centerLat", (gridLat + 0.5) * gridSize);
                    g.put("centerLng", (gridLng + 0.5) * gridSize);
                    g.put("count", 0);
                    g.put("onlineCount", 0);
                    return g;
                });
                grid.put("count", ((Integer) grid.get("count")) + 1);
                if (Boolean.TRUE.equals(doc.get("online"))) {
                    grid.put("onlineCount", ((Integer) grid.get("onlineCount")) + 1);
                }
            }

            List<Map<String, Object>> result = new ArrayList<>(gridMap.values());
            result.sort((a, b) -> ((Integer) b.get("count")).compareTo((Integer) a.get("count")));

            if (result.size() > topN) {
                result = result.subList(0, topN);
            }
            return R.success(result);
        } catch (Exception e) {
            log.error("Density rank failed", e);
            return R.success(new ArrayList<>());
        }
    }

    /**
     * 区域设备列表
     * 查询指定矩形区域内的设备列表
     */
    @GetMapping("/devices")
    public R<List<Map<String, Object>>> regionDevices(
            @RequestParam double minLat,
            @RequestParam double maxLat,
            @RequestParam double minLng,
            @RequestParam double maxLng,
            @RequestParam(defaultValue = "true") boolean onlyOnline,
            @RequestParam(defaultValue = "100") int limit) {

        try {
            Query query = new Query();
            query.addCriteria(Criteria.where("latitude").gte(minLat).lte(maxLat));
            query.addCriteria(Criteria.where("longitude").gte(minLng).lte(maxLng));
            if (onlyOnline) {
                query.addCriteria(Criteria.where("online").is(true));
            }
            query.limit(limit);
            query.fields().include("deviceId", "latitude", "longitude", "speed", "online", "lastTime");

            List<Map> devices = mongoTemplate.find(query, Map.class, "device_status");
            List<Map<String, Object>> result = new ArrayList<>();
            for (Map doc : devices) {
                Map<String, Object> device = new HashMap<>();
                device.put("deviceId", doc.get("deviceId"));
                device.put("lat", doc.get("latitude"));
                device.put("lng", doc.get("longitude"));
                device.put("speed", doc.get("speed"));
                device.put("online", doc.get("online"));
                device.put("lastTime", doc.get("lastTime"));
                result.add(device);
            }
            return R.success(result);
        } catch (Exception e) {
            log.error("Region devices failed", e);
            return R.success(new ArrayList<>());
        }
    }
}
