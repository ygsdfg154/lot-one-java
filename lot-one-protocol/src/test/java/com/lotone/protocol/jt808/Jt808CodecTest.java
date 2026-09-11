package com.lotone.protocol.jt808;

import com.lotone.protocol.jt808.codec.Jt808Decoder;
import com.lotone.protocol.jt808.codec.Jt808Encoder;
import com.lotone.protocol.jt808.message.LocationReport;
import com.lotone.protocol.jt808.message.MessageFactory;
import com.lotone.protocol.jt808.message.PlatformCommonReply;
import com.lotone.protocol.jt808.message.TerminalAuth;
import com.lotone.protocol.jt808.message.TerminalCommonReply;
import com.lotone.protocol.jt808.message.TerminalRegister;
import com.lotone.protocol.jt808.message.TextMessage;
import com.lotone.protocol.jt808.message.VehicleControl;
import org.junit.Test;

import static org.junit.Assert.*;

public class Jt808CodecTest {

    @Test
    public void testPlatformCommonReplyEncodeDecode() {
        // 编码
        PlatformCommonReply reply = new PlatformCommonReply();
        reply.setReplySerialNo(1);
        reply.setReplyMsgId(0x0200);
        reply.setResult((byte) 0);

        Jt808Message msg = new Jt808Message();
        msg.getHeader().setMsgId(PlatformCommonReply.MSG_ID);
        msg.getHeader().setTerminalPhone("013800138000");
        msg.getHeader().setMsgSerialNo(1);
        msg.setBody(reply.encode());
        msg.getHeader().setMsgBodyProps(msg.getBody().length);

        byte[] encoded = Jt808Encoder.encode(msg);
        assertNotNull(encoded);
        assertTrue(encoded.length > 5);

        // 解码
        Jt808Message decoded = Jt808Decoder.decode(encoded);
        assertEquals(PlatformCommonReply.MSG_ID, decoded.getMsgId());
        assertEquals("013800138000", decoded.getHeader().getTerminalPhone());

        // 验证消息体
        Object body = MessageFactory.decode(decoded.getMsgId(), decoded.getBody());
        assertTrue(body instanceof PlatformCommonReply);
        PlatformCommonReply decodedReply = (PlatformCommonReply) body;
        assertEquals(1, decodedReply.getReplySerialNo());
        assertEquals(0x0200, decodedReply.getReplyMsgId());
        assertEquals(0, decodedReply.getResult());
    }

    @Test
    public void testLocationReportDecode() {
        // 构造一个位置上报消息
        LocationReport loc = new LocationReport();
        loc.setAlarmFlag(0);
        loc.setStatus(0);
        loc.setLatitude(30.123456);
        loc.setLongitude(114.123456);
        loc.setAltitude(100);
        loc.setSpeed(60.5);
        loc.setDirection(90);
        loc.setTime(java.time.LocalDateTime.of(2024, 1, 1, 12, 0, 0));

        // 手动编码位置消息体（因为LocationReport只有decode没有encode）
        byte[] body = encodeLocationReport(loc);

        Jt808Message msg = new Jt808Message();
        msg.getHeader().setMsgId(LocationReport.MSG_ID);
        msg.getHeader().setTerminalPhone("013800138000");
        msg.getHeader().setMsgSerialNo(1);
        msg.setBody(body);
        msg.getHeader().setMsgBodyProps(body.length);

        byte[] encoded = Jt808Encoder.encode(msg);
        Jt808Message decoded = Jt808Decoder.decode(encoded);

        assertEquals(LocationReport.MSG_ID, decoded.getMsgId());
        Object decodedBody = MessageFactory.decode(decoded.getMsgId(), decoded.getBody());
        assertTrue(decodedBody instanceof LocationReport);

        LocationReport decodedLoc = (LocationReport) decodedBody;
        assertEquals(30.123456, decodedLoc.getLatitude(), 0.000001);
        assertEquals(114.123456, decodedLoc.getLongitude(), 0.000001);
        assertEquals(60.5, decodedLoc.getSpeed(), 0.01);
    }

    @Test
    public void testTerminalAuthDecode() {
        String authCode = "test-auth-code-123";
        byte[] body = authCode.getBytes(java.nio.charset.StandardCharsets.UTF_8);

        Jt808Message msg = new Jt808Message();
        msg.getHeader().setMsgId(TerminalAuth.MSG_ID);
        msg.getHeader().setTerminalPhone("013800138000");
        msg.getHeader().setMsgSerialNo(1);
        msg.setBody(body);
        msg.getHeader().setMsgBodyProps(body.length);

        byte[] encoded = Jt808Encoder.encode(msg);
        Jt808Message decoded = Jt808Decoder.decode(encoded);

        Object decodedBody = MessageFactory.decode(decoded.getMsgId(), decoded.getBody());
        assertTrue(decodedBody instanceof TerminalAuth);
        assertEquals(authCode, ((TerminalAuth) decodedBody).getAuthCode());
    }

