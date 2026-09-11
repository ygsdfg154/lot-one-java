package com.lotone.admin.controller;

import com.lotone.admin.entity.FenceDevice;
import com.lotone.admin.service.FenceDeviceService;
import com.lotone.common.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 围栏-设备关联 前端控制器
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@RestController
@RequestMapping("/fenceDevice")
public class FenceDeviceController extends BaseController<FenceDevice, FenceDeviceService> {

}
