package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

@Data
public class VehicleControl {
    public static final int MSG_ID = 0x8500;

    private byte controlFlag; // 控制标志，bit0:车门控制  bit1:空调控制  bit2:发动机控制  bit3:制动控制
    private byte controlValue; // 控制值，0:关闭 1:开启

    public byte[] encode() {
        ByteBuf buf = Unpooled.buffer(2);
        buf.writeByte(controlFlag);
        buf.writeByte(controlValue);
        byte[] body = new byte[buf.readableBytes()];
        buf.readBytes(body);
        return body;
    }
}
