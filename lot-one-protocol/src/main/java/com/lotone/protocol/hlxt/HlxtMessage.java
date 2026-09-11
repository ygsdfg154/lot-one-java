package com.lotone.protocol.hlxt;

import lombok.Data;

/**
 * HLXT（华录信通）协议消息基类
 * 格式与JT808类似：0x7E + 消息头 + 消息体 + BCC校验 + 0x7E
 */
@Data
public abstract class HlxtMessage {

    /** 起始标识 */
    public static final byte START_FLAG = 0x7E;

    /** 结束标识 */
    public static final byte END_FLAG = 0x7E;

    /** 消息ID */
    protected int msgId;

    /** 消息体属性 */
    protected int msgBodyProps;

    /** 终端手机号（BCD编码，6字节） */
    protected String phone;

    /** 消息流水号 */
    protected int serialNumber;

    /** 消息体字节数组 */
    protected byte[] body;

    /**
     * 解码消息体
     */
    public abstract void decode(byte[] body);

    /**
     * 编码消息体
     */
    public abstract byte[] encode();

    /**
     * 获取消息名称
     */
    public abstract String getMsgName();

    /**
     * BCC校验（异或校验，从消息头第一个字节到消息体最后一个字节）
     */
    public static byte calculateBcc(byte[] data, int offset, int length) {
        byte bcc = 0;
        for (int i = offset; i < offset + length; i++) {
            bcc ^= data[i];
        }
        return bcc;
    }

    /**
     * 转义处理：0x7E -> 0x7D 0x02, 0x7D -> 0x7D 0x01
     */
    public static byte[] escape(byte[] data) {
        int count = 0;
        for (byte b : data) {
            if (b == 0x7E || b == 0x7D) count++;
        }
        if (count == 0) return data;

        byte[] result = new byte[data.length + count];
        int pos = 0;
        for (byte b : data) {
            if (b == 0x7E) {
                result[pos++] = 0x7D;
                result[pos++] = 0x02;
            } else if (b == 0x7D) {
                result[pos++] = 0x7D;
                result[pos++] = 0x01;
            } else {
                result[pos++] = b;
            }
        }
        return result;
    }

    /**
     * 反转义处理
     */
    public static byte[] unescape(byte[] data) {
        int count = 0;
        for (int i = 0; i < data.length; i++) {
            if (data[i] == 0x7D && i + 1 < data.length) {
                count++;
                i++;
            }
        }
        if (count == 0) return data;

        byte[] result = new byte[data.length - count];
        int pos = 0;
        for (int i = 0; i < data.length; i++) {
            if (data[i] == 0x7D && i + 1 < data.length) {
                if (data[i + 1] == 0x02) {
                    result[pos++] = 0x7E;
                } else if (data[i + 1] == 0x01) {
                    result[pos++] = 0x7D;
                } else {
                    result[pos++] = data[i];
                    result[pos++] = data[i + 1];
                }
                i++;
            } else {
                result[pos++] = data[i];
            }
        }
        return result;
    }
}
