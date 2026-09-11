package com.lotone.admin.controller;

import com.lotone.admin.entity.Cmd;
import com.lotone.admin.service.CmdService;
import com.lotone.common.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 指令 前端控制器
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@RestController
@RequestMapping("/cmd")
public class CmdController extends BaseController<Cmd, CmdService> {

}
