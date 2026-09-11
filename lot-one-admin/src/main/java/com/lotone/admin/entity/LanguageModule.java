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
 * 多语言
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_language_module")
public class LanguageModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * value
     */
    @TableField("language_value")
    private String languageValue;

    /**
     * 中文 zh-CN 英文 en
     */
    @TableField("language_type")
    private String languageType;

    /**
     * 模块类型:菜单menu 字典dict
     */
    @TableField("module_type")
    private String moduleType;

    /**
     * 关联id
     */
    @TableField("correlation_id")
    private Integer correlationId;

    /**
     * 创建时间
     */
    @TableField("created_at")
    private LocalDateTime createdAt;

    /**
     * 修改时间
     */
    @TableField("updated_at")
    private LocalDateTime updatedAt;

    /**
     * 删除时间(软删除,NULL=未删)
     */
    @TableField("deleted_at")
    private LocalDateTime deletedAt;
}
