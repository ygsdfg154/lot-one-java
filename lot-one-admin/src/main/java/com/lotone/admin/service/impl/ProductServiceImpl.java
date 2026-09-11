package com.lotone.admin.service.impl;

import com.lotone.admin.entity.Product;
import com.lotone.admin.mapper.ProductMapper;
import com.lotone.admin.service.ProductService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 产品 服务实现类
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {

}
