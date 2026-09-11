package com.lotone.admin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@TableName("lot_device_group")
public class DeviceGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    @TableField("deleted_at")
    private LocalDateTime deletedAt;

    /** 分组名称 */
    @TableField("group_name")
    private String groupName;

    /** 分组编码 */
    @TableField("group_code")
    private String groupCode;

    /** 父分组ID */
    @TableField("parent_id")
    private Long parentId;

    /** 分组描述 */
    @TableField("description")
    private String description;

    /** 排序 */
    @TableField("sort_order")
    private Integer sortOrder;

    /** 状态（0=禁用 1=启用） */
    @TableField("status")
    private Byte status;
}
