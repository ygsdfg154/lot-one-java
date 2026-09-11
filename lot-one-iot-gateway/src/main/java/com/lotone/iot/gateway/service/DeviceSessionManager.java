package com.lotone.iot.gateway.service;

import io.netty.channel.Channel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Service
public class DeviceSessionManager {

    private final Map<String, DeviceSession> sessions = new ConcurrentHashMap<>();
    private final Map<String, String> channelToPhone = new ConcurrentHashMap<>();

    /** 心跳超时时间（秒），超过此时间无消息则认为离线 */
    private static final long HEARTBEAT_TIMEOUT_SECONDS = 300;

    public void register(String phone, Channel channel) {
        DeviceSession session = new DeviceSession(phone, channel);
        session.setAuthenticated(true);
        sessions.put(phone, session);
        channelToPhone.put(channel.id().asLongText(), phone);
        log.info("Device registered: phone={}, channel={}", phone, channel.id());
    }

    public void unregister(Channel channel) {
        String phone = channelToPhone.remove(channel.id().asLongText());
        if (phone != null) {
            DeviceSession session = sessions.remove(phone);
            if (session != null) {
                log.info("Device unregistered: phone={}, onlineDuration={}s, messageCount={}",
                        phone,
                        Duration.between(session.getConnectTime(), LocalDateTime.now()).getSeconds(),
                        session.getMessageCount());
            }
        }
    }

    public boolean isAuthenticated(String phone) {
        DeviceSession session = sessions.get(phone);
        return session != null && session.isAuthenticated();
    }

    public Channel getChannel(String phone) {
        DeviceSession session = sessions.get(phone);
        return session != null ? session.getChannel() : null;
    }

    /** 根据 Channel 获取手机号 */
    public String getPhoneByChannel(Channel channel) {
        return channelToPhone.get(channel.id().asLongText());
    }

    public DeviceSession getSession(String phone) {
        return sessions.get(phone);
    }

    /** 更新设备最后消息时间 */
    public void touch(String phone) {
        DeviceSession session = sessions.get(phone);
        if (session != null) {
            session.touch();
        }
    }

    /** 更新心跳时间 */
    public void heartbeat(String phone) {
        DeviceSession session = sessions.get(phone);
        if (session != null) {
            session.heartbeat();
        }
    }

    public int getOnlineCount() {
        return sessions.size();
    }

    /** 获取所有会话 */
    public Map<String, DeviceSession> getAllSessions() {
        return sessions;
    }

    /** 检测并移除超时会话，返回被移除的设备手机号列表 */
    public java.util.List<String> checkTimeoutSessions() {
        LocalDateTime now = LocalDateTime.now();
        java.util.List<String> timeoutPhones = sessions.entrySet().stream()
                .filter(e -> Duration.between(e.getValue().getLastMessageTime(), now).getSeconds() > HEARTBEAT_TIMEOUT_SECONDS)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        for (String phone : timeoutPhones) {
            DeviceSession session = sessions.remove(phone);
            if (session != null) {
                channelToPhone.remove(session.getChannel().id().asLongText());
                try {
                    session.getChannel().close();
                } catch (Exception e) {
                    log.warn("Close timeout channel failed: phone={}", phone, e);
                }
                log.info("Device timeout removed: phone={}", phone);
            }
        }
        return timeoutPhones;
    }
}
