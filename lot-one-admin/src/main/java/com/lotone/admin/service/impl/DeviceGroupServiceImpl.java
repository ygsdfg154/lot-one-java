package com.lotone.admin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lotone.admin.entity.DeviceGroup;
import com.lotone.admin.mapper.DeviceGroupMapper;
import com.lotone.admin.service.DeviceGroupService;
import org.springframework.stereotype.Service;

@Service
public class DeviceGroupServiceImpl extends ServiceImpl<DeviceGroupMapper, DeviceGroup> implements DeviceGroupService {
}
