package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.DictionaryDetails;
import com.lotone.admin.service.DictionaryDetailsService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/dictionaryDetails")
public class DictionaryDetailsController extends BaseController<DictionaryDetails, DictionaryDetailsService> {

    /**
     * 按字典ID查询字典项
     */
    @GetMapping("/byDictionaryId")
    public R<List<DictionaryDetails>> byDictionaryId(@RequestParam Long dictionaryId) {
        List<DictionaryDetails> list = service.list(
                new LambdaQueryWrapper<DictionaryDetails>()
                        .eq(DictionaryDetails::getSysDictionaryId, dictionaryId)
                        .orderByAsc(DictionaryDetails::getSort));
        return R.success(list);
    }

    /**
     * 启用/禁用字典项
     */
    @PostMapping("/toggle")
    public R<String> toggle(@RequestParam Long id, @RequestParam Boolean status) {
        DictionaryDetails detail = new DictionaryDetails();
        detail.setId(id);
        detail.setStatus(status);
        detail.setUpdatedAt(LocalDateTime.now());
        service.updateById(detail);
        return R.success(status ? "字典项已启用" : "字典项已禁用");
    }

    /**
     * 批量保存字典项
     */
    @PostMapping("/batchSave")
    @org.springframework.transaction.annotation.Transactional(rollbackFor = Exception.class)
    public R<String> batchSave(@RequestBody List<DictionaryDetails> details) {
        if (details == null || details.isEmpty()) {
            return R.fail("数据为空");
        }
        Long dictionaryId = details.get(0).getSysDictionaryId();
        if (dictionaryId != null) {
            // 删除旧字典项
            service.remove(new LambdaQueryWrapper<DictionaryDetails>()
                    .eq(DictionaryDetails::getSysDictionaryId, dictionaryId));
        }
        // 保存新字典项
        for (DictionaryDetails detail : details) {
            detail.setId(null);
            detail.setCreatedAt(LocalDateTime.now());
            detail.setUpdatedAt(LocalDateTime.now());
            if (detail.getStatus() == null) detail.setStatus(true);
            service.save(detail);
        }
        return R.success("批量保存成功，共" + details.size() + "项");
    }
}
