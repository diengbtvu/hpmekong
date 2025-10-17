package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.FeaturedVideoRequest;
import com.happyworld.mekong.dto.response.FeaturedVideoResponse;
import com.happyworld.mekong.entity.FeaturedVideo;
import com.happyworld.mekong.service.FeaturedVideoService;
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
public class FeaturedVideoController {

    private final FeaturedVideoService featuredVideoService;

    // ========== PUBLIC APIs ==========

    @GetMapping("/public/videos")
    public ResponseEntity<ApiResponse<List<FeaturedVideoResponse>>> getAllVideos() {
        log.info("GET /api/v1/public/videos");
        List<FeaturedVideoResponse> videos = featuredVideoService.getAllVideos();
        return ResponseEntity.ok(ApiResponse.success(videos));
    }

    @GetMapping("/public/videos/type/{type}")
    public ResponseEntity<ApiResponse<List<FeaturedVideoResponse>>> getVideosByType(@PathVariable FeaturedVideo.VideoType type) {
        log.info("GET /api/v1/public/videos/type/{}", type);
        List<FeaturedVideoResponse> videos = featuredVideoService.getVideosByType(type);
        return ResponseEntity.ok(ApiResponse.success(videos));
    }

    @GetMapping("/public/videos/featured")
    public ResponseEntity<ApiResponse<List<FeaturedVideoResponse>>> getFeaturedVideos() {
        log.info("GET /api/v1/public/videos/featured");
        List<FeaturedVideoResponse> videos = featuredVideoService.getFeaturedVideos();
        return ResponseEntity.ok(ApiResponse.success(videos));
    }

    @PostMapping("/public/videos/{id}/view")
    public ResponseEntity<ApiResponse<String>> incrementViewCount(@PathVariable Long id) {
        log.info("POST /api/v1/public/videos/{}/view", id);
        featuredVideoService.incrementViewCount(id);
        return ResponseEntity.ok(ApiResponse.success(null, "View count incremented"));
    }

    // ========== ADMIN APIs ==========

    @GetMapping("/admin/videos")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<FeaturedVideoResponse>>> getAllVideosAdmin() {
        log.info("GET /api/v1/admin/videos");
        List<FeaturedVideoResponse> videos = featuredVideoService.getAllVideos();
        return ResponseEntity.ok(ApiResponse.success(videos));
    }

    @GetMapping("/admin/videos/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<FeaturedVideoResponse>> getVideoById(@PathVariable Long id) {
        log.info("GET /api/v1/admin/videos/{}", id);
        FeaturedVideoResponse video = featuredVideoService.getVideoById(id);
        return ResponseEntity.ok(ApiResponse.success(video));
    }

    @PostMapping("/admin/videos")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<FeaturedVideoResponse>> createVideo(@Valid @RequestBody FeaturedVideoRequest request) {
        log.info("POST /api/v1/admin/videos");
        FeaturedVideoResponse video = featuredVideoService.createVideo(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(video, MessageConstants.SUCCESS_CREATE));
    }

    @PutMapping("/admin/videos/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<FeaturedVideoResponse>> updateVideo(
            @PathVariable Long id,
            @Valid @RequestBody FeaturedVideoRequest request) {
        log.info("PUT /api/v1/admin/videos/{}", id);
        FeaturedVideoResponse video = featuredVideoService.updateVideo(id, request);
        return ResponseEntity.ok(ApiResponse.success(video, MessageConstants.SUCCESS_UPDATE));
    }

    @DeleteMapping("/admin/videos/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteVideo(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/videos/{}", id);
        featuredVideoService.deleteVideo(id);
        return ResponseEntity.ok(ApiResponse.success(null, MessageConstants.SUCCESS_DELETE));
    }
}

