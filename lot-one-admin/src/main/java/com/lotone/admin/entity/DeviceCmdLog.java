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
 * 设备指令日志
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_device_cmd_log")
public class DeviceCmdLog implements Serializable {

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
     * 设备编号
     */
    @TableField("device_id")
    private String deviceId;

    /**
     * 指令名称
     */
    @TableField("cmd_name")
    private String cmdName;

    /**
     * 指令类型
     */
    @TableField("cmd_type")
    private String cmdType;

    /**
     * 指令内容
     */
    @TableField("cmd_content")
    private String cmdContent;

    /**
     * 下发请求标识(iot-runtime SendCmdResult.RequestID)
     */
    @TableField("request_id")
    private String requestId;

    /**
     * 操作人
     */
    @TableField("operator")
    private String operator;

    /**
     * 下发渠道
     */
    @TableField("channel")
    private String channel;

    /**
     * 下发时间
     */
    @TableField("send_time")
    private LocalDateTime sendTime;

    /**
     * 下发结果
     */
    @TableField("result")
    private String result;

    /**
     * 回复
     */
    @TableField("reply")
    private String reply;

    /**
     * 是否支持离线指令
     */
    @TableField("can_offline")
    private Byte canOffline;

    /**
     * 离线指令是否生效中
     */
    @TableField("offline_effect")
    private Boolean offlineEffect;
}
