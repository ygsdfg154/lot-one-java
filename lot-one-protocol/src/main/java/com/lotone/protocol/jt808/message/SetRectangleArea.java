package com.lotone.protocol.jt808.message;

import lombok.Data;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * 设置矩形区域 (0x8602)
 * 平台向终端下发矩形区域设置
 */
@Data
public class SetRectangleArea {
    public static final int MSG_ID = 0x8602;

    /** 设置属性（0=更新 1=追加 2=修改） */
    private int action;

    /** 矩形区域列表 */
    private List<RectangleArea> areas = new ArrayList<>();

    @Data
    public static class RectangleArea {
        /** 区域ID */
        private int areaId;
        /** 区域属性 */
        private int areaAttr;
        /** 左上点纬度（WGS84，乘以10^6） */
        private long topLeftLat;
        /** 左上点经度 */
        private long topLeftLng;
        /** 右下点纬度 */
        private long bottomRightLat;
        /** 右下点经度 */
        private long bottomRightLng;
        /** 起始时间（BCD，6字节，可选） */
        private String startTime;
        /** 结束时间（可选） */
        private String endTime;
        /** 最高速度（km/h，可选） */
        private Integer maxSpeed;
        /** 超速持续时间（秒，可选） */
        private Integer overspeedDuration;
    }

    public byte[] encodeBody() {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            out.write(action & 0xFF);
            out.write(areas.size() & 0xFF);
            for (RectangleArea area : areas) {
                // 区域ID (4字节)
                out.write((area.getAreaId() >> 24) & 0xFF);
                out.write((area.getAreaId() >> 16) & 0xFF);
                out.write((area.getAreaId() >> 8) & 0xFF);
                out.write(area.getAreaId() & 0xFF);
                // 区域属性 (2字节)
                out.write((area.getAreaAttr() >> 8) & 0xFF);
                out.write(area.getAreaAttr() & 0xFF);
                // 左上点纬度 (4字节)
                writeLong(out, area.getTopLeftLat());
                // 左上点经度 (4字节)
                writeLong(out, area.getTopLeftLng());
                // 右下点纬度 (4字节)
                writeLong(out, area.getBottomRightLat());
                // 右下点经度 (4字节)
                writeLong(out, area.getBottomRightLng());
                // 时间范围（如果属性bit0=1）
                if ((area.getAreaAttr() & 0x01) != 0 && area.getStartTime() != null) {
                    out.write(encodeBcdTime(area.getStartTime()));
                }
                if ((area.getAreaAttr() & 0x01) != 0 && area.getEndTime() != null) {
                    out.write(encodeBcdTime(area.getEndTime()));
                }
                // 限速（如果属性bit2=1）
                if ((area.getAreaAttr() & 0x04) != 0 && area.getMaxSpeed() != null) {
                    out.write((area.getMaxSpeed() >> 8) & 0xFF);
                    out.write(area.getMaxSpeed() & 0xFF);
                }
                if ((area.getAreaAttr() & 0x04) != 0 && area.getOverspeedDuration() != null) {
                    out.write(area.getOverspeedDuration() & 0xFF);
                }
            }
            return out.toByteArray();
        } catch (Exception e) {
            return new byte[0];
        }
    }

    private void writeLong(ByteArrayOutputStream out, long value) {
        out.write((int) ((value >> 24) & 0xFF));
        out.write((int) ((value >> 16) & 0xFF));
        out.write((int) ((value >> 8) & 0xFF));
        out.write((int) (value & 0xFF));
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

    public static SetRectangleArea decode(byte[] body) {
        SetRectangleArea msg = new SetRectangleArea();
        if (body == null || body.length < 2) return msg;
        msg.setAction(body[0] & 0xFF);
        int count = body[1] & 0xFF;
        int offset = 2;
        for (int i = 0; i < count && offset + 20 <= body.length; i++) {
            RectangleArea area = new RectangleArea();
            area.setAreaId(readInt(body, offset)); offset += 4;
            area.setAreaAttr(((body[offset] & 0xFF) << 8) | (body[offset+1] & 0xFF)); offset += 2;
            area.setTopLeftLat(readLong(body, offset)); offset += 4;
            area.setTopLeftLng(readLong(body, offset)); offset += 4;
            area.setBottomRightLat(readLong(body, offset)); offset += 4;
            area.setBottomRightLng(readLong(body, offset)); offset += 4;
            msg.getAreas().add(area);
        }
        return msg;
    }

    private static int readInt(byte[] body, int offset) {
        return ((body[offset] & 0xFF) << 24) | ((body[offset+1] & 0xFF) << 16)
                | ((body[offset+2] & 0xFF) << 8) | (body[offset+3] & 0xFF);
    }

    private static long readLong(byte[] body, int offset) {
        return ((body[offset] & 0xFFL) << 24) | ((body[offset+1] & 0xFFL) << 16)
                | ((body[offset+2] & 0xFFL) << 8) | (body[offset+3] & 0xFFL);
    }
}
