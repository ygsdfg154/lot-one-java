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
@TableName("lot_device_upgrade")
public class DeviceUpgrade implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    /** 升级任务名称 */
    @TableField("task_name")
    private String taskName;

    /** 固件版本号 */
    @TableField("firmware_version")
    private String firmwareVersion;

    /** 固件下载URL */
    @TableField("firmware_url")
    private String firmwareUrl;

    /** 固件大小（字节） */
    @TableField("firmware_size")
    private Long firmwareSize;

    /** 固件MD5 */
    @TableField("firmware_md5")
    private String firmwareMd5;

    /** 目标设备型号 */
    @TableField("target_model")
    private String targetModel;

    /** 升级类型（1=全部设备 2=指定设备 3=按型号） */
    @TableField("upgrade_type")
    private Byte upgradeType;

    /** 目标设备ID列表（JSON数组，upgrade_type=2时用） */
    @TableField("target_devices")
    private String targetDevices;

    /** 状态（0=待发布 1=已发布 2=进行中 3=已完成 4=已取消） */
    @TableField("status")
    private Byte status;

    /** 发布时间 */
    @TableField("publish_time")
    private LocalDateTime publishTime;

    /** 完成时间 */
    @TableField("complete_time")
    private LocalDateTime completeTime;

    /** 成功设备数 */
    @TableField("success_count")
    private Integer successCount;

    /** 失败设备数 */
    @TableField("fail_count")
    private Integer failCount;

    /** 总设备数 */
    @TableField("total_count")
    private Integer totalCount;

    /** 升级说明 */
    @TableField("description")
    private String description;

    /** 创建人 */
    @TableField("create_by")
    private String createBy;
}
