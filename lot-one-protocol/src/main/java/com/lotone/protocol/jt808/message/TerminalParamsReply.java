package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class TerminalParamsReply {
    public static final int MSG_ID = 0x0104;

    private int replySerialNo;
    private int paramCount;
    private Map<Integer, byte[]> params = new HashMap<>();

    public static TerminalParamsReply decode(byte[] body) {
        ByteBuf buf = Unpooled.wrappedBuffer(body);
        TerminalParamsReply reply = new TerminalParamsReply();
        reply.setReplySerialNo(buf.readUnsignedShort());
        reply.setParamCount(buf.readUnsignedByte());

        for (int i = 0; i < reply.getParamCount(); i++) {
            int paramId = buf.readInt();
            int paramLen = buf.readUnsignedByte();
            byte[] paramValue = new byte[paramLen];
            buf.readBytes(paramValue);
            reply.getParams().put(paramId, paramValue);
        }
        return reply;
    }
}
