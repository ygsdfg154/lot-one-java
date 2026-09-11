package com.lotone.protocol.jt808;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;

/**
 * JT808 工具类：转义、校验、帧编解码
 */
public class Jt808Utils {

    private static final byte DELIMITER = 0x7E;
    private static final byte ESCAPE = 0x7D;
    private static final byte ESCAPE_DELIMITER = 0x02;
    private static final byte ESCAPE_ESCAPE = 0x01;

    public static ByteBuf escape(ByteBuf src) {
        ByteBuf dst = Unpooled.buffer(src.readableBytes() * 2);
        while (src.isReadable()) {
            byte b = src.readByte();
            if (b == DELIMITER) {
                dst.writeByte(ESCAPE);
                dst.writeByte(ESCAPE_DELIMITER);
            } else if (b == ESCAPE) {
                dst.writeByte(ESCAPE);
                dst.writeByte(ESCAPE_ESCAPE);
            } else {
                dst.writeByte(b);
            }
        }
        return dst;
    }

    public static ByteBuf unescape(ByteBuf src) {
        ByteBuf dst = Unpooled.buffer(src.readableBytes());
        while (src.isReadable()) {
            byte b = src.readByte();
            if (b == ESCAPE && src.isReadable()) {
                byte next = src.readByte();
                if (next == ESCAPE_DELIMITER) {
                    dst.writeByte(DELIMITER);
                } else if (next == ESCAPE_ESCAPE) {
                    dst.writeByte(ESCAPE);
                } else {
                    dst.writeByte(b);
                    dst.writeByte(next);
                }
            } else {
                dst.writeByte(b);
            }
        }
        return dst;
    }

    public static byte calculateChecksum(ByteBuf data) {
        byte checksum = 0;
        int readerIndex = data.readerIndex();
        while (data.isReadable()) {
            checksum ^= data.readByte();
        }
        data.readerIndex(readerIndex);
        return checksum;
    }

    public static ByteBuf buildFrame(ByteBuf headerAndBody) {
        ByteBuf escaped = escape(headerAndBody);
        byte checksum = calculateChecksum(escaped);
        ByteBuf frame = Unpooled.buffer(escaped.readableBytes() + 3);
        frame.writeByte(DELIMITER);
        frame.writeBytes(escaped);
        frame.writeByte(checksum);
        frame.writeByte(DELIMITER);
        escaped.release();
        return frame;
    }
}
