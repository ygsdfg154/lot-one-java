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
@TableName("sys_base_menus")
public class BaseMenus implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    @TableField("deleted_at")
    private LocalDateTime deletedAt;

    @TableField("menu_level")
    private Long menuLevel;

    /**
     * 父菜单ID
     */
    @TableField("parent_id")
    private Long parentId;

    /**
     * 路由path
     */
    @TableField("path")
    private String path;

    /**
     * 路由name
     */
    @TableField("name")
    private String name;

    /**
     * 是否在列表隐藏
     */
    @TableField("hidden")
    private Boolean hidden;

    /**
     * 对应前端文件路径
     */
    @TableField("component")
    private String component;

    /**
     * 排序标记
     */
    @TableField("sort")
    private Long sort;

    /**
     * 高亮菜单
     */
    @TableField("active_name")
    private String activeName;

    /**
     * 是否缓存
     */
    @TableField("keep_alive")
    private Boolean keepAlive;

    /**
     * 是否是基础路由（开发中）
     */
    @TableField("default_menu")
    private Boolean defaultMenu;

    /**
     * 菜单名
     */
    @TableField("title")
    private String title;

    /**
     * 菜单图标
     */
    @TableField("icon")
    private String icon;

    /**
     * 自动关闭tab
     */
    @TableField("close_tab")
    private Boolean closeTab;

    /**
     * 路由切换动画
     */
    @TableField("transition_type")
    private String transitionType;
}
