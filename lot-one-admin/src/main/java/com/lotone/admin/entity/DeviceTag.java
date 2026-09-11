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
@TableName("lot_device_tag")
public class DeviceTag implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    /** 标签名称 */
    @TableField("tag_name")
    private String tagName;

    /** 标签颜色 */
    @TableField("tag_color")
    private String tagColor;

    /** 标签描述 */
    @TableField("description")
    private String description;

    /** 状态（0=禁用 1=启用） */
    @TableField("status")
    private Byte status;
}
