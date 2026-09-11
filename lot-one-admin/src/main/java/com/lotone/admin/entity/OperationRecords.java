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
@TableName("sys_operation_records")
public class OperationRecords implements Serializable {

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
     * 请求ip
     */
    @TableField("ip")
    private String ip;

    /**
     * 请求方法
     */
    @TableField("method")
    private String method;

    /**
     * 请求路径
     */
    @TableField("path")
    private String path;

    /**
     * 请求状态
     */
    @TableField("status")
    private Long status;

    /**
     * 延迟
     */
    @TableField("latency")
    private Long latency;

    /**
     * 代理
     */
    @TableField("agent")
    private String agent;

    /**
     * 错误信息
     */
    @TableField("error_message")
    private String errorMessage;

    /**
     * 请求Body
     */
    @TableField("body")
    private String body;

    /**
     * 响应Body
     */
    @TableField("resp")
    private String resp;

    /**
     * 用户id
     */
    @TableField("user_id")
    private Long userId;
}
