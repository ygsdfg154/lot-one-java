package com.lotone.admin.vo;

import lombok.Data;

@Data
public class CaptchaVO {
    private String captchaId;
    private String picPath;
    private Integer captchaLength;
    private Boolean openCaptcha;
}
