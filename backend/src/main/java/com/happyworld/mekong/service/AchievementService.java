package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.AchievementRequest;
import com.happyworld.mekong.dto.response.AchievementResponse;
import com.happyworld.mekong.entity.Achievement;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.AchievementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AchievementService {

    private final AchievementRepository achievementRepository;

    @Transactional(readOnly = true)
    public List<AchievementResponse> getAllAchievements() {
        log.debug("Getting all achievements");
        return achievementRepository.findByIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AchievementResponse> getAchievementsByType(Achievement.AchievementType type) {
        log.debug("Getting achievements by type: {}", type);
        return achievementRepository.findByTypeAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc(type)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AchievementResponse> getFeaturedAchievements() {
        log.debug("Getting featured achievements");
        return achievementRepository.findByIsFeaturedTrueAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AchievementResponse getAchievementById(Long id) {
        log.debug("Getting achievement by id: {}", id);
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + id));
        return convertToResponse(achievement);
    }

    @Transactional
    public AchievementResponse createAchievement(AchievementRequest request) {
        log.debug("Creating achievement with title: {}", request.getTitle());
        
        Achievement achievement = Achievement.builder()
                .title(request.getTitle())
                .titleEn(request.getTitleEn())
                .imageUrl(request.getImageUrl())
                .description(request.getDescription())
                .descriptionEn(request.getDescriptionEn())
                .achievementDate(request.getAchievementDate())
                .type(request.getType())
                .displayOrder(request.getDisplayOrder())
                .isActive(request.getIsActive())
                .isFeatured(request.getIsFeatured())
                .build();

        achievement = achievementRepository.save(achievement);
        log.info("Created achievement with id: {}", achievement.getId());
        
        return convertToResponse(achievement);
    }

    @Transactional
    public AchievementResponse updateAchievement(Long id, AchievementRequest request) {
        log.debug("Updating achievement with id: {}", id);
        
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + id));

        achievement.setTitle(request.getTitle());
        achievement.setTitleEn(request.getTitleEn());
        achievement.setImageUrl(request.getImageUrl());
        achievement.setDescription(request.getDescription());
        achievement.setDescriptionEn(request.getDescriptionEn());
        achievement.setAchievementDate(request.getAchievementDate());
        achievement.setType(request.getType());
        achievement.setDisplayOrder(request.getDisplayOrder());
        achievement.setIsActive(request.getIsActive());
        achievement.setIsFeatured(request.getIsFeatured());

        achievement = achievementRepository.save(achievement);
        log.info("Updated achievement with id: {}", id);
        
        return convertToResponse(achievement);
    }

    @Transactional
    public void deleteAchievement(Long id) {
        log.debug("Deleting achievement with id: {}", id);
        
        Achievement achievement = achievementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + id));
        
        achievement.softDelete();
        achievementRepository.save(achievement);
        
        log.info("Soft deleted achievement with id: {}", id);
    }

    private AchievementResponse convertToResponse(Achievement achievement) {
        return AchievementResponse.builder()
                .id(achievement.getId())
                .title(achievement.getTitle())
                .titleEn(achievement.getTitleEn())
                .imageUrl(achievement.getImageUrl())
                .description(achievement.getDescription())
                .descriptionEn(achievement.getDescriptionEn())
                .achievementDate(achievement.getAchievementDate())
                .type(achievement.getType())
                .displayOrder(achievement.getDisplayOrder())
                .isActive(achievement.getIsActive())
                .isFeatured(achievement.getIsFeatured())
                .createdAt(achievement.getCreatedAt())
                .updatedAt(achievement.getUpdatedAt())
                .build();
    }
}

