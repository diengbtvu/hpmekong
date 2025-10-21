package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.LeaderRequest;
import com.happyworld.mekong.dto.response.LeaderResponse;
import com.happyworld.mekong.service.LeaderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class LeaderController {

    private final LeaderService leaderService;

    // Public endpoints
    @GetMapping("/leaders")
    public ResponseEntity<ApiResponse<List<LeaderResponse>>> getActiveLeaders() {
        log.info("GET /api/v1/leaders - Get active leaders");
        List<LeaderResponse> leaders = leaderService.getActiveLeaders();
        return ResponseEntity.ok(ApiResponse.success(leaders));
    }

    @GetMapping("/leaders/featured")
    public ResponseEntity<ApiResponse<List<LeaderResponse>>> getFeaturedLeaders() {
        log.info("GET /api/v1/leaders/featured - Get featured leaders");
        List<LeaderResponse> leaders = leaderService.getFeaturedLeaders();
        return ResponseEntity.ok(ApiResponse.success(leaders));
    }

    @GetMapping("/leaders/{id}")
    public ResponseEntity<ApiResponse<LeaderResponse>> getLeaderById(@PathVariable Long id) {
        log.info("GET /api/v1/leaders/{} - Get leader by id", id);
        LeaderResponse leader = leaderService.getLeaderById(id);
        return ResponseEntity.ok(ApiResponse.success(leader));
    }

    // Admin endpoints
    @GetMapping("/admin/leaders")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Page<LeaderResponse>>> getAllLeadersAdmin(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "displayOrder") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        log.info("GET /api/v1/admin/leaders - Get all leaders (admin)");
        
        Sort sort = sortDir.equalsIgnoreCase("asc") 
                ? Sort.by(sortBy).ascending() 
                : Sort.by(sortBy).descending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<LeaderResponse> leaders = leaderService.getAllLeadersAdmin(pageable);
        
        return ResponseEntity.ok(ApiResponse.success(leaders));
    }

    @PostMapping("/admin/leaders")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<LeaderResponse>> createLeader(@Valid @RequestBody LeaderRequest request) {
        log.info("POST /api/v1/admin/leaders - Create leader: {}", request.getFullName());
        LeaderResponse leader = leaderService.createLeader(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(leader, MessageConstants.SUCCESS_CREATE));
    }

    @PutMapping("/admin/leaders/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<LeaderResponse>> updateLeader(
            @PathVariable Long id,
            @Valid @RequestBody LeaderRequest request
    ) {
        log.info("PUT /api/v1/admin/leaders/{} - Update leader", id);
        LeaderResponse leader = leaderService.updateLeader(id, request);
        return ResponseEntity.ok(ApiResponse.success(leader, MessageConstants.SUCCESS_UPDATE));
    }

    @DeleteMapping("/admin/leaders/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteLeader(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/leaders/{} - Delete leader", id);
        leaderService.deleteLeader(id);
        return ResponseEntity.ok(ApiResponse.success(null, MessageConstants.SUCCESS_DELETE));
    }
}
