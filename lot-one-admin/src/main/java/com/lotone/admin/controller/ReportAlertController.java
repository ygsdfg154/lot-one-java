package com.lotone.admin.controller;

import com.lotone.admin.entity.ReportAlert;
import com.lotone.admin.service.ReportAlertService;
import com.lotone.common.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 告警报表 前端控制器
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@RestController
@RequestMapping("/reportAlert")
public class ReportAlertController extends BaseController<ReportAlert, ReportAlertService> {

}
