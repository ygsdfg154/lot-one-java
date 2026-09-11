package com.lotone.protocol.jt808.message;

import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

@Slf4j
public class MessageFactory {

    private static final Map<Integer, String> MSG_NAMES = new HashMap<>();
    static {
        // 终端上行
        MSG_NAMES.put(0x0001, "终端通用应答");
        MSG_NAMES.put(0x0002, "终端心跳");
        MSG_NAMES.put(0x0100, "终端注册");
        MSG_NAMES.put(0x0102, "终端鉴权");
        MSG_NAMES.put(0x0104, "查询终端参数应答");
        MSG_NAMES.put(0x0200, "位置信息汇报");
        MSG_NAMES.put(0x0500, "车辆控制应答");
        MSG_NAMES.put(0x0704, "批量位置信息汇报");
        MSG_NAMES.put(0x0301, "终端事件报告");
        MSG_NAMES.put(0x0608, "区域查询应答");
        MSG_NAMES.put(0x0702, "驾驶员身份信息采集上报");
        MSG_NAMES.put(0x0801, "多媒体数据上传");
        MSG_NAMES.put(0x0900, "数据上行透传");
        MSG_NAMES.put(0x8600, "设置圆形区域");
        MSG_NAMES.put(0x8602, "设置矩形区域");
        MSG_NAMES.put(0x8604, "设置多边形区域");
        MSG_NAMES.put(0x0700, "行驶记录数据上传");
        MSG_NAMES.put(0x8701, "行驶记录数据采集命令");
        MSG_NAMES.put(0x8800, "多媒体数据上传命令");
        MSG_NAMES.put(0x8A00, "平台RSA公钥");
        MSG_NAMES.put(0x8606, "删除区域");
        MSG_NAMES.put(0x0802, "存储多媒体数据上传");
        MSG_NAMES.put(0x8B00, "终端休眠唤醒");
        MSG_NAMES.put(0x8900, "数据下行透传");
        // 平台下行
        MSG_NAMES.put(0x8001, "平台通用应答");
        MSG_NAMES.put(0x8100, "终端注册应答");
        MSG_NAMES.put(0x8103, "设置终端参数");
        MSG_NAMES.put(0x8104, "查询终端参数");
        MSG_NAMES.put(0x8201, "位置信息查询");
        MSG_NAMES.put(0x8202, "临时位置跟踪控制");
        MSG_NAMES.put(0x8300, "文本信息下发");
        MSG_NAMES.put(0x8500, "车辆控制");
    }

    /**
     * 根据消息ID解码消息体
     */
    public static Object decode(int msgId, byte[] body) {
        try {
            switch (msgId) {
                case 0x0001:
                    return TerminalCommonReply.decode(body);
                case 0x0002:
                    return TerminalHeartbeat.decode(body);
                case 0x0100:
                    return TerminalRegister.decode(body);
                case 0x0102:
                    return TerminalAuth.decode(body);
                case 0x0104:
                    return TerminalParamsReply.decode(body);
                case 0x0200:
                    return LocationReport.decode(body);
                case 0x0500:
                    return VehicleControlReply.decode(body);
                case 0x0704:
                    return BatchLocationReport.decode(body);
                case 0x0301:
                    return EventReport.decode(body);
                case 0x0608:
                    return AreaQueryReply.decode(body);
                case 0x0702:
                    return DriverInfoReport.decode(body);
                case 0x0801:
                    return MultimediaUpload.decode(body);
                case 0x0900:
                case 0x8900:
                    return DataPassthrough.decode(body);
                case 0x8600:
                    return SetCircleArea.decode(body);
                case 0x8602:
                    return SetRectangleArea.decode(body);
                case 0x8604:
                    return SetPolygonArea.decode(body);
                case 0x0700:
                    return DriveRecordUpload.decode(body);
                case 0x8701:
                    return DriveRecordCommand.decode(body);
                case 0x8800:
                    return MultimediaUploadCommand.decode(body);
                case 0x8A00:
                    return PlatformRsaKey.decode(body);
                case 0x8606:
                    return DeleteArea.decode(body);
                case 0x0802:
                    return StoreMultimediaUpload.decode(body);
                case 0x8B00:
                    return TerminalSleepWake.decode(body);
                case 0x8001:
                    return PlatformCommonReply.decode(body);
                default:
                    log.debug("Unsupported message decode: msgId=0x{}, name={}", Integer.toHexString(msgId), getMsgName(msgId));
                    return null;
            }
        } catch (Exception e) {
            log.error("Decode message failed: msgId=0x{}, name={}", Integer.toHexString(msgId), getMsgName(msgId), e);
            return null;
        }
    }

    /**
     * 获取消息名称
     */
    public static String getMsgName(int msgId) {
        return MSG_NAMES.getOrDefault(msgId, "未知消息(0x" + Integer.toHexString(msgId) + ")");
    }

    /**
     * 判断是否是终端上行消息
     */
    public static boolean isTerminalMessage(int msgId) {
        return msgId < 0x8000;
    }

    /**
     * 判断是否是平台下行消息
     */
    public static boolean isPlatformMessage(int msgId) {
        return msgId >= 0x8000;
    }
}
