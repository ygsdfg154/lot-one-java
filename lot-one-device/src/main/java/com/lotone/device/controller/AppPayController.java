package com.lotone.device.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.lotone.common.result.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/pay")
public class AppPayController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * 创建订单（流量充值/VIP购买）
     */
    @PostMapping("/createOrder")
    public R<Map<String, Object>> createOrder(@RequestBody Map<String, Object> params) {
        Long userId = StpUtil.getLoginIdAsLong();
        String productId = (String) params.get("productId");
        String productType = (String) params.get("productType"); // DATA_PACKAGE / VIP
        String payType = (String) params.get("payType"); // ALIPAY / WECHAT

        if (productId == null || payType == null) {
            return R.fail("产品ID和支付方式不能为空");
        }

        // 查询商品
        Map<String, Object> product = null;
        try {
            String table = "VIP".equals(productType) ? "lot_vip_product" : "lot_data_package";
            product = jdbcTemplate.queryForMap("SELECT * FROM " + table + " WHERE id = ?", productId);
        } catch (Exception e) {
            log.warn("Query product failed: {}", e.getMessage());
        }
        if (product == null) {
            return R.fail("商品不存在");
        }

        // 创建订单
        String orderNo = "ORD" + System.currentTimeMillis() + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        BigDecimal amount = new BigDecimal(product.get("price").toString());

        try {
            jdbcTemplate.update(
                    "INSERT INTO lot_order (order_no, user_id, product_id, product_type, amount, status, pay_type, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)",
                    orderNo, userId, productId, productType, amount, payType, LocalDateTime.now(), LocalDateTime.now());
        } catch (Exception e) {
            log.error("Create order failed", e);
            return R.fail("创建订单失败");
        }

        // TODO: 调用支付宝/微信统一下单接口，获取支付参数
        Map<String, Object> payParams = new HashMap<>();
        payParams.put("orderNo", orderNo);
        payParams.put("amount", amount);
        payParams.put("payType", payType);
        payParams.put("payUrl", ""); // 支付链接/二维码，待对接真实支付SDK

        log.info("Order created: orderNo={}, userId={}, amount={}, payType={}", orderNo, userId, amount, payType);
        return R.success(payParams);
    }

    /**
     * 支付回调（支付宝/微信）
     */
    @PostMapping("/notify/{payType}")
    public String payNotify(@PathVariable String payType, @RequestBody String notifyData) {
        log.info("Pay notify: payType={}, data={}", payType, notifyData);
        // TODO: 验签、解析回调数据、更新订单状态、发放权益（流量/VIP）
        // 支付宝返回 "success"，微信返回 "<xml><return_code><![CDATA[SUCCESS]]></return_code></xml>"
        return "ALIPAY".equals(payType) ? "success" : "<xml><return_code><![CDATA[SUCCESS]]></return_code></xml>";
    }

    /**
     * 查询订单状态
     */
    @GetMapping("/orderStatus")
    public R<Map<String, Object>> orderStatus(@RequestParam String orderNo) {
        Long userId = StpUtil.getLoginIdAsLong();
        try {
            Map<String, Object> order = jdbcTemplate.queryForMap(
                    "SELECT order_no, amount, status, pay_type, created_at FROM lot_order WHERE order_no = ? AND user_id = ?",
                    orderNo, userId);
            return R.success(order);
        } catch (Exception e) {
            return R.fail("订单不存在");
        }
    }

    /**
     * 我的订单列表
     */
    @GetMapping("/orderList")
    public R<java.util.List<Map<String, Object>>> orderList(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize) {
        Long userId = StpUtil.getLoginIdAsLong();
        int offset = (page - 1) * pageSize;
        try {
            java.util.List<Map<String, Object>> orders = jdbcTemplate.queryForList(
                    "SELECT order_no, product_id, product_type, amount, status, pay_type, created_at FROM lot_order WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
                    userId, pageSize, offset);
            return R.success(orders);
        } catch (Exception e) {
            log.error("Query order list failed", e);
            return R.success(new java.util.ArrayList<>());
        }
    }
}
