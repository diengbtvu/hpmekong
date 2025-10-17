package com.happyworld.mekong.controller;

import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.CenterRequest;
import com.happyworld.mekong.dto.response.CenterBasicResponse;
import com.happyworld.mekong.service.CenterService;
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
public class CenterController {

    private final CenterService centerService;

    @GetMapping("/centers")
    public ResponseEntity<ApiResponse<List<CenterBasicResponse>>> getAllCenters() {
        log.info("GET /api/v1/centers - Get all centers");
        List<CenterBasicResponse> centers = centerService.getAllCenters();
        return ResponseEntity.ok(ApiResponse.success(centers));
    }

    @GetMapping("/centers/{slug}")
    public ResponseEntity<ApiResponse<CenterBasicResponse>> getCenterBySlug(@PathVariable String slug) {
        log.info("GET /api/v1/centers/{} - Get center by slug", slug);
        CenterBasicResponse center = centerService.getCenterBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(center));
    }

    // Admin endpoints
    @GetMapping("/admin/centers")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<CenterBasicResponse>>> getAllCentersAdmin() {
        log.info("GET /api/v1/admin/centers - Admin get all centers");
        List<CenterBasicResponse> centers = centerService.getAllCentersAdmin();
        return ResponseEntity.ok(ApiResponse.success(centers));
    }

    @PostMapping("/admin/centers")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<CenterBasicResponse>> createCenter(
            @Valid @RequestBody CenterRequest request) {
        log.info("POST /api/v1/admin/centers - Create new center");
        CenterBasicResponse center = centerService.createCenter(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(center, "Tạo trung tâm thành công"));
    }

    @PutMapping("/admin/centers/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<CenterBasicResponse>> updateCenter(
            @PathVariable Long id,
            @Valid @RequestBody CenterRequest request) {
        log.info("PUT /api/v1/admin/centers/{} - Update center", id);
        CenterBasicResponse center = centerService.updateCenter(id, request);
        return ResponseEntity.ok(ApiResponse.success(center, "Cập nhật trung tâm thành công"));
    }

    @DeleteMapping("/admin/centers/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCenter(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/centers/{} - Delete center", id);
        centerService.deleteCenter(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Xóa trung tâm thành công"));
    }
}

