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
@RequestMapping("/query/api/heatmap")
public class HeatmapController {

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 设备分布热力图数据
     * 返回所有在线设备的经纬度，前端按密度渲染热力图
     */
    @GetMapping("/devices")
    public R<List<Map<String, Object>>> deviceHeatmap(
            @RequestParam(required = false) Double minLat,
            @RequestParam(required = false) Double maxLat,
            @RequestParam(required = false) Double minLng,
            @RequestParam(required = false) Double maxLng,
            @RequestParam(defaultValue = "true") boolean onlyOnline) {

        try {
            Query query = new Query();
            // 经纬度范围筛选
            if (minLat != null && maxLat != null) {
                query.addCriteria(Criteria.where("latitude").gte(minLat).lte(maxLat));
            }
            if (minLng != null && maxLng != null) {
                query.addCriteria(Criteria.where("longitude").gte(minLng).lte(maxLng));
            }
            // 只看在线设备
            if (onlyOnline) {
                query.addCriteria(Criteria.where("online").is(true));
            }
            // 只返回需要的字段
            query.fields().include("deviceId", "latitude", "longitude", "speed", "online", "lastTime");

            List<Map> devices = mongoTemplate.find(query, Map.class, "device_status");
            List<Map<String, Object>> result = new ArrayList<>();
            for (Map doc : devices) {
                Map<String, Object> point = new HashMap<>();
                point.put("deviceId", doc.get("deviceId"));
                point.put("lat", doc.get("latitude"));
                point.put("lng", doc.get("longitude"));
                point.put("speed", doc.get("speed"));
                point.put("online", doc.get("online"));
                point.put("count", 1); // 每个设备算1个点
                result.add(point);
            }
            return R.success(result);
        } catch (Exception e) {
            log.error("Get device heatmap failed", e);
            return R.success(new ArrayList<>());
        }
    }

    /**
     * 网格聚合热力图
     * 将地图划分为指定大小的网格，统计每个网格内的设备数量
     * @param gridSize 网格大小（度），默认0.01度约1公里
     */
    @GetMapping("/grid")
    public R<List<Map<String, Object>>> gridHeatmap(
            @RequestParam(defaultValue = "0.01") double gridSize,
            @RequestParam(required = false) Double minLat,
            @RequestParam(required = false) Double maxLat,
            @RequestParam(required = false) Double minLng,
            @RequestParam(required = false) Double maxLng) {

        try {
            // 先获取所有设备位置
            Query query = new Query();
            query.addCriteria(Criteria.where("online").is(true));
            if (minLat != null && maxLat != null) {
                query.addCriteria(Criteria.where("latitude").gte(minLat).lte(maxLat));
            }
            if (minLng != null && maxLng != null) {
                query.addCriteria(Criteria.where("longitude").gte(minLng).lte(maxLng));
            }
            query.fields().include("latitude", "longitude");

            List<Map> devices = mongoTemplate.find(query, Map.class, "device_status");

            // 按网格聚合
            Map<String, Map<String, Object>> gridMap = new HashMap<>();
            for (Map doc : devices) {
                Object latObj = doc.get("latitude");
                Object lngObj = doc.get("longitude");
                if (latObj == null || lngObj == null) continue;

                double lat = ((Number) latObj).doubleValue();
                double lng = ((Number) lngObj).doubleValue();

                // 计算网格坐标
                int gridLat = (int) Math.floor(lat / gridSize);
                int gridLng = (int) Math.floor(lng / gridSize);
                String key = gridLat + "_" + gridLng;

                Map<String, Object> grid = gridMap.computeIfAbsent(key, k -> {
                    Map<String, Object> g = new HashMap<>();
                    g.put("gridLat", gridLat);
                    g.put("gridLng", gridLng);
                    g.put("centerLat", (gridLat + 0.5) * gridSize);
                    g.put("centerLng", (gridLng + 0.5) * gridSize);
                    g.put("count", 0);
                    return g;
                });
                grid.put("count", ((Integer) grid.get("count")) + 1);
            }

            List<Map<String, Object>> result = new ArrayList<>(gridMap.values());
            // 按数量降序
            result.sort((a, b) -> ((Integer) b.get("count")).compareTo((Integer) a.get("count")));
            return R.success(result);
        } catch (Exception e) {
            log.error("Get grid heatmap failed", e);
            return R.success(new ArrayList<>());
        }
    }

    /**
     * 设备分布统计
     * 按速度区间、在线状态等维度统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> distributionStats() {
        try {
            List<Map> allDevices = mongoTemplate.findAll(Map.class, "device_status");

            Map<String, Object> stats = new HashMap<>();
            stats.put("total", allDevices.size());

            long online = 0;
            long offline = 0;
            long speed0_30 = 0;
            long speed30_60 = 0;
            long speed60_100 = 0;
            long speed100_plus = 0;
            double totalSpeed = 0;
            int speedCount = 0;

            for (Map doc : allDevices) {
                Object onlineObj = doc.get("online");
                if (Boolean.TRUE.equals(onlineObj)) {
                    online++;
                } else {
                    offline++;
                }

                Object speedObj = doc.get("speed");
                if (speedObj != null) {
                    double speed = ((Number) speedObj).doubleValue();
                    totalSpeed += speed;
                    speedCount++;
                    if (speed < 30) speed0_30++;
                    else if (speed < 60) speed30_60++;
                    else if (speed < 100) speed60_100++;
                    else speed100_plus++;
                }
            }

            stats.put("online", online);
            stats.put("offline", offline);
            stats.put("onlineRate", allDevices.size() > 0 ? Math.round(online * 10000.0 / allDevices.size()) / 100.0 : 0);
            stats.put("speedDistribution", Map.of(
                    "0-30", speed0_30,
                    "30-60", speed30_60,
                    "60-100", speed60_100,
                    "100+", speed100_plus
            ));
            stats.put("avgSpeed", speedCount > 0 ? Math.round(totalSpeed / speedCount * 10.0) / 10.0 : 0);

            return R.success(stats);
        } catch (Exception e) {
            log.error("Get distribution stats failed", e);
            return R.success(new HashMap<>());
        }
    }
}
