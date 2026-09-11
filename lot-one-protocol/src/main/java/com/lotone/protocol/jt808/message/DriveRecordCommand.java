package com.lotone.protocol.jt808.message;

import lombok.Data;

import java.io.ByteArrayOutputStream;

/**
 * 行驶记录数据采集命令 (0x8701)
 * 平台向终端下发行驶记录数据采集命令
 */
@Data
public class DriveRecordCommand {
    public static final int MSG_ID = 0x8701;

    /** 命令字 */
    private int command;

    /** 起始时间（BCD，6字节，可选） */
    private String startTime;

    /** 结束时间（BCD，6字节，可选） */
    private String endTime;

    /** 最大数据块数（2字节，可选） */
    private Integer maxBlocks;

    public byte[] encodeBody() {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            // 命令字 (1字节)
            out.write(command & 0xFF);
            // 起始时间（6字节BCD）
            if (startTime != null) {
                out.write(encodeBcdTime(startTime));
            }
            // 结束时间（6字节BCD）
            if (endTime != null) {
                out.write(encodeBcdTime(endTime));
            }
            // 最大数据块数（2字节）
            if (maxBlocks != null) {
                out.write((maxBlocks >> 8) & 0xFF);
                out.write(maxBlocks & 0xFF);
            }
            return out.toByteArray();
        } catch (Exception e) {
            return new byte[0];
        }
    }

    public static DriveRecordCommand decode(byte[] body) {
        DriveRecordCommand cmd = new DriveRecordCommand();
        if (body == null || body.length < 1) return cmd;
        cmd.setCommand(body[0] & 0xFF);
        int offset = 1;
        // 起始时间
        if (offset + 6 <= body.length) {
            cmd.setStartTime(decodeBcdTime(body, offset));
            offset += 6;
        }
        // 结束时间
        if (offset + 6 <= body.length) {
            cmd.setEndTime(decodeBcdTime(body, offset));
            offset += 6;
        }
        // 最大数据块数
        if (offset + 2 <= body.length) {
            cmd.setMaxBlocks(((body[offset] & 0xFF) << 8) | (body[offset + 1] & 0xFF));
        }
        return cmd;
    }

    private byte[] encodeBcdTime(String time) {
        byte[] bcd = new byte[6];
        try {
            for (int i = 0; i < 6 && i * 2 + 1 < time.length(); i++) {
                int high = Integer.parseInt(time.substring(i * 2, i * 2 + 1));
                int low = Integer.parseInt(time.substring(i * 2 + 1, i * 2 + 2));
                bcd[i] = (byte) ((high << 4) | low);
            }
        } catch (Exception e) {
            // ignore
        }
        return bcd;
    }

    private static String decodeBcdTime(byte[] body, int offset) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            sb.append(String.format("%02d", (body[offset + i] >> 4) & 0x0F));
            sb.append(String.format("%02d", body[offset + i] & 0x0F));
        }
        return sb.toString();
    }

    public String getCommandName() {
        switch (command) {
            case 0x00: return "采集指定的行驶记录数据";
            case 0x01: return "采集指定的速度状态日志";
            case 0x02: return "采集指定的位置信息记录";
            case 0x03: return "采集指定的参数修改记录";
            case 0x04: return "采集指定的驾驶员身份记录";
            case 0x05: return "采集指定的外部供电记录";
            case 0x06: return "采集指定的车辆故障记录";
            case 0x07: return "采集指定的事故疑点记录";
            case 0x08: return "采集指定的超时驾驶记录";
            case 0x09: return "采集指定的疲劳驾驶记录";
            case 0x0A: return "采集指定的里程记录";
            case 0x0B: return "采集指定的停车记录";
            case 0x0C: return "采集指定的超速记录";
            case 0x0D: return "采集指定的异常断电记录";
            default: return "未知命令(0x" + Integer.toHexString(command) + ")";
        }
    }
}
