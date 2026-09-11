package com.lotone.admin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 电量报表
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_report_battery")
public class ReportBattery implements Serializable {

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
     * 统计日期
     */
    @TableField("stat_date")
    private LocalDate statDate;

    /**
     * 平均电量(%)
     */
    @TableField("avg_battery")
    private BigDecimal avgBattery;

    /**
     * 最低电量(%)
     */
    @TableField("min_battery")
    private BigDecimal minBattery;

    /**
     * 最高电量(%)
     */
    @TableField("max_battery")
    private BigDecimal maxBattery;

    /**
     * 采样次数
     */
    @TableField("sample_count")
    private Integer sampleCount;
}
