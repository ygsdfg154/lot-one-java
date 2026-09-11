package com.lotone.admin.service.impl;

import com.lotone.admin.entity.Dept;
import com.lotone.admin.mapper.DeptMapper;
import com.lotone.admin.service.DeptService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 部门(供业务 dept_id 关联查询,不参与鉴权) 服务实现类
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Service
public class DeptServiceImpl extends ServiceImpl<DeptMapper, Dept> implements DeptService {

}
