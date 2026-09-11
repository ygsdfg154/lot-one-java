package com.lotone.protocol.hlxt;

import lombok.extern.slf4j.Slf4j;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;

/**
 * HLXT协议解码器
 */
@Slf4j
public class HlxtDecoder {

    /**
     * 解码完整消息包
     */
    public static HlxtMessage decode(byte[] packet) {
        if (packet == null || packet.length < 13) {
            throw new IllegalArgumentException("HLXT packet too short: " + (packet == null ? 0 : packet.length));
        }

        // 检查起始标识
        if (packet[0] != HlxtMessage.START_FLAG) {
            throw new IllegalArgumentException("Invalid HLXT start flag: " + packet[0]);
        }

        // 检查结束标识
        if (packet[packet.length - 1] != HlxtMessage.END_FLAG) {
            throw new IllegalArgumentException("Invalid HLXT end flag: " + packet[packet.length - 1]);
        }

        // 提取中间数据（不含起始/结束标识）
        byte[] middle = new byte[packet.length - 2];
        System.arraycopy(packet, 1, middle, 0, middle.length);

        // 反转义
        middle = HlxtMessage.unescape(middle);

        // BCC校验（最后一个字节是校验码）
        byte receivedBcc = middle[middle.length - 1];
        byte calculatedBcc = HlxtMessage.calculateBcc(middle, 0, middle.length - 1);
        if (receivedBcc != calculatedBcc) {
            throw new IllegalArgumentException(String.format(
                    "HLXT BCC check failed: received=0x%02X, calculated=0x%02X",
                    receivedBcc, calculatedBcc));
        }

        // 解析消息头
        ByteBuffer buf = ByteBuffer.wrap(middle, 0, middle.length - 1);
        buf.order(ByteOrder.BIG_ENDIAN);

        int msgId = buf.getShort() & 0xFFFF;
        int msgBodyProps = buf.getShort() & 0xFFFF;

        // 解析手机号（BCD 6字节）
        byte[] phoneBytes = new byte[6];
        buf.get(phoneBytes);
        String phone = bcdToString(phoneBytes);

        int serialNumber = buf.getShort() & 0xFFFF;

        // 解析消息体
        int bodyLength = middle.length - 1 - 12; // 12字节消息头 + 1字节校验码
        byte[] body = new byte[bodyLength];
        System.arraycopy(middle, 12, body, 0, bodyLength);

        // 根据消息ID创建具体消息对象
        HlxtMessage message = HlxtMessageFactory.createMessage(msgId);
        message.setMsgId(msgId);
        message.setMsgBodyProps(msgBodyProps);
        message.setPhone(phone);
        message.setSerialNumber(serialNumber);
        message.setBody(body);
        message.decode(body);

        log.debug("HLXT decode: msgId=0x{}, phone={}, serial={}, bodyLen={}",
                Integer.toHexString(msgId), phone, serialNumber, bodyLength);

        return message;
    }

    /**
     * BCD字节数组转字符串
     */
    private static String bcdToString(byte[] bcd) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bcd) {
            int high = (b >> 4) & 0x0F;
            int low = b & 0x0F;
            sb.append(high);
            if (low != 0x0F) sb.append(low);
        }
        return sb.toString();
    }
}
