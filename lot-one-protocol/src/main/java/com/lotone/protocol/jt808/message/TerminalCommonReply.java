package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

@Data
public class TerminalCommonReply {
    public static final int MSG_ID = 0x0001;

    private int replySerialNo;
    private int replyMsgId;
    private byte result;

    public static TerminalCommonReply decode(byte[] body) {
        ByteBuf buf = Unpooled.wrappedBuffer(body);
        TerminalCommonReply reply = new TerminalCommonReply();
        reply.setReplySerialNo(buf.readUnsignedShort());
        reply.setReplyMsgId(buf.readUnsignedShort());
        reply.setResult(buf.readByte());
        return reply;
    }
}
