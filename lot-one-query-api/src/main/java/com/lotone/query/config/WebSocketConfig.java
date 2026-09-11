package com.lotone.query.config;

import com.lotone.query.websocket.AlarmPushHandler;
import com.lotone.query.websocket.RealtimeLocationHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private RealtimeLocationHandler realtimeLocationHandler;

    @Autowired
    private AlarmPushHandler alarmPushHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(realtimeLocationHandler, "/ws/realtime")
                .setAllowedOrigins("*");
        registry.addHandler(alarmPushHandler, "/ws/alarm")
                .setAllowedOrigins("*");
    }
}
