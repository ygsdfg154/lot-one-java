package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lotone.admin.entity.Users;
import com.lotone.admin.service.UsersService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UsersController extends BaseController<Users, UsersService> {

    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * 分页查询用户
     */
    @GetMapping("/page")
    public R<Map<String, Object>> page(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) Long authorityId,
            @RequestParam(required = false) Long enable) {

        LambdaQueryWrapper<Users> wrapper = new LambdaQueryWrapper<>();
        if (username != null && !username.isEmpty()) {
            wrapper.like(Users::getUsername, username);
        }
        if (phone != null && !phone.isEmpty()) {
            wrapper.like(Users::getPhone, phone);
        }
        if (authorityId != null) {
            wrapper.eq(Users::getAuthorityId, authorityId);
        }
        if (enable != null) {
            wrapper.eq(Users::getEnable, enable);
        }
        wrapper.orderByDesc(Users::getCreatedAt);

        Page<Users> pageResult = service.page(new Page<>(page, pageSize), wrapper);

        // 移除密码字段
        for (Users user : pageResult.getRecords()) {
            user.setPassword(null);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("list", pageResult.getRecords());
        result.put("total", pageResult.getTotal());
        result.put("page", page);
        result.put("pageSize", pageSize);
        return R.success(result);
    }

    /**
     * 用户详情
     */
    @GetMapping("/detail")
    public R<Users> detail(@RequestParam Long id) {
        Users user = service.getById(id);
        if (user == null) {
            return R.fail("用户不存在");
        }
        user.setPassword(null);
        return R.success(user);
    }

    /**
     * 新增用户
     */
    @PostMapping("/create")
    public R<String> createUser(@RequestBody Users user) {
        // 检查用户名是否存在
        Long count = service.count(new LambdaQueryWrapper<Users>().eq(Users::getUsername, user.getUsername()));
        if (count > 0) {
            return R.fail("用户名已存在");
        }
        // 密码加密
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            user.setPassword("123456"); // 默认密码
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setUuid(UUID.randomUUID().toString().replace("-", ""));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        if (user.getEnable() == null) user.setEnable(1L);
        service.save(user);
        return R.success("用户创建成功，默认密码: 123456");
    }

    /**
     * 重置密码
     */
    @PostMapping("/resetPassword")
    public R<String> resetPassword(@RequestParam Long id,
                                    @RequestParam(required = false) String newPassword) {
        Users user = service.getById(id);
        if (user == null) {
            return R.fail("用户不存在");
        }
        String password = (newPassword != null && !newPassword.isEmpty()) ? newPassword : "123456";
        Users update = new Users();
        update.setId(id);
        update.setPassword(passwordEncoder.encode(password));
        update.setUpdatedAt(LocalDateTime.now());
        service.updateById(update);
        return R.success("密码已重置为: " + password);
    }

    /**
     * 修改密码（用户自己）
     */
    @PostMapping("/changePassword")
    public R<String> changePassword(@RequestParam Long id,
                                     @RequestParam String oldPassword,
                                     @RequestParam String newPassword) {
        Users user = service.getById(id);
        if (user == null) {
            return R.fail("用户不存在");
        }
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return R.fail("原密码错误");
        }
        if (newPassword == null || newPassword.length() < 6) {
            return R.fail("新密码长度不能少于6位");
        }
        Users update = new Users();
        update.setId(id);
        update.setPassword(passwordEncoder.encode(newPassword));
        update.setUpdatedAt(LocalDateTime.now());
        service.updateById(update);
        return R.success("密码修改成功");
    }

    /**
     * 启用/禁用用户
     */
    @PostMapping("/toggle")
    public R<String> toggle(@RequestParam Long id, @RequestParam Long enable) {
        Users user = new Users();
        user.setId(id);
        user.setEnable(enable);
        user.setUpdatedAt(LocalDateTime.now());
        service.updateById(user);
        return R.success(enable == 1 ? "用户已启用" : "用户已禁用");
    }

    /**
     * 分配角色
     */
    @PostMapping("/assignRole")
    public R<String> assignRole(@RequestParam Long id, @RequestParam Long authorityId) {
        Users user = new Users();
        user.setId(id);
        user.setAuthorityId(authorityId);
        user.setUpdatedAt(LocalDateTime.now());
        service.updateById(user);
        return R.success("角色分配成功");
    }

    /**
     * 用户统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", service.count());
        stats.put("enabled", service.count(new LambdaQueryWrapper<Users>().eq(Users::getEnable, 1)));
        stats.put("disabled", service.count(new LambdaQueryWrapper<Users>().eq(Users::getEnable, 2)));
        return R.success(stats);
    }
}
