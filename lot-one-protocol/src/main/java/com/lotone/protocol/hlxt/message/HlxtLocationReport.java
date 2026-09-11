package com.lotone.protocol.hlxt.message;

import com.lotone.protocol.hlxt.HlxtMessage;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
public class HlxtLocationReport extends HlxtMessage {

    public static final int MSG_ID = 0x0200;

    private int alarmFlag;
    private int status;
    private double latitude;
    private double longitude;
    private int altitude;
    private double speed;
    private int direction;
    private LocalDateTime time;

    public HlxtLocationReport() {
        this.msgId = MSG_ID;
    }

    @Override
    public void decode(byte[] body) {
        if (body == null || body.length < 28) return;
        ByteBuffer buf = ByteBuffer.wrap(body);
        buf.order(ByteOrder.BIG_ENDIAN);
        alarmFlag = buf.getInt();
        status = buf.getInt();
        latitude = buf.getInt() / 1000000.0;
        longitude = buf.getInt() / 1000000.0;
        altitude = buf.getShort();
        speed = buf.getShort() / 10.0;
        direction = buf.getShort();
        byte[] timeBytes = new byte[6];
        buf.get(timeBytes);
        time = parseBcdTime(timeBytes);
    }

    @Override
    public byte[] encode() {
        ByteBuffer buf = ByteBuffer.allocate(28);
        buf.order(ByteOrder.BIG_ENDIAN);
        buf.putInt(alarmFlag);
        buf.putInt(status);
        buf.putInt((int) (latitude * 1000000));
        buf.putInt((int) (longitude * 1000000));
        buf.putShort((short) altitude);
        buf.putShort((short) (speed * 10));
        buf.putShort((short) direction);
        if (time != null) {
            buf.put(formatBcdTime(time));
        } else {
            buf.put(new byte[6]);
        }
        return buf.array();
    }

    @Override
    public String getMsgName() {
        return "位置信息汇报";
    }

    private LocalDateTime parseBcdTime(byte[] bcd) {
        try {
            int year = 2000 + ((bcd[0] >> 4) & 0x0F) * 10 + (bcd[0] & 0x0F);
            int month = ((bcd[1] >> 4) & 0x0F) * 10 + (bcd[1] & 0x0F);
            int day = ((bcd[2] >> 4) & 0x0F) * 10 + (bcd[2] & 0x0F);
            int hour = ((bcd[3] >> 4) & 0x0F) * 10 + (bcd[3] & 0x0F);
            int minute = ((bcd[4] >> 4) & 0x0F) * 10 + (bcd[4] & 0x0F);
            int second = ((bcd[5] >> 4) & 0x0F) * 10 + (bcd[5] & 0x0F);
            return LocalDateTime.of(year, month, day, hour, minute, second);
        } catch (Exception e) {
            return LocalDateTime.now();
        }
    }

    private byte[] formatBcdTime(LocalDateTime time) {
        byte[] bcd = new byte[6];
        bcd[0] = (byte) (((time.getYear() % 100 / 10) << 4) | (time.getYear() % 10));
        bcd[1] = (byte) (((time.getMonthValue() / 10) << 4) | (time.getMonthValue() % 10));
        bcd[2] = (byte) (((time.getDayOfMonth() / 10) << 4) | (time.getDayOfMonth() % 10));
        bcd[3] = (byte) (((time.getHour() / 10) << 4) | (time.getHour() % 10));
        bcd[4] = (byte) (((time.getMinute() / 10) << 4) | (time.getMinute() % 10));
        bcd[5] = (byte) (((time.getSecond() / 10) << 4) | (time.getSecond() % 10));
        return bcd;
    }
}
