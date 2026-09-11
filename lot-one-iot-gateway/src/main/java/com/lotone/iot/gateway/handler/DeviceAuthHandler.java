package com.lotone.iot.gateway.handler;

import com.lotone.iot.gateway.service.DeviceSessionManager;
import com.lotone.protocol.jt808.Jt808Message;
import com.lotone.protocol.jt808.codec.Jt808Decoder;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.timeout.IdleState;
import io.netty.handler.timeout.IdleStateEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

@Slf4j
public class DeviceAuthHandler extends SimpleChannelInboundHandler<byte[]> {

    @Autowired
    private DeviceSessionManager sessionManager;

    private com.lotone.iot.gateway.service.DeviceAuthService deviceAuthService;
    private com.lotone.iot.gateway.service.RedisDeviceSessionService redisSessionService;

    private com.lotone.iot.gateway.service.DeviceAuthService getDeviceAuthService() {
        if (deviceAuthService == null) {
            deviceAuthService = com.lotone.iot.gateway.util.SpringContextUtil.getBean(com.lotone.iot.gateway.service.DeviceAuthService.class);
        }
        return deviceAuthService;
    }

    private com.lotone.iot.gateway.service.RedisDeviceSessionService getRedisSessionService() {
        if (redisSessionService == null) {
            redisSessionService = com.lotone.iot.gateway.util.SpringContextUtil.getBean(com.lotone.iot.gateway.service.RedisDeviceSessionService.class);
        }
        return redisSessionService;
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, byte[] frame) {
        try {
            Jt808Message msg = Jt808Decoder.decode(frame);
            String phone = msg.getHeader().getTerminalPhone();
            int msgId = msg.getMsgId();

            if (msgId == 0x0100 || msgId == 0x0102) {
                // 终端注册/鉴权 - 校验设备
                if (!getDeviceAuthService().validateDevice(phone)) {
                    log.warn("Device validation failed, closing connection: phone={}", phone);
                    ctx.close();
                    return;
                }

                // 如果是鉴权消息，校验鉴权码
                if (msgId == 0x0102) {
                    byte[] body = msg.getBody();
                    String authCode = body != null ? new String(body).trim() : "";
                    if (!getDeviceAuthService().validateAuthCode(phone, authCode)) {
                        log.warn("Device auth code validation failed: phone={}", phone);
                        ctx.close();
                        return;
                    }
                }

                sessionManager.register(phone, ctx.channel());
                // 注册到 Redis（集群会话共享）
                try {
                    getRedisSessionService().deviceOnline(phone);
                } catch (Exception e) {
                    log.warn("Register device to Redis failed: phone={}", phone, e);
                }
                log.info("Device auth success: phone={}, msgId=0x{}", phone, Integer.toHexString(msgId));

                // 注册成功后更新设备激活状态
                if (msgId == 0x0100) {
                    getDeviceAuthService().onDeviceRegistered(phone);
                }

                ctx.fireChannelRead(msg);
            } else if (sessionManager.isAuthenticated(phone)) {
                sessionManager.touch(phone);
                ctx.fireChannelRead(msg);
            } else {
                log.warn("Unauthenticated device message: phone={}, msgId=0x{}", phone, Integer.toHexString(msgId));
                ctx.close();
            }
        } catch (Exception e) {
            log.error("Auth handler error, frame length={}", frame != null ? frame.length : 0, e);
            ctx.close();
        }
    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        if (evt instanceof IdleStateEvent) {
            IdleStateEvent event = (IdleStateEvent) evt;
            if (event.state() == IdleState.ALL_IDLE) {
                log.info("Device idle timeout, closing channel: {}", ctx.channel().id());
                ctx.close();
            }
        }
        super.userEventTriggered(ctx, evt);
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) {
        // 从 Redis 移除设备在线状态
        try {
            String phone = sessionManager.getPhoneByChannel(ctx.channel());
            if (phone != null) {
                getRedisSessionService().deviceOffline(phone);
            }
        } catch (Exception e) {
            log.warn("Remove device from Redis failed", e);
        }
        sessionManager.unregister(ctx.channel());
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        log.error("Device channel exception: {}", ctx.channel().id(), cause);
        ctx.close();
    }
}
