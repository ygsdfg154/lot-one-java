package com.lotone.device.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.common.result.R;
import com.lotone.device.entity.DeviceShare;
import com.lotone.device.entity.AppUserDevice;
import com.lotone.device.mapper.DeviceShareMapper;
import com.lotone.device.service.AppUserDeviceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/app/share")
public class DeviceShareController {

    @Autowired
    private DeviceShareMapper shareMapper;

    @Autowired
    private AppUserDeviceService userDeviceService;

    /**
     * 创建设备分享
     */
    @PostMapping("/create")
    public R<Map<String, Object>> createShare(
            @RequestParam String deviceId,
            @RequestParam(required = false) String remark,
            @RequestParam(defaultValue = "7") int expireDays) {

        Long userId = StpUtil.getLoginIdAsLong();

        // 验证设备归属
        if (!userDeviceService.isDeviceBound(userId, deviceId)) {
            return R.fail("设备未绑定，无法分享");
        }

        // 生成6位分享码
        String shareCode = generateShareCode();

        DeviceShare share = new DeviceShare();
        share.setFromUserId(userId);
        share.setDeviceId(deviceId);
        share.setShareCode(shareCode);
        share.setRemark(remark);
        share.setStatus((byte) 0);
        share.setCreatedAt(LocalDateTime.now());
        share.setExpireTime(LocalDateTime.now().plusDays(expireDays));
        shareMapper.insert(share);

        Map<String, Object> result = new HashMap<>();
        result.put("shareId", share.getId());
        result.put("shareCode", shareCode);
        result.put("deviceId", deviceId);
        result.put("expireTime", share.getExpireTime());
        result.put("expireDays", expireDays);
        return R.success(result);
    }

    /**
     * 接受设备分享（通过分享码）
     */
    @PostMapping("/accept")
    public R<Map<String, Object>> acceptShare(@RequestParam String shareCode) {
        Long userId = StpUtil.getLoginIdAsLong();

        // 查询分享记录
        DeviceShare share = shareMapper.selectOne(new LambdaQueryWrapper<DeviceShare>()
                .eq(DeviceShare::getShareCode, shareCode)
                .eq(DeviceShare::getStatus, 0));

        if (share == null) {
            return R.fail("分享码无效或已被使用");
        }

        // 检查是否过期
        if (share.getExpireTime() != null && share.getExpireTime().isBefore(LocalDateTime.now())) {
            share.setStatus((byte) 3);
            shareMapper.updateById(share);
            return R.fail("分享已过期");
        }

        // 不能接受自己的分享
        if (share.getFromUserId().equals(userId)) {
            return R.fail("不能接受自己的分享");
        }

        // 检查设备是否已绑定
        if (userDeviceService.isDeviceBound(userId, share.getDeviceId())) {
            return R.fail("设备已绑定到您的账户");
        }

        // 绑定设备
        userDeviceService.bindDevice(userId, share.getDeviceId(), "分享设备-" + shareCode, null);

        // 更新分享状态
        share.setToUserId(userId);
        share.setStatus((byte) 1);
        share.setAcceptTime(LocalDateTime.now());
        share.setUpdatedAt(LocalDateTime.now());
        shareMapper.updateById(share);

        Map<String, Object> result = new HashMap<>();
        result.put("shareId", share.getId());
        result.put("deviceId", share.getDeviceId());
        result.put("fromUserId", share.getFromUserId());
        result.put("acceptTime", share.getAcceptTime());
        return R.success(result);
    }

    /**
     * 取消分享
     */
    @PostMapping("/cancel")
    public R<Void> cancelShare(@RequestParam Long shareId) {
        Long userId = StpUtil.getLoginIdAsLong();
        DeviceShare share = shareMapper.selectById(shareId);
        if (share == null || !share.getFromUserId().equals(userId)) {
            return R.fail("分享记录不存在或无权操作");
        }
        if (share.getStatus() != 0) {
            return R.fail("该分享已被接受或已取消");
        }
        share.setStatus((byte) 2);
        share.setUpdatedAt(LocalDateTime.now());
        shareMapper.updateById(share);
        return R.success();
    }

    /**
     * 我发起的分享列表
     */
    @GetMapping("/myShares")
    public R<List<Map<String, Object>>> myShares(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize) {
        Long userId = StpUtil.getLoginIdAsLong();
        List<DeviceShare> shares = shareMapper.selectList(new LambdaQueryWrapper<DeviceShare>()
                .eq(DeviceShare::getFromUserId, userId)
                .orderByDesc(DeviceShare::getId)
                .last("LIMIT " + (page - 1) * pageSize + "," + pageSize));

        List<Map<String, Object>> result = new ArrayList<>();
        for (DeviceShare share : shares) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", share.getId());
            item.put("deviceId", share.getDeviceId());
            item.put("shareCode", share.getShareCode());
            item.put("remark", share.getRemark());
            item.put("status", share.getStatus());
            item.put("statusText", getStatusText(share.getStatus()));
            item.put("toUserId", share.getToUserId());
            item.put("createdAt", share.getCreatedAt());
            item.put("expireTime", share.getExpireTime());
            item.put("acceptTime", share.getAcceptTime());
            result.add(item);
        }
        return R.success(result);
    }

    /**
     * 分享给我的设备列表
     */
    @GetMapping("/sharedToMe")
    public R<List<Map<String, Object>>> sharedToMe() {
        Long userId = StpUtil.getLoginIdAsLong();
        List<DeviceShare> shares = shareMapper.selectList(new LambdaQueryWrapper<DeviceShare>()
                .eq(DeviceShare::getToUserId, userId)
                .eq(DeviceShare::getStatus, 1)
                .orderByDesc(DeviceShare::getAcceptTime));

        List<Map<String, Object>> result = new ArrayList<>();
        for (DeviceShare share : shares) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", share.getId());
            item.put("deviceId", share.getDeviceId());
            item.put("fromUserId", share.getFromUserId());
            item.put("remark", share.getRemark());
            item.put("acceptTime", share.getAcceptTime());
            result.add(item);
        }
        return R.success(result);
    }

    /**
     * 分享统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Long userId = StpUtil.getLoginIdAsLong();
        Map<String, Object> stats = new HashMap<>();
        stats.put("myShareCount", shareMapper.selectCount(new LambdaQueryWrapper<DeviceShare>()
                .eq(DeviceShare::getFromUserId, userId)));
        stats.put("acceptedCount", shareMapper.selectCount(new LambdaQueryWrapper<DeviceShare>()
                .eq(DeviceShare::getFromUserId, userId)
                .eq(DeviceShare::getStatus, 1)));
        stats.put("pendingCount", shareMapper.selectCount(new LambdaQueryWrapper<DeviceShare>()
                .eq(DeviceShare::getFromUserId, userId)
                .eq(DeviceShare::getStatus, 0)));
        stats.put("sharedToMeCount", shareMapper.selectCount(new LambdaQueryWrapper<DeviceShare>()
                .eq(DeviceShare::getToUserId, userId)
                .eq(DeviceShare::getStatus, 1)));
        return R.success(stats);
    }

    private String generateShareCode() {
        // 生成6位数字+字母分享码
        String chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        StringBuilder code = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            code.append(chars.charAt(random.nextInt(chars.length())));
        }
        return code.toString();
    }

    private String getStatusText(Byte status) {
        if (status == null) return "未知";
        switch (status) {
            case 0: return "待接受";
            case 1: return "已接受";
            case 2: return "已取消";
            case 3: return "已过期";
            default: return "未知";
        }
    }
}
