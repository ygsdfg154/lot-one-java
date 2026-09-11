package com.lotone.device.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lotone.device.entity.AppUserDevice;
import com.lotone.device.mapper.AppUserDeviceMapper;
import com.lotone.device.service.AppUserDeviceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class AppUserDeviceServiceImpl extends ServiceImpl<AppUserDeviceMapper, AppUserDevice> implements AppUserDeviceService {

    @Autowired
    private org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    @Override
    public List<AppUserDevice> listByUserId(Long userId) {
        return list(new LambdaQueryWrapper<AppUserDevice>()
                .eq(AppUserDevice::getUserId, userId)
                .orderByDesc(AppUserDevice::getIsDefault)
                .orderByDesc(AppUserDevice::getBindTime));
    }

    @Override
    public AppUserDevice getByDeviceId(String deviceId) {
        return getOne(new LambdaQueryWrapper<AppUserDevice>()
                .eq(AppUserDevice::getDeviceId, deviceId));
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean bindDevice(Long userId, String deviceId, String deviceName, String password) {
        // 验证设备绑定密码
        if (!verifyDevicePassword(deviceId, password)) {
            log.warn("Device password verification failed: deviceId={}", deviceId);
            return false;
        }

        // 检查设备是否已被绑定
        AppUserDevice existing = getByDeviceId(deviceId);
        if (existing != null) {
            log.warn("Device already bound: deviceId={}, boundUserId={}", deviceId, existing.getUserId());
            return false;
        }

        AppUserDevice binding = new AppUserDevice();
        binding.setUserId(userId);
        binding.setDeviceId(deviceId);
        binding.setDeviceName(deviceName != null && !deviceName.isEmpty() ? deviceName : deviceId);
        binding.setBindTime(LocalDateTime.now());
        binding.setCreatedAt(LocalDateTime.now());
        binding.setUpdatedAt(LocalDateTime.now());

        // 如果是用户的第一台设备，设为默认
        long count = count(new LambdaQueryWrapper<AppUserDevice>().eq(AppUserDevice::getUserId, userId));
        binding.setIsDefault(count == 0 ? 1 : 0);

        return save(binding);
    }

    @Override
    public boolean verifyDevicePassword(String deviceId, String password) {
        try {
            // 查询设备密码哈希
            String sql = "SELECT login_password_hash FROM lot_device WHERE device_id = ? LIMIT 1";
            String passwordHash = null;
            try {
                passwordHash = jdbcTemplate.queryForObject(sql, String.class, deviceId);
            } catch (Exception e) {
                log.warn("Query device password failed: deviceId={}", deviceId, e);
            }

            // 如果设备没有设置密码，默认通过（兼容旧设备）
            if (passwordHash == null || passwordHash.isEmpty()) {
                log.info("Device has no password set, allow bind: deviceId={}", deviceId);
                return true;
            }

            // 如果传入密码为空，拒绝
            if (password == null || password.isEmpty()) {
                return false;
            }

            // BCrypt 校验
            return org.springframework.security.crypto.bcrypt.BCrypt.checkpw(password, passwordHash);
        } catch (Exception e) {
            log.error("Verify device password failed: deviceId={}", deviceId, e);
            return false;
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean unbindDevice(Long userId, String deviceId) {
        AppUserDevice binding = getOne(new LambdaQueryWrapper<AppUserDevice>()
                .eq(AppUserDevice::getUserId, userId)
                .eq(AppUserDevice::getDeviceId, deviceId));
        if (binding == null) {
            return false;
        }

        boolean removed = removeById(binding.getId());

        // 如果删除的是默认设备，把第一台设为默认
        if (removed && binding.getIsDefault() != null && binding.getIsDefault() == 1) {
            List<AppUserDevice> remaining = listByUserId(userId);
            if (!remaining.isEmpty()) {
                AppUserDevice first = remaining.get(0);
                first.setIsDefault(1);
                first.setUpdatedAt(LocalDateTime.now());
                updateById(first);
            }
        }
        return removed;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean switchDefault(Long userId, String deviceId) {
        // 检查设备是否属于该用户
        AppUserDevice target = getOne(new LambdaQueryWrapper<AppUserDevice>()
                .eq(AppUserDevice::getUserId, userId)
                .eq(AppUserDevice::getDeviceId, deviceId));
        if (target == null) {
            return false;
        }

        // 取消所有默认
        List<AppUserDevice> all = listByUserId(userId);
        for (AppUserDevice d : all) {
            if (d.getIsDefault() != null && d.getIsDefault() == 1) {
                d.setIsDefault(0);
                d.setUpdatedAt(LocalDateTime.now());
                updateById(d);
            }
        }

        // 设置新默认
        target.setIsDefault(1);
        target.setUpdatedAt(LocalDateTime.now());
        return updateById(target);
    }

    @Override
    public AppUserDevice getDefaultDevice(Long userId) {
        return getOne(new LambdaQueryWrapper<AppUserDevice>()
                .eq(AppUserDevice::getUserId, userId)
                .eq(AppUserDevice::getIsDefault, 1));
    }

    @Override
    public boolean isDeviceBound(Long userId, String deviceId) {
        if (userId == null || deviceId == null) return false;
        Long count = this.count(new LambdaQueryWrapper<AppUserDevice>()
                .eq(AppUserDevice::getUserId, userId)
                .eq(AppUserDevice::getDeviceId, deviceId));
        return count != null && count > 0;
    }
}
