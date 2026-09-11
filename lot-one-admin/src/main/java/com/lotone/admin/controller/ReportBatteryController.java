package com.lotone.admin.controller;

import com.lotone.admin.entity.ReportBattery;
import com.lotone.admin.service.ReportBatteryService;
import com.lotone.common.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 电量报表 前端控制器
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@RestController
@RequestMapping("/reportBattery")
public class ReportBatteryController extends BaseController<ReportBattery, ReportBatteryService> {

}
