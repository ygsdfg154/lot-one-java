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
 * 告警报表
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_report_alert")
public class ReportAlert implements Serializable {

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
     * 告警类型
     */
    @TableField("alert_type")
    private String alertType;

    /**
     * 1提示 2警告 3严重
     */
    @TableField("alert_level")
    private Byte alertLevel;

    /**
     * 内容
     */
    @TableField("content")
    private String content;

    /**
     * 纬度
     */
    @TableField("lat")
    private BigDecimal lat;

    /**
     * 经度
     */
    @TableField("lng")
    private BigDecimal lng;

    /**
     * 0未处理 1已处理
     */
    @TableField("is_handled")
    private Byte isHandled;

    /**
     * 处理人
     */
    @TableField("handler")
    private String handler;

    /**
     * 处理时间
     */
    @TableField("handled_at")
    private LocalDateTime handledAt;
}
