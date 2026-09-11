package com.lotone.protocol.jt808.message;

import com.lotone.protocol.jt808.Jt808Message;
import lombok.Data;

/**
 * 驾驶员身份信息采集上报 (0x0702)
 * 终端向平台上报驾驶员身份信息
 */
@Data
public class DriverInfoReport {
    public static final int MSG_ID = 0x0702;

    /** 状态（0=开始从业, 1=结束从业） */
    private int status;

    /** 时间（BCD编码，6字节：YYMMDDHHMMSS） */
    private String time;

    /** 驾驶员姓名 */
    private String driverName;

    /** 驾驶员身份证号 */
    private String idCard;

    /** 从业资格证号 */
    private String qualificationNo;

    /** 发证机构 */
    private String issuingAuthority;

    /** 有效期（BCD，4字节：YYMMDD） */
    private String validUntil;

    /**
     * 从 JT808 消息解码
     */
    public static DriverInfoReport decode(Jt808Message msg) {
        return decode(msg.getBody());
    }

    /**
     * 从消息体解码
     */
    public static DriverInfoReport decode(byte[] body) {
        DriverInfoReport report = new DriverInfoReport();
        if (body == null || body.length < 1) {
            return report;
        }

        int offset = 0;
        // 状态 (1字节)
        report.setStatus(body[offset++] & 0xFF);

        // 时间 (6字节 BCD: YYMMDDHHMMSS)
        if (offset + 6 <= body.length) {
            report.setTime(decodeBcdTime(body, offset));
            offset += 6;
        }

        // 驾驶员姓名 (剩余字节，按GBK解码，字段间用分隔符)
        if (offset < body.length) {
            try {
                String remaining = new String(body, offset, body.length - offset, "GBK").trim();
                String[] parts = remaining.split("\\s+");
                if (parts.length > 0) report.setDriverName(parts[0]);
                if (parts.length > 1) report.setIdCard(parts[1]);
                if (parts.length > 2) report.setQualificationNo(parts[2]);
            } catch (Exception e) {
                // ignore
            }
        }

        return report;
    }

    /**
     * 解码BCD时间（6字节：YYMMDDHHMMSS）
     */
    private static String decodeBcdTime(byte[] data, int offset) {
        try {
            int year = 2000 + ((data[offset] >> 4) * 10 + (data[offset] & 0x0F));
            int month = ((data[offset + 1] >> 4) * 10 + (data[offset + 1] & 0x0F));
            int day = ((data[offset + 2] >> 4) * 10 + (data[offset + 2] & 0x0F));
            int hour = ((data[offset + 3] >> 4) * 10 + (data[offset + 3] & 0x0F));
            int minute = ((data[offset + 4] >> 4) * 10 + (data[offset + 4] & 0x0F));
            int second = ((data[offset + 5] >> 4) * 10 + (data[offset + 5] & 0x0F));
            return String.format("%04d-%02d-%02d %02d:%02d:%02d", year, month, day, hour, minute, second);
        } catch (Exception e) {
            return null;
        }
    }
}
