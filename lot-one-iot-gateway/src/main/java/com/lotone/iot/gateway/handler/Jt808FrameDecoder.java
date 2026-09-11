package com.lotone.iot.gateway.handler;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;
import java.util.List;

public class Jt808FrameDecoder extends ByteToMessageDecoder {

    private static final byte DELIMITER = 0x7E;

    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) {
        int startIndex = in.indexOf(in.readerIndex(), in.writerIndex(), DELIMITER);
        if (startIndex < 0) {
            in.clear();
            return;
        }
        int endIndex = in.indexOf(startIndex + 1, in.writerIndex(), DELIMITER);
        if (endIndex < 0) {
            return;
        }
        int length = endIndex - startIndex + 1;
        if (length < 12) {
            in.skipBytes(endIndex + 1 - in.readerIndex());
            return;
        }
        byte[] frame = new byte[length];
        in.getBytes(startIndex, frame);
        in.skipBytes(endIndex + 1 - in.readerIndex());
        out.add(frame);
    }
}
