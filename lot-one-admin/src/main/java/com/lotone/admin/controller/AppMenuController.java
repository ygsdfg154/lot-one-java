package com.lotone.admin.controller;

import com.lotone.admin.entity.AppMenu;
import com.lotone.admin.service.AppMenuService;
import com.lotone.common.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * APP功能菜单 前端控制器
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@RestController
@RequestMapping("/appMenu")
public class AppMenuController extends BaseController<AppMenu, AppMenuService> {

}
