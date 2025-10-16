package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.EnrollmentRequest;
import com.happyworld.mekong.dto.response.EnrollmentResponse;
import com.happyworld.mekong.service.EnrollmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/enrollments")
@RequiredArgsConstructor
@Slf4j
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<EnrollmentResponse>> enrollCourse(
            @Valid @RequestBody EnrollmentRequest request,
            Authentication authentication) {
        
        Long userId = getUserIdFromAuth(authentication);
        log.info("POST /api/v1/enrollments - User {} enrolling in course {}", userId, request.getCourseId());
        
        EnrollmentResponse enrollment = enrollmentService.enrollCourse(userId, request);
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(enrollment, MessageConstants.SUCCESS_ENROLLMENT));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<EnrollmentResponse>>> getMyEnrollments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication authentication) {
        
        Long userId = getUserIdFromAuth(authentication);
        log.info("GET /api/v1/enrollments - User {}", userId);
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("enrolledAt").descending());
        Page<EnrollmentResponse> enrollments = enrollmentService.getMyEnrollments(userId, pageable);
        
        return ResponseEntity.ok(ApiResponse.success(enrollments));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> getEnrollmentById(
            @PathVariable Long id,
            Authentication authentication) {
        
        Long userId = getUserIdFromAuth(authentication);
        log.info("GET /api/v1/enrollments/{} - User {}", id, userId);
        
        EnrollmentResponse enrollment = enrollmentService.getEnrollmentById(id, userId);
        
        return ResponseEntity.ok(ApiResponse.success(enrollment));
    }

    @PutMapping("/{id}/progress")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> updateProgress(
            @PathVariable Long id,
            @RequestParam int completedLessons,
            Authentication authentication) {
        
        Long userId = getUserIdFromAuth(authentication);
        log.info("PUT /api/v1/enrollments/{}/progress - User {}, lessons: {}", id, userId, completedLessons);
        
        EnrollmentResponse enrollment = enrollmentService.updateProgress(id, userId, completedLessons);
        
        return ResponseEntity.ok(ApiResponse.success(enrollment, "Cập nhật tiến độ thành công"));
    }

    private Long getUserIdFromAuth(Authentication authentication) {
        // TODO: Implement proper user ID extraction from JWT
        // For now, return a mock ID
        return 1L;
    }
}

