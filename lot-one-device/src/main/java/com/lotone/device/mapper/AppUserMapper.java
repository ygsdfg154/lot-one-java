package com.lotone.device.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lotone.device.entity.AppUser;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AppUserMapper extends BaseMapper<AppUser> {
}
