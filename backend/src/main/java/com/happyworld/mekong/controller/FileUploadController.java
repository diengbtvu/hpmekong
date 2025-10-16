package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.AppConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.service.StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
@Slf4j
public class FileUploadController {

    private final StorageService storageService;

    @PostMapping("/upload/image")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", defaultValue = "images") String folder,
            @RequestParam(value = "maxWidth", defaultValue = "1920") int maxWidth) {
        
        log.info("POST /api/v1/files/upload/image - folder: {}", folder);
        
        String imageUrl = storageService.uploadImage(file, folder, maxWidth);
        
        Map<String, String> response = new HashMap<>();
        response.put("url", imageUrl);
        response.put("filename", file.getOriginalFilename());
        
        return ResponseEntity.ok(ApiResponse.success(response, "Upload hình ảnh thành công"));
    }

    @PostMapping("/upload/avatar")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadAvatar(
            @RequestParam("file") MultipartFile file) {
        
        log.info("POST /api/v1/files/upload/avatar");
        
        String avatarUrl = storageService.uploadImage(file, AppConstants.S3_FOLDER_AVATARS, 500);
        
        Map<String, String> response = new HashMap<>();
        response.put("url", avatarUrl);
        
        return ResponseEntity.ok(ApiResponse.success(response, "Upload avatar thành công"));
    }

    @PostMapping("/upload/course-thumbnail")
    @PreAuthorize("hasAnyRole('ADMIN', 'CENTER_MANAGER', 'INSTRUCTOR')")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadCourseThumbnail(
            @RequestParam("file") MultipartFile file) {
        
        log.info("POST /api/v1/files/upload/course-thumbnail");
        
        String thumbnailUrl = storageService.uploadImage(
                file, 
                AppConstants.S3_FOLDER_COURSE_THUMBNAILS, 
                1280
        );
        
        Map<String, String> response = new HashMap<>();
        response.put("url", thumbnailUrl);
        
        return ResponseEntity.ok(ApiResponse.success(response, "Upload thumbnail thành công"));
    }

    @PostMapping("/upload/file")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", defaultValue = "files") String folder) {
        
        log.info("POST /api/v1/files/upload/file - folder: {}", folder);
        
        String fileUrl = storageService.uploadFile(file, folder);
        
        Map<String, String> response = new HashMap<>();
        response.put("url", fileUrl);
        response.put("filename", file.getOriginalFilename());
        
        return ResponseEntity.ok(ApiResponse.success(response, "Upload file thành công"));
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CENTER_MANAGER')")
    public ResponseEntity<ApiResponse<String>> deleteFile(@RequestParam String fileUrl) {
        log.info("DELETE /api/v1/files - url: {}", fileUrl);
        
        storageService.deleteFile(fileUrl);
        
        return ResponseEntity.ok(ApiResponse.success(null, "Xóa file thành công"));
    }
}

