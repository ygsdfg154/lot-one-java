package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.CustomerService;
import com.lotone.admin.service.CustomerServiceService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/customerService")
public class CustomerServiceController extends BaseController<CustomerService, CustomerServiceService> {

    /**
     * 启用/禁用客服
     */
    @PostMapping("/toggle")
    public R<String> toggle(@RequestParam Long id, @RequestParam Byte status) {
        CustomerService cs = new CustomerService();
        cs.setId(id);
        cs.setStatus(status);
        cs.setUpdatedAt(LocalDateTime.now());
        service.updateById(cs);
        return R.success(status == 1 ? "客服已启用" : "客服已禁用");
    }

    /**
     * 查询启用的客服列表
     */
    @GetMapping("/enabled")
    public R<List<CustomerService>> enabled() {
        List<CustomerService> list = service.list(
                new LambdaQueryWrapper<CustomerService>()
                        .eq(CustomerService::getStatus, (byte) 1)
                        .orderByAsc(CustomerService::getServiceType));
        return R.success(list);
    }

    /**
     * 按类型查询客服
     */
    @GetMapping("/byType")
    public R<List<CustomerService>> byType(@RequestParam Byte serviceType) {
        List<CustomerService> list = service.list(
                new LambdaQueryWrapper<CustomerService>()
                        .eq(CustomerService::getServiceType, serviceType)
                        .eq(CustomerService::getStatus, (byte) 1));
        return R.success(list);
    }
}
