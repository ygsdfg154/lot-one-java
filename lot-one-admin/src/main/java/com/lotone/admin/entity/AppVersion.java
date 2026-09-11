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
 * APP版本管理
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Getter
@Setter
@TableName("lot_app_version")
public class AppVersion implements Serializable {

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
     * 1iOS 2Android 3小程序 4鸿蒙
     */
    @TableField("platform")
    private Byte platform;

    /**
     * 版本号
     */
    @TableField("version_code")
    private String versionCode;

    /**
     * 版本名称
     */
    @TableField("version_name")
    private String versionName;

    /**
     * 下载地址
     */
    @TableField("download_url")
    private String downloadUrl;

    /**
     * 0非强制 1强制
     */
    @TableField("force_update")
    private Byte forceUpdate;

    /**
     * 更新说明
     */
    @TableField("update_desc")
    private String updateDesc;
}
