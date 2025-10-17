package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.response.UserResponse;
import com.happyworld.mekong.entity.User;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        log.debug("Getting user by id: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return convertToResponse(user);
    }

    @Transactional(readOnly = true)
    public UserResponse getUserByEmail(String email) {
        log.debug("Getting user by email: {}", email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return convertToResponse(user);
    }

    @Transactional(readOnly = true)
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        log.debug("Getting all users with pagination");
        return userRepository.findAll(pageable).map(this::convertToResponse);
    }

    private UserResponse convertToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .phone(user.getPhone())
                .isActive(user.getIsActive())
                .isVerified(user.getIsVerified())
                .lastLoginAt(user.getLastLoginAt())
                .fullName(user.getProfile() != null ? user.getProfile().getFullName() : null)
                .avatarUrl(user.getProfile() != null ? user.getProfile().getAvatarUrl() : null)
                .roles(user.getRoles().stream()
                        .map(role -> role.getName())
                        .collect(Collectors.toSet()))
                .createdAt(user.getCreatedAt())
                .build();
    }
}

