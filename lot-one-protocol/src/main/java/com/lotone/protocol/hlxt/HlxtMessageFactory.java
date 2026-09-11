package com.lotone.protocol.hlxt;

import com.lotone.protocol.hlxt.message.HlxtLocationReport;
import com.lotone.protocol.hlxt.message.HlxtSimpleMessages.*;

import java.util.HashMap;
import java.util.Map;

public class HlxtMessageFactory {

    private static final Map<Integer, String> MSG_NAMES = new HashMap<>();

    static {
        MSG_NAMES.put(0x0001, "终端通用应答");
        MSG_NAMES.put(0x0002, "终端心跳");
        MSG_NAMES.put(0x0100, "终端注册");
        MSG_NAMES.put(0x0102, "终端鉴权");
        MSG_NAMES.put(0x0200, "位置信息汇报");
        MSG_NAMES.put(0x0704, "批量位置信息汇报");
        MSG_NAMES.put(0x8001, "平台通用应答");
        MSG_NAMES.put(0x8100, "终端注册应答");
        MSG_NAMES.put(0x8201, "位置信息查询");
        MSG_NAMES.put(0x8300, "文本信息下发");
    }

    public static HlxtMessage createMessage(int msgId) {
        switch (msgId) {
            case 0x0001: return new HlxtTerminalCommonReply();
            case 0x0002: return new HlxtTerminalHeartbeat();
            case 0x0100: return new HlxtTerminalRegister();
            case 0x0102: return new HlxtTerminalAuth();
            case 0x0200: return new HlxtLocationReport();
            case 0x0704: return new HlxtBatchLocationReport();
            case 0x8001: return new HlxtPlatformCommonReply();
            case 0x8100: return new HlxtRegisterReply();
            case 0x8201: return new HlxtQueryLocation();
            case 0x8300: return new HlxtTextMessage();
            default:
                return new HlxtUnknownMessage(msgId);
        }
    }

    public static String getMsgName(int msgId) {
        return MSG_NAMES.getOrDefault(msgId, "未知消息(0x" + Integer.toHexString(msgId) + ")");
    }

    public static boolean isTerminalMessage(int msgId) {
        return msgId < 0x8000;
    }

    public static boolean isPlatformMessage(int msgId) {
        return msgId >= 0x8000;
    }
}
