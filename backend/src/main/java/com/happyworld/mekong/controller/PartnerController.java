package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.PartnerRequest;
import com.happyworld.mekong.dto.response.PartnerResponse;
import com.happyworld.mekong.entity.Partner;
import com.happyworld.mekong.service.PartnerService;
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
public class PartnerController {

    private final PartnerService partnerService;

    // ========== PUBLIC APIs ==========

    @GetMapping("/public/partners")
    public ResponseEntity<ApiResponse<List<PartnerResponse>>> getAllPartners() {
        log.info("GET /api/v1/public/partners");
        List<PartnerResponse> partners = partnerService.getAllPartners();
        return ResponseEntity.ok(ApiResponse.success(partners));
    }

    @GetMapping("/public/partners/type/{type}")
    public ResponseEntity<ApiResponse<List<PartnerResponse>>> getPartnersByType(@PathVariable Partner.PartnerType type) {
        log.info("GET /api/v1/public/partners/type/{}", type);
        List<PartnerResponse> partners = partnerService.getPartnersByType(type);
        return ResponseEntity.ok(ApiResponse.success(partners));
    }

    @GetMapping("/public/partners/featured")
    public ResponseEntity<ApiResponse<List<PartnerResponse>>> getFeaturedPartners() {
        log.info("GET /api/v1/public/partners/featured");
        List<PartnerResponse> partners = partnerService.getFeaturedPartners();
        return ResponseEntity.ok(ApiResponse.success(partners));
    }

    // ========== ADMIN APIs ==========

    @GetMapping("/admin/partners")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<PartnerResponse>>> getAllPartnersAdmin() {
        log.info("GET /api/v1/admin/partners");
        List<PartnerResponse> partners = partnerService.getAllPartners();
        return ResponseEntity.ok(ApiResponse.success(partners));
    }

    @GetMapping("/admin/partners/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<PartnerResponse>> getPartnerById(@PathVariable Long id) {
        log.info("GET /api/v1/admin/partners/{}", id);
        PartnerResponse partner = partnerService.getPartnerById(id);
        return ResponseEntity.ok(ApiResponse.success(partner));
    }

    @PostMapping("/admin/partners")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<PartnerResponse>> createPartner(@Valid @RequestBody PartnerRequest request) {
        log.info("POST /api/v1/admin/partners");
        PartnerResponse partner = partnerService.createPartner(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(partner, MessageConstants.SUCCESS_CREATE));
    }

    @PutMapping("/admin/partners/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<PartnerResponse>> updatePartner(
            @PathVariable Long id,
            @Valid @RequestBody PartnerRequest request) {
        log.info("PUT /api/v1/admin/partners/{}", id);
        PartnerResponse partner = partnerService.updatePartner(id, request);
        return ResponseEntity.ok(ApiResponse.success(partner, MessageConstants.SUCCESS_UPDATE));
    }

    @DeleteMapping("/admin/partners/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deletePartner(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/partners/{}", id);
        partnerService.deletePartner(id);
        return ResponseEntity.ok(ApiResponse.success(null, MessageConstants.SUCCESS_DELETE));
    }
}

