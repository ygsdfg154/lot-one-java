package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.DeviceGroup;
import com.lotone.admin.entity.DeviceGroupDevice;
import com.lotone.admin.mapper.DeviceGroupDeviceMapper;
import com.lotone.admin.service.DeviceGroupService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/deviceGroup")
public class DeviceGroupController extends BaseController<DeviceGroup, DeviceGroupService> {

    @Autowired
    private DeviceGroupDeviceMapper groupDeviceMapper;

    /**
     * 分组树（树形结构）
     */
    @GetMapping("/tree")
    public R<List<Map<String, Object>>> tree() {
        List<DeviceGroup> all = service.list(new LambdaQueryWrapper<DeviceGroup>()
                .eq(DeviceGroup::getStatus, 1)
                .orderByAsc(DeviceGroup::getSortOrder));

        // 构建树
        Map<Long, List<DeviceGroup>> childrenMap = all.stream()
                .filter(g -> g.getParentId() != null)
                .collect(Collectors.groupingBy(DeviceGroup::getParentId));

        List<Map<String, Object>> tree = new ArrayList<>();
        for (DeviceGroup group : all) {
            if (group.getParentId() == null || group.getParentId() == 0) {
                tree.add(buildTreeNode(group, childrenMap));
            }
        }
        return R.success(tree);
    }

    private Map<String, Object> buildTreeNode(DeviceGroup group, Map<Long, List<DeviceGroup>> childrenMap) {
        Map<String, Object> node = new HashMap<>();
        node.put("id", group.getId());
        node.put("groupName", group.getGroupName());
        node.put("groupCode", group.getGroupCode());
        node.put("parentId", group.getParentId());
        node.put("description", group.getDescription());
        node.put("sortOrder", group.getSortOrder());
        node.put("status", group.getStatus());

        List<DeviceGroup> children = childrenMap.get(group.getId());
        if (children != null && !children.isEmpty()) {
            List<Map<String, Object>> childNodes = new ArrayList<>();
            for (DeviceGroup child : children) {
                childNodes.add(buildTreeNode(child, childrenMap));
            }
            node.put("children", childNodes);
        } else {
            node.put("children", new ArrayList<>());
        }
        return node;
    }

    /**
     * 一级分组列表
     */
    @GetMapping("/rootList")
    public R<List<DeviceGroup>> rootList() {
        List<DeviceGroup> list = service.list(new LambdaQueryWrapper<DeviceGroup>()
                .and(w -> w.isNull(DeviceGroup::getParentId).or().eq(DeviceGroup::getParentId, 0))
                .eq(DeviceGroup::getStatus, 1)
                .orderByAsc(DeviceGroup::getSortOrder));
        return R.success(list);
    }

    /**
     * 子分组列表
     */
    @GetMapping("/children")
    public R<List<DeviceGroup>> children(@RequestParam Long parentId) {
        List<DeviceGroup> list = service.list(new LambdaQueryWrapper<DeviceGroup>()
                .eq(DeviceGroup::getParentId, parentId)
                .eq(DeviceGroup::getStatus, 1)
                .orderByAsc(DeviceGroup::getSortOrder));
        return R.success(list);
    }

    /**
     * 启用/禁用分组
     */
    @PostMapping("/toggleStatus")
    public R<Void> toggleStatus(@RequestParam Long id, @RequestParam Byte status) {
        DeviceGroup group = new DeviceGroup();
        group.setId(id);
        group.setStatus(status);
        service.updateById(group);
        return R.success();
    }

    /**
     * 分组统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", service.count());
        stats.put("enabled", service.count(new LambdaQueryWrapper<DeviceGroup>().eq(DeviceGroup::getStatus, 1)));
        stats.put("disabled", service.count(new LambdaQueryWrapper<DeviceGroup>().eq(DeviceGroup::getStatus, 0)));
        return R.success(stats);
    }

    // ==================== 分组设备关联 ====================

    /**
     * 设备加入分组
     */
    @PostMapping("/addDevice")
    public R<Void> addDevice(@RequestParam Long groupId, @RequestParam String deviceId) {
        // 检查是否已存在
        Long count = groupDeviceMapper.selectCount(new LambdaQueryWrapper<DeviceGroupDevice>()
                .eq(DeviceGroupDevice::getGroupId, groupId)
                .eq(DeviceGroupDevice::getDeviceId, deviceId));
        if (count > 0) {
            return R.fail("设备已在该分组中");
        }
        DeviceGroupDevice relation = new DeviceGroupDevice();
        relation.setGroupId(groupId);
        relation.setDeviceId(deviceId);
        relation.setCreatedAt(LocalDateTime.now());
        groupDeviceMapper.insert(relation);
        return R.success();
    }

