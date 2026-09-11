package com.lotone.admin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * LOT设备表
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_device")
public class Device implements Serializable {

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
     * 设备编号
     */
    @TableField("device_id")
    private String deviceId;

    /**
     * 设备名称
     */
    @TableField("device_name")
    private String deviceName;

    /**
     * 设备类型
     */
    @TableField("device_type")
    private String deviceType;

    /**
     * 收费类型 0-免费 1-收费
     */
    @TableField("billing_type")
    private Byte billingType;

    /**
     * 所属部门ID
     */
    @TableField("dept_id")
    private Long deptId;

    /**
     * 所属商店ID
     */
    @TableField("shop_id")
    private Long shopId;

    /**
     * 平台ID
     */
    @TableField("platform_id")
    private Long platformId;

    /**
     * 标签
     */
    @TableField("labels")
    private String labels;

    /**
     * 代理码
     */
    @TableField("proxy_code")
    private String proxyCode;

    /**
     * 产品ID
     */
    @TableField("product_id")
    private Long productId;

    /**
     * 激活时间
     */
    @TableField("active_time")
    private LocalDateTime activeTime;

    /**
     * 过期时间
     */
    @TableField("expire_time")
    private LocalDateTime expireTime;

    /**
     * 创建人
     */
    @TableField("create_by")
    private String createBy;

    /**
     * 更新人
     */
    @TableField("update_by")
    private String updateBy;

    /**
     * 创建人ID
     */
    @TableField("create_id")
    private Long createId;

    /**
     * 设备状态 1-已激活 2-未激活 -1-已停机
     */
    @TableField("activation_status")
    private Byte activationStatus;

    /**
     * 设备型号
     */
    @TableField("model")
    private String model;

    /**
     * 禁用状态 0-未禁用 1-已禁用
     */
    @TableField("disable_status")
    private Byte disableStatus;

    /**
     * SIM卡ICCID
     */
    @TableField("iccid")
    private String iccid;

    /**
     * 绑定手机号
     */
    @TableField("bind_phone")
    private String bindPhone;

    /**
     * 安装日期(人工录入)
     */
    @TableField("install_date")
    private LocalDate installDate;

    /**
     * 初始里程(KM,人工录入)
     */
    @TableField("initial_mileage")
    private Integer initialMileage;

    /**
     * 设备图标(预置图标库 iconId，NULL=未设置，前端按默认图标渲染)
     */
    @TableField("icon_id")
    private String iconId;

    /**
     * 备注
     */
    @TableField("remark")
    private String remark;

    /**
     * 对外展示设备号(逻辑号,与内部device_id解耦)
     */
    @TableField("display_no")
    private String displayNo;

    /**
     * 导入时间(入库时间)
     */
    @TableField("import_time")
    private LocalDateTime importTime;

    /**
     * 销售时间(最新分配时间)
     */
    @TableField("sale_time")
    private LocalDateTime saleTime;

    /**
     * 销售订单号
     */
    @TableField("sale_order_no")
    private String saleOrderNo;

    /**
     * 绑定时间
     */
    @TableField("bind_time")
    private LocalDateTime bindTime;

    /**
     * 设备登录密码(bcrypt,默认对应明文123456)
     */
    @TableField("login_password_hash")
    private String loginPasswordHash;

    /**
     * 绑定用户ID(lot_app_user.id)
     */
    @TableField("user_id")
    private Long userId;

    /**
     * 最近一次重置时间(P4-3,原 Mongo reset_time)
     */
    @TableField("reset_time")
    private LocalDateTime resetTime;

    /**
     * 累计重置次数(P4-3,原 Mongo reset_count)
     */
    @TableField("reset_count")
    private Integer resetCount;
}
