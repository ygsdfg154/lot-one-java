package com.lotone.admin.service.impl;

import com.lotone.admin.entity.Error;
import com.lotone.admin.mapper.ErrorMapper;
import com.lotone.admin.service.ErrorService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Service
public class ErrorServiceImpl extends ServiceImpl<ErrorMapper, Error> implements ErrorService {

}
