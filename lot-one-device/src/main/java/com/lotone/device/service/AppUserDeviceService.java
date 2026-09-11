package com.lotone.device.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.lotone.device.entity.AppUserDevice;

import java.util.List;

public interface AppUserDeviceService extends IService<AppUserDevice> {
    List<AppUserDevice> listByUserId(Long userId);
    AppUserDevice getByDeviceId(String deviceId);
    boolean bindDevice(Long userId, String deviceId, String deviceName, String password);
    boolean unbindDevice(Long userId, String deviceId);
    boolean switchDefault(Long userId, String deviceId);
    AppUserDevice getDefaultDevice(Long userId);
    /**
     * 验证设备绑定密码
     * @param deviceId 设备ID
     * @param password 密码（明文）
     * @return true=验证通过
     */
    boolean verifyDevicePassword(String deviceId, String password);

    /**
     * 检查设备是否绑定到用户
     */
    boolean isDeviceBound(Long userId, String deviceId);
}
