package com.lotone.admin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lotone.admin.dto.DeviceCmdDispatchDTO;
import com.lotone.admin.entity.DeviceCmd;
import com.lotone.admin.entity.DeviceCmdLog;
import com.lotone.admin.service.DeviceCmdLogService;
import com.lotone.admin.service.DeviceCmdService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/deviceCmd")
public class DeviceCmdController extends BaseController<DeviceCmd, DeviceCmdService> {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private DeviceCmdLogService deviceCmdLogService;

    @Value("${iot.gateway.command.topic:device-command}")
    private String commandTopic;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /** cmdCode -> JT808 msgId 映射（与网关保持一致） */
    private static final Map<String, String> CMD_TO_MSGID = new HashMap<>();
    static {
        CMD_TO_MSGID.put("POS_QUERY_LOCATION", "8201");
        CMD_TO_MSGID.put("POS_TEXT", "8300");
        CMD_TO_MSGID.put("POS_SET_PARAMS", "8103");
        CMD_TO_MSGID.put("POS_QUERY_PARAMS", "8104");
        CMD_TO_MSGID.put("POS_CONTROL", "8500");
    }

    /**
     * 下发指令到设备
     * 链路：admin → Kafka(device-command) → iot-gateway → 设备
     */
    @PostMapping("/dispatch")
    public R<Map<String, Object>> dispatch(@RequestBody DeviceCmdDispatchDTO dto) {
        if (dto.getDeviceId() == null || dto.getDeviceId().isEmpty()) {
            return R.fail("设备编号不能为空");
        }
        if (dto.getCmdCode() == null || dto.getCmdCode().isEmpty()) {
            return R.fail("指令编码不能为空");
        }

        String requestId = UUID.randomUUID().toString().replace("-", "");
        LocalDateTime now = LocalDateTime.now();

        try {
            // 1. 构建发送到 Kafka 的消息
            Map<String, Object> cmdMsg = new HashMap<>();
            cmdMsg.put("requestId", requestId);
            cmdMsg.put("deviceId", dto.getDeviceId());
            cmdMsg.put("cmdCode", dto.getCmdCode());
            cmdMsg.put("cmdName", dto.getCmdName());
            cmdMsg.put("msgId", dto.getMsgId() != null ? dto.getMsgId() : CMD_TO_MSGID.get(dto.getCmdCode()));
            cmdMsg.put("params", dto.getParams());
            cmdMsg.put("rawBody", dto.getRawBody());
            cmdMsg.put("operator", dto.getOperator());
            cmdMsg.put("sendTime", now.toString());

            String json = objectMapper.writeValueAsString(cmdMsg);

            // 2. 发送到 Kafka
            kafkaTemplate.send(commandTopic, dto.getDeviceId(), json);
            log.info("Command sent to kafka: deviceId={}, cmdCode={}, requestId={}, topic={}",
                    dto.getDeviceId(), dto.getCmdCode(), requestId, commandTopic);

            // 3. 记录指令日志
            DeviceCmdLog cmdLog = new DeviceCmdLog();
            cmdLog.setDeviceId(dto.getDeviceId());
            cmdLog.setCmdName(dto.getCmdName());
            cmdLog.setCmdType(dto.getCmdType() != null ? dto.getCmdType() : dto.getCmdCode());
            cmdLog.setCmdContent(dto.getParams() != null ? objectMapper.writeValueAsString(dto.getParams()) : null);
            cmdLog.setRequestId(requestId);
            cmdLog.setOperator(dto.getOperator());
            cmdLog.setChannel(dto.getChannel() != null ? dto.getChannel() : "ADMIN");
            cmdLog.setSendTime(now);
            cmdLog.setResult("PENDING");
            cmdLog.setCanOffline(dto.getCanOffline() != null ? dto.getCanOffline() : (byte) 0);
            cmdLog.setCreatedAt(now);
            cmdLog.setUpdatedAt(now);
            deviceCmdLogService.save(cmdLog);

            // 4. 返回结果
            Map<String, Object> result = new HashMap<>();
            result.put("requestId", requestId);
            result.put("deviceId", dto.getDeviceId());
            result.put("cmdCode", dto.getCmdCode());
            result.put("status", "SENT");
            result.put("message", "指令已发送到网关");
            return R.success(result);

        } catch (Exception e) {
            log.error("Dispatch command failed: deviceId={}, cmdCode={}", dto.getDeviceId(), dto.getCmdCode(), e);
            return R.fail("指令下发失败: " + e.getMessage());
        }
    }
}
