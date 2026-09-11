package com.lotone.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lotone.admin.entity.Order;
import com.lotone.admin.service.OrderService;
import com.lotone.common.controller.BaseController;
import com.lotone.common.result.R;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
public class OrderController extends BaseController<Order, OrderService> {

    /**
     * 订单详情
     */
    @GetMapping("/detail")
    public R<Order> detail(@RequestParam Long id) {
        Order order = service.getById(id);
        if (order == null) {
            return R.fail("订单不存在");
        }
        return R.success(order);
    }

    /**
     * 根据订单号查询
     */
    @GetMapping("/byOrderNo")
    public R<Order> byOrderNo(@RequestParam String orderNo) {
        Order order = service.getOne(new LambdaQueryWrapper<Order>().eq(Order::getOrderNo, orderNo));
        if (order == null) {
            return R.fail("订单不存在");
        }
        return R.success(order);
    }

    /**
     * 取消订单（仅待支付状态可取消）
     */
    @PostMapping("/cancel")
    @Transactional(rollbackFor = Exception.class)
    public R<String> cancel(@RequestParam Long id) {
        Order order = service.getById(id);
        if (order == null) {
            return R.fail("订单不存在");
        }
        if (order.getOrderStatus() != null && order.getOrderStatus() != 0) {
            return R.fail("只有待支付订单可以取消");
        }
        Order update = new Order();
        update.setId(id);
        update.setOrderStatus(2L); // 已取消
        update.setUpdatedAt(LocalDateTime.now());
        service.updateById(update);
        return R.success("订单已取消");
    }

    /**
     * 标记订单已支付（手动补单，正常由支付回调触发）
     */
    @PostMapping("/markPaid")
    @Transactional(rollbackFor = Exception.class)
    public R<String> markPaid(@RequestParam Long id) {
        Order order = service.getById(id);
        if (order == null) {
            return R.fail("订单不存在");
        }
        if (order.getOrderStatus() != null && order.getOrderStatus() != 0) {
            return R.fail("只有待支付订单可以标记支付");
        }
        Order update = new Order();
        update.setId(id);
        update.setOrderStatus(1L); // 已支付
        update.setPaidAt(LocalDateTime.now());
        update.setUpdatedAt(LocalDateTime.now());
        service.updateById(update);
        return R.success("订单已标记支付");
    }

    /**
     * 申请退款
     */
    @PostMapping("/refund")
    @Transactional(rollbackFor = Exception.class)
    public R<String> refund(@RequestParam Long id, @RequestParam(required = false) String reason) {
        Order order = service.getById(id);
        if (order == null) {
            return R.fail("订单不存在");
        }
        if (order.getOrderStatus() != null && order.getOrderStatus() != 1) {
            return R.fail("只有已支付订单可以申请退款");
        }
        Order update = new Order();
        update.setId(id);
        update.setOrderStatus(4L); // 退款中
        update.setRemark(reason);
        update.setUpdatedAt(LocalDateTime.now());
        service.updateById(update);
        return R.success("退款申请已提交");
    }

    /**
     * 确认退款完成
     */
    @PostMapping("/refundComplete")
    @Transactional(rollbackFor = Exception.class)
    public R<String> refundComplete(@RequestParam Long id) {
        Order order = service.getById(id);
        if (order == null) {
            return R.fail("订单不存在");
        }
        if (order.getOrderStatus() != null && order.getOrderStatus() != 4) {
            return R.fail("只有退款中订单可以确认完成");
        }
        Order update = new Order();
        update.setId(id);
        update.setOrderStatus(5L); // 已退款
        update.setUpdatedAt(LocalDateTime.now());
        service.updateById(update);
        return R.success("退款已完成");
    }

    /**
     * 订单统计
     */
    @GetMapping("/statistics")
    public R<Map<String, Object>> statistics() {
        Map<String, Object> stats = new HashMap<>();

        long total = service.count();
        long pending = service.count(new LambdaQueryWrapper<Order>().eq(Order::getOrderStatus, 0));
        long paid = service.count(new LambdaQueryWrapper<Order>().eq(Order::getOrderStatus, 1));
        long cancelled = service.count(new LambdaQueryWrapper<Order>().eq(Order::getOrderStatus, 2));
        long expired = service.count(new LambdaQueryWrapper<Order>().eq(Order::getOrderStatus, 3));
        long refunding = service.count(new LambdaQueryWrapper<Order>().eq(Order::getOrderStatus, 4));
        long refunded = service.count(new LambdaQueryWrapper<Order>().eq(Order::getOrderStatus, 5));

        stats.put("total", total);
        stats.put("pending", pending);
        stats.put("paid", paid);
        stats.put("cancelled", cancelled);
        stats.put("expired", expired);
        stats.put("refunding", refunding);
        stats.put("refunded", refunded);

        // 总销售额（已支付订单）
        try {
            List<Order> paidOrders = service.list(new LambdaQueryWrapper<Order>().eq(Order::getOrderStatus, 1));
            double totalAmount = paidOrders.stream()
                    .mapToDouble(o -> o.getPayAmount() != null ? o.getPayAmount() : 0)
                    .sum();
            stats.put("totalAmount", Math.round(totalAmount * 100.0) / 100.0);
        } catch (Exception e) {
            stats.put("totalAmount", 0.0);
        }

        return R.success(stats);
    }
}
