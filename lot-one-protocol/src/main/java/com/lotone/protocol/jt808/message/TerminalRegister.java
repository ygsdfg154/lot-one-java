package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

@Data
public class TerminalRegister {
    public static final int MSG_ID = 0x0100;

    private int provinceId;
    private int cityId;
    private String manufacturerId;
    private String terminalModel;
    private String terminalId;
    private int plateColor;
    private String plateNumber;

    public static TerminalRegister decode(byte[] body) {
        ByteBuf buf = Unpooled.wrappedBuffer(body);
        TerminalRegister reg = new TerminalRegister();
        reg.setProvinceId(buf.readUnsignedShort());
        reg.setCityId(buf.readUnsignedShort());
        byte[] mfr = new byte[5];
        buf.readBytes(mfr);
        reg.setManufacturerId(new String(mfr).trim());
        byte[] model = new byte[20];
        buf.readBytes(model);
        reg.setTerminalModel(new String(model).trim());
        byte[] tid = new byte[7];
        buf.readBytes(tid);
        reg.setTerminalId(new String(tid).trim());
        reg.setPlateColor(buf.readByte());
        byte[] plate = new byte[buf.readableBytes()];
        buf.readBytes(plate);
        reg.setPlateNumber(new String(plate).trim());
        return reg;
    }
}
