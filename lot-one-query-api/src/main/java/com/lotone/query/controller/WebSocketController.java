package com.lotone.query.controller;

import com.lotone.common.result.R;
import com.lotone.query.websocket.RealtimeLocationHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/query/api/ws")
public class WebSocketController {

    @Autowired
    private RealtimeLocationHandler realtimeLocationHandler;

    /**
     * WebSocket 连接状态
     */
    @GetMapping("/status")
    public R<Map<String, Object>> status() {
        Map<String, Object> status = new HashMap<>();
        status.put("onlineConnections", realtimeLocationHandler.getOnlineCount());
        status.put("endpoint", "/ws/realtime");
        status.put("description", "WebSocket实时位置推送端点");
        return R.success(status);
    }

    /**
     * 查询某设备的订阅者数量
     */
    @GetMapping("/subscribers/{deviceId}")
    public R<Map<String, Object>> subscribers(@PathVariable String deviceId) {
        Map<String, Object> result = new HashMap<>();
        result.put("deviceId", deviceId);
        result.put("subscriberCount", realtimeLocationHandler.getSubscriberCount(deviceId));
        return R.success(result);
    }
}
