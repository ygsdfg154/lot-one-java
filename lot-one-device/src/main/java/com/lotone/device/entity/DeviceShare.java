package com.lotone.device.entity;

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
@TableName("lot_device_share")
public class DeviceShare implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    /** 分享人用户ID */
    @TableField("from_user_id")
    private Long fromUserId;

    /** 接收人用户ID（接受分享后填写） */
    @TableField("to_user_id")
    private Long toUserId;

    /** 设备ID */
    @TableField("device_id")
    private String deviceId;

    /** 分享码（6位） */
    @TableField("share_code")
    private String shareCode;

    /** 分享备注 */
    @TableField("remark")
    private String remark;

    /** 状态（0=待接受 1=已接受 2=已取消 3=已过期） */
    @TableField("status")
    private Byte status;

    /** 过期时间 */
    @TableField("expire_time")
    private LocalDateTime expireTime;

    /** 接受时间 */
    @TableField("accept_time")
    private LocalDateTime acceptTime;
}
