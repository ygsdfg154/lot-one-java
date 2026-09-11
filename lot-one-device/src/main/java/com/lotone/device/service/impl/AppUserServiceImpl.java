package com.lotone.device.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lotone.device.entity.AppUser;
import com.lotone.device.mapper.AppUserMapper;
import com.lotone.device.service.AppUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class AppUserServiceImpl extends ServiceImpl<AppUserMapper, AppUser> implements AppUserService {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private static final String SMS_CODE_PREFIX = "sms:code:";
    private static final long SMS_CODE_EXPIRE_MINUTES = 5;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Override
    public Map<String, Object> login(String phone, String password) {
        AppUser user = getOne(new LambdaQueryWrapper<AppUser>().eq(AppUser::getPhone, phone));
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return null;
        }
        if (user.getStatus() != null && user.getStatus() == 0) {
            throw new RuntimeException("账号已被禁用");
        }

        // Sa-Token 登录
        StpUtil.login(user.getId());
        String token = StpUtil.getTokenValue();

        // 更新最后登录时间
        user.setLastLoginTime(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        updateById(user);

        user.setPassword(null);
        Map<String, Object> result = new HashMap<>();
        result.put("user", user);
        result.put("token", token);
        return result;
    }

    @Override
    public Map<String, Object> loginByCode(String phone, String code) {
        // 验证验证码
        String key = SMS_CODE_PREFIX + phone;
        String savedCode = redisTemplate.opsForValue().get(key);
        if (savedCode == null || !savedCode.equals(code)) {
            throw new RuntimeException("验证码错误或已过期");
        }
        redisTemplate.delete(key);

        // 查找或创建用户
        AppUser user = getOne(new LambdaQueryWrapper<AppUser>().eq(AppUser::getPhone, phone));
        if (user == null) {
            user = register(phone, null, "用户" + phone.substring(phone.length() - 4));
        }

        StpUtil.login(user.getId());
        String token = StpUtil.getTokenValue();

        user.setLastLoginTime(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        updateById(user);
        user.setPassword(null);

        Map<String, Object> result = new HashMap<>();
        result.put("user", user);
        result.put("token", token);
        return result;
    }

    @Override
    public AppUser register(String phone, String password, String nickname) {
        AppUser existing = getOne(new LambdaQueryWrapper<AppUser>().eq(AppUser::getPhone, phone));
        if (existing != null) return null;

        AppUser user = new AppUser();
        user.setPhone(phone);
        if (password != null && !password.isEmpty()) {
            user.setPassword(passwordEncoder.encode(password));
        } else {
            user.setPassword(passwordEncoder.encode("123456")); // 默认密码
        }
        user.setNickname(nickname != null ? nickname : "用户" + phone.substring(phone.length() - 4));
        user.setStatus(1);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        save(user);
        user.setPassword(null);
        return user;
    }

    @Override
    public boolean sendSmsCode(String phone) {
        if (phone == null || phone.length() != 11) {
            throw new RuntimeException("手机号格式错误");
        }
        // 生成6位验证码
        String code = String.format("%06d", new Random().nextInt(1000000));
        String key = SMS_CODE_PREFIX + phone;
        redisTemplate.opsForValue().set(key, code, SMS_CODE_EXPIRE_MINUTES, TimeUnit.MINUTES);

        // TODO: 对接真实短信服务（阿里云/腾讯云）
        log.info("SMS code sent: phone={}, code={}", phone, code);
        return true;
    }

    @Override
    public boolean changePassword(Long userId, String oldPassword, String newPassword) {
        AppUser user = getById(userId);
        if (user == null) return false;
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("原密码错误");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setUpdatedAt(LocalDateTime.now());
        return updateById(user);
    }

    @Override
    public boolean updateProfile(Long userId, String nickname, String avatar) {
        AppUser user = getById(userId);
        if (user == null) return false;
        if (nickname != null) user.setNickname(nickname);
        if (avatar != null) user.setAvatar(avatar);
        user.setUpdatedAt(LocalDateTime.now());
        return updateById(user);
    }

    @Override
    public AppUser getUserInfo(Long userId) {
        AppUser user = getById(userId);
        if (user != null) user.setPassword(null);
        return user;
    }
}
