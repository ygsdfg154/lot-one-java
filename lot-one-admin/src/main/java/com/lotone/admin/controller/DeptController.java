package com.lotone.admin.controller;

import com.lotone.admin.entity.Dept;
import com.lotone.admin.service.DeptService;
import com.lotone.common.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 部门(供业务 dept_id 关联查询,不参与鉴权) 前端控制器
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@RestController
@RequestMapping("/dept")
public class DeptController extends BaseController<Dept, DeptService> {

}
