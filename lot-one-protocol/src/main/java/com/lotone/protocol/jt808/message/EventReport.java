package com.lotone.protocol.jt808.message;

import com.lotone.protocol.jt808.Jt808Message;
import lombok.Data;

/**
 * 终端事件报告 (0x0301)
 * 终端向平台上报事件
 */
@Data
public class EventReport {
    public static final int MSG_ID = 0x0301;

    /** 事件ID */
    private int eventId;

    /** 事件内容（可选） */
    private String eventContent;

    /**
     * 从 JT808 消息解码
     */
    public static EventReport decode(Jt808Message msg) {
        return decode(msg.getBody());
    }

    /**
     * 从消息体解码
     */
    public static EventReport decode(byte[] body) {
        EventReport report = new EventReport();
        if (body != null && body.length >= 1) {
            report.setEventId(body[0] & 0xFF);
            if (body.length > 1) {
                try {
                    report.setEventContent(new String(body, 1, body.length - 1, "GBK").trim());
                } catch (Exception e) {
                    report.setEventContent("");
                }
            }
        }
        return report;
    }
}
