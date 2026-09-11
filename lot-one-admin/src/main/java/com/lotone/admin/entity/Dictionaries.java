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
@TableName("sys_dictionaries")
public class Dictionaries implements Serializable {

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
     * 字典名（中）
     */
    @TableField("name")
    private String name;

    /**
     * 字典名（英）
     */
    @TableField("type")
    private String type;

    /**
     * 状态
     */
    @TableField("status")
    private Boolean status;

    /**
     * 描述
     */
    @TableField("desc")
    private String desc;

    /**
     * 父级字典ID
     */
    @TableField("parent_id")
    private Long parentId;
}
