package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

@Data
public class PlatformCommonReply {
    public static final int MSG_ID = 0x8001;

    private int replySerialNo;
    private int replyMsgId;
    private byte result;

    public byte[] encode() {
        ByteBuf buf = Unpooled.buffer(5);
        buf.writeShort(replySerialNo);
        buf.writeShort(replyMsgId);
        buf.writeByte(result);
        byte[] body = new byte[buf.readableBytes()];
        buf.readBytes(body);
        return body;
    }

    public static PlatformCommonReply decode(byte[] body) {
        ByteBuf buf = Unpooled.wrappedBuffer(body);
        PlatformCommonReply reply = new PlatformCommonReply();
        reply.setReplySerialNo(buf.readUnsignedShort());
        reply.setReplyMsgId(buf.readUnsignedShort());
        reply.setResult(buf.readByte());
        return reply;
    }
}
