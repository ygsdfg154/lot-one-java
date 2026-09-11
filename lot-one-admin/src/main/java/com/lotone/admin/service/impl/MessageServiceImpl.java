package com.lotone.admin.service.impl;

import com.lotone.admin.entity.Message;
import com.lotone.admin.mapper.MessageMapper;
import com.lotone.admin.service.MessageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 消息管理 服务实现类
 * </p>
 *
 * @author lot-one
 * @since 2026-08-31
 */
@Service
public class MessageServiceImpl extends ServiceImpl<MessageMapper, Message> implements MessageService {

}
