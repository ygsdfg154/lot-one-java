package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.PaymentPlatform;
import com.lotone.admin.service.PaymentPlatformService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/paymentPlatform")
public class PaymentPlatformController extends BaseController<PaymentPlatform, PaymentPlatformService> {

    /**
     * 启用/禁用支付平台
     */
    @PostMapping("/toggle")
    public R<String> toggle(@RequestParam Long id, @RequestParam Byte status) {
        PaymentPlatform pp = new PaymentPlatform();
        pp.setId(id);
        pp.setStatus(status);
        pp.setUpdatedAt(LocalDateTime.now());
        service.updateById(pp);
        return R.success(status == 1 ? "支付平台已启用" : "支付平台已禁用");
    }

    /**
     * 查询启用的支付平台
     */
    @GetMapping("/enabled")
    public R<List<PaymentPlatform>> enabled() {
        List<PaymentPlatform> list = service.list(
                new LambdaQueryWrapper<PaymentPlatform>()
                        .eq(PaymentPlatform::getStatus, (byte) 1)
                        .orderByAsc(PaymentPlatform::getId));
        return R.success(list);
    }

    /**
     * 按平台编码查询
     */
    @GetMapping("/byCode")
    public R<PaymentPlatform> byCode(@RequestParam String platformCode) {
        PaymentPlatform pp = service.getOne(
                new LambdaQueryWrapper<PaymentPlatform>()
                        .eq(PaymentPlatform::getPlatformCode, platformCode));
        return R.success(pp);
    }
}
