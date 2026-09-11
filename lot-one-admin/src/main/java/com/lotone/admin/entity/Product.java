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
 * 产品
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 产品编码(唯一)
     */
    @TableField("code")
    private String code;

    /**
     * 产品分类
     */
    @TableField("product_category_type")
    private Long productCategoryType;

    /**
     * 备注
     */
    @TableField("remark")
    private String remark;

    /**
     * 定位方式
     */
    @TableField("pos_type")
    private String posType;

    /**
     * 产品配置
     */
    @TableField("config")
    private String config;

    /**
     * 客服链接
     */
    @TableField("service_link")
    private String serviceLink;

    /**
     * 0无线,1有线
     */
    @TableField("product_type")
    private Long productType;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    @TableField("deleted_at")
    private LocalDateTime deletedAt;

    /**
     * 接入协议(HLXT/JT808)
     */
    @TableField("protocol")
    private String protocol;
}
