package com.lotone.admin.controller;

import com.lotone.admin.entity.JwtBlacklists;
import com.lotone.admin.service.JwtBlacklistsService;
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
@RequestMapping("/jwtBlacklists")
public class JwtBlacklistsController extends BaseController<JwtBlacklists, JwtBlacklistsService> {

}
