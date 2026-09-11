package com.lotone.admin.entity;

import com.baomidou.mybatisplus.annotation.TableId;
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
@TableName("sys_authority_menus")
public class AuthorityMenus implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId("sys_base_menu_id")
    private Long sysBaseMenuId;

    /**
     * 角色ID
     */
    @TableId("sys_authority_authority_id")
    private Long sysAuthorityAuthorityId;
}
