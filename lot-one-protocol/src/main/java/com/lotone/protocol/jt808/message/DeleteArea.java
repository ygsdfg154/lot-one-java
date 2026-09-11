package com.lotone.protocol.jt808.message;

import lombok.Data;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * 删除区域 (0x8606)
 * 平台向终端下发删除区域命令
 */
@Data
public class DeleteArea {
    public static final int MSG_ID = 0x8606;

    /** 区域类型（1=圆形 2=矩形 3=多边形） */
    private int areaType;

    /** 区域ID列表 */
    private List<Integer> areaIds = new ArrayList<>();

    public byte[] encodeBody() {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            // 区域类型 (1字节)
            out.write(areaType & 0xFF);
            // 区域数量 (1字节)
            out.write(areaIds.size() & 0xFF);
            // 每个区域ID (4字节)
            for (Integer areaId : areaIds) {
                out.write((areaId >> 24) & 0xFF);
                out.write((areaId >> 16) & 0xFF);
                out.write((areaId >> 8) & 0xFF);
                out.write(areaId & 0xFF);
            }
            return out.toByteArray();
        } catch (Exception e) {
            return new byte[0];
        }
    }

    public static DeleteArea decode(byte[] body) {
        DeleteArea msg = new DeleteArea();
        if (body == null || body.length < 2) return msg;
        msg.setAreaType(body[0] & 0xFF);
        int count = body[1] & 0xFF;
        int offset = 2;
        for (int i = 0; i < count && offset + 4 <= body.length; i++) {
            int areaId = ((body[offset] & 0xFF) << 24) | ((body[offset+1] & 0xFF) << 16)
                    | ((body[offset+2] & 0xFF) << 8) | (body[offset+3] & 0xFF);
            msg.getAreaIds().add(areaId);
            offset += 4;
        }
        return msg;
    }

    public String getAreaTypeName() {
        switch (areaType) {
            case 1: return "圆形区域";
            case 2: return "矩形区域";
            case 3: return "多边形区域";
            default: return "未知类型";
        }
    }
}
