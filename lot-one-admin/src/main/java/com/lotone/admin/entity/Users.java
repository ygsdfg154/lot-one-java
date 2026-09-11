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
@TableName("sys_users")
public class Users implements Serializable {

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
     * 用户UUID
     */
    @TableField("uuid")
    private String uuid;

    /**
     * 用户登录名
     */
    @TableField("username")
    private String username;

    /**
     * 用户登录密码
     */
    @TableField("password")
    private String password;

    /**
     * 用户昵称
     */
    @TableField("nick_name")
    private String nickName;

    /**
     * 用户头像
     */
    @TableField("header_img")
    private String headerImg;

    /**
     * 用户角色ID
     */
    @TableField("authority_id")
    private Long authorityId;

    /**
     * 用户手机号
     */
    @TableField("phone")
    private String phone;

    /**
     * 用户邮箱
     */
    @TableField("email")
    private String email;

    /**
     * 用户是否被冻结 1正常 2冻结
     */
    @TableField("enable")
    private Long enable;

    /**
     * 配置
     */
    @TableField("origin_setting")
    private String originSetting;

    /**
     * user department id
     */
    @TableField("dept_id")
    private Integer deptId;

    /**
     * 性别 0男 1女 2未知
     */
    @TableField("sex")
    private String sex;

    /**
     * 最后登录IP
     */
    @TableField("login_ip")
    private String loginIp;

    /**
     * 最后登录时间
     */
    @TableField("login_date")
    private LocalDateTime loginDate;

    /**
     * 备注
     */
    @TableField("remark")
    private String remark;

    /**
     * 创建者(用户ID)
     */
    @TableField("created_by")
    private Long createdBy;

    /**
     * 更新者(用户ID)
     */
    @TableField("updated_by")
    private Long updatedBy;

    /**
     * user platform id
     */
    @TableField("platform_id")
    private Integer platformId;
}
