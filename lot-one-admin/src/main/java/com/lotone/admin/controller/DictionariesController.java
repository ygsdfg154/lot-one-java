package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.Dictionaries;
import com.lotone.admin.entity.DictionaryDetails;
import com.lotone.admin.service.DictionariesService;
import com.lotone.admin.service.DictionaryDetailsService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dictionaries")
public class DictionariesController extends BaseController<Dictionaries, DictionariesService> {

    @Autowired
    private DictionaryDetailsService dictionaryDetailsService;

    /**
     * 字典详情（含字典项）
     */
    @GetMapping("/detail")
    public R<Map<String, Object>> detail(@RequestParam Long id) {
        Dictionaries dict = service.getById(id);
        if (dict == null) {
            return R.fail("字典不存在");
        }
        Map<String, Object> result = new HashMap<>();
        result.put("dictionary", dict);

        // 查询字典项
        List<DictionaryDetails> details = dictionaryDetailsService.list(
                new LambdaQueryWrapper<DictionaryDetails>()
                        .eq(DictionaryDetails::getSysDictionaryId, id)
                        .orderByAsc(DictionaryDetails::getSort));
        result.put("details", details);

        return R.success(result);
    }

    /**
     * 按字典类型（英文key）查询字典项
     */
    @GetMapping("/byType")
    public R<List<DictionaryDetails>> byType(@RequestParam String type) {
        Dictionaries dict = service.getOne(
                new LambdaQueryWrapper<Dictionaries>().eq(Dictionaries::getType, type));
        if (dict == null) {
            return R.success(List.of());
        }
        List<DictionaryDetails> details = dictionaryDetailsService.list(
                new LambdaQueryWrapper<DictionaryDetails>()
                        .eq(DictionaryDetails::getSysDictionaryId, dict.getId())
                        .eq(DictionaryDetails::getStatus, true)
                        .orderByAsc(DictionaryDetails::getSort));
        return R.success(details);
    }

    /**
     * 启用/禁用字典
     */
    @PostMapping("/toggle")
    public R<String> toggle(@RequestParam Long id, @RequestParam Boolean status) {
        Dictionaries dict = new Dictionaries();
        dict.setId(id);
        dict.setStatus(status);
        dict.setUpdatedAt(LocalDateTime.now());
        service.updateById(dict);
        return R.success(status ? "字典已启用" : "字典已禁用");
    }

    /**
     * 所有启用的字典列表
     */
    @GetMapping("/allEnabled")
    public R<List<Dictionaries>> allEnabled() {
        List<Dictionaries> list = service.list(
                new LambdaQueryWrapper<Dictionaries>()
                        .eq(Dictionaries::getStatus, true)
                        .orderByAsc(Dictionaries::getId));
        return R.success(list);
    }
}
