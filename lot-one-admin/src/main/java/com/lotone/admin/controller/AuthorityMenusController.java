package com.lotone.admin.controller;

import com.lotone.admin.entity.AuthorityMenus;
import com.lotone.admin.service.AuthorityMenusService;
import com.lotone.common.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@RestController
@RequestMapping("/authorityMenus")
public class AuthorityMenusController extends BaseController<AuthorityMenus, AuthorityMenusService> {

}
