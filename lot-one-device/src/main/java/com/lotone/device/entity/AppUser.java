package com.lotone.device.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("lot_app_user")
public class AppUser implements Serializable {
    @TableId(type = IdType.AUTO)
    private Long id;
    @TableField("created_at")
    private LocalDateTime createdAt;
    @TableField("updated_at")
    private LocalDateTime updatedAt;
    private String phone;
    private String password;
    private String nickname;
    private String avatar;
    private Integer status;
    @TableField("last_login_time")
    private LocalDateTime lastLoginTime;
    @TableField("last_login_ip")
    private String lastLoginIp;
}
