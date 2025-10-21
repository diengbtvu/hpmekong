package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.SiteSettingRequest;
import com.happyworld.mekong.dto.request.UpsertSiteSettingRequest;
import com.happyworld.mekong.dto.response.SiteSettingResponse;
import com.happyworld.mekong.service.SiteSettingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class SiteSettingController {

    private final SiteSettingService siteSettingService;

    // ========== PUBLIC APIs ==========

    @GetMapping("/public/settings")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPublicSettings() {
        log.info("GET /api/v1/public/settings");
        Map<String, Object> settings = siteSettingService.getPublicSettingsAsMap();
        return ResponseEntity.ok(ApiResponse.success(settings));
    }

    @GetMapping("/public/settings/group/{group}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getSettingsByGroup(@PathVariable String group) {
        log.info("GET /api/v1/public/settings/group/{}", group);
        Map<String, Object> settings = siteSettingService.getSettingsByGroup(group);
        return ResponseEntity.ok(ApiResponse.success(settings));
    }

    @GetMapping("/public/settings/key/{key}")
    public ResponseEntity<ApiResponse<SiteSettingResponse>> getSettingByKey(@PathVariable String key) {
        log.info("GET /api/v1/public/settings/key/{}", key);
        SiteSettingResponse setting = siteSettingService.getSettingByKey(key);
        return ResponseEntity.ok(ApiResponse.success(setting));
    }

    // ========== ADMIN APIs ==========

    @GetMapping("/admin/settings")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<SiteSettingResponse>>> getAllSettings() {
        log.info("GET /api/v1/admin/settings");
        List<SiteSettingResponse> settings = siteSettingService.getAllSettings();
        return ResponseEntity.ok(ApiResponse.success(settings));
    }

    @GetMapping("/admin/settings/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<SiteSettingResponse>> getSettingById(@PathVariable Long id) {
        log.info("GET /api/v1/admin/settings/{}", id);
        SiteSettingResponse setting = siteSettingService.getSettingById(id);
        return ResponseEntity.ok(ApiResponse.success(setting));
    }

    @PostMapping("/admin/settings")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<SiteSettingResponse>> createSetting(@Valid @RequestBody SiteSettingRequest request) {
        log.info("POST /api/v1/admin/settings");
        SiteSettingResponse setting = siteSettingService.createSetting(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(setting, MessageConstants.SUCCESS_CREATE));
    }

    @PutMapping("/admin/settings/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<SiteSettingResponse>> updateSetting(
            @PathVariable Long id,
            @Valid @RequestBody SiteSettingRequest request) {
        log.info("PUT /api/v1/admin/settings/{}", id);
        SiteSettingResponse setting = siteSettingService.updateSetting(id, request);
        return ResponseEntity.ok(ApiResponse.success(setting, MessageConstants.SUCCESS_UPDATE));
    }

    @PatchMapping("/admin/settings/key/{key}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<SiteSettingResponse>> updateSettingValue(
            @PathVariable String key,
            @RequestBody Map<String, String> payload) {
        log.info("PATCH /api/v1/admin/settings/key/{}", key);
        String value = payload.get("value");
        SiteSettingResponse setting = siteSettingService.updateSettingValue(key, value);
        return ResponseEntity.ok(ApiResponse.success(setting, MessageConstants.SUCCESS_UPDATE));
    }

    @PutMapping("/admin/settings/key/{key}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<SiteSettingResponse>> upsertSetting(
            @PathVariable String key,
            @Valid @RequestBody UpsertSiteSettingRequest request) {
        log.info("PUT /api/v1/admin/settings/key/{} (upsert)", key);
        SiteSettingResponse setting = siteSettingService.upsertSetting(key, request);
        return ResponseEntity.ok(ApiResponse.success(setting, MessageConstants.SUCCESS_UPDATE));
    }

    @DeleteMapping("/admin/settings/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteSetting(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/settings/{}", id);
        siteSettingService.deleteSetting(id);
        return ResponseEntity.ok(ApiResponse.success(null, MessageConstants.SUCCESS_DELETE));
    }
}

