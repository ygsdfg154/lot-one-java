package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.AppVersion;
import com.lotone.admin.service.AppVersionService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/appVersion")
public class AppVersionController extends BaseController<AppVersion, AppVersionService> {

    /**
     * 查询最新版本（按平台）
     */
    @GetMapping("/latest")
    public R<AppVersion> latest(@RequestParam Byte platform) {
        AppVersion version = service.getOne(
                new LambdaQueryWrapper<AppVersion>()
                        .eq(AppVersion::getPlatform, platform)
                        .orderByDesc(AppVersion::getId)
                        .last("LIMIT 1"));
        return R.success(version);
    }

    /**
     * 检查更新（App端调用）
     */
    @GetMapping("/checkUpdate")
    public R<Map<String, Object>> checkUpdate(@RequestParam Byte platform,
                                                @RequestParam(required = false) String versionCode) {
        AppVersion latest = service.getOne(
                new LambdaQueryWrapper<AppVersion>()
                        .eq(AppVersion::getPlatform, platform)
                        .orderByDesc(AppVersion::getId)
                        .last("LIMIT 1"));

        Map<String, Object> result = new HashMap<>();
        if (latest == null) {
            result.put("hasUpdate", false);
            return R.success(result);
        }

        boolean hasUpdate = false;
        if (versionCode != null && !versionCode.isEmpty()) {
            // 简单版本号比较
            hasUpdate = !versionCode.equals(latest.getVersionCode());
        } else {
            hasUpdate = true;
        }

        result.put("hasUpdate", hasUpdate);
        result.put("latestVersion", latest);
        result.put("forceUpdate", latest.getForceUpdate() != null && latest.getForceUpdate() == 1);
        return R.success(result);
    }

    /**
     * 按平台查询版本列表
     */
    @GetMapping("/byPlatform")
    public R<List<AppVersion>> byPlatform(@RequestParam Byte platform) {
        List<AppVersion> list = service.list(
                new LambdaQueryWrapper<AppVersion>()
                        .eq(AppVersion::getPlatform, platform)
                        .orderByDesc(AppVersion::getId));
        return R.success(list);
    }

    /**
     * 各平台最新版本汇总
     */
    @GetMapping("/summary")
    public R<Map<String, AppVersion>> summary() {
        Map<String, AppVersion> result = new HashMap<>();
        Byte[] platforms = {1, 2, 3, 4}; // iOS, Android, 小程序, 鸿蒙
        String[] names = {"iOS", "Android", "MiniProgram", "HarmonyOS"};
        for (int i = 0; i < platforms.length; i++) {
            AppVersion version = service.getOne(
                    new LambdaQueryWrapper<AppVersion>()
                            .eq(AppVersion::getPlatform, platforms[i])
                            .orderByDesc(AppVersion::getId)
                            .last("LIMIT 1"));
            result.put(names[i], version);
        }
        return R.success(result);
    }
}
