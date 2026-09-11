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
 * 指令
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_cmd")
public class Cmd implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 指令标题
     */
    @TableField("cmd_title")
    private String cmdTitle;

    /**
     * 状态:1 生效、0 失效
     */
    @TableField("cmd_status")
    private Long cmdStatus;

    /**
     * 指令描述
     */
    @TableField("cmd_desc")
    private String cmdDesc;

    /**
     * 排序
     */
    @TableField("cmd_index")
    private Integer cmdIndex;

    /**
     * 指令标识,0支持离线指令
     */
    @TableField("can_offline")
    private Long canOffline;

    /**
     * 父级id
     */
    @TableField("parent_id")
    private Integer parentId;

    /**
     * 指令内容
     */
    @TableField("cmd_content")
    private String cmdContent;

    /**
     * 产品分类
     */
    @TableField("productCategoryType")
    private String productCategoryType;

    /**
     * 祖级列表
     */
    @TableField("ancestors")
    private String ancestors;

    /**
     * 创建者
     */
    @TableField("create_by")
    private String createBy;

    /**
     * 更新者
     */
    @TableField("update_by")
    private String updateBy;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    @TableField("deleted_at")
    private LocalDateTime deletedAt;

    /**
     * 指令编码(registry 语义码)
     */
    @TableField("cmd_code")
    private String cmdCode;

    /**
     * 所属协议(HLXT/JT808)
     */
    @TableField("protocol")
    private String protocol;
}
