package com.lotone.iot.gateway.controller;

import com.lotone.common.result.R;
import com.lotone.iot.gateway.service.DeviceSession;
import com.lotone.iot.gateway.service.DeviceSessionManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.management.ManagementFactory;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/gateway/api")
public class GatewayController {

    @Autowired
    private DeviceSessionManager sessionManager;

    /** 网关启动时间 */
    private static final LocalDateTime START_TIME = LocalDateTime.now();

    /**
     * 网关状态概览
     */
    @GetMapping("/status")
    public R<Map<String, Object>> status() {
        Map<String, Object> status = new HashMap<>();
        status.put("onlineCount", sessionManager.getOnlineCount());
        status.put("startTime", START_TIME.toString());
        status.put("uptimeSeconds", Duration.between(START_TIME, LocalDateTime.now()).getSeconds());
        status.put("uptimeFormatted", formatUptime(Duration.between(START_TIME, LocalDateTime.now()).getSeconds()));

        // JVM 信息
        Runtime runtime = Runtime.getRuntime();
        status.put("jvmMaxMemory", runtime.maxMemory() / 1024 / 1024 + "MB");
        status.put("jvmUsedMemory", (runtime.totalMemory() - runtime.freeMemory()) / 1024 / 1024 + "MB");
        status.put("jvmFreeMemory", runtime.freeMemory() / 1024 / 1024 + "MB");
        status.put("availableProcessors", runtime.availableProcessors());

        // 系统运行时间
        status.put("processUptime", ManagementFactory.getRuntimeMXBean().getUptime() / 1000 + "s");

        return R.success(status);
    }

    /**
     * 在线设备列表（分页）
     */
    @GetMapping("/onlineDevices")
    public R<Map<String, Object>> onlineDevices(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String keyword) {

        List<DeviceSession> allSessions = new ArrayList<>(sessionManager.getAllSessions().values());

        // 关键词筛选
        if (keyword != null && !keyword.isEmpty()) {
            allSessions = allSessions.stream()
                    .filter(s -> s.getPhone() != null && s.getPhone().contains(keyword))
                    .collect(Collectors.toList());
        }

        // 按最后消息时间倒序
        allSessions.sort(Comparator.comparing(DeviceSession::getLastMessageTime).reversed());

        int total = allSessions.size();
        int fromIndex = (page - 1) * pageSize;
        int toIndex = Math.min(fromIndex + pageSize, total);
        List<DeviceSession> pageList = fromIndex < total ? allSessions.subList(fromIndex, toIndex) : new ArrayList<>();

        // 转换为VO
        List<Map<String, Object>> voList = new ArrayList<>();
        for (DeviceSession session : pageList) {
            voList.add(sessionToVO(session));
        }

        Map<String, Object> result = new HashMap<>();
        result.put("list", voList);
        result.put("total", total);
        result.put("page", page);
        result.put("pageSize", pageSize);
        return R.success(result);
    }

    /**
     * 设备会话详情
     */
    @GetMapping("/session/{phone}")
    public R<Map<String, Object>> sessionDetail(@PathVariable String phone) {
        DeviceSession session = sessionManager.getSession(phone);
        if (session == null) {
            return R.fail("设备不在线或不存在");
        }
        return R.success(sessionToVO(session));
    }

    /**
     * 踢设备下线
     */
    @PostMapping("/kick/{phone}")
    public R<String> kickDevice(@PathVariable String phone) {
        DeviceSession session = sessionManager.getSession(phone);
        if (session == null) {
            return R.fail("设备不在线");
        }
        try {
            session.getChannel().close();
            log.info("Device kicked by admin: phone={}", phone);
            return R.success("设备已踢下线");
        } catch (Exception e) {
            log.error("Kick device failed: phone={}", phone, e);
            return R.fail("踢下线失败: " + e.getMessage());
        }
    }

    /**
     * 批量踢下线
     */
    @PostMapping("/kickBatch")
    public R<String> kickBatch(@RequestBody List<String> phones) {
        if (phones == null || phones.isEmpty()) {
            return R.fail("设备列表为空");
        }
        int success = 0;
        for (String phone : phones) {
            DeviceSession session = sessionManager.getSession(phone);
            if (session != null) {
                try {
                    session.getChannel().close();
                    success++;
                } catch (Exception e) {
                    log.warn("Kick device failed: phone={}", phone, e);
                }
            }
        }
        return R.success("批量踢下线完成，成功" + success + "/" + phones.size());
    }

    /**
     * 全部踢下线（慎用）
     */
    @PostMapping("/kickAll")
    public R<String> kickAll() {
        int count = sessionManager.getOnlineCount();
        List<DeviceSession> allSessions = new ArrayList<>(sessionManager.getAllSessions().values());
        for (DeviceSession session : allSessions) {
            try {
                session.getChannel().close();
            } catch (Exception e) {
                log.warn("Kick device failed: phone={}", session.getPhone(), e);
            }
        }
        log.warn("All devices kicked by admin: count={}", count);
        return R.success("已踢下线全部设备，共" + count + "台");
    }

    /**
     * 会话转VO
     */
    private Map<String, Object> sessionToVO(DeviceSession session) {
        Map<String, Object> vo = new HashMap<>();
        vo.put("phone", session.getPhone());
        vo.put("authenticated", session.isAuthenticated());
        vo.put("connectTime", session.getConnectTime() != null ? session.getConnectTime().toString() : null);
        vo.put("lastHeartbeat", session.getLastHeartbeat() != null ? session.getLastHeartbeat().toString() : null);
        vo.put("lastMessageTime", session.getLastMessageTime() != null ? session.getLastMessageTime().toString() : null);
        vo.put("messageCount", session.getMessageCount());
        vo.put("onlineSeconds", session.getConnectTime() != null ?
                Duration.between(session.getConnectTime(), LocalDateTime.now()).getSeconds() : 0);
        vo.put("idleSeconds", session.getLastMessageTime() != null ?
                Duration.between(session.getLastMessageTime(), LocalDateTime.now()).getSeconds() : 0);
        vo.put("channelId", session.getChannel() != null ? session.getChannel().id().asShortText() : null);
        vo.put("remoteAddress", session.getChannel() != null && session.getChannel().remoteAddress() != null ?
                session.getChannel().remoteAddress().toString() : null);
        return vo;
    }

    /**
     * 格式化运行时间
     */
    private String formatUptime(long seconds) {
        long days = seconds / 86400;
        long hours = (seconds % 86400) / 3600;
        long minutes = (seconds % 3600) / 60;
        long secs = seconds % 60;
        if (days > 0) {
            return days + "天" + hours + "小时" + minutes + "分";
        } else if (hours > 0) {
            return hours + "小时" + minutes + "分" + secs + "秒";
        } else {
            return minutes + "分" + secs + "秒";
        }
    }
}
