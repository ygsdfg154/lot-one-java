package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.Product;
import com.lotone.admin.entity.ProductCmd;
import com.lotone.admin.service.ProductCmdService;
import com.lotone.admin.service.ProductService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product")
public class ProductController extends BaseController<Product, ProductService> {

    @Autowired
    private ProductCmdService productCmdService;

    /**
     * 产品详情（含关联指令）
     */
    @GetMapping("/detail")
    public R<Map<String, Object>> detail(@RequestParam Integer id) {
        Product product = service.getById(id);
        if (product == null) {
            return R.fail("产品不存在");
        }
        Map<String, Object> result = new HashMap<>();
        result.put("product", product);

        // 查询关联指令ID
        List<ProductCmd> productCmds = productCmdService.list(
                new LambdaQueryWrapper<ProductCmd>().eq(ProductCmd::getProductId, id));
        List<Integer> cmdIds = productCmds.stream().map(ProductCmd::getCmdId).collect(Collectors.toList());
        result.put("cmdIds", cmdIds);

        return R.success(result);
    }

    /**
     * 保存产品（含关联指令）
     */
    @PostMapping("/saveWithCmds")
    @org.springframework.transaction.annotation.Transactional(rollbackFor = Exception.class)
    public R<Integer> saveWithCmds(@RequestBody Map<String, Object> params) {
        Product product = new Product();
        if (params.get("id") != null) {
            product.setId(Integer.parseInt(params.get("id").toString()));
        }
        if (params.get("code") != null) product.setCode(params.get("code").toString());
        if (params.get("productCategoryType") != null) product.setProductCategoryType(Long.parseLong(params.get("productCategoryType").toString()));
        if (params.get("remark") != null) product.setRemark(params.get("remark").toString());
        if (params.get("posType") != null) product.setPosType(params.get("posType").toString());
        if (params.get("config") != null) product.setConfig(params.get("config").toString());
        if (params.get("serviceLink") != null) product.setServiceLink(params.get("serviceLink").toString());
        if (params.get("productType") != null) product.setProductType(Long.parseLong(params.get("productType").toString()));
        if (params.get("protocol") != null) product.setProtocol(params.get("protocol").toString());
        product.setUpdatedAt(LocalDateTime.now());

        if (product.getId() == null) {
            product.setCreatedAt(LocalDateTime.now());
            service.save(product);
        } else {
            service.updateById(product);
            // 删除旧关联
            productCmdService.remove(new LambdaQueryWrapper<ProductCmd>().eq(ProductCmd::getProductId, product.getId()));
        }

        // 保存新关联
        if (params.get("cmdIds") != null) {
            List<Integer> cmdIds = (List<Integer>) params.get("cmdIds");
            for (Integer cmdId : cmdIds) {
                ProductCmd pc = new ProductCmd();
                pc.setProductId(product.getId());
                pc.setCmdId(cmdId);
                pc.setCreatedAt(LocalDateTime.now());
                pc.setUpdatedAt(LocalDateTime.now());
                productCmdService.save(pc);
            }
        }

        return R.success(product.getId());
    }

    /**
     * 按协议类型查询产品列表
     */
    @GetMapping("/byProtocol")
    public R<List<Product>> byProtocol(@RequestParam String protocol) {
        List<Product> products = service.list(
                new LambdaQueryWrapper<Product>().eq(Product::getProtocol, protocol));
        return R.success(products);
    }

    /**
     * 产品列表（全部，用于下拉选择）
     */
    @GetMapping("/all")
    public R<List<Product>> all() {
        List<Product> products = service.list(
                new LambdaQueryWrapper<Product>().orderByDesc(Product::getId));
        return R.success(products);
    }
}
