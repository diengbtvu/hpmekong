package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.PostCreateRequest;
import com.happyworld.mekong.dto.response.PostResponse;
import com.happyworld.mekong.service.PostService;
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
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<PostResponse>>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        log.info("GET /api/v1/posts - page: {}, size: {}", page, size);
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("publishedAt").descending());
        Page<PostResponse> posts = postService.getPublishedPosts(pageable);
        
        return ResponseEntity.ok(ApiResponse.success(posts));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<PostResponse>> getPostBySlug(@PathVariable String slug) {
        log.info("GET /api/v1/posts/{}", slug);
        
        PostResponse post = postService.getPostBySlug(slug);
        
        return ResponseEntity.ok(ApiResponse.success(post));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<PostResponse>> createPost(
            @Valid @RequestBody PostCreateRequest request,
            Authentication authentication) {
        
        Long authorId = 1L; // TODO: Get from authentication
        log.info("POST /api/v1/posts - title: {}", request.getTitle());
        
        PostResponse post = postService.createPost(authorId, request);
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(post, MessageConstants.SUCCESS_CREATE));
    }

    @PostMapping("/{id}/publish")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<PostResponse>> publishPost(@PathVariable Long id) {
        log.info("POST /api/v1/posts/{}/publish", id);
        
        PostResponse post = postService.publishPost(id);
        
        return ResponseEntity.ok(ApiResponse.success(post, "Bài viết đã được công bố"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deletePost(@PathVariable Long id) {
        log.info("DELETE /api/v1/posts/{}", id);
        
        postService.deletePost(id);
        
        return ResponseEntity.ok(ApiResponse.success(null, MessageConstants.SUCCESS_DELETE));
    }
}

