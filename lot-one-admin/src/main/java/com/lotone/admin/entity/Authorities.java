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
@TableName("sys_authorities")
public class Authorities implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    @TableField("deleted_at")
    private LocalDateTime deletedAt;

    /**
     * 角色ID
     */
    @TableId(value = "authority_id", type = IdType.AUTO)
    private Long authorityId;

    /**
     * 角色名
     */
    @TableField("authority_name")
    private String authorityName;

    /**
     * 父角色ID
     */
    @TableField("parent_id")
    private Long parentId;

    /**
     * 默认菜单
     */
    @TableField("default_router")
    private String defaultRouter;

    /**
     * data scope
     */
    @TableField("data_scope")
    private String dataScope;
}
