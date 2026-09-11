package com.lotone.admin.vo;

import com.lotone.admin.entity.Fence;
import com.lotone.admin.entity.FencePoint;
import lombok.Data;

import java.util.List;

@Data
public class FenceVO extends Fence {
    // 围栏点位列表
    private List<FencePoint> points;
    // 关联设备ID列表
    private List<String> deviceIds;
}
