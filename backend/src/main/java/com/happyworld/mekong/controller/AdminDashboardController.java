package com.happyworld.mekong.controller;

import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.response.DashboardStatsResponse;
import com.happyworld.mekong.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/dashboard")
@RequiredArgsConstructor
@Slf4j
public class AdminDashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getDashboardStats() {
        log.info("GET /api/v1/admin/dashboard/stats");
        
        DashboardStatsResponse stats = dashboardService.getOverviewStats();
        
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}

