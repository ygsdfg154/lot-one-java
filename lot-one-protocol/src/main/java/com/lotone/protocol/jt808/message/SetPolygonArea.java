package com.lotone.protocol.jt808.message;

import lombok.Data;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * 设置多边形区域 (0x8604)
 * 平台向终端下发多边形区域设置
 */
@Data
public class SetPolygonArea {
    public static final int MSG_ID = 0x8604;

    /** 设置属性 */
    private int action;

    /** 多边形区域列表 */
    private List<PolygonArea> areas = new ArrayList<>();

    @Data
    public static class PolygonArea {
        /** 区域ID */
        private int areaId;
        /** 区域属性 */
        private int areaAttr;
        /** 顶点数量 */
        private int pointCount;
        /** 顶点列表（纬度,经度 对，WGS84乘以10^6） */
        private List<long[]> points = new ArrayList<>();
        /** 起始时间（可选） */
        private String startTime;
        /** 结束时间（可选） */
        private String endTime;
        /** 最高速度（可选） */
        private Integer maxSpeed;
        /** 超速持续时间（可选） */
        private Integer overspeedDuration;
    }

    public byte[] encodeBody() {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            out.write(action & 0xFF);
            out.write(areas.size() & 0xFF);
            for (PolygonArea area : areas) {
                // 区域ID (4字节)
                out.write((area.getAreaId() >> 24) & 0xFF);
                out.write((area.getAreaId() >> 16) & 0xFF);
                out.write((area.getAreaId() >> 8) & 0xFF);
                out.write(area.getAreaId() & 0xFF);
                // 区域属性 (2字节)
                out.write((area.getAreaAttr() >> 8) & 0xFF);
                out.write(area.getAreaAttr() & 0xFF);
                // 顶点数量 (2字节)
                out.write((area.getPoints().size() >> 8) & 0xFF);
                out.write(area.getPoints().size() & 0xFF);
                // 每个顶点（纬度4字节 + 经度4字节）
                for (long[] point : area.getPoints()) {
                    writeLong(out, point[0]);
                    writeLong(out, point[1]);
                }
                // 时间范围
                if ((area.getAreaAttr() & 0x01) != 0 && area.getStartTime() != null) {
                    out.write(encodeBcdTime(area.getStartTime()));
                }
                if ((area.getAreaAttr() & 0x01) != 0 && area.getEndTime() != null) {
                    out.write(encodeBcdTime(area.getEndTime()));
                }
                // 限速
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

    public static SetPolygonArea decode(byte[] body) {
        SetPolygonArea msg = new SetPolygonArea();
        if (body == null || body.length < 2) return msg;
        msg.setAction(body[0] & 0xFF);
        int count = body[1] & 0xFF;
        int offset = 2;
        for (int i = 0; i < count && offset + 8 <= body.length; i++) {
            PolygonArea area = new PolygonArea();
            area.setAreaId(readInt(body, offset)); offset += 4;
            area.setAreaAttr(((body[offset] & 0xFF) << 8) | (body[offset+1] & 0xFF)); offset += 2;
            int pointCount = ((body[offset] & 0xFF) << 8) | (body[offset+1] & 0xFF); offset += 2;
            area.setPointCount(pointCount);
            for (int j = 0; j < pointCount && offset + 8 <= body.length; j++) {
                long lat = readLong(body, offset); offset += 4;
                long lng = readLong(body, offset); offset += 4;
                area.getPoints().add(new long[]{lat, lng});
            }
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
