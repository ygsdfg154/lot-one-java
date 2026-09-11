package com.lotone.device.vo;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DeviceVO {
    private String deviceId;
    private String deviceName;
    private String deviceType;
    private Integer productId;
    private String protocolType;
    private String simCard;
    private String imei;
    private Integer status;
    private Integer activationStatus;
    private LocalDateTime activeTime;
    private LocalDateTime expireTime;
    private LocalDateTime lastOnlineTime;
    private Double lastLatitude;
    private Double lastLongitude;
    private Double lastSpeed;
    private Integer lastDirection;
    private Integer lastStatus;
    private String firmwareVersion;
    private String hardwareVersion;
    private Integer isDefault;
    private LocalDateTime bindTime;
    // 实时状态（从MongoDB查询）
    private Boolean online;
    private Double latitude;
    private Double longitude;
    private Double speed;
    private Integer direction;
    private Integer altitude;
    private String lastTime;
}
