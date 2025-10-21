package com.happyworld.mekong.dto.request;

import com.happyworld.mekong.entity.SiteSetting;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpsertSiteSettingRequest {

    private String settingValue;

    private SiteSetting.ValueType valueType;

    private String settingGroup;

    private String label;

    private String description;

    private Integer displayOrder;

    private Boolean isPublic;

    private Boolean isEditable;
}
