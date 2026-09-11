package com.lotone.admin.controller;

import com.lotone.admin.entity.FencePoint;
import com.lotone.admin.service.FencePointService;
import com.lotone.common.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 围栏点位 前端控制器
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@RestController
@RequestMapping("/fencePoint")
public class FencePointController extends BaseController<FencePoint, FencePointService> {

}
