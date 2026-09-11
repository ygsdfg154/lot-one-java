package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

import java.nio.charset.StandardCharsets;

@Data
public class TerminalAuth {
    public static final int MSG_ID = 0x0102;

    private String authCode;

    public static TerminalAuth decode(byte[] body) {
        ByteBuf buf = Unpooled.wrappedBuffer(body);
        byte[] code = new byte[buf.readableBytes()];
        buf.readBytes(code);
        TerminalAuth auth = new TerminalAuth();
        auth.setAuthCode(new String(code, StandardCharsets.UTF_8).trim());
        return auth;
    }
}
