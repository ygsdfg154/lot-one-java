package com.lotone.device.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lotone.common.result.R;
import com.lotone.device.entity.AppMessage;
import com.lotone.device.service.AppMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/app/message")
public class AppMessageController {

    @Autowired
    private AppMessageService messageService;

    /**
     * 消息列表（分页）
     */
    @GetMapping("/list")
    public R<Map<String, Object>> list(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) Byte msgType,
            @RequestParam(required = false) Byte isRead) {

        Long userId = StpUtil.getLoginIdAsLong();
        LambdaQueryWrapper<AppMessage> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(AppMessage::getUserId, userId);
        if (msgType != null) {
            wrapper.eq(AppMessage::getMsgType, msgType);
        }
        if (isRead != null) {
            wrapper.eq(AppMessage::getIsRead, isRead);
        }
        wrapper.orderByDesc(AppMessage::getCreatedAt);

        Page<AppMessage> pageResult = messageService.page(new Page<>(page, pageSize), wrapper);

        Map<String, Object> result = new HashMap<>();
        result.put("list", pageResult.getRecords());
        result.put("total", pageResult.getTotal());
        result.put("page", page);
        result.put("pageSize", pageSize);
        return R.success(result);
    }

    /**
     * 消息详情
     */
    @GetMapping("/detail")
    public R<AppMessage> detail(@RequestParam Long id) {
        Long userId = StpUtil.getLoginIdAsLong();
        AppMessage msg = messageService.getById(id);
        if (msg == null || !msg.getUserId().equals(userId)) {
            return R.fail("消息不存在");
        }
        // 标记已读
        if (msg.getIsRead() == 0) {
            msg.setIsRead((byte) 1);
            msg.setReadTime(LocalDateTime.now());
            messageService.updateById(msg);
        }
        return R.success(msg);
    }

    /**
     * 标记已读
     */
    @PostMapping("/markRead")
    public R<Void> markRead(@RequestParam Long id) {
        Long userId = StpUtil.getLoginIdAsLong();
        AppMessage msg = messageService.getById(id);
        if (msg != null && msg.getUserId().equals(userId)) {
            msg.setIsRead((byte) 1);
            msg.setReadTime(LocalDateTime.now());
            messageService.updateById(msg);
        }
        return R.success();
    }

    /**
     * 全部标记已读
     */
    @PostMapping("/markAllRead")
    public R<Void> markAllRead() {
        Long userId = StpUtil.getLoginIdAsLong();
        AppMessage update = new AppMessage();
        update.setIsRead((byte) 1);
        update.setReadTime(LocalDateTime.now());
        messageService.update(update, new LambdaQueryWrapper<AppMessage>()
                .eq(AppMessage::getUserId, userId)
                .eq(AppMessage::getIsRead, 0));
        return R.success();
    }

    /**
     * 删除消息
     */
    @PostMapping("/delete")
    public R<Void> delete(@RequestParam Long id) {
        Long userId = StpUtil.getLoginIdAsLong();
        AppMessage msg = messageService.getById(id);
        if (msg != null && msg.getUserId().equals(userId)) {
            messageService.removeById(id);
        }
        return R.success();
    }

    /**
     * 消息统计（未读数、总数、按类型分组）
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Long userId = StpUtil.getLoginIdAsLong();

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", messageService.count(new LambdaQueryWrapper<AppMessage>()
                .eq(AppMessage::getUserId, userId)));
        stats.put("unread", messageService.count(new LambdaQueryWrapper<AppMessage>()
                .eq(AppMessage::getUserId, userId)
                .eq(AppMessage::getIsRead, 0)));

        // 按类型统计未读数
        Map<String, Object> unreadByType = new HashMap<>();
        for (int type = 1; type <= 4; type++) {
            long count = messageService.count(new LambdaQueryWrapper<AppMessage>()
                    .eq(AppMessage::getUserId, userId)
                    .eq(AppMessage::getIsRead, 0)
                    .eq(AppMessage::getMsgType, (byte) type));
            unreadByType.put(String.valueOf(type), count);
        }
        stats.put("unreadByType", unreadByType);

        return R.success(stats);
    }
}
