package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.BannerRequest;
import com.happyworld.mekong.dto.response.BannerResponse;
import com.happyworld.mekong.entity.Banner;
import com.happyworld.mekong.service.BannerService;
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
public class BannerController {

    private final BannerService bannerService;

    // ========== PUBLIC APIs ==========
    
    @GetMapping("/public/banners")
    public ResponseEntity<ApiResponse<List<BannerResponse>>> getActiveBanners() {
        log.info("GET /api/v1/public/banners");
        List<BannerResponse> banners = bannerService.getActiveBanners();
        return ResponseEntity.ok(ApiResponse.success(banners));
    }

    @GetMapping("/public/banners/type/{type}")
    public ResponseEntity<ApiResponse<List<BannerResponse>>> getBannersByType(@PathVariable Banner.BannerType type) {
        log.info("GET /api/v1/public/banners/type/{}", type);
        List<BannerResponse> banners = bannerService.getBannersByType(type);
        return ResponseEntity.ok(ApiResponse.success(banners));
    }

    @PostMapping("/public/banners/{id}/view")
    public ResponseEntity<ApiResponse<String>> incrementViewCount(@PathVariable Long id) {
        log.info("POST /api/v1/public/banners/{}/view", id);
        bannerService.incrementViewCount(id);
        return ResponseEntity.ok(ApiResponse.success(null, "View count incremented"));
    }

    @PostMapping("/public/banners/{id}/click")
    public ResponseEntity<ApiResponse<String>> incrementClickCount(@PathVariable Long id) {
        log.info("POST /api/v1/public/banners/{}/click", id);
        bannerService.incrementClickCount(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Click count incremented"));
    }

    // ========== ADMIN APIs ==========

    @GetMapping("/admin/banners")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<BannerResponse>>> getAllBanners() {
        log.info("GET /api/v1/admin/banners");
        List<BannerResponse> banners = bannerService.getAllBanners();
        return ResponseEntity.ok(ApiResponse.success(banners));
    }

    @GetMapping("/admin/banners/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<BannerResponse>> getBannerById(@PathVariable Long id) {
        log.info("GET /api/v1/admin/banners/{}", id);
        BannerResponse banner = bannerService.getBannerById(id);
        return ResponseEntity.ok(ApiResponse.success(banner));
    }

    @PostMapping("/admin/banners")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<BannerResponse>> createBanner(@Valid @RequestBody BannerRequest request) {
        log.info("POST /api/v1/admin/banners");
        BannerResponse banner = bannerService.createBanner(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(banner, MessageConstants.SUCCESS_CREATE));
    }

    @PutMapping("/admin/banners/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<BannerResponse>> updateBanner(
            @PathVariable Long id,
            @Valid @RequestBody BannerRequest request) {
        log.info("PUT /api/v1/admin/banners/{}", id);
        BannerResponse banner = bannerService.updateBanner(id, request);
        return ResponseEntity.ok(ApiResponse.success(banner, MessageConstants.SUCCESS_UPDATE));
    }

    @DeleteMapping("/admin/banners/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteBanner(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/banners/{}", id);
        bannerService.deleteBanner(id);
        return ResponseEntity.ok(ApiResponse.success(null, MessageConstants.SUCCESS_DELETE));
    }
}

