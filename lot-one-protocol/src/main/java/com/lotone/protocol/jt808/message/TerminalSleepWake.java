package com.lotone.protocol.jt808.message;

import lombok.Data;

import java.io.ByteArrayOutputStream;

/**
 * 终端休眠唤醒 (0x8B00)
 * 平台向终端下发休眠/唤醒命令
 */
@Data
public class TerminalSleepWake {
    public static final int MSG_ID = 0x8B00;

    /** 命令字（0=休眠 1=唤醒 2=深度休眠） */
    private int command;

    /** 唤醒时间（BCD，6字节，可选，休眠时指定唤醒时间） */
    private String wakeTime;

    public byte[] encodeBody() {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            // 命令字 (1字节)
            out.write(command & 0xFF);
            // 唤醒时间（6字节BCD，休眠时可选）
            if (command == 0 && wakeTime != null) {
                out.write(encodeBcdTime(wakeTime));
            }
            return out.toByteArray();
        } catch (Exception e) {
            return new byte[0];
        }
    }

    public static TerminalSleepWake decode(byte[] body) {
        TerminalSleepWake msg = new TerminalSleepWake();
        if (body == null || body.length < 1) return msg;
        msg.setCommand(body[0] & 0xFF);
        if (body.length >= 7) {
            msg.setWakeTime(decodeBcdTime(body, 1));
        }
        return msg;
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

    private static String decodeBcdTime(byte[] body, int offset) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            sb.append(String.format("%02d", (body[offset + i] >> 4) & 0x0F));
            sb.append(String.format("%02d", body[offset + i] & 0x0F));
        }
        return sb.toString();
    }

    public String getCommandName() {
        switch (command) {
            case 0: return "休眠";
            case 1: return "唤醒";
            case 2: return "深度休眠";
            default: return "未知命令";
        }
    }
}
