package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.CourseCreateRequest;
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
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
@Slf4j
public class CourseController {

    private final CourseService courseService;

    @GetMapping
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

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<Page<CourseResponse>>> getFeaturedCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        log.info("GET /api/v1/courses/featured");
        
        Pageable pageable = PageRequest.of(page, size);
        Page<CourseResponse> courses = courseService.getFeaturedCourses(pageable);
        
        return ResponseEntity.ok(ApiResponse.success(courses));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<CourseResponse>> getCourseBySlug(@PathVariable String slug) {
        log.info("GET /api/v1/courses/{}", slug);
        
        CourseResponse course = courseService.getCourseBySlug(slug);
        
        return ResponseEntity.ok(ApiResponse.success(course));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<CourseResponse>> createCourse(
            @Valid @RequestBody CourseCreateRequest request) {
        
        log.info("POST /api/v1/courses - title: {}", request.getTitle());
        
        CourseResponse course = courseService.createCourse(request);
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(course, MessageConstants.SUCCESS_CREATE));
    }

    @PostMapping("/{id}/publish")
    @PreAuthorize("hasAnyRole('ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<CourseResponse>> publishCourse(@PathVariable Long id) {
        log.info("POST /api/v1/courses/{}/publish", id);
        
        CourseResponse course = courseService.publishCourse(id);
        
        return ResponseEntity.ok(ApiResponse.success(course, "Khóa học đã được công bố"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteCourse(@PathVariable Long id) {
        log.info("DELETE /api/v1/courses/{}", id);
        
        courseService.deleteCourse(id);
        
        return ResponseEntity.ok(ApiResponse.success(null, MessageConstants.SUCCESS_DELETE));
    }
}

