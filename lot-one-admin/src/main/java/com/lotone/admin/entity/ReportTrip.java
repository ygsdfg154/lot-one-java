package com.lotone.admin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 行程报表
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_report_trip")
public class ReportTrip implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    @TableField("deleted_at")
    private LocalDateTime deletedAt;

    /**
     * 设备IMEI
     */
    @TableField("imei")
    private String imei;

    /**
     * 开始时间
     */
    @TableField("start_time")
    private LocalDateTime startTime;

    /**
     * 结束时间
     */
    @TableField("end_time")
    private LocalDateTime endTime;

    /**
     * 开始纬度
     */
    @TableField("start_lat")
    private BigDecimal startLat;

    /**
     * 开始经度
     */
    @TableField("start_lng")
    private BigDecimal startLng;

    /**
     * 结束纬度
     */
    @TableField("end_lat")
    private BigDecimal endLat;

    /**
     * 结束经度
     */
    @TableField("end_lng")
    private BigDecimal endLng;

    /**
     * 里程(km)
     */
    @TableField("distance")
    private BigDecimal distance;

    /**
     * 时长(秒)
     */
    @TableField("duration")
    private Integer duration;

    /**
     * 最高速度
     */
    @TableField("max_speed")
    private BigDecimal maxSpeed;

    /**
     * 平均速度
     */
    @TableField("avg_speed")
    private BigDecimal avgSpeed;

    /**
     * 轨迹ID
     */
    @TableField("trajectory_id")
    private String trajectoryId;
}
