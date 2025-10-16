package com.happyworld.mekong.controller;

import com.happyworld.mekong.dto.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class HealthController {

    @Value("${app.name:Happy World Mekong}")
    private String appName;

    @Value("${app.version:1.0.0}")
    private String appVersion;

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> healthCheck() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("application", appName);
        health.put("version", appVersion);
        health.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(ApiResponse.success(health));
    }

    @GetMapping("/info")
    public ResponseEntity<ApiResponse<Map<String, String>>> info() {
        Map<String, String> info = new HashMap<>();
        info.put("application", appName);
        info.put("version", appVersion);
        info.put("description", "Backend API for Happy World Mekong Education Platform");
        
        return ResponseEntity.ok(ApiResponse.success(info));
    }
}

