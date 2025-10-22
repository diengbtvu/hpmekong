package com.happyworld.mekong.controller;

import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.LessonRequest;
import com.happyworld.mekong.dto.request.ModuleRequest;
import com.happyworld.mekong.dto.response.LessonResponse;
import com.happyworld.mekong.dto.response.ModuleResponse;
import com.happyworld.mekong.service.CurriculumService;
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
public class CurriculumController {

    private final CurriculumService curriculumService;

    // Public endpoints
    @GetMapping("/courses/{courseId}/curriculum")
    public ResponseEntity<ApiResponse<List<ModuleResponse>>> getCourseCurriculum(@PathVariable Long courseId) {
        log.info("GET /api/v1/courses/{}/curriculum", courseId);
        List<ModuleResponse> modules = curriculumService.getCourseModules(courseId);
        return ResponseEntity.ok(ApiResponse.success(modules));
    }

    // Admin endpoints
    @PostMapping("/admin/courses/{courseId}/modules")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<ModuleResponse>> createModule(
            @PathVariable Long courseId,
            @Valid @RequestBody ModuleRequest request) {
        log.info("POST /api/v1/admin/courses/{}/modules", courseId);
        ModuleResponse module = curriculumService.createModule(courseId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(module, "Tạo module thành công"));
    }

    @PutMapping("/admin/modules/{moduleId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<ModuleResponse>> updateModule(
            @PathVariable Long moduleId,
            @Valid @RequestBody ModuleRequest request) {
        log.info("PUT /api/v1/admin/modules/{}", moduleId);
        ModuleResponse module = curriculumService.updateModule(moduleId, request);
        return ResponseEntity.ok(ApiResponse.success(module, "Cập nhật module thành công"));
    }

    @DeleteMapping("/admin/modules/{moduleId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<Void>> deleteModule(@PathVariable Long moduleId) {
        log.info("DELETE /api/v1/admin/modules/{}", moduleId);
        curriculumService.deleteModule(moduleId);
        return ResponseEntity.ok(ApiResponse.success(null, "Xóa module thành công"));
    }

    @PostMapping("/admin/modules/{moduleId}/lessons")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<LessonResponse>> createLesson(
            @PathVariable Long moduleId,
            @Valid @RequestBody LessonRequest request) {
        log.info("POST /api/v1/admin/modules/{}/lessons", moduleId);
        LessonResponse lesson = curriculumService.createLesson(moduleId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(lesson, "Tạo bài học thành công"));
    }

    @PutMapping("/admin/lessons/{lessonId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<LessonResponse>> updateLesson(
            @PathVariable Long lessonId,
            @Valid @RequestBody LessonRequest request) {
        log.info("PUT /api/v1/admin/lessons/{}", lessonId);
        LessonResponse lesson = curriculumService.updateLesson(lessonId, request);
        return ResponseEntity.ok(ApiResponse.success(lesson, "Cập nhật bài học thành công"));
    }

    @DeleteMapping("/admin/lessons/{lessonId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<Void>> deleteLesson(@PathVariable Long lessonId) {
        log.info("DELETE /api/v1/admin/lessons/{}", lessonId);
        curriculumService.deleteLesson(lessonId);
        return ResponseEntity.ok(ApiResponse.success(null, "Xóa bài học thành công"));
    }
}
