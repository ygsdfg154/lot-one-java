package com.lotone.admin.mapper;

import com.lotone.admin.entity.Dept;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 部门(供业务 dept_id 关联查询,不参与鉴权) Mapper 接口
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Mapper
public interface DeptMapper extends BaseMapper<Dept> {

}
