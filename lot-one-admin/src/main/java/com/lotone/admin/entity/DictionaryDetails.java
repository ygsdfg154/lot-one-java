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
@TableName("sys_dictionary_details")
public class DictionaryDetails implements Serializable {

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
     * 展示值
     */
    @TableField("label")
    private String label;

    /**
     * 字典值
     */
    @TableField("value")
    private String value;

    /**
     * 扩展值
     */
    @TableField("extend")
    private String extend;

    /**
     * 启用状态
     */
    @TableField("status")
    private Boolean status;

    /**
     * 排序标记
     */
    @TableField("sort")
    private Long sort;

    /**
     * 关联标记
     */
    @TableField("sys_dictionary_id")
    private Long sysDictionaryId;

    /**
     * 父级字典详情ID
     */
    @TableField("parent_id")
    private Long parentId;

    /**
     * 层级深度
     */
    @TableField("level")
    private Long level;

    /**
     * 层级路径
     */
    @TableField("path")
    private String path;
}
