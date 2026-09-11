package com.lotone.admin.controller;

import com.lotone.admin.entity.ReportStop;
import com.lotone.admin.service.ReportStopService;
import com.lotone.common.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 停留报表 前端控制器
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@RestController
@RequestMapping("/reportStop")
public class ReportStopController extends BaseController<ReportStop, ReportStopService> {

}
