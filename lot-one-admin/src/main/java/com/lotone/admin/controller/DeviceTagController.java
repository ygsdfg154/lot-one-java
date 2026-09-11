package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.DeviceTag;
import com.lotone.admin.entity.DeviceTagRelation;
import com.lotone.admin.mapper.DeviceTagMapper;
import com.lotone.admin.mapper.DeviceTagRelationMapper;
import com.lotone.common.result.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/deviceTag")
public class DeviceTagController {

    @Autowired
    private DeviceTagMapper tagMapper;

    @Autowired
    private DeviceTagRelationMapper relationMapper;

    /**
     * 标签列表
     */
    @GetMapping("/list")
    public R<List<DeviceTag>> list() {
        List<DeviceTag> tags = tagMapper.selectList(new LambdaQueryWrapper<DeviceTag>()
                .eq(DeviceTag::getStatus, 1)
                .orderByDesc(DeviceTag::getId));
        return R.success(tags);
    }

    /**
     * 标签分页
     */
    @GetMapping("/page")
    public R<Map<String, Object>> page(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String tagName) {
        LambdaQueryWrapper<DeviceTag> wrapper = new LambdaQueryWrapper<>();
        if (tagName != null && !tagName.isEmpty()) {
            wrapper.like(DeviceTag::getTagName, tagName);
        }
        wrapper.orderByDesc(DeviceTag::getId);

        long total = tagMapper.selectCount(wrapper);
        List<DeviceTag> list = tagMapper.selectList(wrapper.last("LIMIT " + (page - 1) * pageSize + "," + pageSize));

        // 统计每个标签的设备数
        List<Map<String, Object>> resultList = new ArrayList<>();
        for (DeviceTag tag : list) {
            Long deviceCount = relationMapper.selectCount(new LambdaQueryWrapper<DeviceTagRelation>()
                    .eq(DeviceTagRelation::getTagId, tag.getId()));
            Map<String, Object> item = new HashMap<>();
            item.put("id", tag.getId());
            item.put("tagName", tag.getTagName());
            item.put("tagColor", tag.getTagColor());
            item.put("description", tag.getDescription());
            item.put("status", tag.getStatus());
            item.put("deviceCount", deviceCount);
            item.put("createdAt", tag.getCreatedAt());
            resultList.add(item);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("list", resultList);
        result.put("total", total);
        result.put("page", page);
        result.put("pageSize", pageSize);
        return R.success(result);
    }

    /**
     * 新增标签
     */
    @PostMapping("/add")
    public R<Void> add(@RequestBody DeviceTag tag) {
        tag.setCreatedAt(LocalDateTime.now());
        tag.setStatus((byte) 1);
        tagMapper.insert(tag);
        return R.success();
    }

    /**
     * 修改标签
     */
    @PostMapping("/edit")
    public R<Void> edit(@RequestBody DeviceTag tag) {
        tag.setUpdatedAt(LocalDateTime.now());
        tagMapper.updateById(tag);
        return R.success();
    }

    /**
     * 删除标签
     */
    @PostMapping("/delete")
    public R<Void> delete(@RequestParam Long id) {
        tagMapper.deleteById(id);
        // 同时删除关联关系
        relationMapper.delete(new LambdaQueryWrapper<DeviceTagRelation>()
                .eq(DeviceTagRelation::getTagId, id));
        return R.success();
    }

    /**
     * 给设备打标签
     */
    @PostMapping("/bindDevice")
    public R<Void> bindDevice(@RequestParam Long tagId, @RequestParam String deviceId) {
        Long count = relationMapper.selectCount(new LambdaQueryWrapper<DeviceTagRelation>()
                .eq(DeviceTagRelation::getTagId, tagId)
                .eq(DeviceTagRelation::getDeviceId, deviceId));
        if (count > 0) {
            return R.fail("设备已绑定该标签");
        }
        DeviceTagRelation relation = new DeviceTagRelation();
        relation.setTagId(tagId);
        relation.setDeviceId(deviceId);
        relation.setCreatedAt(LocalDateTime.now());
        relationMapper.insert(relation);
        return R.success();
    }

    /**
     * 批量给设备打标签
     */
    @PostMapping("/bindDevices")
    public R<Map<String, Object>> bindDevices(@RequestParam Long tagId, @RequestBody List<String> deviceIds) {
        int success = 0;
        int skipped = 0;
        for (String deviceId : deviceIds) {
            Long count = relationMapper.selectCount(new LambdaQueryWrapper<DeviceTagRelation>()
                    .eq(DeviceTagRelation::getTagId, tagId)
                    .eq(DeviceTagRelation::getDeviceId, deviceId));
            if (count > 0) {
                skipped++;
                continue;
            }
            DeviceTagRelation relation = new DeviceTagRelation();
            relation.setTagId(tagId);
            relation.setDeviceId(deviceId);
            relation.setCreatedAt(LocalDateTime.now());
            relationMapper.insert(relation);
            success++;
        }
        Map<String, Object> result = new HashMap<>();
        result.put("success", success);
        result.put("skipped", skipped);
        result.put("total", deviceIds.size());
        return R.success(result);
    }

    /**
     * 移除设备标签
     */
    @PostMapping("/unbindDevice")
    public R<Void> unbindDevice(@RequestParam Long tagId, @RequestParam String deviceId) {
        relationMapper.delete(new LambdaQueryWrapper<DeviceTagRelation>()
                .eq(DeviceTagRelation::getTagId, tagId)
                .eq(DeviceTagRelation::getDeviceId, deviceId));
        return R.success();
    }

    /**
     * 查询设备的所有标签
     */
    @GetMapping("/byDevice")
    public R<List<DeviceTag>> tagsByDevice(@RequestParam String deviceId) {
        List<DeviceTagRelation> relations = relationMapper.selectList(
                new LambdaQueryWrapper<DeviceTagRelation>().eq(DeviceTagRelation::getDeviceId, deviceId));
        if (relations.isEmpty()) {
            return R.success(new ArrayList<>());
        }
        List<Long> tagIds = relations.stream().map(DeviceTagRelation::getTagId).collect(Collectors.toList());
        List<DeviceTag> tags = tagMapper.selectBatchIds(tagIds);
        return R.success(tags);
    }

    /**
     * 查询标签下的设备ID列表
     */
    @GetMapping("/deviceIds")
    public R<List<String>> deviceIds(@RequestParam Long tagId) {
        List<DeviceTagRelation> relations = relationMapper.selectList(
                new LambdaQueryWrapper<DeviceTagRelation>().eq(DeviceTagRelation::getTagId, tagId));
        List<String> deviceIds = relations.stream()
                .map(DeviceTagRelation::getDeviceId).collect(Collectors.toList());
        return R.success(deviceIds);
    }

    /**
     * 标签统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalTags", tagMapper.selectCount(null));
        stats.put("enabledTags", tagMapper.selectCount(new LambdaQueryWrapper<DeviceTag>()
                .eq(DeviceTag::getStatus, 1)));
        stats.put("totalRelations", relationMapper.selectCount(null));
        return R.success(stats);
    }
}
