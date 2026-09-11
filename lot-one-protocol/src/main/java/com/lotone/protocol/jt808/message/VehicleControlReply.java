package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

@Data
public class VehicleControlReply {
    public static final int MSG_ID = 0x0500;

    private int replySerialNo;
    private byte result; // 0:成功 1:失败 2:不支持

    public static VehicleControlReply decode(byte[] body) {
        ByteBuf buf = Unpooled.wrappedBuffer(body);
        VehicleControlReply reply = new VehicleControlReply();
        reply.setReplySerialNo(buf.readUnsignedShort());
        reply.setResult(buf.readByte());
        return reply;
    }
}
