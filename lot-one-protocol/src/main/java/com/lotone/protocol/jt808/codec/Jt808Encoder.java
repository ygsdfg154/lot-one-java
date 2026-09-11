package com.lotone.protocol.jt808.codec;

import com.lotone.protocol.jt808.Jt808Message;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;

public class Jt808Encoder {

    private static final byte PKG_DELIMITER = 0x7E;

    public static byte[] encode(Jt808Message msg) {
        ByteBuf buf = Unpooled.buffer();
        buf.writeByte(PKG_DELIMITER);
        buf.writeShort(msg.getHeader().getMsgId());
        buf.writeShort(msg.getHeader().getMsgBodyProps());
        buf.writeBytes(hexToBcd(msg.getHeader().getTerminalPhone()));
        buf.writeShort(msg.getHeader().getMsgSerialNo());
        if (msg.getHeader().isSubpackage()) {
            buf.writeShort(msg.getHeader().getTotalPackage());
            buf.writeShort(msg.getHeader().getPackageIndex());
        }
        if (msg.getBody() != null) {
            buf.writeBytes(msg.getBody());
        }
        byte checksum = calculateChecksum(buf, 1, buf.readableBytes() - 1);
        buf.writeByte(checksum);
        buf.writeByte(PKG_DELIMITER);
        byte[] result = new byte[buf.readableBytes()];
        buf.readBytes(result);
        return escape(result);
    }

    private static byte calculateChecksum(ByteBuf buf, int start, int length) {
        byte checksum = 0;
        for (int i = start; i < start + length; i++) {
            checksum ^= buf.getByte(i);
        }
        return checksum;
    }

    private static byte[] escape(byte[] data) {
        ByteBuf buf = Unpooled.buffer(data.length * 2);
        buf.writeByte(data[0]);
        for (int i = 1; i < data.length - 1; i++) {
            if (data[i] == 0x7E) {
                buf.writeByte(0x7D);
                buf.writeByte(0x02);
            } else if (data[i] == 0x7D) {
                buf.writeByte(0x7D);
                buf.writeByte(0x01);
            } else {
                buf.writeByte(data[i]);
            }
        }
        buf.writeByte(data[data.length - 1]);
        byte[] result = new byte[buf.readableBytes()];
        buf.readBytes(result);
        return result;
    }

    private static byte[] hexToBcd(String hex) {
        if (hex.length() % 2 != 0) hex = "0" + hex;
        byte[] bytes = new byte[hex.length() / 2];
        for (int i = 0; i < bytes.length; i++) {
            bytes[i] = (byte) Integer.parseInt(hex.substring(i * 2, i * 2 + 2), 16);
        }
        return bytes;
    }
}