    /**
     * 批量设备加入分组
     */
    @PostMapping("/addDevices")
    public R<Map<String, Object>> addDevices(@RequestParam Long groupId, @RequestBody List<String> deviceIds) {
        int success = 0;
        int skipped = 0;
        for (String deviceId : deviceIds) {
            Long count = groupDeviceMapper.selectCount(new LambdaQueryWrapper<DeviceGroupDevice>()
                    .eq(DeviceGroupDevice::getGroupId, groupId)
                    .eq(DeviceGroupDevice::getDeviceId, deviceId));
            if (count > 0) {
                skipped++;
                continue;
            }
            DeviceGroupDevice relation = new DeviceGroupDevice();
            relation.setGroupId(groupId);
            relation.setDeviceId(deviceId);
            relation.setCreatedAt(LocalDateTime.now());
            groupDeviceMapper.insert(relation);
            success++;
        }
        Map<String, Object> result = new HashMap<>();
        result.put("success", success);
        result.put("skipped", skipped);
        result.put("total", deviceIds.size());
        return R.success(result);
    }

    /**
     * 设备移出分组
     */
    @PostMapping("/removeDevice")
    public R<Void> removeDevice(@RequestParam Long groupId, @RequestParam String deviceId) {
        groupDeviceMapper.delete(new LambdaQueryWrapper<DeviceGroupDevice>()
                .eq(DeviceGroupDevice::getGroupId, groupId)
                .eq(DeviceGroupDevice::getDeviceId, deviceId));
        return R.success();
    }

    /**
     * 批量设备移出分组
     */
    @PostMapping("/removeDevices")
    public R<Void> removeDevices(@RequestParam Long groupId, @RequestBody List<String> deviceIds) {
        groupDeviceMapper.delete(new LambdaQueryWrapper<DeviceGroupDevice>()
                .eq(DeviceGroupDevice::getGroupId, groupId)
                .in(DeviceGroupDevice::getDeviceId, deviceIds));
        return R.success();
    }

    /**
     * 查询分组下的设备ID列表
     */
    @GetMapping("/deviceIds")
    public R<List<String>> deviceIds(@RequestParam Long groupId) {
        List<DeviceGroupDevice> relations = groupDeviceMapper.selectList(
                new LambdaQueryWrapper<DeviceGroupDevice>().eq(DeviceGroupDevice::getGroupId, groupId));
        List<String> deviceIds = relations.stream()
                .map(DeviceGroupDevice::getDeviceId)
                .collect(Collectors.toList());
        return R.success(deviceIds);
    }

    /**
     * 查询设备所在的分组列表
     */
    @GetMapping("/byDevice")
    public R<List<DeviceGroup>> groupsByDevice(@RequestParam String deviceId) {
        List<DeviceGroupDevice> relations = groupDeviceMapper.selectList(
                new LambdaQueryWrapper<DeviceGroupDevice>().eq(DeviceGroupDevice::getDeviceId, deviceId));
        if (relations.isEmpty()) {
            return R.success(new ArrayList<>());
        }
        List<Long> groupIds = relations.stream()
                .map(DeviceGroupDevice::getGroupId)
                .collect(Collectors.toList());
        List<DeviceGroup> groups = service.listByIds(groupIds);
        return R.success(groups);
    }

    /**
     * 分组设备数量统计
     */
    @GetMapping("/deviceCount")
    public R<Map<String, Object>> deviceCount(@RequestParam Long groupId) {
        Long count = groupDeviceMapper.selectCount(
                new LambdaQueryWrapper<DeviceGroupDevice>().eq(DeviceGroupDevice::getGroupId, groupId));
        Map<String, Object> result = new HashMap<>();
        result.put("groupId", groupId);
        result.put("deviceCount", count);
        return R.success(result);
    }
}
