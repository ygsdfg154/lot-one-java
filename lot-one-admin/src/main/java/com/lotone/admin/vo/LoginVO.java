package com.lotone.admin.vo;

import com.lotone.admin.entity.Users;
import lombok.Data;

@Data
public class LoginVO {
    private Users user;
    private String token;
    private Long expiresAt;
}
