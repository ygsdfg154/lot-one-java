package com.lotone.iot.gateway.service;

import io.netty.channel.Channel;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DeviceSession {
    private String phone;
    private Channel channel;
    private boolean authenticated;
    private LocalDateTime connectTime;
    private LocalDateTime lastHeartbeat;
    private LocalDateTime lastMessageTime;
    private long messageCount;

    public DeviceSession(String phone, Channel channel) {
        this.phone = phone;
        this.channel = channel;
        this.connectTime = LocalDateTime.now();
        this.lastHeartbeat = LocalDateTime.now();
        this.lastMessageTime = LocalDateTime.now();
        this.messageCount = 0;
    }

    public void touch() {
        this.lastMessageTime = LocalDateTime.now();
        this.messageCount++;
    }

    public void heartbeat() {
        this.lastHeartbeat = LocalDateTime.now();
    }
}
