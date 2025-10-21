package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.SiteSettingRequest;
import com.happyworld.mekong.dto.request.UpsertSiteSettingRequest;
import com.happyworld.mekong.dto.response.SiteSettingResponse;
import com.happyworld.mekong.entity.SiteSetting;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.SiteSettingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SiteSettingService {

    private final SiteSettingRepository siteSettingRepository;

    @Transactional(readOnly = true)
    public List<SiteSettingResponse> getAllSettings() {
        log.debug("Getting all site settings");
        return siteSettingRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<SiteSettingResponse> getPublicSettings() {
        log.debug("Getting public site settings");
        return siteSettingRepository.findByIsPublicTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getPublicSettingsAsMap() {
        log.debug("Getting public settings as map");
        List<SiteSetting> settings = siteSettingRepository.findByIsPublicTrueOrderByDisplayOrderAsc();
        
        Map<String, Object> settingsMap = new HashMap<>();
        for (SiteSetting setting : settings) {
            String key = setting.getSettingKey();
            Object value = parseSettingValue(setting);
            settingsMap.put(key, value);
        }
        
        return settingsMap;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getSettingsByGroup(String group) {
        log.debug("Getting settings by group: {}", group);
        List<SiteSetting> settings = siteSettingRepository.findBySettingGroupAndIsPublicTrueOrderByDisplayOrderAsc(group);
        
        Map<String, Object> settingsMap = new HashMap<>();
        for (SiteSetting setting : settings) {
            String key = setting.getSettingKey().replace(group + ".", "");
            Object value = parseSettingValue(setting);
            settingsMap.put(key, value);
        }
        
        return settingsMap;
    }

    @Transactional(readOnly = true)
    public SiteSettingResponse getSettingByKey(String key) {
        log.debug("Getting setting by key: {}", key);
        SiteSetting setting = siteSettingRepository.findBySettingKey(key)
                .orElseThrow(() -> new ResourceNotFoundException("Setting not found with key: " + key));
        return convertToResponse(setting);
    }

    @Transactional(readOnly = true)
    public SiteSettingResponse getSettingById(Long id) {
        log.debug("Getting setting by id: {}", id);
        SiteSetting setting = siteSettingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Setting not found with id: " + id));
        return convertToResponse(setting);
    }

    @Transactional
    public SiteSettingResponse createSetting(SiteSettingRequest request) {
        log.debug("Creating setting with key: {}", request.getSettingKey());
        
        // Check if key already exists
        if (siteSettingRepository.findBySettingKey(request.getSettingKey()).isPresent()) {
            throw new IllegalArgumentException("Setting with key '" + request.getSettingKey() + "' already exists");
        }
        
        SiteSetting setting = SiteSetting.builder()
                .settingKey(request.getSettingKey())
                .settingValue(request.getSettingValue())
                .valueType(request.getValueType())
                .settingGroup(request.getSettingGroup())
                .label(request.getLabel())
                .description(request.getDescription())
                .displayOrder(request.getDisplayOrder())
                .isPublic(request.getIsPublic())
                .isEditable(request.getIsEditable())
                .build();

        setting = siteSettingRepository.save(setting);
        log.info("Created setting with id: {}", setting.getId());
        
        return convertToResponse(setting);
    }

    @Transactional
    public SiteSettingResponse updateSetting(Long id, SiteSettingRequest request) {
        log.debug("Updating setting with id: {}", id);
        
        SiteSetting setting = siteSettingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Setting not found with id: " + id));

        if (!setting.getIsEditable()) {
            throw new IllegalStateException("Setting is not editable");
        }

        setting.setSettingValue(request.getSettingValue());
        setting.setValueType(request.getValueType());
        setting.setSettingGroup(request.getSettingGroup());
        setting.setLabel(request.getLabel());
        setting.setDescription(request.getDescription());
        setting.setDisplayOrder(request.getDisplayOrder());
        setting.setIsPublic(request.getIsPublic());
        setting.setIsEditable(request.getIsEditable());

        setting = siteSettingRepository.save(setting);
        log.info("Updated setting with id: {}", id);
        
        return convertToResponse(setting);
    }

    @Transactional
    public SiteSettingResponse updateSettingValue(String key, String value) {
        log.debug("Updating setting value for key: {}", key);
        
        SiteSetting setting = siteSettingRepository.findBySettingKey(key)
                .orElseThrow(() -> new ResourceNotFoundException("Setting not found with key: " + key));

        if (!setting.getIsEditable()) {
            throw new IllegalStateException("Setting is not editable");
        }

        setting.setSettingValue(value);
        setting = siteSettingRepository.save(setting);
        
        log.info("Updated setting value for key: {}", key);
        return convertToResponse(setting);
    }

    @Transactional
    public SiteSettingResponse upsertSetting(String key, UpsertSiteSettingRequest request) {
        log.debug("Upserting setting with key: {}", key);
        
        // Validate key
        if (key == null || key.trim().isEmpty()) {
            throw new IllegalArgumentException("Setting key cannot be empty");
        }
        
        // Try to find existing setting
        return siteSettingRepository.findBySettingKey(key)
                .map(existing -> {
                    // Update existing setting
                    if (!existing.getIsEditable()) {
                        throw new IllegalStateException("Setting is not editable");
                    }
                    
                    if (request.getSettingValue() != null) {
                        existing.setSettingValue(request.getSettingValue());
                    }
                    if (request.getValueType() != null) {
                        existing.setValueType(request.getValueType());
                    }
                    if (request.getSettingGroup() != null) {
                        existing.setSettingGroup(request.getSettingGroup());
                    }
                    if (request.getLabel() != null) {
                        existing.setLabel(request.getLabel());
                    }
                    if (request.getDescription() != null) {
                        existing.setDescription(request.getDescription());
                    }
                    if (request.getDisplayOrder() != null) {
                        existing.setDisplayOrder(request.getDisplayOrder());
                    }
                    if (request.getIsPublic() != null) {
                        existing.setIsPublic(request.getIsPublic());
                    }
                    
                    SiteSetting saved = siteSettingRepository.save(existing);
                    log.info("Updated existing setting with key: {}", key);
                    return convertToResponse(saved);
                })
                .orElseGet(() -> {
                    // Create new setting with defaults
                    SiteSetting.ValueType valueType = request.getValueType() != null 
                        ? request.getValueType() 
                        : SiteSetting.ValueType.STRING;
                    
                    SiteSetting newSetting = SiteSetting.builder()
                            .settingKey(key)
                            .settingValue(request.getSettingValue() != null ? request.getSettingValue() : "")
                            .valueType(valueType)
                            .settingGroup(request.getSettingGroup() != null ? request.getSettingGroup() : "general")
                            .label(request.getLabel() != null ? request.getLabel() : key)
                            .description(request.getDescription() != null ? request.getDescription() : "")
                            .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                            .isPublic(request.getIsPublic() != null ? request.getIsPublic() : true)
                            .isEditable(request.getIsEditable() != null ? request.getIsEditable() : true)
                            .build();
                    
                    SiteSetting saved = siteSettingRepository.save(newSetting);
                    log.info("Created new setting with key: {}", key);
                    return convertToResponse(saved);
                });
    }

    @Transactional
    public void deleteSetting(Long id) {
        log.debug("Deleting setting with id: {}", id);
        
        SiteSetting setting = siteSettingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Setting not found with id: " + id));

        if (!setting.getIsEditable()) {
            throw new IllegalStateException("Setting is not editable and cannot be deleted");
        }
        
        siteSettingRepository.delete(setting);
        log.info("Deleted setting with id: {}", id);
    }

    private Object parseSettingValue(SiteSetting setting) {
        if (setting.getSettingValue() == null) {
            return null;
        }
        
        return switch (setting.getValueType()) {
            case NUMBER -> setting.getIntValue();
            case BOOLEAN -> setting.getBooleanValue();
            default -> setting.getStringValue();
        };
    }

    private SiteSettingResponse convertToResponse(SiteSetting setting) {
        return SiteSettingResponse.builder()
                .id(setting.getId())
                .settingKey(setting.getSettingKey())
                .settingValue(setting.getSettingValue())
                .valueType(setting.getValueType())
                .settingGroup(setting.getSettingGroup())
                .label(setting.getLabel())
                .description(setting.getDescription())
                .displayOrder(setting.getDisplayOrder())
                .isPublic(setting.getIsPublic())
                .isEditable(setting.getIsEditable())
                .createdAt(setting.getCreatedAt())
                .updatedAt(setting.getUpdatedAt())
                .build();
    }
}

