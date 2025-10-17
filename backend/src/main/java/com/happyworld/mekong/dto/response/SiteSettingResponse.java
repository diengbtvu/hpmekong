package com.happyworld.mekong.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.happyworld.mekong.entity.SiteSetting;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SiteSettingResponse {

    private Long id;
    private String settingKey;
    private String settingValue;
    private SiteSetting.ValueType valueType;
    private String settingGroup;
    private String label;
    private String description;
    private Integer displayOrder;
    private Boolean isPublic;
    private Boolean isEditable;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

