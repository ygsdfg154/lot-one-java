package com.lotone.protocol.jt808.message;

import com.lotone.protocol.jt808.Jt808Message;
import lombok.Data;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * 终端区域查询应答 (0x0608)
 * 终端向平台上报已存储的区域信息
 */
@Data
public class AreaQueryReply {
    public static final int MSG_ID = 0x0608;

    /** 应答流水号（对应平台查询消息的流水号） */
    private int replySerialNo;

    /** 区域类型（1=圆形区域, 2=矩形区域, 3=多边形区域） */
    private int areaType;

    /** 区域数量 */
    private int areaCount;

    /** 区域ID列表 */
    private List<Integer> areaIds = new ArrayList<>();

    /**
     * 从 JT808 消息解码
     */
    public static AreaQueryReply decode(Jt808Message msg) {
        return decode(msg.getBody());
    }

    /**
     * 从消息体解码
     */
    public static AreaQueryReply decode(byte[] body) {
        AreaQueryReply reply = new AreaQueryReply();
        if (body != null && body.length >= 4) {
            // 应答流水号 (2字节)
            reply.setReplySerialNo(((body[0] & 0xFF) << 8) | (body[1] & 0xFF));
            // 区域类型 (1字节)
            reply.setAreaType(body[2] & 0xFF);
            // 区域数量 (1字节)
            reply.setAreaCount(body[3] & 0xFF);
            // 区域ID列表（每个4字节）
            for (int i = 0; i < reply.getAreaCount() && 4 + i * 4 + 4 <= body.length; i++) {
                int offset = 4 + i * 4;
                int areaId = ((body[offset] & 0xFF) << 24)
                        | ((body[offset + 1] & 0xFF) << 16)
                        | ((body[offset + 2] & 0xFF) << 8)
                        | (body[offset + 3] & 0xFF);
                reply.getAreaIds().add(areaId);
            }
        }
        return reply;
    }

    /**
     * 编码为 JT808 消息（平台发送区域查询时用，这里主要是应答）
     */
    public byte[] encodeBody() {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        // 应答流水号 (2字节)
        out.write((replySerialNo >> 8) & 0xFF);
        out.write(replySerialNo & 0xFF);
        // 区域类型 (1字节)
        out.write(areaType & 0xFF);
        // 区域数量 (1字节)
        out.write(areaIds.size() & 0xFF);
        // 区域ID列表（每个4字节）
        for (Integer areaId : areaIds) {
            out.write((areaId >> 24) & 0xFF);
            out.write((areaId >> 16) & 0xFF);
            out.write((areaId >> 8) & 0xFF);
            out.write(areaId & 0xFF);
        }
        return out.toByteArray();
    }
}
