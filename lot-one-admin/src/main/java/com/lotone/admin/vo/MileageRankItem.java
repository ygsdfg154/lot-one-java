package com.lotone.admin.vo;

import lombok.Data;

@Data
public class MileageRankItem {
    private String deviceId;
    private String deviceName;
    private Double mileage;
    private Integer rank;
}
