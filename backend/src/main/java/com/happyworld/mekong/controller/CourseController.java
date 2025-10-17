package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.CourseCreateRequest;
import com.happyworld.mekong.dto.request.CourseRequest;
import com.happyworld.mekong.dto.response.CourseResponse;
import com.happyworld.mekong.service.CourseService;
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
public class CourseController {

    private final CourseService courseService;

    @GetMapping("/courses")
    public ResponseEntity<ApiResponse<Page<CourseResponse>>> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        
        log.info("GET /api/v1/courses - page: {}, size: {}", page, size);
        
        Sort sort = direction.equalsIgnoreCase("desc") 
                ? Sort.by(sortBy).descending() 
                : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<CourseResponse> courses = courseService.getPublishedCourses(pageable);
        
        return ResponseEntity.ok(ApiResponse.success(courses));
    }

    @GetMapping("/courses/featured")
    public ResponseEntity<ApiResponse<Page<CourseResponse>>> getFeaturedCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        log.info("GET /api/v1/courses/featured");
        
        Pageable pageable = PageRequest.of(page, size);
        Page<CourseResponse> courses = courseService.getFeaturedCourses(pageable);
        
        return ResponseEntity.ok(ApiResponse.success(courses));
    }

    @GetMapping("/courses/{slug}")
    public ResponseEntity<ApiResponse<CourseResponse>> getCourseBySlug(@PathVariable String slug) {
        log.info("GET /api/v1/courses/{}", slug);
        
        CourseResponse course = courseService.getCourseBySlug(slug);
        
        return ResponseEntity.ok(ApiResponse.success(course));
    }

    @PostMapping("/courses")
    @PreAuthorize("hasAnyRole('ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<CourseResponse>> createCourse(
            @Valid @RequestBody CourseCreateRequest request) {
        
        log.info("POST /api/v1/courses - title: {}", request.getTitle());
        
        CourseResponse course = courseService.createCourse(request);
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(course, MessageConstants.SUCCESS_CREATE));
    }

    @PostMapping("/courses/{id}/publish")
    @PreAuthorize("hasAnyRole('ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<CourseResponse>> publishCourse(@PathVariable Long id) {
        log.info("POST /api/v1/courses/{}/publish", id);
        
        CourseResponse course = courseService.publishCourse(id);
        
        return ResponseEntity.ok(ApiResponse.success(course, "Khóa học đã được công bố"));
    }

    @DeleteMapping("/courses/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteCourse(@PathVariable Long id) {
        log.info("DELETE /api/v1/courses/{}", id);
        
        courseService.deleteCourse(id);
        
        return ResponseEntity.ok(ApiResponse.success(null, MessageConstants.SUCCESS_DELETE));
    }

    // Admin endpoints
    @GetMapping("/admin/courses")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<Page<CourseResponse>>> getAllCoursesAdmin(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        log.info("GET /api/v1/admin/courses - Admin get all courses");
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<CourseResponse> courses = courseService.getAllCoursesAdmin(pageable);
        
        return ResponseEntity.ok(ApiResponse.success(courses));
    }

    @PostMapping("/admin/courses")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<CourseResponse>> createCourseAdmin(
            @Valid @RequestBody CourseRequest request) {
        
        log.info("POST /api/v1/admin/courses - Create course");
        
        CourseResponse course = courseService.createCourseAdmin(request);
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(course, "Tạo khóa học thành công"));
    }

    @PutMapping("/admin/courses/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<CourseResponse>> updateCourseAdmin(
            @PathVariable Long id,
            @Valid @RequestBody CourseRequest request) {
        
        log.info("PUT /api/v1/admin/courses/{} - Update course", id);
        
        CourseResponse course = courseService.updateCourseAdmin(id, request);
        
        return ResponseEntity.ok(ApiResponse.success(course, "Cập nhật khóa học thành công"));
    }

    @DeleteMapping("/admin/courses/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCourseAdmin(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/courses/{}", id);
        
        courseService.deleteCourse(id);
        
        return ResponseEntity.ok(ApiResponse.success(null, "Xóa khóa học thành công"));
    }
}

