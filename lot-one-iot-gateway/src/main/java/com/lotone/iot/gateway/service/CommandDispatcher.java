package com.lotone.iot.gateway.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lotone.iot.gateway.dto.DeviceCommandDTO;
import com.lotone.iot.gateway.dto.DeviceCommandResultDTO;
import com.lotone.protocol.jt808.Jt808Message;
import com.lotone.protocol.jt808.codec.Jt808Encoder;
import io.netty.buffer.Unpooled;
import io.netty.channel.Channel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Service
public class CommandDispatcher {

    @Autowired
    private DeviceSessionManager sessionManager;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Value("${iot.gateway.command.result-topic:device-command-result}")
    private String resultTopic;

    /** 消息流水号生成器 */
    private final AtomicInteger serialNoGenerator = new AtomicInteger(1);

    private final ObjectMapper objectMapper = new ObjectMapper();

    /** cmdCode -> JT808 msgId 映射 */
    private static final Map<String, String> CMD_TO_MSGID = new HashMap<>();
    static {
        CMD_TO_MSGID.put("POS_QUERY_LOCATION", "8201");
        CMD_TO_MSGID.put("POS_TEXT", "8300");
        CMD_TO_MSGID.put("POS_SET_PARAMS", "8103");
        CMD_TO_MSGID.put("POS_QUERY_PARAMS", "8104");
        CMD_TO_MSGID.put("POS_CONTROL", "8500");
        CMD_TO_MSGID.put("POS_EVENT_SET", "8301");
        CMD_TO_MSGID.put("POS_INFO_MENU", "8302");
        CMD_TO_MSGID.put("POS_PHONE_CALLBACK", "8400");
        CMD_TO_MSGID.put("POS_PHONE_BOOK", "8401");
    }

    public DeviceCommandResultDTO dispatch(DeviceCommandDTO cmd) {
        DeviceCommandResultDTO result = new DeviceCommandResultDTO();
        result.setRequestId(cmd.getRequestId());
        result.setDeviceId(cmd.getDeviceId());
        result.setCmdCode(cmd.getCmdCode());
        result.setDispatchTime(LocalDateTime.now());

        // 1. 检查设备是否在线
        Channel channel = sessionManager.getChannel(cmd.getDeviceId());
        if (channel == null || !channel.isActive()) {
            result.setStatus("OFFLINE");
            result.setMessage("设备不在线: " + cmd.getDeviceId());
            log.warn("Command dispatch failed, device offline: deviceId={}, cmdCode={}, requestId={}",
                    cmd.getDeviceId(), cmd.getCmdCode(), cmd.getRequestId());
            sendResult(result);
            return result;
        }

        try {
            // 2. 确定消息ID
            String msgIdHex = cmd.getMsgId();
            if (msgIdHex == null || msgIdHex.isEmpty()) {
                msgIdHex = CMD_TO_MSGID.get(cmd.getCmdCode());
            }
            if (msgIdHex == null || msgIdHex.isEmpty()) {
                result.setStatus("FAILED");
                result.setMessage("未知指令编码: " + cmd.getCmdCode());
                sendResult(result);
                return result;
            }
            int msgId = Integer.parseInt(msgIdHex, 16);

            // 3. 编码消息体
            byte[] body = encodeBody(cmd);

            // 4. 构建 JT808 消息
            Jt808Message message = new Jt808Message();
            message.getHeader().setMsgId(msgId);
            message.getHeader().setTerminalPhone(cmd.getDeviceId());
            message.getHeader().setMsgSerialNo(nextSerialNo());
            message.setBody(body);
            message.getHeader().setMsgBodyProps(body != null ? body.length : 0);

            // 5. 编码并下发
            byte[] encoded = Jt808Encoder.encode(message);
            channel.writeAndFlush(Unpooled.wrappedBuffer(encoded));

            result.setStatus("DISPATCHED");
            result.setMessage("指令已下发");
            log.info("Command dispatched: deviceId={}, cmdCode={}, msgId=0x{}, serialNo={}, requestId={}",
                    cmd.getDeviceId(), cmd.getCmdCode(), msgIdHex, message.getHeader().getMsgSerialNo(), cmd.getRequestId());

        } catch (Exception e) {
            result.setStatus("FAILED");
            result.setMessage("下发异常: " + e.getMessage());
            log.error("Command dispatch error: deviceId={}, cmdCode={}, requestId={}",
                    cmd.getDeviceId(), cmd.getCmdCode(), cmd.getRequestId(), e);
        }

        sendResult(result);
        return result;
    }

    private byte[] encodeBody(DeviceCommandDTO cmd) {
        // 如果传了原始十六进制消息体，直接解码使用
        if (cmd.getRawBody() != null && !cmd.getRawBody().isEmpty()) {
            return hexToBytes(cmd.getRawBody());
        }
        // 根据 cmdCode 和 params 编码（简化版，后续扩展具体指令）
        // 目前支持文本下发(8300)的简单编码
        if ("8300".equals(cmd.getMsgId()) || "POS_TEXT".equals(cmd.getCmdCode())) {
            return encodeTextCommand(cmd);
        }
        // 其他指令暂时返回空消息体
        return new byte[0];
    }

    private byte[] encodeTextCommand(DeviceCommandDTO cmd) {
        try {
            String text = cmd.getParams() != null && cmd.getParams().get("text") != null
                    ? cmd.getParams().get("text").toString() : "";
            byte[] textBytes = text.getBytes("GBK");
            // 8300 消息体：标志(1字节) + 文本内容
            byte[] body = new byte[1 + textBytes.length];
            body[0] = 0; // 标志位：0=紧急
            System.arraycopy(textBytes, 0, body, 1, textBytes.length);
            return body;
        } catch (Exception e) {
            log.error("Encode text command failed", e);
            return new byte[0];
        }
    }

    private void sendResult(DeviceCommandResultDTO result) {
        try {
            String json = objectMapper.writeValueAsString(result);
            kafkaTemplate.send(resultTopic, result.getDeviceId(), json);
        } catch (Exception e) {
            log.error("Send command result to kafka failed", e);
        }
    }

    private int nextSerialNo() {
        int no = serialNoGenerator.getAndIncrement();
        if (no > 0xFFFF) {
            serialNoGenerator.set(1);
            no = 1;
        }
        return no;
    }

    private byte[] hexToBytes(String hex) {
        hex = hex.replaceAll("\\s", "");
        if (hex.length() % 2 != 0) hex = "0" + hex;
        byte[] bytes = new byte[hex.length() / 2];
        for (int i = 0; i < bytes.length; i++) {
            bytes[i] = (byte) Integer.parseInt(hex.substring(i * 2, i * 2 + 2), 16);
        }
        return bytes;
    }
}
