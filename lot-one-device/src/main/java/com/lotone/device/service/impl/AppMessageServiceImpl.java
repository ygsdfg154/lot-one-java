package com.lotone.device.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lotone.device.entity.AppMessage;
import com.lotone.device.mapper.AppMessageMapper;
import com.lotone.device.service.AppMessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class AppMessageServiceImpl extends ServiceImpl<AppMessageMapper, AppMessage> implements AppMessageService {

    @Override
    public void sendMessage(Long userId, Byte msgType, String title, String content,
                            String deviceId, String bizId, String jumpPath) {
        try {
            AppMessage msg = new AppMessage();
            msg.setUserId(userId);
            msg.setMsgType(msgType);
            msg.setTitle(title);
            msg.setContent(content);
            msg.setDeviceId(deviceId);
            msg.setBizId(bizId);
            msg.setJumpPath(jumpPath);
            msg.setIsRead((byte) 0);
            msg.setCreatedAt(LocalDateTime.now());
            save(msg);
            log.info("Send app message: userId={}, type={}, title={}", userId, msgType, title);
        } catch (Exception e) {
            log.error("Send app message failed: userId={}", userId, e);
        }
    }

    @Override
    public void sendBatchMessage(List<Long> userIds, Byte msgType, String title, String content, String jumpPath) {
        if (userIds == null || userIds.isEmpty()) return;
        List<AppMessage> messages = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        for (Long userId : userIds) {
            AppMessage msg = new AppMessage();
            msg.setUserId(userId);
            msg.setMsgType(msgType);
            msg.setTitle(title);
            msg.setContent(content);
            msg.setJumpPath(jumpPath);
            msg.setIsRead((byte) 0);
            msg.setCreatedAt(now);
            messages.add(msg);
        }
        saveBatch(messages);
        log.info("Send batch app messages: count={}, type={}, title={}", messages.size(), msgType, title);
    }
}
