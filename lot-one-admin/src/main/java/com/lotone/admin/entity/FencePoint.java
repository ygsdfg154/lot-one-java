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
 * 围栏点位
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_fence_point")
public class FencePoint implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 围栏id
     */
    @TableField("fence_id")
    private Long fenceId;

    /**
     * 纬度
     */
    @TableField("lat")
    private Double lat;

    /**
     * 经度
     */
    @TableField("lng")
    private Double lng;

    /**
     * 顺序编号
     */
    @TableField("seq_num")
    private Integer seqNum;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    @TableField("deleted_at")
    private LocalDateTime deletedAt;
}
