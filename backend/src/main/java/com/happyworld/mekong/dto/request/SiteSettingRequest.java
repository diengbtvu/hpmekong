package com.happyworld.mekong.dto.request;

import com.happyworld.mekong.entity.SiteSetting;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SiteSettingRequest {

    @NotBlank(message = "Setting key is required")
    private String settingKey;

    private String settingValue;

    @NotNull(message = "Value type is required")
    private SiteSetting.ValueType valueType;

    private String settingGroup;

    private String label;

    private String description;

    private Integer displayOrder = 0;

    private Boolean isPublic = true;

    private Boolean isEditable = true;
}

