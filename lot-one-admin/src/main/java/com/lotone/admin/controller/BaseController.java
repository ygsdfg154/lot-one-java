package com.lotone.admin.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.dto.LoginDTO;
import com.lotone.admin.entity.Authorities;
import com.lotone.admin.entity.AuthorityMenus;
import com.lotone.admin.entity.BaseMenus;
import com.lotone.admin.entity.Users;
import com.lotone.admin.service.AuthoritiesService;
import com.lotone.admin.service.AuthorityMenusService;
import com.lotone.admin.service.BaseMenusService;
import com.lotone.admin.service.UsersService;
import com.lotone.admin.utils.CaptchaUtils;
import com.lotone.admin.vo.CaptchaVO;
import com.lotone.admin.vo.LoginVO;
import com.lotone.common.result.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/base")
public class BaseController {

    @Autowired
    private UsersService usersService;
    @Autowired
    private AuthoritiesService authoritiesService;
    @Autowired
    private BaseMenusService baseMenusService;
    @Autowired
    private AuthorityMenusService authorityMenusService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/captcha")
    public R<CaptchaVO> captcha() {
        Map<String, Object> data = CaptchaUtils.generate();
        CaptchaVO vo = new CaptchaVO();
        vo.setCaptchaId((String) data.get("captchaId"));
        vo.setPicPath((String) data.get("picPath"));
        vo.setCaptchaLength((Integer) data.get("captchaLength"));
        vo.setOpenCaptcha(true);
        return R.success(vo);
    }

    @PostMapping("/login")
    public R<LoginVO> login(@RequestBody LoginDTO dto) {
        if (dto.getCaptchaId() != null && !CaptchaUtils.verify(dto.getCaptchaId(), dto.getCaptcha())) {
            return R.fail("验证码错误");
        }
        Users user = usersService.getOne(new LambdaQueryWrapper<Users>().eq(Users::getUsername, dto.getUsername()));
        if (user == null || !passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            return R.fail("用户名不存在或者密码错误");
        }
        if (user.getEnable() != null && user.getEnable() == 2) {
            return R.fail("用户被禁止登录");
        }
        StpUtil.login(user.getId());
        String token = StpUtil.getTokenValue();
        long expiresAt = System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000L;
        user.setPassword(null);
        LoginVO vo = new LoginVO();
        vo.setUser(user);
        vo.setToken(token);
        vo.setExpiresAt(expiresAt);
        return R.success(vo);
    }

    @GetMapping("/getUserInfo")
    public R<Users> getUserInfo() {
        long userId = StpUtil.getLoginIdAsLong();
        Users user = usersService.getById(userId);
        if (user != null) user.setPassword(null);
        return R.success(user);
    }

    @GetMapping("/getMenu")
    public R<List<Map<String, Object>>> getMenu() {
        long userId = StpUtil.getLoginIdAsLong();
        Users user = usersService.getById(userId);
        if (user == null) {
            return R.success(new ArrayList<>());
        }

        List<BaseMenus> allMenus = baseMenusService.list(
                new LambdaQueryWrapper<BaseMenus>().orderByAsc(BaseMenus::getSort));

        // 超级管理员（authorityId=888）返回所有菜单
        Long authorityId = user.getAuthorityId();
        if (authorityId != null && authorityId == 888L) {
            List<Map<String, Object>> tree = buildMenuTree(allMenus, 0L);
            return R.success(tree);
        }

        // 普通用户：查询角色关联的菜单ID
        Set<Long> allowedMenuIds = new HashSet<>();
        if (authorityId != null) {
            List<AuthorityMenus> roleMenus = authorityMenusService.list(
                    new LambdaQueryWrapper<AuthorityMenus>()
                            .eq(AuthorityMenus::getSysAuthorityAuthorityId, authorityId));
            for (AuthorityMenus rm : roleMenus) {
                allowedMenuIds.add(rm.getSysBaseMenuId());
            }
        }

        // 过滤出有权限的菜单，同时保留父菜单（如果子菜单有权限）
        Set<Long> finalMenuIds = new HashSet<>(allowedMenuIds);
        for (BaseMenus menu : allMenus) {
            if (allowedMenuIds.contains(menu.getId()) && menu.getParentId() != null) {
                // 递归添加所有父级菜单
                addParentMenus(allMenus, menu.getParentId(), finalMenuIds);
            }
        }

        List<BaseMenus> filteredMenus = allMenus.stream()
                .filter(m -> finalMenuIds.contains(m.getId()))
                .collect(Collectors.toList());

        List<Map<String, Object>> tree = buildMenuTree(filteredMenus, 0L);
        return R.success(tree);
    }

    private void addParentMenus(List<BaseMenus> allMenus, Long parentId, Set<Long> menuIds) {
        for (BaseMenus menu : allMenus) {
            if (menu.getId().equals(parentId)) {
                menuIds.add(menu.getId());
                if (menu.getParentId() != null && menu.getParentId() != 0L) {
                    addParentMenus(allMenus, menu.getParentId(), menuIds);
                }
                break;
            }
        }
    }

    @PostMapping("/logout")
    public R<Void> logout() {
        StpUtil.logout();
        return R.success();
    }

    private List<Map<String, Object>> buildMenuTree(List<BaseMenus> menus, Long parentId) {
        List<Map<String, Object>> tree = new ArrayList<>();
        for (BaseMenus menu : menus) {
            Long pid = menu.getParentId() != null ? menu.getParentId().longValue() : 0L;
            if (pid.equals(parentId)) {
                Map<String, Object> node = new HashMap<>();
                node.put("id", menu.getId());
                node.put("path", menu.getPath());
                node.put("name", menu.getName());
                node.put("component", menu.getComponent());
                Map<String, Object> meta = new HashMap<>();
                meta.put("title", menu.getTitle());
                meta.put("icon", menu.getIcon());
                meta.put("keepAlive", Boolean.TRUE.equals(menu.getKeepAlive()));
                node.put("meta", meta);
                List<Map<String, Object>> children = buildMenuTree(menus, menu.getId());
                if (!children.isEmpty()) node.put("children", children);
                tree.add(node);
            }
        }
        return tree;
    }
}
