package com.lotone.common.controller;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.lotone.common.result.PageResult;
import com.lotone.common.result.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map;

/**
 * 通用 CRUD 控制器基类
 * 子类只需继承并指定实体类型和 Service 类型，即可获得标准 CRUD 接口
 *
 * @param <T> 实体类型
 * @param <S> Service 类型
 */
public abstract class BaseController<T, S extends IService<T>> {

    @Autowired
    protected S service;

    /**
     * 分页查询
     * 请求体：{ "page": 1, "pageSize": 10, "字段名": "值" ... }
     * 非分页参数自动作为等值查询条件
     */
    @PostMapping("/pageList")
    public R<PageResult<T>> pageList(@RequestBody Map<String, Object> params) {
        int page = getInt(params, "page", 1);
        int pageSize = getInt(params, "pageSize", 10);

        T entity = BeanUtil.toBean(params, getEntityClass());

        Page<T> pageParam = new Page<>(page, pageSize);
        LambdaQueryWrapper<T> wrapper = new LambdaQueryWrapper<>(entity);
        extendQueryWrapper(wrapper, params);

        IPage<T> result = service.page(pageParam, wrapper);
        return R.success(PageResult.of(result.getRecords(), result.getTotal(), page, pageSize));
    }

    /**
     * 扩展查询条件，子类可重写
     */
    protected void extendQueryWrapper(LambdaQueryWrapper<T> wrapper, Map<String, Object> params) {
    }

    /**
     * 根据ID查询详情
     */
    @GetMapping("/getById")
    public R<T> getById(@RequestParam("id") Long id) {
        return R.success(service.getById(id));
    }

    /**
     * 新增
     */
    @PostMapping("/add")
    public R<Void> add(@RequestBody T entity) {
        service.save(entity);
        return R.success();
    }

    /**
     * 编辑
     */
    @PostMapping("/edit")
    public R<Void> edit(@RequestBody T entity) {
        service.updateById(entity);
        return R.success();
    }

    /**
     * 根据ID删除
     */
    @PostMapping("/delete")
    public R<Void> delete(@RequestParam("id") Long id) {
        service.removeById(id);
        return R.success();
    }

    /**
     * 批量删除
     */
    @PostMapping("/deleteBatch")
    public R<Void> deleteBatch(@RequestBody List<Long> ids) {
        service.removeByIds(ids);
        return R.success();
    }

    /**
     * 查询所有列表
     */
    @GetMapping("/list")
    public R<List<T>> list() {
        return R.success(service.list());
    }

    @SuppressWarnings("unchecked")
    protected Class<T> getEntityClass() {
        ParameterizedType pt = (ParameterizedType) this.getClass().getGenericSuperclass();
        return (Class<T>) pt.getActualTypeArguments()[0];
    }

    protected int getInt(Map<String, Object> params, String key, int defaultValue) {
        Object val = params.get(key);
        if (val == null) return defaultValue;
        try {
            return Integer.parseInt(val.toString());
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }
}
