package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

import java.nio.charset.Charset;

@Data
public class TextMessage {
    public static final int MSG_ID = 0x8300;

    private byte flag; // 标志位，bit0:紧急  bit1:终端显示器显示  bit2:终端TTS播读  bit3:广告屏显示
    private String text;

    public byte[] encode() {
        ByteBuf buf = Unpooled.buffer();
        buf.writeByte(flag);
        byte[] textBytes = text != null ? text.getBytes(Charset.forName("GBK")) : new byte[0];
        buf.writeBytes(textBytes);
        byte[] body = new byte[buf.readableBytes()];
        buf.readBytes(body);
        return body;
    }
}
