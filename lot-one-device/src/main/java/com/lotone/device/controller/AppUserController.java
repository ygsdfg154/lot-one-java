package com.lotone.device.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.lotone.common.result.R;
import com.lotone.device.dto.LoginDTO;
import com.lotone.device.entity.AppUser;
import com.lotone.device.service.AppUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/user")
public class AppUserController {

    @Autowired
    private AppUserService appUserService;

    /**
     * 密码登录
     */
    @PostMapping("/login")
    public R<Map<String, Object>> login(@RequestBody LoginDTO dto) {
        if (dto.getPhone() == null || dto.getPassword() == null) {
            return R.fail("手机号和密码不能为空");
        }
        try {
            Map<String, Object> result = appUserService.login(dto.getPhone(), dto.getPassword());
            if (result == null) {
                return R.fail("手机号或密码错误");
            }
            return R.success(result);
        } catch (Exception e) {
            return R.fail(e.getMessage());
        }
    }

    /**
     * 验证码登录
     */
    @PostMapping("/loginByCode")
    public R<Map<String, Object>> loginByCode(@RequestBody LoginDTO dto) {
        if (dto.getPhone() == null || dto.getCode() == null) {
            return R.fail("手机号和验证码不能为空");
        }
        try {
            Map<String, Object> result = appUserService.loginByCode(dto.getPhone(), dto.getCode());
            return R.success(result);
        } catch (Exception e) {
            return R.fail(e.getMessage());
        }
    }

    /**
     * 发送验证码
     */
    @PostMapping("/sendCode")
    public R<String> sendCode(@RequestParam String phone) {
        try {
            appUserService.sendSmsCode(phone);
            return R.success("验证码已发送");
        } catch (Exception e) {
            return R.fail(e.getMessage());
        }
    }

    /**
     * 注册
     */
    @PostMapping("/register")
    public R<AppUser> register(@RequestBody LoginDTO dto) {
        if (dto.getPhone() == null || dto.getPassword() == null) {
            return R.fail("手机号和密码不能为空");
        }
        AppUser user = appUserService.register(dto.getPhone(), dto.getPassword(), dto.getNickname());
        if (user == null) {
            return R.fail("手机号已注册");
        }
        return R.success(user);
    }

    /**
     * 退出登录
     */
    @PostMapping("/logout")
    public R<String> logout() {
        StpUtil.logout();
        return R.success("退出成功");
    }

    /**
     * 获取当前用户信息
     */
    @GetMapping("/info")
    public R<AppUser> getUserInfo() {
        Long userId = StpUtil.getLoginIdAsLong();
        AppUser user = appUserService.getUserInfo(userId);
        return R.success(user);
    }

    /**
     * 修改密码
     */
    @PostMapping("/changePassword")
    public R<String> changePassword(@RequestBody Map<String, String> params) {
        Long userId = StpUtil.getLoginIdAsLong();
        String oldPassword = params.get("oldPassword");
        String newPassword = params.get("newPassword");
        if (oldPassword == null || newPassword == null) {
            return R.fail("原密码和新密码不能为空");
        }
        try {
            boolean success = appUserService.changePassword(userId, oldPassword, newPassword);
            if (!success) {
                return R.fail("修改失败");
            }
            return R.success("修改成功");
        } catch (Exception e) {
            return R.fail(e.getMessage());
        }
    }

    /**
     * 更新个人资料
     */
    @PostMapping("/updateProfile")
    public R<String> updateProfile(@RequestBody Map<String, String> params) {
        Long userId = StpUtil.getLoginIdAsLong();
        String nickname = params.get("nickname");
        String avatar = params.get("avatar");
        boolean success = appUserService.updateProfile(userId, nickname, avatar);
        if (!success) {
            return R.fail("更新失败");
        }
        return R.success("更新成功");
    }
}
