package com.lotone.admin.dto;

import lombok.Data;
import java.util.Map;

@Data
public class DeviceCmdDispatchDTO {
    /** 设备编号（手机号） */
    private String deviceId;
    /** 指令编码 */
    private String cmdCode;
    /** 指令名称 */
    private String cmdName;
    /** 指令类型 */
    private String cmdType;
    /** JT808 消息ID（十六进制，如 8201），不传则根据 cmdCode 映射 */
    private String msgId;
    /** 指令参数 */
    private Map<String, Object> params;
    /** 原始消息体（十六进制字符串），传了则直接使用 */
    private String rawBody;
    /** 操作人 */
    private String operator;
    /** 下发渠道 */
    private String channel;
    /** 是否支持离线指令 */
    private Byte canOffline;
}
