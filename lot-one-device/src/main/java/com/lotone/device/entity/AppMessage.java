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
@TableName("lot_app_message")
public class AppMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    /** 用户ID */
    @TableField("user_id")
    private Long userId;

    /** 消息类型（1=系统通知 2=报警推送 3=订单通知 4=活动公告） */
    @TableField("msg_type")
    private Byte msgType;

    /** 消息标题 */
    @TableField("title")
    private String title;

    /** 消息内容 */
    @TableField("content")
    private String content;

    /** 关联设备ID（报警消息用） */
    @TableField("device_id")
    private String deviceId;

    /** 关联业务ID（订单ID等） */
    @TableField("biz_id")
    private String bizId;

    /** 跳转路径 */
    @TableField("jump_path")
    private String jumpPath;

    /** 是否已读（0=未读 1=已读） */
    @TableField("is_read")
    private Byte isRead;

    /** 阅读时间 */
    @TableField("read_time")
    private LocalDateTime readTime;
}
