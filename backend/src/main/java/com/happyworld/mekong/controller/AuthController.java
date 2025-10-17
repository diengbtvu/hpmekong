package com.happyworld.mekong.controller;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.LoginRequest;
import com.happyworld.mekong.dto.request.RegisterRequest;
import com.happyworld.mekong.dto.response.AuthResponse;
import com.happyworld.mekong.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        log.info("POST /api/v1/auth/register - Email: {}", request.getEmail());
        
        AuthResponse response = authService.register(request);
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, MessageConstants.SUCCESS_REGISTER));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        log.info("POST /api/v1/auth/login - Email: {}", request.getEmail());
        
        AuthResponse response = authService.login(request);
        
        return ResponseEntity.ok(ApiResponse.success(response, MessageConstants.SUCCESS_LOGIN));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@RequestBody java.util.Map<String, String> request) {
        log.info("POST /api/v1/auth/refresh");
        
        String refreshToken = request.get("refreshToken");
        AuthResponse response = authService.refreshToken(refreshToken);
        
        return ResponseEntity.ok(ApiResponse.success(response, "Token refreshed successfully"));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        log.info("POST /api/v1/auth/logout");
        
        // TODO: Implement logout logic (invalidate refresh token)
        
        return ResponseEntity.ok(ApiResponse.success(null, MessageConstants.SUCCESS_LOGOUT));
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> healthCheck() {
        return ResponseEntity.ok(ApiResponse.success("Auth service is running"));
    }
}

