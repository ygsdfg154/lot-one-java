package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

import java.nio.charset.StandardCharsets;

@Data
public class TerminalRegisterReply {
    public static final int MSG_ID = 0x8100;

    private int replySerialNo;
    private byte result; // 0:成功 1:车辆已被注册 2:数据库中无该车辆 3:终端已被注册 4:数据库中无该终端
    private String authCode; // 鉴权码，成功时有效

    public byte[] encode() {
        ByteBuf buf = Unpooled.buffer();
        buf.writeShort(replySerialNo);
        buf.writeByte(result);
        if (result == 0 && authCode != null && !authCode.isEmpty()) {
            buf.writeBytes(authCode.getBytes(StandardCharsets.UTF_8));
        }
        byte[] body = new byte[buf.readableBytes()];
        buf.readBytes(body);
        return body;
    }
}