    @Test
    public void testTerminalCommonReplyDecode() {
        byte[] body = new byte[5];
        body[0] = 0x00; body[1] = 0x01; // serialNo=1
        body[2] = (byte) 0x82; body[3] = 0x01; // replyMsgId=0x8201
        body[4] = 0x00; // result=0

        Jt808Message msg = new Jt808Message();
        msg.getHeader().setMsgId(TerminalCommonReply.MSG_ID);
        msg.getHeader().setTerminalPhone("013800138000");
        msg.getHeader().setMsgSerialNo(1);
        msg.setBody(body);
        msg.getHeader().setMsgBodyProps(body.length);

        byte[] encoded = Jt808Encoder.encode(msg);
        Jt808Message decoded = Jt808Decoder.decode(encoded);

        Object decodedBody = MessageFactory.decode(decoded.getMsgId(), decoded.getBody());
        assertTrue(decodedBody instanceof TerminalCommonReply);
        TerminalCommonReply reply = (TerminalCommonReply) decodedBody;
        assertEquals(1, reply.getReplySerialNo());
        assertEquals(0x8201, reply.getReplyMsgId());
        assertEquals(0, reply.getResult());
    }

    @Test
    public void testTextMessageEncode() {
        TextMessage text = new TextMessage();
        text.setFlag((byte) 1); // 紧急
        text.setText("测试文本下发");

        byte[] body = text.encode();
        assertNotNull(body);
        assertTrue(body.length > 1);

        Jt808Message msg = new Jt808Message();
        msg.getHeader().setMsgId(TextMessage.MSG_ID);
        msg.getHeader().setTerminalPhone("013800138000");
        msg.getHeader().setMsgSerialNo(1);
        msg.setBody(body);
        msg.getHeader().setMsgBodyProps(body.length);

        byte[] encoded = Jt808Encoder.encode(msg);
        Jt808Message decoded = Jt808Decoder.decode(encoded);
        assertEquals(TextMessage.MSG_ID, decoded.getMsgId());
    }

    @Test
    public void testVehicleControlEncode() {
        VehicleControl control = new VehicleControl();
        control.setControlFlag((byte) 1); // 车门
        control.setControlValue((byte) 1); // 开启

        byte[] body = control.encode();
        assertEquals(2, body.length);
        assertEquals(1, body[0]);
        assertEquals(1, body[1]);
    }

    @Test
    public void testMessageFactoryNames() {
        assertEquals("位置信息汇报", MessageFactory.getMsgName(0x0200));
        assertEquals("终端心跳", MessageFactory.getMsgName(0x0002));
        assertEquals("平台通用应答", MessageFactory.getMsgName(0x8001));
        assertEquals("文本信息下发", MessageFactory.getMsgName(0x8300));
        assertTrue(MessageFactory.getMsgName(0x9999).contains("未知消息"));
    }

    @Test
    public void testMessageDirection() {
        assertTrue(MessageFactory.isTerminalMessage(0x0200));
        assertTrue(MessageFactory.isTerminalMessage(0x0100));
        assertFalse(MessageFactory.isTerminalMessage(0x8001));
        assertTrue(MessageFactory.isPlatformMessage(0x8103));
        assertFalse(MessageFactory.isPlatformMessage(0x0002));
    }

    @Test
    public void testBccChecksum() {
        // 构造一个合法消息，验证BCC校验通过
        PlatformCommonReply reply = new PlatformCommonReply();
        reply.setReplySerialNo(1);
        reply.setReplyMsgId(0x0200);
        reply.setResult((byte) 0);

        Jt808Message msg = new Jt808Message();
        msg.getHeader().setMsgId(PlatformCommonReply.MSG_ID);
        msg.getHeader().setTerminalPhone("013800138000");
        msg.getHeader().setMsgSerialNo(1);
        msg.setBody(reply.encode());
        msg.getHeader().setMsgBodyProps(msg.getBody().length);

        byte[] encoded = Jt808Encoder.encode(msg);

        // 正常解码应该成功
        Jt808Message decoded = Jt808Decoder.decode(encoded);
        assertNotNull(decoded);

        // 修改校验码，应该抛出异常
        byte[] corrupted = encoded.clone();
        corrupted[corrupted.length - 2] = (byte) (corrupted[corrupted.length - 2] ^ 0xFF);
        try {
            Jt808Decoder.decode(corrupted);
            fail("Should throw exception for invalid BCC checksum");
        } catch (Exception e) {
            assertTrue(e.getMessage().contains("BCC") || e.getMessage().contains("checksum"));
        }
    }

    private byte[] encodeLocationReport(LocationReport loc) {
        io.netty.buffer.ByteBuf buf = io.netty.buffer.Unpooled.buffer(28);
        buf.writeInt(loc.getAlarmFlag());
        buf.writeInt(loc.getStatus());
        buf.writeInt((int) (loc.getLatitude() * 1000000));
        buf.writeInt((int) (loc.getLongitude() * 1000000));
        buf.writeShort(loc.getAltitude());
        buf.writeShort((int) (loc.getSpeed() * 10));
        buf.writeShort(loc.getDirection());
        // time: yy MM dd HH mm ss
        buf.writeByte(loc.getTime().getYear() - 2000);
        buf.writeByte(loc.getTime().getMonthValue());
        buf.writeByte(loc.getTime().getDayOfMonth());
        buf.writeByte(loc.getTime().getHour());
        buf.writeByte(loc.getTime().getMinute());
        buf.writeByte(loc.getTime().getSecond());
        byte[] body = new byte[buf.readableBytes()];
        buf.readBytes(body);
        return body;
    }
}
