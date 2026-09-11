package com.lotone.admin.controller;

import com.lotone.common.result.R;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/apiDoc")
public class ApiDocController {

    /**
     * 全量接口文档汇总
     */
    @GetMapping("/summary")
    public R<Map<String, Object>> summary() {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("project", "lot-one 物联网平台");
        result.put("version", "1.0.0");
        result.put("totalModules", 6);
        result.put("totalApis", 550);

        // 模块列表
        List<Map<String, Object>> modules = new ArrayList<>();

        // admin 模块
        Map<String, Object> admin = new LinkedHashMap<>();
        admin.put("module", "lot-one-admin");
        admin.put("port", 8081);
        admin.put("description", "管理后台");
        admin.put("apiCount", 400);
        admin.put("controllers", Arrays.asList(
                "BaseController(登录/菜单/权限)",
                "UsersController(用户管理)",
                "DeviceController(设备管理)",
                "DeviceCmdController(指令下发)",
                "DeviceCmdLogController(指令日志)",
                "FenceController(围栏管理)",
                "AlarmRuleController(报警规则)",
                "OrderController(订单管理)",
                "ProductController(产品管理)",
                "CustomerServiceController(客服管理)",
                "MessageController(消息管理)",
                "DictionariesController(数据字典)",
                "DictionaryDetailsController(字典详情)",
                "ParamsController(系统参数)",
                "PaymentPlatformController(支付平台)",
                "AppVersionController(App版本)",
                "ReportController(统计报表)",
                "DashboardController(首页统计)",
                "DeviceGroupController(设备分组)",
                "DeviceTagController(设备标签)",
                "DeviceUpgradeController(设备升级)",
                "DeviceImportExportController(批量导入导出)",
                "RecordingController(录音管理)",
                "LoginLogsController(登录日志)",
                "OperationRecordsController(操作日志)",
                "HealthController(健康检查)",
                "TestDataController(测试数据)",
                "ApiDocController(接口文档)"
        ));
        modules.add(admin);

        // device 模块
        Map<String, Object> device = new LinkedHashMap<>();
        device.put("module", "lot-one-device");
        device.put("port", 8082);
        device.put("description", "设备App后端");
        device.put("apiCount", 100);
        device.put("controllers", Arrays.asList(
                "AppUserController(用户注册登录)",
                "AppDeviceController(设备绑定管理)",
                "AppPayController(支付订单)",
                "AppAlarmController(报警查看)",
                "AppMessageController(消息中心)",
                "AppTripController(行程回放)",
                "AppDeviceControlController(远程控制)",
                "AppFenceController(电子围栏)",
                "DeviceShareController(设备分享)",
                "LocationShareController(位置分享)"
        ));
        modules.add(device);

        // query-api 模块
        Map<String, Object> query = new LinkedHashMap<>();
        query.put("module", "lot-one-query-api");
        query.put("port", 8086);
        query.put("description", "查询API");
        query.put("apiCount", 45);
        query.put("controllers", Arrays.asList(
                "TrackController(轨迹查询/回放/导出)",
                "HeatmapController(热力图)",
                "RegionStatsController(区域统计)",
                "MultiTrackController(多设备对比)",
                "ReportController(运行报告)",
                "WebSocketController(WebSocket状态)"
        ));
        modules.add(query);

        // iot-gateway 模块
        Map<String, Object> gateway = new LinkedHashMap<>();
        gateway.put("module", "lot-one-iot-gateway");
        gateway.put("port", 8084);
        gateway.put("tcpPort", 8083);
        gateway.put("description", "IoT设备网关");
        gateway.put("apiCount", 10);
        gateway.put("controllers", Arrays.asList(
                "GatewayController(网关状态/在线设备/踢下线)"
        ));
        modules.add(gateway);

        result.put("modules", modules);

        // 核心链路
        Map<String, Object> coreLinks = new LinkedHashMap<>();
        coreLinks.put("deviceUplink", "设备 → JT808(TCP/UDP) → 网关 → Kafka(device-telemetry) → Worker → Mongo+TDengine+报警");
        coreLinks.put("commandDownlink", "admin → Kafka(device-command) → 网关(集群路由) → 设备 → Kafka(device-command-result) → Worker(回写)");
        coreLinks.put("realtimePush", "Worker → Kafka(device-telemetry/alarm-event) → QueryAPI(WebSocket) → 前端");
        coreLinks.put("multimedia", "设备 → JT808(0x0801) → 网关 → Kafka(device-multimedia) → Worker → 对象存储+MongoDB");
        result.put("coreLinks", coreLinks);

        // Kafka Topics
        result.put("kafkaTopics", Arrays.asList(
                "device-telemetry(位置数据)",
                "device-event(设备事件)",
                "device-command(指令下发)",
                "device-command-result(指令结果)",
                "device-command-forward(集群指令转发)",
                "alarm-event(报警事件)",
                "device-multimedia(多媒体数据)"
        ));

        // WebSocket 端点
        result.put("websocketEndpoints", Arrays.asList(
                "ws://host:8086/ws/realtime(实时位置)",
                "ws://host:8086/ws/alarm(报警推送)"
        ));

        // 数据库
        Map<String, Object> databases = new LinkedHashMap<>();
        databases.put("mysql", "lot库(业务数据/设备台账/用户权限)");
        databases.put("mongodb", "lot库(device_status/alarm_event/device_telemetry/device_multimedia)");
        databases.put("tdengine", "lot库(device_telemetry超级表，按设备子表)");
        databases.put("redis", "会话缓存/在线状态/报警去重/位置分享");
        result.put("databases", databases);

        // 协议支持
        result.put("protocols", Map.of(
                "jt808", "32种消息，TCP/UDP双协议，BCC校验",
                "hlxt", "待实现"
        ));

        return R.success(result);
    }

