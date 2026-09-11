package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

import java.util.Map;

@Data
public class SetTerminalParams {
    public static final int MSG_ID = 0x8103;

    private int paramCount;
    private Map<Integer, byte[]> params;

    public byte[] encode() {
        ByteBuf buf = Unpooled.buffer();
        buf.writeByte(params != null ? params.size() : 0);
        if (params != null) {
            for (Map.Entry<Integer, byte[]> entry : params.entrySet()) {
                buf.writeInt(entry.getKey());
                byte[] value = entry.getValue();
                buf.writeByte(value != null ? value.length : 0);
                if (value != null && value.length > 0) {
                    buf.writeBytes(value);
                }
            }
        }
        byte[] body = new byte[buf.readableBytes()];
        buf.readBytes(body);
        return body;
    }
}
