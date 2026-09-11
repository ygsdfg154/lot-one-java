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
 * 消息管理
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_message")
public class Message implements Serializable {

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
     * 1公告 2反馈 3通知 4告警
     */
    @TableField("msg_type")
    private Byte msgType;

    /**
     * 标题
     */
    @TableField("title")
    private String title;

    /**
     * 内容
     */
    @TableField("content")
    private String content;

    /**
     * 发送人
     */
    @TableField("sender")
    private String sender;

    /**
     * 接收部门ID
     */
    @TableField("receiver_dept")
    private Long receiverDept;

    /**
     * 1普通 2紧急
     */
    @TableField("priority")
    private Byte priority;

    /**
     * 1草稿 2已发布 3已归档
     */
    @TableField("status")
    private Byte status;

    /**
     * 发布时间
     */
    @TableField("published_at")
    private LocalDateTime publishedAt;
}
