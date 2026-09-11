package com.lotone.protocol.hlxt.message;

import com.lotone.protocol.hlxt.HlxtMessage;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * HLXT 简化消息类集合
 */
public class HlxtSimpleMessages {

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class HlxtTerminalHeartbeat extends HlxtMessage {
        public static final int MSG_ID = 0x0002;
        public HlxtTerminalHeartbeat() { this.msgId = MSG_ID; }
        @Override public void decode(byte[] body) {}
        @Override public byte[] encode() { return new byte[0]; }
        @Override public String getMsgName() { return "终端心跳"; }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class HlxtTerminalCommonReply extends HlxtMessage {
        public static final int MSG_ID = 0x0001;
        private int replySerial;
        private int replyMsgId;
        private int result;
        public HlxtTerminalCommonReply() { this.msgId = MSG_ID; }
        @Override
        public void decode(byte[] body) {
            if (body == null || body.length < 5) return;
            ByteBuffer buf = ByteBuffer.wrap(body);
            buf.order(ByteOrder.BIG_ENDIAN);
            replySerial = buf.getShort() & 0xFFFF;
            replyMsgId = buf.getShort() & 0xFFFF;
            result = buf.get();
        }
        @Override
        public byte[] encode() {
            ByteBuffer buf = ByteBuffer.allocate(5);
            buf.order(ByteOrder.BIG_ENDIAN);
            buf.putShort((short) replySerial);
            buf.putShort((short) replyMsgId);
            buf.put((byte) result);
            return buf.array();
        }
        @Override public String getMsgName() { return "终端通用应答"; }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class HlxtTerminalRegister extends HlxtMessage {
        public static final int MSG_ID = 0x0100;
        private int provinceId;
        private int cityId;
        private String manufacturerId;
        private String terminalModel;
        private String terminalId;
        private int plateColor;
        private String plateNumber;
        public HlxtTerminalRegister() { this.msgId = MSG_ID; }
        @Override
        public void decode(byte[] body) {
            if (body == null || body.length < 20) return;
            ByteBuffer buf = ByteBuffer.wrap(body);
            buf.order(ByteOrder.BIG_ENDIAN);
            provinceId = buf.getShort() & 0xFFFF;
            cityId = buf.getShort() & 0xFFFF;
            byte[] mfr = new byte[5];
            buf.get(mfr);
            manufacturerId = new String(mfr, StandardCharsets.US_ASCII).trim();
            byte[] model = new byte[20];
            buf.get(model);
            terminalModel = new String(model, StandardCharsets.US_ASCII).trim();
            byte[] tid = new byte[7];
            buf.get(tid);
            terminalId = new String(tid, StandardCharsets.US_ASCII).trim();
            if (buf.remaining() >= 1) plateColor = buf.get();
            if (buf.remaining() > 0) {
                byte[] plate = new byte[buf.remaining()];
                buf.get(plate);
                plateNumber = new String(plate, StandardCharsets.UTF_8).trim();
            }
        }
        @Override
        public byte[] encode() {
            return new byte[0];
        }
        @Override public String getMsgName() { return "终端注册"; }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class HlxtTerminalAuth extends HlxtMessage {
        public static final int MSG_ID = 0x0102;
        private String authCode;
        public HlxtTerminalAuth() { this.msgId = MSG_ID; }
        @Override
        public void decode(byte[] body) {
            if (body != null && body.length > 0) {
                authCode = new String(body, StandardCharsets.UTF_8).trim();
            }
        }
        @Override
        public byte[] encode() {
            return authCode != null ? authCode.getBytes(StandardCharsets.UTF_8) : new byte[0];
        }
        @Override public String getMsgName() { return "终端鉴权"; }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class HlxtBatchLocationReport extends HlxtMessage {
        public static final int MSG_ID = 0x0704;
        private int count;
        private int dataType;
        private List<HlxtLocationReport> locations = new ArrayList<>();
        public HlxtBatchLocationReport() { this.msgId = MSG_ID; }
        @Override
        public void decode(byte[] body) {
            if (body == null || body.length < 4) return;
            ByteBuffer buf = ByteBuffer.wrap(body);
            buf.order(ByteOrder.BIG_ENDIAN);
            count = buf.getShort() & 0xFFFF;
            dataType = buf.get();
            for (int i = 0; i < count && buf.remaining() >= 28; i++) {
                int len = buf.getShort() & 0xFFFF;
                if (buf.remaining() >= len) {
                    byte[] locBody = new byte[len];
                    buf.get(locBody);
                    HlxtLocationReport loc = new HlxtLocationReport();
                    loc.decode(locBody);
                    locations.add(loc);
                }
            }
        }
        @Override public byte[] encode() { return new byte[0]; }
        @Override public String getMsgName() { return "批量位置信息汇报"; }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class HlxtPlatformCommonReply extends HlxtMessage {
        public static final int MSG_ID = 0x8001;
        private int replySerial;
        private int replyMsgId;
        private int result;
        public HlxtPlatformCommonReply() { this.msgId = MSG_ID; }
        @Override public void decode(byte[] body) {}
        @Override
        public byte[] encode() {
            ByteBuffer buf = ByteBuffer.allocate(5);
            buf.order(ByteOrder.BIG_ENDIAN);
            buf.putShort((short) replySerial);
            buf.putShort((short) replyMsgId);
            buf.put((byte) result);
            return buf.array();
        }
        @Override public String getMsgName() { return "平台通用应答"; }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class HlxtRegisterReply extends HlxtMessage {
        public static final int MSG_ID = 0x8100;
        private int replySerial;
        private int result;
        private String authCode;
        public HlxtRegisterReply() { this.msgId = MSG_ID; }
        @Override public void decode(byte[] body) {}
        @Override
        public byte[] encode() {
            byte[] authBytes = authCode != null ? authCode.getBytes(StandardCharsets.UTF_8) : new byte[0];
            ByteBuffer buf = ByteBuffer.allocate(3 + authBytes.length);
            buf.order(ByteOrder.BIG_ENDIAN);
            buf.putShort((short) replySerial);
            buf.put((byte) result);
            buf.put(authBytes);
            return buf.array();
        }
        @Override public String getMsgName() { return "终端注册应答"; }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class HlxtQueryLocation extends HlxtMessage {
        public static final int MSG_ID = 0x8201;
        private int flag;
        public HlxtQueryLocation() { this.msgId = MSG_ID; }
        @Override public void decode(byte[] body) {}
        @Override
        public byte[] encode() {
            return new byte[]{(byte) flag};
        }
        @Override public String getMsgName() { return "位置信息查询"; }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class HlxtTextMessage extends HlxtMessage {
        public static final int MSG_ID = 0x8300;
        private int flag;
        private String text;
        public HlxtTextMessage() { this.msgId = MSG_ID; }
        @Override public void decode(byte[] body) {}
        @Override
        public byte[] encode() {
            byte[] textBytes = text != null ? text.getBytes(StandardCharsets.UTF_8) : new byte[0];
            ByteBuffer buf = ByteBuffer.allocate(1 + textBytes.length);
            buf.put((byte) flag);
            buf.put(textBytes);
            return buf.array();
        }
        @Override public String getMsgName() { return "文本信息下发"; }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class HlxtUnknownMessage extends HlxtMessage {
        public HlxtUnknownMessage(int msgId) { this.msgId = msgId; }
        @Override public void decode(byte[] body) { this.body = body; }
        @Override public byte[] encode() { return body != null ? body : new byte[0]; }
        @Override public String getMsgName() { return "未知消息(0x" + Integer.toHexString(msgId) + ")"; }
    }
}
