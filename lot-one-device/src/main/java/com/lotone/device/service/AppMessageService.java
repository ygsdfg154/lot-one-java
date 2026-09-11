package com.lotone.device.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.lotone.device.entity.AppMessage;
import java.util.List;

public interface AppMessageService extends IService<AppMessage> {

    /**
     * 发送消息给用户
     */
    void sendMessage(Long userId, Byte msgType, String title, String content, String deviceId, String bizId, String jumpPath);

    /**
     * 批量发送消息
     */
    void sendBatchMessage(List<Long> userIds, Byte msgType, String title, String content, String jumpPath);
}
