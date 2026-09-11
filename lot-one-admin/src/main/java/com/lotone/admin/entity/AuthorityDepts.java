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
@TableName("sys_authority_depts")
public class AuthorityDepts implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * role id
     */
    @TableId("authority_id")
    private Long authorityId;

    /**
     * platform or department id
     */
    @TableId("dept_id")
    private Integer deptId;
}
