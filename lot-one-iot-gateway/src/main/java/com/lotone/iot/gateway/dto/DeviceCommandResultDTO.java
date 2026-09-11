package com.lotone.iot.gateway.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DeviceCommandResultDTO {
    private String requestId;
    private String deviceId;
    private String cmdCode;
    private String status;
    private String message;
    private String ackBody;
    private LocalDateTime dispatchTime;
    private LocalDateTime ackTime;
}
