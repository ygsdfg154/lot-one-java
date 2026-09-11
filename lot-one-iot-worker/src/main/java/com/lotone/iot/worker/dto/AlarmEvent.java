package com.lotone.iot.worker.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.Map;

@Data
public class AlarmEvent {
    private String id;
    private String deviceId;
    private String deviceName;
    private String alarmCode;
    private String alarmName;
    private String alarmType;
    private String level;
    private String status;
    private String message;
    private Double latitude;
    private Double longitude;
    private Double speed;
    private LocalDateTime alarmTime;
    private LocalDateTime createTime;
    private Map<String, Object> extra;
}
