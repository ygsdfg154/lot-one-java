package com.lotone.admin.vo;

import lombok.Data;
import java.util.List;

@Data
public class DashboardOverview {
    private Integer deviceCount;
    private Integer activationCount;
    private Integer onlineCount;
    private Integer offlineCount;
    private Integer waitActiveCount;
    private Integer expiredCount;
    private List<MileageRankItem> totalMileageRank;
    private List<MileageRankItem> todayMileageRank;
}
