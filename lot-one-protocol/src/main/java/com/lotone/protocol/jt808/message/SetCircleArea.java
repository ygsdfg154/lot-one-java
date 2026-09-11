package com.lotone.protocol.jt808.message;

import com.lotone.protocol.jt808.Jt808Message;
import lombok.Data;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * 设置圆形区域 (0x8600)
 * 平台向终端下发圆形区域设置
 */
@Data
public class SetCircleArea {
    public static final int MSG_ID = 0x8600;

    /** 设置属性（0=更新区域 1=追加区域 2=修改区域） */
    private int action;

    /** 区域列表 */
    private List<CircleArea> areas = new ArrayList<>();

    @Data
    public static class CircleArea {
        /** 区域ID */
        private int areaId;
        /** 区域属性（bit0=进区域报警, bit1=出区域报警, bit2=限速, bit3=进区域开门...） */
        private int areaAttr;
        /** 中心点纬度（WGS84，乘以10^6） */
        private long centerLat;
        /** 中心点经度（WGS84，乘以10^6） */
        private long centerLng;
        /** 半径（米） */
        private int radius;
        /** 起始时间（BCD，6字节，可选） */
        private String startTime;
        /** 结束时间（BCD，6字节，可选） */
        private String endTime;
        /** 最高速度（km/h，可选） */
        private Integer maxSpeed;
        /** 超速持续时间（秒，可选） */
        private Integer overspeedDuration;
    }

    /**
     * 编码为消息体
     */
    public byte[] encodeBody() {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            // 设置属性 (1字节)
            out.write(action & 0xFF);
            // 区域数量 (1字节)
            out.write(areas.size() & 0xFF);
            // 每个区域
            for (CircleArea area : areas) {
                // 区域ID (4字节)
                out.write((area.getAreaId() >> 24) & 0xFF);
                out.write((area.getAreaId() >> 16) & 0xFF);
                out.write((area.getAreaId() >> 8) & 0xFF);
                out.write(area.getAreaId() & 0xFF);
                // 区域属性 (2字节)
                out.write((area.getAreaAttr() >> 8) & 0xFF);
                out.write(area.getAreaAttr() & 0xFF);
                // 中心点纬度 (4字节)
                out.write((int) ((area.getCenterLat() >> 24) & 0xFF));
                out.write((int) ((area.getCenterLat() >> 16) & 0xFF));
                out.write((int) ((area.getCenterLat() >> 8) & 0xFF));
                out.write((int) (area.getCenterLat() & 0xFF));
                // 中心点经度 (4字节)
                out.write((int) ((area.getCenterLng() >> 24) & 0xFF));
                out.write((int) ((area.getCenterLng() >> 16) & 0xFF));
                out.write((int) ((area.getCenterLng() >> 8) & 0xFF));
                out.write((int) (area.getCenterLng() & 0xFF));
                // 半径 (4字节)
                out.write((area.getRadius() >> 24) & 0xFF);
                out.write((area.getRadius() >> 16) & 0xFF);
                out.write((area.getRadius() >> 8) & 0xFF);
                out.write(area.getRadius() & 0xFF);
                // 起始时间（如果属性bit0=1）
                if ((area.getAreaAttr() & 0x01) != 0 && area.getStartTime() != null) {
                    out.write(encodeBcdTime(area.getStartTime()));
                }
                // 结束时间
                if ((area.getAreaAttr() & 0x01) != 0 && area.getEndTime() != null) {
                    out.write(encodeBcdTime(area.getEndTime()));
                }
                // 最高速度（如果属性bit2=1）
                if ((area.getAreaAttr() & 0x04) != 0 && area.getMaxSpeed() != null) {
                    out.write((area.getMaxSpeed() >> 8) & 0xFF);
                    out.write(area.getMaxSpeed() & 0xFF);
                }
                // 超速持续时间
                if ((area.getAreaAttr() & 0x04) != 0 && area.getOverspeedDuration() != null) {
                    out.write(area.getOverspeedDuration() & 0xFF);
                }
            }
            return out.toByteArray();
        } catch (Exception e) {
            return new byte[0];
        }
    }

    private byte[] encodeBcdTime(String time) {
        // time format: YYMMDDHHMMSS
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

    /**
     * 从消息体解码
     */
    public static SetCircleArea decode(byte[] body) {
        SetCircleArea msg = new SetCircleArea();
        if (body == null || body.length < 2) return msg;
        msg.setAction(body[0] & 0xFF);
        int count = body[1] & 0xFF;
        int offset = 2;
        for (int i = 0; i < count && offset + 16 <= body.length; i++) {
            CircleArea area = new CircleArea();
            area.setAreaId(((body[offset] & 0xFF) << 24) | ((body[offset+1] & 0xFF) << 16)
                    | ((body[offset+2] & 0xFF) << 8) | (body[offset+3] & 0xFF));
            offset += 4;
            area.setAreaAttr(((body[offset] & 0xFF) << 8) | (body[offset+1] & 0xFF));
            offset += 2;
            area.setCenterLat(((body[offset] & 0xFFL) << 24) | ((body[offset+1] & 0xFFL) << 16)
                    | ((body[offset+2] & 0xFFL) << 8) | (body[offset+3] & 0xFFL));
            offset += 4;
            area.setCenterLng(((body[offset] & 0xFFL) << 24) | ((body[offset+1] & 0xFFL) << 16)
                    | ((body[offset+2] & 0xFFL) << 8) | (body[offset+3] & 0xFFL));
            offset += 4;
            area.setRadius(((body[offset] & 0xFF) << 24) | ((body[offset+1] & 0xFF) << 16)
                    | ((body[offset+2] & 0xFF) << 8) | (body[offset+3] & 0xFF));
            offset += 4;
            msg.getAreas().add(area);
        }
        return msg;
    }
}
