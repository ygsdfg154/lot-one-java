package com.lotone.iot.gateway.dto;

import lombok.Data;
import java.util.Map;

@Data
public class DeviceCommandDTO {
    private String requestId;
    private String deviceId;
    private String cmdCode;
    private String cmdName;
    private String msgId;
    private Map<String, Object> params;
    private String rawBody;
    private String operator;
    private String sendTime;
}
