package com.lotone.admin.controller;

import com.lotone.admin.entity.ReportTrip;
import com.lotone.admin.service.ReportTripService;
import com.lotone.common.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 行程报表 前端控制器
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@RestController
@RequestMapping("/reportTrip")
public class ReportTripController extends BaseController<ReportTrip, ReportTripService> {

}
