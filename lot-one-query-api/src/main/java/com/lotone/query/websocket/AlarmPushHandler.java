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
public class AlarmPushHandler extends TextWebSocketHandler {

    /** 所有在线会话 */
    private static final Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

    /** 用户ID -> 会话集合（按用户推送） */
    private static final Map<String, Set<WebSocketSession>> userSessions = new ConcurrentHashMap<>();

    /** 会话 -> 用户ID */
    private static final Map<String, String> sessionUsers = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        log.info("Alarm WebSocket connected: sessionId={}, total={}", session.getId(), sessions.size());
        sendMessage(session, Map.of("type", "connected", "message", "报警推送连接成功"));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            JSONObject msg = JSON.parseObject(message.getPayload());
            String type = msg.getString("type");

            if ("bindUser".equals(type)) {
                // 绑定用户ID，用于按用户推送
                String userId = msg.getString("userId");
                if (userId != null && !userId.isEmpty()) {
                    bindUser(session, userId);
                    sendMessage(session, Map.of("type", "userBound", "userId", userId));
                }
            } else if ("ping".equals(type)) {
                sendMessage(session, Map.of("type", "pong", "timestamp", System.currentTimeMillis()));
            }
        } catch (Exception e) {
            log.warn("Handle alarm websocket message failed: sessionId={}", session.getId(), e);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        String userId = sessionUsers.remove(session.getId());
        if (userId != null) {
            Set<WebSocketSession> userSet = userSessions.get(userId);
            if (userSet != null) {
                userSet.remove(session);
            }
        }
        log.info("Alarm WebSocket disconnected: sessionId={}, total={}", session.getId(), sessions.size());
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.warn("Alarm WebSocket transport error: sessionId={}", session.getId(), exception);
        if (session.isOpen()) {
            session.close();
        }
    }

    private void bindUser(WebSocketSession session, String userId) {
        userSessions.computeIfAbsent(userId, k -> new CopyOnWriteArraySet<>()).add(session);
        sessionUsers.put(session.getId(), userId);
    }

    /**
     * 推送报警到所有连接
     */
    public void pushAlarm(Map<String, Object> alarm) {
        Map<String, Object> message = Map.of(
                "type", "alarm",
                "data", alarm
        );
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                sendMessage(session, message);
            }
        }
    }

    /**
     * 推送报警到指定用户
     */
    public void pushAlarmToUser(String userId, Map<String, Object> alarm) {
        Set<WebSocketSession> userSet = userSessions.get(userId);
        if (userSet == null || userSet.isEmpty()) {
            return;
        }
        Map<String, Object> message = Map.of(
                "type", "alarm",
                "data", alarm
        );
        for (WebSocketSession session : userSet) {
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
            log.warn("Send alarm websocket message failed: sessionId={}", session.getId(), e);
        }
    }

    public int getOnlineCount() {
        return sessions.size();
    }
}
