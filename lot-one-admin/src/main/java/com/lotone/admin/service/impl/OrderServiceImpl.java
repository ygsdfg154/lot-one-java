package com.lotone.admin.service.impl;

import com.lotone.admin.entity.Order;
import com.lotone.admin.mapper.OrderMapper;
import com.lotone.admin.service.OrderService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 订单表 服务实现类
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements OrderService {

}
