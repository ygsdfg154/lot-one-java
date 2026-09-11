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
 * LOT设备指令表
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_device_cmd")
public class DeviceCmd implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 设备编号
     */
    @TableField("device_id")
    private String deviceId;

    /**
     * 指令代码
     */
    @TableField("cmd_code")
    private String cmdCode;

    /**
     * 指令名称
     */
    @TableField("cmd_name")
    private String cmdName;

    /**
     * 指令参数
     */
    @TableField("cmd_params")
    private String cmdParams;

    /**
     * 状态 0-待执行 1-已下发 2-已完成 3-失败 4-离线缓存待补发
     */
    @TableField("status")
    private Byte status;

    /**
     * 执行结果
     */
    @TableField("result")
    private String result;

    /**
     * 创建时间
     */
    @TableField("create_time")
    private LocalDateTime createTime;

    /**
     * 执行时间
     */
    @TableField("execute_at")
    private LocalDateTime executeAt;

    /**
     * iot-runtime下发请求ID
     */
    @TableField("request_id")
    private String requestId;
}
