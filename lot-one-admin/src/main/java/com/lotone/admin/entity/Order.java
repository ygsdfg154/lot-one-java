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
 * 订单表
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_order")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 订单号（唯一）
     */
    @TableField("order_no")
    private String orderNo;

    /**
     * 用户ID
     */
    @TableField("user_id")
    private Long userId;

    /**
     * 产品类型：1-VIP产品 2-流量卡产品
     */
    @TableField("product_type")
    private Long productType;

    /**
     * 产品ID（product_type=2关联lot_traffic_product.id）
     */
    @TableField("product_id")
    private Long productId;

    /**
     * 关联lot_vip_config.id(VIP订单)
     */
    @TableField("config_id")
    private Long configId;

    /**
     * 购买时设备ID
     */
    @TableField("device_id")
    private String deviceId;

    /**
     * 所属店铺ID
     */
    @TableField("shop_id")
    private Long shopId;

    /**
     * 快递单号
     */
    @TableField("tracking_no")
    private String trackingNo;

    /**
     * 购买人姓名
     */
    @TableField("buyer_name")
    private String buyerName;

    /**
     * 购买人手机号
     */
    @TableField("buyer_phone")
    private String buyerPhone;

    /**
     * 收货地址
     */
    @TableField("shipping_address")
    private String shippingAddress;

    /**
     * 快照：产品名称
     */
    @TableField("product_name")
    private String productName;

    /**
     * 快照：产品单价
     */
    @TableField("product_price")
    private Double productPrice;

    /**
     * 实付金额
     */
    @TableField("pay_amount")
    private Double payAmount;

    /**
     * 支付渠道：1-微信 2-支付宝
     */
    @TableField("pay_channel")
    private Long payChannel;

    /**
     * 订单状态：0-待支付 1-已支付 2-已取消 3-已过期 4-退款中 5-已退款
     */
    @TableField("order_status")
    private Long orderStatus;

    /**
     * 发货时间
     */
    @TableField("delivery_time")
    private LocalDateTime deliveryTime;

    /**
     * 完成时间
     */
    @TableField("complete_time")
    private LocalDateTime completeTime;

    /**
     * 备注
     */
    @TableField("remark")
    private String remark;

    /**
     * 支付完成时间
     */
    @TableField("paid_at")
    private LocalDateTime paidAt;

    /**
     * 订单过期时间（待支付超时）
     */
    @TableField("expired_at")
    private LocalDateTime expiredAt;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    @TableField("deleted_at")
    private LocalDateTime deletedAt;

    /**
     * 充值目标ICCID（快照）
     */
    @TableField("iccid")
    private String iccid;

    /**
     * 到账状态：0-处理中 1-已到账 2-失败
     */
    @TableField("arrival_status")
    private Long arrivalStatus;
}
