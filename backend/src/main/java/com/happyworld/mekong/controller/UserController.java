package com.happyworld.mekong.controller;

import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.response.UserResponse;
import com.happyworld.mekong.security.JwtTokenProvider;
import com.happyworld.mekong.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/users/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(
            @RequestHeader("Authorization") String authHeader) {
        
        log.info("GET /api/v1/users/me - Get current user");
        
        String token = authHeader.replace("Bearer ", "");
        String email = jwtTokenProvider.getUserEmailFromToken(token);
        
        UserResponse user = userService.getUserByEmail(email);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(@PathVariable Long id) {
        log.info("GET /api/v1/users/{} - Get user by id", id);
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @GetMapping("/admin/users")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Page<UserResponse>>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("GET /api/v1/admin/users - Admin get all users");
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<UserResponse> users = userService.getAllUsers(pageable);
        
        return ResponseEntity.ok(ApiResponse.success(users));
    }
}

