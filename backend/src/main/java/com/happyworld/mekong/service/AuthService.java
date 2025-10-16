package com.happyworld.mekong.service;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.request.LoginRequest;
import com.happyworld.mekong.dto.request.RegisterRequest;
import com.happyworld.mekong.dto.response.AuthResponse;
import com.happyworld.mekong.dto.response.UserResponse;
import com.happyworld.mekong.entity.Profile;
import com.happyworld.mekong.entity.Role;
import com.happyworld.mekong.entity.User;
import com.happyworld.mekong.exception.BadRequestException;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.exception.UnauthorizedException;
import com.happyworld.mekong.repository.RoleRepository;
import com.happyworld.mekong.repository.UserRepository;
import com.happyworld.mekong.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        log.info("Registering new user: {}", request.getEmail());

        // Validate email uniqueness
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException(MessageConstants.ERROR_EMAIL_EXISTS);
        }

        // Validate phone uniqueness if provided
        if (request.getPhone() != null && userRepository.existsByPhone(request.getPhone())) {
            throw new BadRequestException(MessageConstants.ERROR_PHONE_EXISTS);
        }

        // Create user
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .isActive(true)
                .isVerified(false)
                .isLocked(false)
                .emailVerificationToken(UUID.randomUUID().toString())
                .build();

        // Assign default role
        Role role = roleRepository.findByName(request.getRole())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + request.getRole()));
        user.addRole(role);

        // Create profile
        Profile profile = Profile.builder()
                .user(user)
                .fullName(request.getFullName())
                .build();
        user.setProfile(profile);

        // Save user
        User savedUser = userRepository.save(user);
        log.info("User registered successfully: {}", savedUser.getEmail());

        // TODO: Send verification email

        // Generate tokens
        String token = jwtTokenProvider.generateToken(savedUser);
        String refreshToken = jwtTokenProvider.generateRefreshToken(savedUser);

        return buildAuthResponse(savedUser, token, refreshToken);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        log.info("User login attempt: {}", request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException(MessageConstants.ERROR_INVALID_CREDENTIALS));

        // Check if account is locked
        if (user.getIsLocked()) {
            throw new UnauthorizedException(MessageConstants.ERROR_ACCOUNT_LOCKED);
        }

        // Check if account is active
        if (!user.getIsActive()) {
            throw new UnauthorizedException(MessageConstants.ERROR_ACCOUNT_DISABLED);
        }

        // Authenticate
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // Reset failed login attempts
            user.setFailedLoginAttempts(0);
            user.setLastLoginAt(LocalDateTime.now());
            userRepository.save(user);

            // Generate tokens
            String token = jwtTokenProvider.generateToken(user);
            String refreshToken = jwtTokenProvider.generateRefreshToken(user);

            log.info("User logged in successfully: {}", user.getEmail());
            return buildAuthResponse(user, token, refreshToken);

        } catch (Exception ex) {
            // Increment failed login attempts
            user.setFailedLoginAttempts(user.getFailedLoginAttempts() + 1);
            
            // Lock account after 5 failed attempts
            if (user.getFailedLoginAttempts() >= 5) {
                user.setIsLocked(true);
                log.warn("Account locked due to multiple failed login attempts: {}", user.getEmail());
            }
            
            userRepository.save(user);
            throw new UnauthorizedException(MessageConstants.ERROR_INVALID_CREDENTIALS);
        }
    }

    private AuthResponse buildAuthResponse(User user, String token, String refreshToken) {
        return AuthResponse.builder()
                .user(buildUserResponse(user))
                .token(token)
                .refreshToken(refreshToken)
                .expiresIn(jwtTokenProvider.getExpirationTime())
                .tokenType("Bearer")
                .build();
    }

    private UserResponse buildUserResponse(User user) {
        Set<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

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
                .roles(roleNames)
                .createdAt(user.getCreatedAt())
                .build();
    }
}

