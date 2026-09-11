package com.lotone.admin.controller;

import com.lotone.admin.entity.ReportMileage;
import com.lotone.admin.service.ReportMileageService;
import com.lotone.common.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 里程报表 前端控制器
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@RestController
@RequestMapping("/reportMileage")
public class ReportMileageController extends BaseController<ReportMileage, ReportMileageService> {

}
