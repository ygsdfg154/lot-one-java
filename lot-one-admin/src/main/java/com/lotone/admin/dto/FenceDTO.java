package com.lotone.admin.dto;

import com.lotone.admin.entity.FencePoint;
import lombok.Data;

import java.util.List;

@Data
public class FenceDTO {
    private Integer id;
    private String fenceId;
    private String deviceId;
    private Long cordType;
    private String fenceName;
    private Long fenceShapeType; // 1圆形 2多边形
    private Integer fenceRadius;
    private Long enterAlarmEnable;
    private Long getOutAlarmEnable;
    private String remark;
    private Boolean enabled;
    private Double centerLat;
    private Double centerLng;
    // 多边形围栏点位
    private List<FencePoint> points;
    // 关联设备ID列表
    private List<String> deviceIds;
}
