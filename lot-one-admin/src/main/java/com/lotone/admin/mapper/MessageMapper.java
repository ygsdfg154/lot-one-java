package com.lotone.admin.mapper;

import com.lotone.admin.entity.Message;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * 消息管理 Mapper 接口
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Mapper
public interface MessageMapper extends BaseMapper<Message> {

}
