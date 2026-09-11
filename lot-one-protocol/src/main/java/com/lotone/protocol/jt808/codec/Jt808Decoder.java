package com.lotone.protocol.jt808.codec;

import com.lotone.protocol.jt808.Jt808Header;
import com.lotone.protocol.jt808.Jt808Message;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.ByteBufUtil;
import io.netty.buffer.Unpooled;

public class Jt808Decoder {

    private static final byte PKG_DELIMITER = 0x7E;

    public static Jt808Message decode(byte[] data) {
        byte[] unescaped = unescape(data);
        ByteBuf buf = Unpooled.wrappedBuffer(unescaped);
        if (buf.readByte() != PKG_DELIMITER) {
            throw new IllegalArgumentException("Invalid JT808 message: missing start delimiter");
        }
        // BCC 校验：从消息头到消息体（不含起始/结束标识和校验码本身）
        int headerAndBodyLen = buf.readableBytes() - 2; // 减去校验码和结束标识
        byte calculatedChecksum = 0;
        for (int i = 1; i <= headerAndBodyLen; i++) {
            calculatedChecksum ^= unescaped[i];
        }
        buf.skipBytes(headerAndBodyLen);
        byte receivedChecksum = buf.readByte();
        if (calculatedChecksum != receivedChecksum) {
            throw new IllegalArgumentException(String.format(
                    "BCC checksum mismatch: expected 0x%02X, got 0x%02X",
                    calculatedChecksum, receivedChecksum));
        }
        if (buf.readByte() != PKG_DELIMITER) {
            throw new IllegalArgumentException("Invalid JT808 message: missing end delimiter");
        }

        // 重新解析消息头和消息体
        buf = Unpooled.wrappedBuffer(unescaped, 1, headerAndBodyLen);
        Jt808Message msg = new Jt808Message();
        Jt808Header header = msg.getHeader();
        header.setMsgId(buf.readUnsignedShort());
        header.setMsgBodyProps(buf.readUnsignedShort());
        byte[] phoneBytes = new byte[6];
        buf.readBytes(phoneBytes);
        header.setTerminalPhone(bcdToHex(phoneBytes));
        header.setMsgSerialNo(buf.readUnsignedShort());
        if (header.isSubpackage()) {
            header.setTotalPackage(buf.readUnsignedShort());
            header.setPackageIndex(buf.readUnsignedShort());
        }
        int bodyLen = header.getMsgBodyLength();
        byte[] body = new byte[bodyLen];
        buf.readBytes(body);
        msg.setBody(body);
        return msg;
    }

    private static byte[] unescape(byte[] data) {
        ByteBuf buf = Unpooled.buffer(data.length);
        for (int i = 0; i < data.length; i++) {
            if (data[i] == 0x7D && i + 1 < data.length) {
                if (data[i + 1] == 0x01) {
                    buf.writeByte(0x7D);
                    i++;
                } else if (data[i + 1] == 0x02) {
                    buf.writeByte(0x7E);
                    i++;
                } else {
                    buf.writeByte(data[i]);
                }
            } else {
                buf.writeByte(data[i]);
            }
        }
        byte[] result = new byte[buf.readableBytes()];
        buf.readBytes(result);
        return result;
    }

    private static String bcdToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02X", b));
        }
        return sb.toString();
    }
}