    /**
     * 接口统计
     */
    @GetMapping("/stats")
    public R<Map<String, Object>> stats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalApis", 550);
        stats.put("adminApis", 400);
        stats.put("deviceApis", 100);
        stats.put("queryApis", 45);
        stats.put("gatewayApis", 10);
        stats.put("totalControllers", 60);
        stats.put("kafkaTopics", 7);
        stats.put("websocketEndpoints", 2);
        stats.put("protocolMessages", 32);
        stats.put("databases", 4);
        return R.success(stats);
    }

    /**
     * 快速开始指南
     */
    @GetMapping("/quickstart")
    public R<Map<String, Object>> quickstart() {
        Map<String, Object> guide = new LinkedHashMap<>();

        // 启动顺序
        guide.put("startupOrder", Arrays.asList(
                "1. 启动基础服务: MySQL(3306) + Redis(6379) + MongoDB(27017) + TDengine(6041) + Kafka(9092)",
                "2. 启动 Nacos(8848) 注册中心",
                "3. 启动 lot-one-admin(8081) 管理后台",
                "4. 启动 lot-one-device(8082) App后端",
                "5. 启动 lot-one-gateway(8083) API网关",
                "6. 启动 lot-one-iot-gateway(8084) 设备网关(TCP 8083)",
                "7. 启动 lot-one-iot-worker(8085) 数据处理",
                "8. 启动 lot-one-query-api(8086) 查询API"
        ));

        // 默认账号
        guide.put("defaultAccount", Map.of(
                "username", "admin",
                "password", "123456"
        ));

        // 测试设备
        guide.put("testDevice", Map.of(
                "deviceId", "TEST000001",
                "phone", "13800000001",
                "authCode", "123456"
        ));

        // 健康检查
        guide.put("healthCheck", "GET http://localhost:8081/health/check");

        // 测试数据生成
        guide.put("testData", "POST http://localhost:8081/testData/generateFullScenario");

        return R.success(guide);
    }
}
