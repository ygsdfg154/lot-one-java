package com.lotone.protocol.jt808.message;

import com.lotone.protocol.jt808.Jt808Message;
import lombok.Data;

/**
 * 多媒体数据上传 (0x0801)
 * 终端向平台上传多媒体数据（图片/音频/视频）
 */
@Data
public class MultimediaUpload {
    public static final int MSG_ID = 0x0801;

    /** 多媒体ID */
    private long mediaId;

    /** 多媒体类型（0=图像 1=音频 2=视频） */
    private int mediaType;

    /** 多媒体格式编码（0=JPEG 1=TIF 2=MP3 3=WAV 4=WMV） */
    private int mediaFormat;

    /** 事件项编码（0=平台下发指令 1=定时动作 2=抢劫报警 3=碰撞侧翻报警...） */
    private int eventCode;

    /** 通道ID */
    private int channelId;

    /** 位置信息（28字节，可选） */
    private LocationInfo location;

    /** 多媒体数据包 */
    private byte[] mediaData;

    @Data
    public static class LocationInfo {
        /** 报警标志 */
        private long alarmFlag;
        /** 状态 */
        private long status;
        /** 纬度（WGS84，乘以10^6） */
        private long latitude;
        /** 经度（WGS84，乘以10^6） */
        private long longitude;
        /** 海拔（米） */
        private int altitude;
        /** 速度（km/h） */
        private int speed;
        /** 方向（度） */
        private int direction;
        /** 时间（BCD，6字节） */
        private String time;
    }

    /**
     * 从消息体解码
     */
    public static MultimediaUpload decode(byte[] body) {
        MultimediaUpload msg = new MultimediaUpload();
        if (body == null || body.length < 10) return msg;

        int offset = 0;
        // 多媒体ID (4字节)
        msg.setMediaId(((body[offset] & 0xFFL) << 24) | ((body[offset+1] & 0xFFL) << 16)
                | ((body[offset+2] & 0xFFL) << 8) | (body[offset+3] & 0xFFL));
        offset += 4;
        // 多媒体类型 (1字节)
        msg.setMediaType(body[offset++] & 0xFF);
        // 多媒体格式 (1字节)
        msg.setMediaFormat(body[offset++] & 0xFF);
        // 事件项编码 (1字节)
        msg.setEventCode(body[offset++] & 0xFF);
        // 通道ID (1字节)
        msg.setChannelId(body[offset++] & 0xFF);

        // 位置信息（28字节，如果有）
        if (offset + 28 <= body.length) {
            LocationInfo loc = new LocationInfo();
            loc.setAlarmFlag(((body[offset] & 0xFFL) << 24) | ((body[offset+1] & 0xFFL) << 16)
                    | ((body[offset+2] & 0xFFL) << 8) | (body[offset+3] & 0xFFL));
            offset += 4;
            loc.setStatus(((body[offset] & 0xFFL) << 24) | ((body[offset+1] & 0xFFL) << 16)
                    | ((body[offset+2] & 0xFFL) << 8) | (body[offset+3] & 0xFFL));
            offset += 4;
            loc.setLatitude(((body[offset] & 0xFFL) << 24) | ((body[offset+1] & 0xFFL) << 16)
                    | ((body[offset+2] & 0xFFL) << 8) | (body[offset+3] & 0xFFL));
            offset += 4;
            loc.setLongitude(((body[offset] & 0xFFL) << 24) | ((body[offset+1] & 0xFFL) << 16)
                    | ((body[offset+2] & 0xFFL) << 8) | (body[offset+3] & 0xFFL));
            offset += 4;
            loc.setAltitude(((body[offset] & 0xFF) << 8) | (body[offset+1] & 0xFF));
            offset += 2;
            loc.setSpeed(((body[offset] & 0xFF) << 8) | (body[offset+1] & 0xFF));
            offset += 2;
            loc.setDirection(((body[offset] & 0xFF) << 8) | (body[offset+1] & 0xFF));
            offset += 2;
            // 时间 BCD (6字节)
            StringBuilder timeSb = new StringBuilder();
            for (int i = 0; i < 6; i++) {
                timeSb.append(String.format("%02d", (body[offset + i] >> 4) & 0x0F));
                timeSb.append(String.format("%02d", body[offset + i] & 0x0F));
            }
            loc.setTime(timeSb.toString());
            offset += 6;
            msg.setLocation(loc);
        }

        // 剩余为多媒体数据
        if (offset < body.length) {
            byte[] data = new byte[body.length - offset];
            System.arraycopy(body, offset, data, 0, data.length);
            msg.setMediaData(data);
        }

        return msg;
    }

    /**
     * 获取多媒体类型名称
     */
    public String getMediaTypeName() {
        switch (mediaType) {
            case 0: return "图像";
            case 1: return "音频";
            case 2: return "视频";
            default: return "未知";
        }
    }

    /**
     * 获取文件扩展名
     */
    public String getFileExtension() {
        if (mediaType == 0) {
            return mediaFormat == 0 ? ".jpg" : ".tif";
        } else if (mediaType == 1) {
            return mediaFormat == 2 ? ".mp3" : ".wav";
        } else if (mediaType == 2) {
            return ".wmv";
        }
        return ".bin";
    }
}
