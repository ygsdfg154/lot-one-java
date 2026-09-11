package com.lotone.device.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.lotone.device.entity.AppUser;

import java.util.Map;

public interface AppUserService extends IService<AppUser> {
    Map<String, Object> login(String phone, String password);
    Map<String, Object> loginByCode(String phone, String code);
    AppUser register(String phone, String password, String nickname);
    boolean sendSmsCode(String phone);
    boolean changePassword(Long userId, String oldPassword, String newPassword);
    boolean updateProfile(Long userId, String nickname, String avatar);
    AppUser getUserInfo(Long userId);
}
