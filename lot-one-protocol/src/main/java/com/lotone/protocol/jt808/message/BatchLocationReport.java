package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class BatchLocationReport {
    public static final int MSG_ID = 0x0704;

    private int itemCount;
    private int dataType; // 0:正常位置批量 1:盲区补传
    private List<LocationReport> locations = new ArrayList<>();

    public static BatchLocationReport decode(byte[] body) {
        ByteBuf buf = Unpooled.wrappedBuffer(body);
        BatchLocationReport batch = new BatchLocationReport();
        batch.setItemCount(buf.readUnsignedShort());
        batch.setDataType(buf.readUnsignedByte());

        for (int i = 0; i < batch.getItemCount(); i++) {
            int locationLen = buf.readUnsignedShort();
            byte[] locationBody = new byte[locationLen];
            buf.readBytes(locationBody);
            LocationReport loc = LocationReport.decode(locationBody);
            batch.getLocations().add(loc);
        }
        return batch;
    }
}
