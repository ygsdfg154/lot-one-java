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
 * 支付平台管理
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_payment_platform")
public class PaymentPlatform implements Serializable {

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
     * 平台名称
     */
    @TableField("platform_name")
    private String platformName;

    /**
     * 平台编码
     */
    @TableField("platform_code")
    private String platformCode;

    /**
     * 1启用 2停用
     */
    @TableField("status")
    private Byte status;

    /**
     * 商户号
     */
    @TableField("merchant_id")
    private String merchantId;

    /**
     * 商户key
     */
    @TableField("merchant_key")
    private String merchantKey;

    /**
     * 渠道凭据配置(JSON,按platform_code定段;见device-app/004)
     */
    @TableField("config")
    private String config;
}
