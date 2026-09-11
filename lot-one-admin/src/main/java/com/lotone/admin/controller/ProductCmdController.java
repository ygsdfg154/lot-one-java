package com.lotone.admin.controller;

import com.lotone.admin.entity.ProductCmd;
import com.lotone.admin.service.ProductCmdService;
import com.lotone.common.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 产品-指令关联 前端控制器
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@RestController
@RequestMapping("/productCmd")
public class ProductCmdController extends BaseController<ProductCmd, ProductCmdService> {

}
