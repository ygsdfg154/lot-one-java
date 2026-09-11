package com.lotone.iot.gateway.server;

import com.lotone.iot.gateway.handler.UdpMessageHandler;
import com.lotone.iot.gateway.service.DeviceSessionManager;
import io.netty.bootstrap.Bootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.DatagramChannel;
import io.netty.channel.socket.nio.NioDatagramChannel;
import io.netty.handler.timeout.IdleStateHandler;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class UdpServer {

    @Value("${iot.gateway.udp.port:8083}")
    private int udpPort;

    @Value("${iot.gateway.udp.enabled:false}")
    private boolean udpEnabled;

    @Autowired
    private DeviceSessionManager sessionManager;

    @Autowired
    private UdpMessageHandler udpMessageHandler;

    private EventLoopGroup bossGroup;
    private ChannelFuture channelFuture;

    @PostConstruct
    public void start() {
        if (!udpEnabled) {
            log.info("UDP server disabled, skip start");
            return;
        }

        bossGroup = new NioEventLoopGroup();
        try {
            Bootstrap bootstrap = new Bootstrap();
            bootstrap.group(bossGroup)
                    .channel(NioDatagramChannel.class)
                    .option(ChannelOption.SO_BROADCAST, true)
                    .option(ChannelOption.SO_RCVBUF, 1024 * 1024)
                    .handler(new ChannelInitializer<DatagramChannel>() {
                        @Override
                        protected void initChannel(DatagramChannel ch) {
                            ch.pipeline().addLast(new IdleStateHandler(300, 0, 0, TimeUnit.SECONDS));
                            // UDP 专用消息处理器（处理 DatagramPacket）
                            ch.pipeline().addLast(udpMessageHandler);
                        }
                    });

            channelFuture = bootstrap.bind(udpPort).sync();
            log.info("========================================");
            log.info("  IoT UDP Server 启动成功");
            log.info("  UDP端口: {}", udpPort);
            log.info("========================================");
        } catch (Exception e) {
            log.error("Start UDP server failed", e);
        }
    }

    @PreDestroy
    public void stop() {
        if (channelFuture != null) {
            channelFuture.channel().close();
        }
        if (bossGroup != null) {
            bossGroup.shutdownGracefully();
        }
        log.info("UDP server stopped");
    }

    public boolean isUdpEnabled() {
        return udpEnabled;
    }

    public int getUdpPort() {
        return udpPort;
    }
}
