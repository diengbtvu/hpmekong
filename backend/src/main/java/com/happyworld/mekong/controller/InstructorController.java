package com.happyworld.mekong.controller;

import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.InstructorRequest;
import com.happyworld.mekong.dto.response.InstructorResponse;
import com.happyworld.mekong.service.InstructorService;
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

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class InstructorController {

    private final InstructorService instructorService;

    @GetMapping("/instructors")
    public ResponseEntity<ApiResponse<Page<InstructorResponse>>> getAllInstructors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") String direction) {
        
        log.info("GET /api/v1/instructors - page: {}, size: {}", page, size);
        
        Sort.Direction sortDirection = direction.equalsIgnoreCase("DESC") ? 
                Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        
        Page<InstructorResponse> instructors = instructorService.getAllInstructors(pageable);
        return ResponseEntity.ok(ApiResponse.success(instructors));
    }

    @GetMapping("/instructors/{id}")
    public ResponseEntity<ApiResponse<InstructorResponse>> getInstructorById(@PathVariable Long id) {
        log.info("GET /api/v1/instructors/{} - Get instructor by id", id);
        InstructorResponse instructor = instructorService.getInstructorById(id);
        return ResponseEntity.ok(ApiResponse.success(instructor));
    }

    // Admin endpoints
    @GetMapping("/admin/instructors")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Page<InstructorResponse>>> getAllInstructorsAdmin(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        log.info("GET /api/v1/admin/instructors - Admin get all instructors");
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<InstructorResponse> instructors = instructorService.getAllInstructorsAdmin(pageable);
        
        return ResponseEntity.ok(ApiResponse.success(instructors));
    }

    @PostMapping("/admin/instructors")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<InstructorResponse>> createInstructor(
            @Valid @RequestBody InstructorRequest request) {
        
        log.info("POST /api/v1/admin/instructors - Create instructor");
        
        InstructorResponse instructor = instructorService.createInstructor(request);
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(instructor, "Tạo giảng viên thành công"));
    }

    @PutMapping("/admin/instructors/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<InstructorResponse>> updateInstructor(
            @PathVariable Long id,
            @Valid @RequestBody InstructorRequest request) {
        
        log.info("PUT /api/v1/admin/instructors/{} - Update instructor", id);
        
        InstructorResponse instructor = instructorService.updateInstructor(id, request);
        
        return ResponseEntity.ok(ApiResponse.success(instructor, "Cập nhật giảng viên thành công"));
    }

    @DeleteMapping("/admin/instructors/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteInstructor(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/instructors/{}", id);
        
        instructorService.deleteInstructor(id);
        
        return ResponseEntity.ok(ApiResponse.success(null, "Xóa giảng viên thành công"));
    }
}

