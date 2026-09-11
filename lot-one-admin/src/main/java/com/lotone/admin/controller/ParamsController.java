package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.Params;
import com.lotone.admin.service.ParamsService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/params")
public class ParamsController extends BaseController<Params, ParamsService> {

    /**
     * 按参数键查询
     */
    @GetMapping("/byKey")
    public R<Params> byKey(@RequestParam String key) {
        Params param = service.getOne(
                new LambdaQueryWrapper<Params>().eq(Params::getKey, key));
        return R.success(param);
    }

    /**
     * 按参数键获取值
     */
    @GetMapping("/value")
    public R<Map<String, String>> value(@RequestParam String key) {
        Params param = service.getOne(
                new LambdaQueryWrapper<Params>().eq(Params::getKey, key));
        Map<String, String> result = new HashMap<>();
        result.put("key", key);
        result.put("value", param != null ? param.getValue() : null);
        return R.success(result);
    }

    /**
     * 批量获取参数值
     */
    @PostMapping("/values")
    public R<Map<String, String>> values(@RequestBody List<String> keys) {
        Map<String, String> result = new HashMap<>();
        if (keys == null || keys.isEmpty()) {
            return R.success(result);
        }
        List<Params> params = service.list(
                new LambdaQueryWrapper<Params>().in(Params::getKey, keys));
        for (Params p : params) {
            result.put(p.getKey(), p.getValue());
        }
        return R.success(result);
    }

    /**
     * 更新参数值
     */
    @PostMapping("/updateValue")
    public R<String> updateValue(@RequestParam String key, @RequestParam String value) {
        Params param = service.getOne(
                new LambdaQueryWrapper<Params>().eq(Params::getKey, key));
        if (param == null) {
            return R.fail("参数不存在");
        }
        Params update = new Params();
        update.setId(param.getId());
        update.setValue(value);
        update.setUpdatedAt(LocalDateTime.now());
        service.updateById(update);
        return R.success("参数已更新");
    }

    /**
     * 所有参数列表（转Map）
     */
    @GetMapping("/allMap")
    public R<Map<String, String>> allMap() {
        List<Params> params = service.list();
        Map<String, String> result = new HashMap<>();
        for (Params p : params) {
            result.put(p.getKey(), p.getValue());
        }
        return R.success(result);
    }
}
