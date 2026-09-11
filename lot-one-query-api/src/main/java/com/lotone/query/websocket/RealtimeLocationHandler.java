package com.lotone.query.websocket;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

@Slf4j
@Component
public class RealtimeLocationHandler extends TextWebSocketHandler {

    /** 所有在线会话 */
    private static final Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

    /** 设备ID -> 订阅该设备的会话集合 */
    private static final Map<String, Set<WebSocketSession>> deviceSubscribers = new ConcurrentHashMap<>();

    /** 会话 -> 订阅的设备ID集合 */
    private static final Map<String, Set<String>> sessionSubscriptions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        log.info("WebSocket connected: sessionId={}, total={}", session.getId(), sessions.size());
        sendMessage(session, Map.of("type", "connected", "message", "连接成功"));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            JSONObject msg = JSON.parseObject(message.getPayload());
            String type = msg.getString("type");

            if ("subscribe".equals(type)) {
                String deviceId = msg.getString("deviceId");
                if (deviceId != null && !deviceId.isEmpty()) {
                    subscribeDevice(session, deviceId);
                    sendMessage(session, Map.of("type", "subscribed", "deviceId", deviceId));
                }
            } else if ("unsubscribe".equals(type)) {
                String deviceId = msg.getString("deviceId");
                if (deviceId != null && !deviceId.isEmpty()) {
                    unsubscribeDevice(session, deviceId);
                    sendMessage(session, Map.of("type", "unsubscribed", "deviceId", deviceId));
                }
            } else if ("ping".equals(type)) {
                sendMessage(session, Map.of("type", "pong", "timestamp", System.currentTimeMillis()));
            }
        } catch (Exception e) {
            log.warn("Handle websocket message failed: sessionId={}", session.getId(), e);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        Set<String> subscriptions = sessionSubscriptions.remove(session.getId());
        if (subscriptions != null) {
            for (String deviceId : subscriptions) {
                Set<WebSocketSession> subscribers = deviceSubscribers.get(deviceId);
                if (subscribers != null) {
                    subscribers.remove(session);
                }
            }
        }
        log.info("WebSocket disconnected: sessionId={}, total={}", session.getId(), sessions.size());
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.warn("WebSocket transport error: sessionId={}", session.getId(), exception);
        if (session.isOpen()) {
            session.close();
        }
    }

    private void subscribeDevice(WebSocketSession session, String deviceId) {
        deviceSubscribers.computeIfAbsent(deviceId, k -> new CopyOnWriteArraySet<>()).add(session);
        sessionSubscriptions.computeIfAbsent(session.getId(), k -> new CopyOnWriteArraySet<>()).add(deviceId);
    }

    private void unsubscribeDevice(WebSocketSession session, String deviceId) {
        Set<WebSocketSession> subscribers = deviceSubscribers.get(deviceId);
        if (subscribers != null) {
            subscribers.remove(session);
        }
        Set<String> subscriptions = sessionSubscriptions.get(session.getId());
        if (subscriptions != null) {
            subscriptions.remove(deviceId);
        }
    }

    /**
     * 推送设备位置到所有订阅者
     */
    public void pushLocation(String deviceId, Map<String, Object> location) {
        Set<WebSocketSession> subscribers = deviceSubscribers.get(deviceId);
        if (subscribers == null || subscribers.isEmpty()) {
            return;
        }
        Map<String, Object> message = Map.of(
                "type", "location",
                "deviceId", deviceId,
                "data", location
        );
        for (WebSocketSession session : subscribers) {
            if (session.isOpen()) {
                sendMessage(session, message);
            }
        }
    }

    private void sendMessage(WebSocketSession session, Object message) {
        if (!session.isOpen()) return;
        try {
            session.sendMessage(new TextMessage(JSON.toJSONString(message)));
        } catch (IOException e) {
            log.warn("Send websocket message failed: sessionId={}", session.getId(), e);
        }
    }

    public int getOnlineCount() {
        return sessions.size();
    }

    public int getSubscriberCount(String deviceId) {
        Set<WebSocketSession> subscribers = deviceSubscribers.get(deviceId);
        return subscribers != null ? subscribers.size() : 0;
    }
}
