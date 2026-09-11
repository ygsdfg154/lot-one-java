package com.lotone.admin.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
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
@TableName("sys_authority_btns")
public class AuthorityBtns implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 角色ID
     */
    @TableField("authority_id")
    private Long authorityId;

    /**
     * 菜单ID
     */
    @TableField("sys_menu_id")
    private Long sysMenuId;

    /**
     * 菜单按钮ID
     */
    @TableField("sys_base_menu_btn_id")
    private Long sysBaseMenuBtnId;
}
