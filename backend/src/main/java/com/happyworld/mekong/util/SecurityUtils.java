package com.happyworld.mekong.util;

import com.happyworld.mekong.exception.UnauthorizedException;
import com.happyworld.mekong.security.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SecurityUtils {

    private final JwtTokenProvider jwtTokenProvider;

    public SecurityUtils(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * Extract user ID from Authentication object
     * @param authentication Spring Security Authentication
     * @return User ID
     * @throws UnauthorizedException if authentication is invalid
     */
    public Long getUserIdFromAuthentication(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("User is not authenticated");
        }

        // Get principal (email) from authentication
        String email = authentication.getName();
        
        if (email == null || email.isEmpty()) {
            throw new UnauthorizedException("Invalid authentication token");
        }

        // In a real scenario, you would fetch user from database by email
        // For now, we'll try to extract from the token if available
        
        // If authentication details contain the token, extract userId from it
        Object details = authentication.getDetails();
        if (details instanceof String) {
            try {
                return jwtTokenProvider.getUserIdFromToken((String) details);
            } catch (Exception e) {
                log.error("Error extracting userId from token", e);
            }
        }

        // If we can't extract from token, we need to get from credentials or another source
        // This is a fallback - in production you should always be able to extract the userId
        log.warn("Could not extract userId from authentication. Email: {}", email);
        throw new UnauthorizedException("Unable to extract user ID from authentication");
    }

    /**
     * Extract user email from Authentication object
     * @param authentication Spring Security Authentication
     * @return User email
     */
    public String getUserEmailFromAuthentication(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("User is not authenticated");
        }
        return authentication.getName();
    }
}
