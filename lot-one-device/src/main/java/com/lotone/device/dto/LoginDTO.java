package com.lotone.device.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String phone;
    private String password;
    private String code;
    private String nickname;
}
