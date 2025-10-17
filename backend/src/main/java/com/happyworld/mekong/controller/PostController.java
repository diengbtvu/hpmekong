package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.PostCreateRequest;
import com.happyworld.mekong.dto.request.PostRequest;
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
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @GetMapping("/posts")
    public ResponseEntity<ApiResponse<Page<PostResponse>>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        log.info("GET /api/v1/posts - page: {}, size: {}", page, size);
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("publishedAt").descending());
        Page<PostResponse> posts = postService.getPublishedPosts(pageable);
        
        return ResponseEntity.ok(ApiResponse.success(posts));
    }

    @GetMapping("/posts/{slug}")
    public ResponseEntity<ApiResponse<PostResponse>> getPostBySlug(@PathVariable String slug) {
        log.info("GET /api/v1/posts/{}", slug);
        
        PostResponse post = postService.getPostBySlug(slug);
        
        return ResponseEntity.ok(ApiResponse.success(post));
    }

    @PostMapping("/posts")
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

    @PostMapping("/posts/{id}/publish")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<PostResponse>> publishPost(@PathVariable Long id) {
        log.info("POST /api/v1/posts/{}/publish", id);
        
        PostResponse post = postService.publishPost(id);
        
        return ResponseEntity.ok(ApiResponse.success(post, "Bài viết đã được công bố"));
    }

    @DeleteMapping("/posts/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deletePost(@PathVariable Long id) {
        log.info("DELETE /api/v1/posts/{}", id);
        
        postService.deletePost(id);
        
        return ResponseEntity.ok(ApiResponse.success(null, MessageConstants.SUCCESS_DELETE));
    }

    // Admin endpoints
    @GetMapping("/admin/posts")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Page<PostResponse>>> getAllPostsAdmin(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        log.info("GET /api/v1/admin/posts - Admin get all posts");
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<PostResponse> posts = postService.getAllPostsAdmin(pageable);
        
        return ResponseEntity.ok(ApiResponse.success(posts));
    }

    @PostMapping("/admin/posts")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<PostResponse>> createPostAdmin(
            @Valid @RequestBody PostRequest request) {
        
        log.info("POST /api/v1/admin/posts - Create post");
        
        PostResponse post = postService.createPostAdmin(request);
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(post, "Tạo bài viết thành công"));
    }

    @PutMapping("/admin/posts/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<PostResponse>> updatePostAdmin(
            @PathVariable Long id,
            @Valid @RequestBody PostRequest request) {
        
        log.info("PUT /api/v1/admin/posts/{} - Update post", id);
        
        PostResponse post = postService.updatePostAdmin(id, request);
        
        return ResponseEntity.ok(ApiResponse.success(post, "Cập nhật bài viết thành công"));
    }

    @DeleteMapping("/admin/posts/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deletePostAdmin(@PathVariable Long id) {
        log.info("DELETE /api/v1/admin/posts/{}", id);
        
        postService.deletePost(id);
        
        return ResponseEntity.ok(ApiResponse.success(null, "Xóa bài viết thành công"));
    }
}

