package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

@Data
public class TemporaryTrackControl {
    public static final int MSG_ID = 0x8202;

    private int interval; // 时间间隔，单位秒
    private int duration; // 有效期，单位秒

    public byte[] encode() {
        ByteBuf buf = Unpooled.buffer(4);
        buf.writeShort(interval);
        buf.writeShort(duration);
        byte[] body = new byte[buf.readableBytes()];
        buf.readBytes(body);
        return body;
    }
}
