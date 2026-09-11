package com.lotone.protocol.jt808.message;

import com.lotone.protocol.jt808.Jt808Message;
import lombok.Data;

import java.io.ByteArrayOutputStream;

/**
 * 数据透传 (0x0900 上行 / 0x8900 下行)
 * 终端与平台之间透传自定义数据
 */
@Data
public class DataPassthrough {
    public static final int MSG_ID_UP = 0x0900;
    public static final int MSG_ID_DOWN = 0x8900;

    /** 透传消息类型 */
    private int passthroughType;

    /** 透传数据内容 */
    private byte[] data;

    /**
     * 编码为消息体
     */
    public byte[] encodeBody() {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        // 透传消息类型 (1字节)
        out.write(passthroughType & 0xFF);
        // 透传数据
        if (data != null && data.length > 0) {
            out.write(data, 0, data.length);
        }
        return out.toByteArray();
    }

    /**
     * 从消息体解码
     */
    public static DataPassthrough decode(byte[] body) {
        DataPassthrough msg = new DataPassthrough();
        if (body == null || body.length < 1) return msg;
        msg.setPassthroughType(body[0] & 0xFF);
        if (body.length > 1) {
            byte[] data = new byte[body.length - 1];
            System.arraycopy(body, 1, data, 0, data.length);
            msg.setData(data);
        }
        return msg;
    }

    /**
     * 获取透传数据为字符串（UTF-8）
     */
    public String getDataAsString() {
        if (data == null) return null;
        try {
            return new String(data, "UTF-8");
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 获取透传类型名称
     */
    public String getPassthroughTypeName() {
        switch (passthroughType) {
            case 0x00: return "GNSS模块详细定位数据";
            case 0x01: return "道路运输证IC卡信息";
            case 0x02: return "串行数据透传";
            case 0x03: return "驾驶员身份信息采集上报";
            case 0x04: return "定位数据批量上传";
            case 0x05: return "CAN总线数据上传";
            case 0x06: return "多媒体数据上传";
            case 0x07: return "行驶记录数据上传";
            case 0x08: return "驾驶员身份信息采集";
            case 0xF0: return "自定义透传";
            default: return "未知类型(0x" + Integer.toHexString(passthroughType) + ")";
        }
    }
}
