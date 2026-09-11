package com.lotone.admin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 围栏基表
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_fence")
public class Fence implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * iot-runtime围栏ID
     */
    @TableField("fence_id")
    private String fenceId;

    /**
     * 设备id
     */
    @TableField("device_id")
    private String deviceId;

    /**
     * 地图类型
     */
    @TableField("cord_type")
    private Long cordType;

    /**
     * 围栏名称
     */
    @TableField("fence_name")
    private String fenceName;

    /**
     * 围栏形状类型 1圆形 2多边形
     */
    @TableField("fence_shape_type")
    private Long fenceShapeType;

    /**
     * 围栏半径(m)
     */
    @TableField("fence_radius")
    private Integer fenceRadius;

    /**
     * 进入围栏告警使能
     */
    @TableField("enter_alarm_enable")
    private Long enterAlarmEnable;

    /**
     * 走出围栏告警使能
     */
    @TableField("get_out_alarm_enable")
    private Long getOutAlarmEnable;

    /**
     * 备注
     */
    @TableField("remark")
    private String remark;

    /**
     * 是否启用
     */
    @TableField("enabled")
    private Boolean enabled;

    /**
     * 创建人id
     */
    @TableField("create_id")
    private Integer createId;

    /**
     * 修改人
     */
    @TableField("update_by")
    private String updateBy;

    /**
     * 创建人
     */
    @TableField("create_by")
    private String createBy;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    @TableField("deleted_at")
    private LocalDateTime deletedAt;

    /**
     * 圆形围栏圆心纬度(WGS84,多边形为 NULL)
     */
    @TableField("center_lat")
    private Double centerLat;

    /**
     * 圆形围栏圆心经度(WGS84,多边形为 NULL)
     */
    @TableField("center_lng")
    private Double centerLng;
}
