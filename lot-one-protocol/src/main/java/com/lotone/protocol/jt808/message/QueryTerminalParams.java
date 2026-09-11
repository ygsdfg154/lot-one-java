package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

import java.util.List;

@Data
public class QueryTerminalParams {
    public static final int MSG_ID = 0x8104;

    private int paramCount;
    private List<Integer> paramIds;

    public byte[] encode() {
        ByteBuf buf = Unpooled.buffer();
        buf.writeByte(paramIds != null ? paramIds.size() : 0);
        if (paramIds != null) {
            for (Integer id : paramIds) {
                buf.writeInt(id);
            }
        }
        byte[] body = new byte[buf.readableBytes()];
        buf.readBytes(body);
        return body;
    }
}
