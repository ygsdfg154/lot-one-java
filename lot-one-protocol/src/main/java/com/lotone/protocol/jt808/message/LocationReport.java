package com.lotone.protocol.jt808.message;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class LocationReport {
    public static final int MSG_ID = 0x0200;

    private int alarmFlag;
    private int status;
    private double latitude;
    private double longitude;
    private int altitude;
    private double speed;
    private int direction;
    private LocalDateTime time;

    public static LocationReport decode(byte[] body) {
        ByteBuf buf = Unpooled.wrappedBuffer(body);
        LocationReport loc = new LocationReport();
        loc.setAlarmFlag(buf.readInt());
        loc.setStatus(buf.readInt());
        loc.setLatitude(buf.readUnsignedInt() / 1000000.0);
        loc.setLongitude(buf.readUnsignedInt() / 1000000.0);
        loc.setAltitude(buf.readUnsignedShort());
        loc.setSpeed(buf.readUnsignedShort() / 10.0);
        loc.setDirection(buf.readUnsignedShort());
        byte[] timeBytes = new byte[6];
        buf.readBytes(timeBytes);
        loc.setTime(LocalDateTime.of(
                2000 + (timeBytes[0] & 0xFF),
                timeBytes[1] & 0xFF,
                timeBytes[2] & 0xFF,
                timeBytes[3] & 0xFF,
                timeBytes[4] & 0xFF,
                timeBytes[5] & 0xFF
        ));
        return loc;
    }
}
