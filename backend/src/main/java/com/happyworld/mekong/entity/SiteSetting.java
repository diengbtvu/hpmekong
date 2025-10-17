package com.happyworld.mekong.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "site_settings")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SiteSetting extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "setting_key", nullable = false, unique = true)
    private String settingKey;

    @Column(name = "setting_value", columnDefinition = "TEXT")
    private String settingValue;

    @Enumerated(EnumType.STRING)
    @Column(name = "value_type", nullable = false)
    private ValueType valueType = ValueType.STRING;

    @Column(name = "setting_group", length = 100)
    private String settingGroup;

    private String label;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "is_public")
    private Boolean isPublic = true;

    @Column(name = "is_editable")
    private Boolean isEditable = true;

    public enum ValueType {
        STRING, NUMBER, BOOLEAN, JSON, TEXT
    }

    // Helper methods to parse values
    public Integer getIntValue() {
        if (valueType == ValueType.NUMBER) {
            try {
                return Integer.parseInt(settingValue);
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return null;
    }

    public Boolean getBooleanValue() {
        if (valueType == ValueType.BOOLEAN) {
            return Boolean.parseBoolean(settingValue);
        }
        return null;
    }

    public String getStringValue() {
        return settingValue;
    }
}

