package com.lotone.iot.worker.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TelemetryData {
    private String deviceId;
    private Integer alarmFlag;
    private Integer status;
    private Double latitude;
    private Double longitude;
    private Integer altitude;
    private Double speed;
    private Integer direction;
    private String time;
    private String receiveTime;

    public LocalDateTime getTimeAsLocalDateTime() {
        if (time == null || time.isEmpty()) return null;
        try {
            return LocalDateTime.parse(time, java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        } catch (Exception e) {
            return null;
        }
    }
}
