package com.lotone.iot.gateway.handler;

import com.lotone.iot.gateway.service.DeviceSessionManager;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.socket.DatagramPacket;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.net.InetSocketAddress;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * UDP 专用消息处理器
 * 处理 DatagramPacket，解析 JT808/HLXT 消息
 */
@Slf4j
@Component
public class UdpMessageHandler extends SimpleChannelInboundHandler<DatagramPacket> {

    @Autowired
    private DeviceSessionManager sessionManager;

    /** 设备UDP地址映射（phone -> InetSocketAddress） */
    private final Map<String, InetSocketAddress> deviceUdpAddresses = new ConcurrentHashMap<>();

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, DatagramPacket packet) {
        try {
            ByteBuf content = packet.content();
            byte[] data = new byte[content.readableBytes()];
            content.readBytes(data);

            if (data.length < 5) {
                log.warn("UDP packet too short: length={}", data.length);
                return;
            }

            // 判断协议类型（JT808 和 HLXT 都是 0x7E 开头）
            if (data[0] == 0x7E) {
                handleJt808OrHlxtMessage(ctx, packet, data);
            } else {
                log.warn("Unknown UDP protocol: firstByte=0x{}", Integer.toHexString(data[0] & 0xFF));
            }
        } catch (Exception e) {
            log.error("Handle UDP packet failed", e);
        }
    }

    /**
     * 处理 JT808 或 HLXT 消息
     */
    private void handleJt808OrHlxtMessage(ChannelHandlerContext ctx, DatagramPacket packet, byte[] data) {
        try {
            // 解析消息头（JT808 和 HLXT 格式相同）
            // 消息ID(2字节) + 消息体属性(2字节) + 终端手机号(6字节BCD) + 流水号(2字节)
            if (data.length < 13) {
                log.warn("UDP message too short: length={}", data.length);
                return;
            }

            // 提取手机号（BCD 6字节，从第5字节开始）
            String phone = extractPhone(data, 4);

            // 记录设备UDP地址
            deviceUdpAddresses.put(phone, packet.sender());

            // 更新会话（如果已认证）
            if (sessionManager.isAuthenticated(phone)) {
                sessionManager.touch(phone);
            }

            // 消息ID
            int msgId = ((data[1] & 0xFF) << 8) | (data[2] & 0xFF);

            log.debug("UDP message: phone={}, msgId=0x{}, length={}, sender={}",
                    phone, Integer.toHexString(msgId), data.length, packet.sender());

            // TODO: 这里可以调用 JT808 解码器解析完整消息
            // 目前只做基础的消息头解析和会话管理
            // 完整消息处理可以复用 DeviceMessageHandler 的逻辑

            // 心跳消息直接应答
            if (msgId == 0x0002) {
                sendUdpResponse(ctx, packet.sender(), phone, 0x8001, data);
            }

        } catch (Exception e) {
            log.error("Parse UDP message failed", e);
        }
    }

    /**
     * 提取手机号（BCD编码）
     */
    private String extractPhone(byte[] data, int offset) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6 && offset + i < data.length; i++) {
            int high = (data[offset + i] >> 4) & 0x0F;
            int low = data[offset + i] & 0x0F;
            sb.append(high);
            if (low != 0x0F) sb.append(low);
        }
        return sb.toString();
    }

    /**
     * 发送UDP响应
     */
    private void sendUdpResponse(ChannelHandlerContext ctx, InetSocketAddress recipient,
                                  String phone, int msgId, byte[] originalData) {
        try {
            // 构建平台通用应答 (0x8001)
            // 应答流水号(2) + 应答ID(2) + 结果(1)
            byte[] body = new byte[5];
            // 流水号从原消息提取
            body[0] = originalData[11];
            body[1] = originalData[12];
            // 应答ID
            body[2] = originalData[1];
            body[3] = originalData[2];
            // 结果：0=成功
            body[4] = 0;

            // 构建完整消息包（简化版，不含转义和BCC校验）
            byte[] response = buildSimplePacket(msgId, phone, 1, body);

            ByteBuf buf = Unpooled.copiedBuffer(response);
            ctx.writeAndFlush(new DatagramPacket(buf, recipient));
            log.debug("UDP response sent: phone={}, msgId=0x{}", phone, Integer.toHexString(msgId));
        } catch (Exception e) {
            log.error("Send UDP response failed: phone={}", phone, e);
        }
    }

    /**
     * 构建简化版消息包
     */
    private byte[] buildSimplePacket(int msgId, String phone, int serial, byte[] body) {
        // 消息头：消息ID(2) + 消息体属性(2) + 手机号(6) + 流水号(2) = 12字节
        int headerLength = 12;
        int totalLength = headerLength + body.length + 1; // +1 for BCC

        byte[] packet = new byte[totalLength + 2]; // +2 for start/end flags
        packet[0] = 0x7E;

        int pos = 1;
        // 消息ID
        packet[pos++] = (byte) ((msgId >> 8) & 0xFF);
        packet[pos++] = (byte) (msgId & 0xFF);
        // 消息体属性
        packet[pos++] = (byte) ((body.length >> 8) & 0x03);
        packet[pos++] = (byte) (body.length & 0xFF);
        // 手机号BCD（简化）
        for (int i = 0; i < 6; i++) {
            packet[pos++] = 0;
        }
        // 流水号
        packet[pos++] = (byte) ((serial >> 8) & 0xFF);
        packet[pos++] = (byte) (serial & 0xFF);
        // 消息体
        System.arraycopy(body, 0, packet, pos, body.length);
        pos += body.length;
        // BCC校验（简化：0）
        packet[pos++] = 0;
        // 结束标识
        packet[pos] = 0x7E;

        return packet;
    }

    /**
     * 获取设备UDP地址
     */
    public InetSocketAddress getDeviceUdpAddress(String phone) {
        return deviceUdpAddresses.get(phone);
    }

    /**
     * 获取UDP在线设备数
     */
    public int getUdpOnlineCount() {
        return deviceUdpAddresses.size();
    }

    /**
     * 移除设备UDP地址
     */
    public void removeDeviceUdpAddress(String phone) {
        deviceUdpAddresses.remove(phone);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        log.error("UDP handler exception", cause);
    }
}
