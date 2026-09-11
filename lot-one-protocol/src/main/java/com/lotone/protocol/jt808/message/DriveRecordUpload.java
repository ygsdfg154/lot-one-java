package com.lotone.protocol.jt808.message;

import lombok.Data;

/**
 * 行驶记录数据上传 (0x0700)
 * 终端向平台上传行驶记录数据
 */
@Data
public class DriveRecordUpload {
    public static final int MSG_ID = 0x0700;

    /** 应答流水号 */
    private int replySerialNo;

    /** 命令字（0x00=采集指定的行驶记录数据 0x01=采集指定的速度状态日志...） */
    private int command;

    /** 数据块（根据命令字不同格式不同） */
    private byte[] dataBlock;

    public static DriveRecordUpload decode(byte[] body) {
        DriveRecordUpload msg = new DriveRecordUpload();
        if (body == null || body.length < 3) return msg;
        // 应答流水号 (2字节)
        msg.setReplySerialNo(((body[0] & 0xFF) << 8) | (body[1] & 0xFF));
        // 命令字 (1字节)
        msg.setCommand(body[2] & 0xFF);
        // 剩余为数据块
        if (body.length > 3) {
            byte[] data = new byte[body.length - 3];
            System.arraycopy(body, 3, data, 0, data.length);
            msg.setDataBlock(data);
        }
        return msg;
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
