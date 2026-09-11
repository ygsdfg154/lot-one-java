package com.lotone.admin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@TableName("lot_device_upgrade_log")
public class DeviceUpgradeLog implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("created_at")
    private LocalDateTime createdAt;

    /** 升级任务ID */
    @TableField("upgrade_id")
    private Long upgradeId;

    /** 设备ID */
    @TableField("device_id")
    private String deviceId;

    /** 状态（0=待升级 1=升级中 2=升级成功 3=升级失败） */
    @TableField("status")
    private Byte status;

    /** 当前版本 */
    @TableField("current_version")
    private String currentVersion;

    /** 目标版本 */
    @TableField("target_version")
    private String targetVersion;

    /** 升级进度（0-100） */
    @TableField("progress")
    private Integer progress;

    /** 失败原因 */
    @TableField("fail_reason")
    private String failReason;

    /** 开始时间 */
    @TableField("start_time")
    private LocalDateTime startTime;

    /** 完成时间 */
    @TableField("complete_time")
    private LocalDateTime completeTime;
}
