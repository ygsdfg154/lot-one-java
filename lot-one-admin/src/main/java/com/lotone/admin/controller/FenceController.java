package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.dto.FenceDTO;
import com.lotone.admin.entity.Fence;
import com.lotone.admin.entity.FenceDevice;
import com.lotone.admin.entity.FencePoint;
import com.lotone.admin.service.FenceDeviceService;
import com.lotone.admin.service.FencePointService;
import com.lotone.admin.service.FenceService;
import com.lotone.admin.util.GeoFenceUtils;
import com.lotone.admin.vo.FenceVO;
import com.lotone.common.result.R;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/fence")
public class FenceController extends com.lotone.common.controller.BaseController<Fence, FenceService> {

    @Autowired
    private FencePointService fencePointService;

    @Autowired
    private FenceDeviceService fenceDeviceService;

    /**
     * 围栏详情（含点位和关联设备）
     */
    @GetMapping("/detail")
    public R<FenceVO> detail(@RequestParam Integer id) {
        Fence fence = service.getById(id);
        if (fence == null) {
            return R.fail("围栏不存在");
        }
        FenceVO vo = new FenceVO();
        BeanUtils.copyProperties(fence, vo);

        // 查询点位
        List<FencePoint> points = fencePointService.list(
                new LambdaQueryWrapper<FencePoint>()
                        .eq(FencePoint::getFenceId, id)
                        .orderByAsc(FencePoint::getSeqNum));
        vo.setPoints(points);

        // 查询关联设备
        List<FenceDevice> devices = fenceDeviceService.list(
                new LambdaQueryWrapper<FenceDevice>()
                        .eq(FenceDevice::getFenceId, id));
        vo.setDeviceIds(devices.stream().map(FenceDevice::getDeviceId).collect(Collectors.toList()));

        return R.success(vo);
    }

    /**
     * 保存围栏（含点位和设备关联）
     */
    @PostMapping("/save")
    @Transactional(rollbackFor = Exception.class)
    public R<Integer> saveFence(@RequestBody FenceDTO dto) {
        Fence fence = new Fence();
        BeanUtils.copyProperties(dto, fence);
        fence.setUpdatedAt(LocalDateTime.now());

        if (dto.getId() == null) {
            // 新增
            fence.setCreatedAt(LocalDateTime.now());
            if (fence.getEnabled() == null) fence.setEnabled(true);
            service.save(fence);
        } else {
            // 更新
            service.updateById(fence);
            // 删除旧点位和设备关联
            fencePointService.remove(new LambdaQueryWrapper<FencePoint>().eq(FencePoint::getFenceId, dto.getId()));
            fenceDeviceService.remove(new LambdaQueryWrapper<FenceDevice>().eq(FenceDevice::getFenceId, dto.getId()));
        }

        Integer fenceId = fence.getId();

        // 保存点位（多边形围栏）
        if (dto.getFenceShapeType() != null && dto.getFenceShapeType() == 2 && dto.getPoints() != null) {
            int seq = 1;
            for (FencePoint point : dto.getPoints()) {
                point.setId(null);
                point.setFenceId(fenceId.longValue());
                point.setSeqNum(seq++);
                point.setCreatedAt(LocalDateTime.now());
                point.setUpdatedAt(LocalDateTime.now());
                fencePointService.save(point);
            }
        }

        // 保存设备关联
        if (dto.getDeviceIds() != null) {
            for (String deviceId : dto.getDeviceIds()) {
                FenceDevice fd = new FenceDevice();
                fd.setFenceId(fenceId.longValue());
                fd.setDeviceId(deviceId);
                fd.setCreatedAt(LocalDateTime.now());
                fd.setUpdatedAt(LocalDateTime.now());
                fenceDeviceService.save(fd);
            }
        }

        return R.success(fenceId);
    }

    /**
     * 围栏测试（测试点是否在围栏内）
     */
    @PostMapping("/test")
    public R<Map<String, Object>> testFence(@RequestBody Map<String, Object> params) {
        Integer fenceId = params.get("fenceId") != null ? Integer.parseInt(params.get("fenceId").toString()) : null;
        Double lat = params.get("lat") != null ? Double.parseDouble(params.get("lat").toString()) : null;
        Double lng = params.get("lng") != null ? Double.parseDouble(params.get("lng").toString()) : null;

        if (fenceId == null || lat == null || lng == null) {
            return R.fail("参数不完整");
        }

        Fence fence = service.getById(fenceId);
        if (fence == null) {
            return R.fail("围栏不存在");
        }

        boolean inFence = false;
        double distance = 0;

        if (fence.getFenceShapeType() != null && fence.getFenceShapeType() == 1) {
            // 圆形围栏
            if (fence.getCenterLat() != null && fence.getCenterLng() != null && fence.getFenceRadius() != null) {
                distance = GeoFenceUtils.distance(lat, lng, fence.getCenterLat(), fence.getCenterLng());
                inFence = distance <= fence.getFenceRadius();
            }
        } else if (fence.getFenceShapeType() != null && fence.getFenceShapeType() == 2) {
            // 多边形围栏
            List<FencePoint> points = fencePointService.list(
                    new LambdaQueryWrapper<FencePoint>()
                            .eq(FencePoint::getFenceId, fenceId)
                            .orderByAsc(FencePoint::getSeqNum));
            if (points.size() >= 3) {
                double[][] polygon = new double[points.size()][2];
                for (int i = 0; i < points.size(); i++) {
                    polygon[i][0] = points.get(i).getLat();
                    polygon[i][1] = points.get(i).getLng();
                }
                inFence = GeoFenceUtils.isPointInPolygon(lat, lng, polygon);
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("fenceId", fenceId);
        result.put("fenceName", fence.getFenceName());
        result.put("fenceShapeType", fence.getFenceShapeType());
        result.put("inFence", inFence);
        result.put("distance", Math.round(distance * 100.0) / 100.0);
        result.put("testPoint", Map.of("lat", lat, "lng", lng));

        return R.success(result);
    }

    /**
     * 启用/禁用围栏
     */
    @PostMapping("/toggle")
    public R<String> toggle(@RequestParam Integer id, @RequestParam Boolean enabled) {
        Fence fence = new Fence();
        fence.setId(id);
        fence.setEnabled(enabled);
        fence.setUpdatedAt(LocalDateTime.now());
        service.updateById(fence);
        return R.success(enabled ? "围栏已启用" : "围栏已禁用");
    }

    /**
     * 查询设备关联的围栏列表
     */
    @GetMapping("/byDevice")
    public R<List<Fence>> getByDevice(@RequestParam String deviceId) {
        List<FenceDevice> fenceDevices = fenceDeviceService.list(
                new LambdaQueryWrapper<FenceDevice>().eq(FenceDevice::getDeviceId, deviceId));
        if (fenceDevices.isEmpty()) {
            return R.success(new ArrayList<>());
        }
        List<Long> fenceIds = fenceDevices.stream().map(FenceDevice::getFenceId).collect(Collectors.toList());
        List<Fence> fences = service.listByIds(fenceIds);
        return R.success(fences);
    }
}
