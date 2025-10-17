package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.AchievementRequest;
import com.happyworld.mekong.dto.response.AchievementResponse;
import com.happyworld.mekong.entity.Achievement;
import com.happyworld.mekong.service.AchievementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class AchievementController {

    private final AchievementService achievementService;

    // ========== PUBLIC APIs ==========

    @GetMapping("/public/achievements")
    public ResponseEntity<ApiResponse<List<AchievementResponse>>> getAllAchievements() {
        log.info("GET /api/v1/public/achievements");
        List<AchievementResponse> achievements = achievementService.getAllAchievements();
        return ResponseEntity.ok(ApiResponse.success(achievements));
    }

    @GetMapping("/public/achievements/type/{type}")
    public ResponseEntity<ApiResponse<List<AchievementResponse>>> getAchievementsByType(@PathVariable Achievement.AchievementType type) {
        log.info("GET /api/v1/public/achievements/type/{}", type);
        List<AchievementResponse> achievements = achievementService.getAchievementsByType(type);
        return ResponseEntity.ok(ApiResponse.success(achievements));
    }

    @GetMapping("/public/achievements/featured")
    public ResponseEntity<ApiResponse<List<AchievementResponse>>> getFeaturedAchievements() {
        log.info("GET /api/v1/public/achievements/featured");
        List<AchievementResponse> achievements = achievementService.getFeaturedAchievements();
        return ResponseEntity.ok(ApiResponse.success(achievements));
    }

    // ========== ADMIN APIs ==========

    @GetMapping("/admin/achievements")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<AchievementResponse>>> getAllAchievementsAdmin() {
        log.info("GET /api/v1/admin/achievements");
        List<AchievementResponse> achievements = achievementService.getAllAchievements();
        return ResponseEntity.ok(ApiResponse.success(achievements));
    }

    @GetMapping("/admin/achievements/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<AchievementResponse>> getAchievementById(@PathVariable Long id) {
        log.info("GET /api/v1/admin/achievements/{}", id);
        AchievementResponse achievement = achievementService.getAchievementById(id);
        return ResponseEntity.ok(ApiResponse.success(achievement));
    }

    @PostMapping("/admin/achievements")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<AchievementResponse>> createAchievement(@Valid @RequestBody AchievementRequest request) {
        log.info("POST /api/v1/admin/achievements");
        AchievementResponse achievement = achievementService.createAchievement(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(achievement, MessageConstants.SUCCESS_CREATE));
    }

    @PutMapping("/admin/achievements/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<AchievementResponse>> updateAchievement(
            @PathVariable Long id,
            @Valid @RequestBody AchievementRequest request) {
        log.info("PUT /api/v1/admin/achievements/{}", id);
        AchievementResponse achievement = achievementService.updateAchievement(id, request);
        return ResponseEntity.ok(ApiResponse.success(achievement, MessageConstants.SUCCESS_UPDATE));
    }

    @DeleteMapping("/admin/achievements/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteAchievement(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/achievements/{}", id);
        achievementService.deleteAchievement(id);
        return ResponseEntity.ok(ApiResponse.success(null, MessageConstants.SUCCESS_DELETE));
    }
}

