package com.lotone.protocol.jt808.message;

import lombok.Data;

import java.io.ByteArrayOutputStream;

/**
 * 多媒体数据上传命令 (0x8800)
 * 平台向终端下发多媒体数据上传命令
 */
@Data
public class MultimediaUploadCommand {
    public static final int MSG_ID = 0x8800;

    /** 多媒体类型（0=图像 1=音频 2=视频） */
    private int mediaType;

    /** 通道ID */
    private int channelId;

    /** 事件项编码（0=平台下发指令 1=定时动作 2=抢劫报警 3=碰撞侧翻报警...） */
    private int eventCode;

    /** 是否删除（0=保留 1=删除） */
    private int deleteFlag;

    /** 起始时间（BCD，6字节，可选） */
    private String startTime;

    /** 结束时间（BCD，6字节，可选） */
    private String endTime;

    public byte[] encodeBody() {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            // 多媒体类型 (1字节)
            out.write(mediaType & 0xFF);
            // 通道ID (1字节)
            out.write(channelId & 0xFF);
            // 事件项编码 (1字节)
            out.write(eventCode & 0xFF);
            // 是否删除 (1字节)
            out.write(deleteFlag & 0xFF);
            // 起始时间（6字节BCD）
            if (startTime != null) {
                out.write(encodeBcdTime(startTime));
            }
            // 结束时间（6字节BCD）
            if (endTime != null) {
                out.write(encodeBcdTime(endTime));
            }
            return out.toByteArray();
        } catch (Exception e) {
            return new byte[0];
        }
    }

    public static MultimediaUploadCommand decode(byte[] body) {
        MultimediaUploadCommand cmd = new MultimediaUploadCommand();
        if (body == null || body.length < 4) return cmd;
        cmd.setMediaType(body[0] & 0xFF);
        cmd.setChannelId(body[1] & 0xFF);
        cmd.setEventCode(body[2] & 0xFF);
        cmd.setDeleteFlag(body[3] & 0xFF);
        int offset = 4;
        if (offset + 6 <= body.length) {
            cmd.setStartTime(decodeBcdTime(body, offset));
            offset += 6;
        }
        if (offset + 6 <= body.length) {
            cmd.setEndTime(decodeBcdTime(body, offset));
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

    public String getMediaTypeName() {
        switch (mediaType) {
            case 0: return "图像";
            case 1: return "音频";
            case 2: return "视频";
            default: return "未知";
        }
    }
}
