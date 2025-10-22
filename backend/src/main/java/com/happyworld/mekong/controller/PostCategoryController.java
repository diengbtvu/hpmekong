package com.happyworld.mekong.controller;

import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.response.PostCategoryResponse;
import com.happyworld.mekong.entity.PostCategory;
import com.happyworld.mekong.repository.PostCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/post-categories")
@RequiredArgsConstructor
@Slf4j
public class PostCategoryController {

    private final PostCategoryRepository postCategoryRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PostCategoryResponse>>> getAllCategories() {
        log.info("GET /api/v1/post-categories");
        
        List<PostCategory> categories = postCategoryRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
        
        List<PostCategoryResponse> responses = categories.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.success(responses));
    }
    
    private PostCategoryResponse mapToResponse(PostCategory category) {
        return PostCategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .description(category.getDescription())
                .color(category.getColor())
                .icon(category.getIcon())
                .displayOrder(category.getDisplayOrder())
                .isActive(category.getIsActive())
                .build();
    }
}
