package com.lotone.protocol.hlxt;

import lombok.extern.slf4j.Slf4j;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;

/**
 * HLXT协议编码器
 */
@Slf4j
public class HlxtEncoder {

    /**
     * 编码完整消息包
     */
    public static byte[] encode(HlxtMessage message) {
        byte[] body = message.encode();
        if (body == null) body = new byte[0];

        // 消息体属性（低10位为消息体长度）
        int msgBodyProps = body.length & 0x03FF;
        message.setMsgBodyProps(msgBodyProps);

        // 构建中间数据（消息头 + 消息体）
        int middleLength = 12 + body.length;
        byte[] middle = new byte[middleLength];
        ByteBuffer buf = ByteBuffer.wrap(middle);
        buf.order(ByteOrder.BIG_ENDIAN);

        buf.putShort((short) message.getMsgId());
        buf.putShort((short) msgBodyProps);

        // 手机号BCD编码（6字节，不足补0xF）
        byte[] phoneBytes = stringToBcd(message.getPhone(), 6);
        buf.put(phoneBytes);

        buf.putShort((short) message.getSerialNumber());
        buf.put(body);

        // 计算BCC校验
        byte bcc = HlxtMessage.calculateBcc(middle, 0, middle.length);

        // 转义
        byte[] escaped = HlxtMessage.escape(middle);

        // 构建完整包：起始标识 + 转义后数据 + 校验码 + 结束标识
        byte[] packet = new byte[escaped.length + 3];
        packet[0] = HlxtMessage.START_FLAG;
        System.arraycopy(escaped, 0, packet, 1, escaped.length);
        packet[escaped.length + 1] = bcc;
        packet[escaped.length + 2] = HlxtMessage.END_FLAG;

        log.debug("HLXT encode: msgId=0x{}, phone={}, serial={}, bodyLen={}, packetLen={}",
                Integer.toHexString(message.getMsgId()), message.getPhone(),
                message.getSerialNumber(), body.length, packet.length);

        return packet;
    }

    /**
     * 字符串转BCD字节数组
     */
    private static byte[] stringToBcd(String str, int length) {
        byte[] bcd = new byte[length];
        // 填充0xF
        for (int i = 0; i < length; i++) {
            bcd[i] = (byte) 0xFF;
        }

        if (str == null || str.isEmpty()) return bcd;

        // 右对齐
        int strLen = Math.min(str.length(), length * 2);
        int startPos = length * 2 - strLen;

        for (int i = 0; i < strLen; i++) {
            char c = str.charAt(i);
            int digit = Character.digit(c, 10);
            if (digit < 0) digit = 0;

            int byteIndex = (startPos + i) / 2;
            boolean isHigh = (startPos + i) % 2 == 0;

            if (isHigh) {
                bcd[byteIndex] = (byte) ((digit << 4) | (bcd[byteIndex] & 0x0F));
            } else {
                bcd[byteIndex] = (byte) ((bcd[byteIndex] & 0xF0) | digit);
            }
        }

        return bcd;
    }
}
