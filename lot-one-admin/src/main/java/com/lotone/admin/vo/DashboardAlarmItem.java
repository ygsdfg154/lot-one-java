package com.lotone.admin.vo;

import lombok.Data;

@Data
public class DashboardAlarmItem {
    private String id;
    private String deviceId;
    private String deviceName;
    private String alarmCode;
    private String alarmName;
    private String alarmType;
    private String level;
    private String status;
    private String message;
    private String alarmTime;
}
