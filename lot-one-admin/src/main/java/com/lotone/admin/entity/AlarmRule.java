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
 * 
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_alarm_rule")
public class AlarmRule implements Serializable {

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
     * 关联产品ID
     */
    @TableField("product_id")
    private Integer productId;

    /**
     * 告警编码
     */
    @TableField("alarm_code")
    private String alarmCode;

    /**
     * 告警名称
     */
    @TableField("alarm_name")
    private String alarmName;

    /**
     * 告警类型
     */
    @TableField("alarm_type")
    private String alarmType;

    /**
     * 告警值单位
     */
    @TableField("alarm_value_unit")
    private String alarmValueUnit;

    /**
     * 告警描述
     */
    @TableField("alarm_desc")
    private String alarmDesc;

    /**
     * 推送方式
     */
    @TableField("push_type")
    private String pushType;

    /**
     * 是否需要告警阈值:1是 0否
     */
    @TableField("is_alarm_value")
    private Long isAlarmValue;

    /**
     * 默认告警阈值
     */
    @TableField("default_alarm_value")
    private String defaultAlarmValue;

    /**
     * 状态:1启用 0停用
     */
    @TableField("status")
    private Integer status;

    /**
     * 排序
     */
    @TableField("sort")
    private Integer sort;

    /**
     * 备注
     */
    @TableField("remark")
    private String remark;
}
