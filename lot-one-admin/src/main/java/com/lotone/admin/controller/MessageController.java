package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.Message;
import com.lotone.admin.service.MessageService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/message")
public class MessageController extends BaseController<Message, MessageService> {

    /**
     * 发布消息（草稿→已发布）
     */
    @PostMapping("/publish")
    public R<String> publish(@RequestParam Long id) {
        Message msg = service.getById(id);
        if (msg == null) {
            return R.fail("消息不存在");
        }
        Message update = new Message();
        update.setId(id);
        update.setStatus((byte) 2); // 已发布
        update.setPublishedAt(LocalDateTime.now());
        update.setUpdatedAt(LocalDateTime.now());
        service.updateById(update);
        return R.success("消息已发布");
    }

    /**
     * 归档消息
     */
    @PostMapping("/archive")
    public R<String> archive(@RequestParam Long id) {
        Message update = new Message();
        update.setId(id);
        update.setStatus((byte) 3); // 已归档
        update.setUpdatedAt(LocalDateTime.now());
        service.updateById(update);
        return R.success("消息已归档");
    }

    /**
     * 保存草稿
     */
    @PostMapping("/saveDraft")
    public R<Long> saveDraft(@RequestBody Message msg) {
        msg.setStatus((byte) 1); // 草稿
        msg.setCreatedAt(LocalDateTime.now());
        msg.setUpdatedAt(LocalDateTime.now());
        service.save(msg);
        return R.success(msg.getId());
    }

    /**
     * 消息统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Map<String, Object> stats = new HashMap<>();
        long total = service.count();
        long draft = service.count(new LambdaQueryWrapper<Message>().eq(Message::getStatus, (byte) 1));
        long published = service.count(new LambdaQueryWrapper<Message>().eq(Message::getStatus, (byte) 2));
        long archived = service.count(new LambdaQueryWrapper<Message>().eq(Message::getStatus, (byte) 3));
        long announcement = service.count(new LambdaQueryWrapper<Message>().eq(Message::getMsgType, (byte) 1));
        long feedback = service.count(new LambdaQueryWrapper<Message>().eq(Message::getMsgType, (byte) 2));
        long notice = service.count(new LambdaQueryWrapper<Message>().eq(Message::getMsgType, (byte) 3));
        long alarm = service.count(new LambdaQueryWrapper<Message>().eq(Message::getMsgType, (byte) 4));

        stats.put("total", total);
        stats.put("draft", draft);
        stats.put("published", published);
        stats.put("archived", archived);
        stats.put("announcement", announcement);
        stats.put("feedback", feedback);
        stats.put("notice", notice);
        stats.put("alarm", alarm);
        return R.success(stats);
    }

    /**
     * 已发布消息列表（按类型）
     */
    @GetMapping("/published")
    public R<List<Message>> published(@RequestParam(required = false) Byte msgType) {
        LambdaQueryWrapper<Message> wrapper = new LambdaQueryWrapper<Message>()
                .eq(Message::getStatus, (byte) 2)
                .orderByDesc(Message::getPublishedAt);
        if (msgType != null) {
            wrapper.eq(Message::getMsgType, msgType);
        }
        List<Message> list = service.list(wrapper);
        return R.success(list);
    }

    /**
     * 紧急消息列表
     */
    @GetMapping("/urgent")
    public R<List<Message>> urgent() {
        List<Message> list = service.list(
                new LambdaQueryWrapper<Message>()
                        .eq(Message::getPriority, (byte) 2)
                        .eq(Message::getStatus, (byte) 2)
                        .orderByDesc(Message::getPublishedAt)
                        .last("LIMIT 10"));
        return R.success(list);
    }
}
