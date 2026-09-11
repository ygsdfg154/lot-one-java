package com.lotone.iot.gateway.handler;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.timeout.IdleStateHandler;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class DeviceChannelInitializer extends ChannelInitializer<SocketChannel> {

    @Override
    protected void initChannel(SocketChannel ch) {
        ChannelPipeline pipeline = ch.pipeline();
        pipeline.addLast("idleStateHandler", new IdleStateHandler(0, 0, 300, TimeUnit.SECONDS));
        pipeline.addLast("frameDecoder", new Jt808FrameDecoder());
        pipeline.addLast("authHandler", new DeviceAuthHandler());
        pipeline.addLast("messageHandler", new DeviceMessageHandler());
    }
}
