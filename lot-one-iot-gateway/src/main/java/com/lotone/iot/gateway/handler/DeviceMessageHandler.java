package com.lotone.iot.gateway.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lotone.iot.gateway.service.DeviceSessionManager;
import com.lotone.protocol.jt808.Jt808Message;
import com.lotone.protocol.jt808.message.BatchLocationReport;
import com.lotone.protocol.jt808.message.LocationReport;
import com.lotone.protocol.jt808.message.MessageFactory;
import com.lotone.protocol.jt808.message.PlatformCommonReply;
import com.lotone.protocol.jt808.message.TerminalCommonReply;
import com.lotone.protocol.jt808.message.VehicleControlReply;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class DeviceMessageHandler extends SimpleChannelInboundHandler<Jt808Message> {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private DeviceSessionManager sessionManager;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Jt808Message msg) {
        int msgId = msg.getMsgId();
        String phone = msg.getHeader().getTerminalPhone();
        log.debug("Received message: phone={}, msgId=0x{}, name={}", phone, Integer.toHexString(msgId), MessageFactory.getMsgName(msgId));

        switch (msgId) {
            case 0x0200: // 位置信息汇报
                handleLocationReport(ctx, msg, phone);
                break;
            case 0x0704: // 批量位置信息汇报
                handleBatchLocationReport(ctx, msg, phone);
                break;
            case 0x0002: // 终端心跳
                handleHeartbeat(ctx, msg, phone);
                break;
            case 0x0001: // 终端通用应答
                handleTerminalCommonReply(ctx, msg, phone);
                break;
            case 0x0100: // 终端注册
            case 0x0102: // 终端鉴权
                sendCommonReply(ctx, msg, (byte) 0);
                break;
            case 0x0500: // 车辆控制应答
                handleVehicleControlReply(ctx, msg, phone);
                break;
            default:
                log.debug("Unhandled message: phone={}, msgId=0x{}, name={}", phone, Integer.toHexString(msgId), MessageFactory.getMsgName(msgId));
                sendCommonReply(ctx, msg, (byte) 0);
        }
    }

    private void handleLocationReport(ChannelHandlerContext ctx, Jt808Message msg, String phone) {
        try {
            LocationReport loc = LocationReport.decode(msg.getBody());
            log.debug("Location report: phone={}, lat={}, lng={}, speed={}", phone, loc.getLatitude(), loc.getLongitude(), loc.getSpeed());
            sendTelemetryToKafka(phone, loc);
            sendCommonReply(ctx, msg, (byte) 0);
        } catch (Exception e) {
            log.error("Decode location report failed: phone={}", phone, e);
            sendCommonReply(ctx, msg, (byte) 1);
        }
    }

    private void handleBatchLocationReport(ChannelHandlerContext ctx, Jt808Message msg, String phone) {
        try {
            BatchLocationReport batch = BatchLocationReport.decode(msg.getBody());
            log.info("Batch location report: phone={}, count={}, dataType={}", phone, batch.getItemCount(), batch.getDataType());
            // 批量发送每条位置数据到Kafka
            for (LocationReport loc : batch.getLocations()) {
                sendTelemetryToKafka(phone, loc);
            }
            sendCommonReply(ctx, msg, (byte) 0);
        } catch (Exception e) {
            log.error("Decode batch location report failed: phone={}", phone, e);
            sendCommonReply(ctx, msg, (byte) 1);
        }
    }

    private void sendTelemetryToKafka(String phone, LocationReport loc) {
        if (kafkaTemplate == null) return;
        try {
            Map<String, Object> data = new HashMap<>();
            data.put("deviceId", phone);
            data.put("alarmFlag", loc.getAlarmFlag());
            data.put("status", loc.getStatus());
            data.put("latitude", loc.getLatitude());
            data.put("longitude", loc.getLongitude());
            data.put("altitude", loc.getAltitude());
            data.put("speed", loc.getSpeed());
            data.put("direction", loc.getDirection());
            data.put("time", loc.getTime() != null ? loc.getTime().format(TIME_FORMAT) : null);
            data.put("receiveTime", java.time.LocalDateTime.now().format(TIME_FORMAT));
            String json = objectMapper.writeValueAsString(data);
            kafkaTemplate.send("device-telemetry", phone, json);
        } catch (Exception e) {
            log.error("Send telemetry to kafka failed: phone={}", phone, e);
        }
    }

    private void handleHeartbeat(ChannelHandlerContext ctx, Jt808Message msg, String phone) {
        log.debug("Heartbeat: phone={}", phone);
        if (sessionManager != null) {
            sessionManager.heartbeat(phone);
        }
        sendCommonReply(ctx, msg, (byte) 0);
    }

    private void handleTerminalCommonReply(ChannelHandlerContext ctx, Jt808Message msg, String phone) {
        try {
            TerminalCommonReply reply = TerminalCommonReply.decode(msg.getBody());
            log.info("Terminal common reply: phone={}, replyMsgId=0x{}, result={}",
                    phone, Integer.toHexString(reply.getReplyMsgId()), reply.getResult());
            // TODO: 匹配等待中的指令应答，更新指令状态
        } catch (Exception e) {
            log.error("Decode terminal common reply failed: phone={}", phone, e);
        }
    }

    private void handleVehicleControlReply(ChannelHandlerContext ctx, Jt808Message msg, String phone) {
        try {
            VehicleControlReply reply = VehicleControlReply.decode(msg.getBody());
            log.info("Vehicle control reply: phone={}, serialNo={}, result={}",
                    phone, reply.getReplySerialNo(), reply.getResult());
            // TODO: 更新车辆控制指令状态
            sendCommonReply(ctx, msg, (byte) 0);
        } catch (Exception e) {
            log.error("Decode vehicle control reply failed: phone={}", phone, e);
            sendCommonReply(ctx, msg, (byte) 1);
        }
    }

    private void sendCommonReply(ChannelHandlerContext ctx, Jt808Message msg, byte result) {
        PlatformCommonReply reply = new PlatformCommonReply();
        reply.setReplySerialNo(msg.getHeader().getMsgSerialNo());
        reply.setReplyMsgId(msg.getMsgId());
        reply.setResult(result);
        Jt808Message response = new Jt808Message();
        response.getHeader().setMsgId(PlatformCommonReply.MSG_ID);
        response.getHeader().setTerminalPhone(msg.getHeader().getTerminalPhone());
        response.getHeader().setMsgSerialNo(msg.getHeader().getMsgSerialNo() + 1);
        response.setBody(reply.encode());
        response.getHeader().setMsgBodyProps(response.getBody().length);
        try {
            byte[] encoded = com.lotone.protocol.jt808.codec.Jt808Encoder.encode(response);
            ctx.writeAndFlush(io.netty.buffer.Unpooled.wrappedBuffer(encoded));
        } catch (Exception e) {
            log.error("Send reply failed", e);
        }
    }
}
