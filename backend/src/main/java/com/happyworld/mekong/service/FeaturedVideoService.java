package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.FeaturedVideoRequest;
import com.happyworld.mekong.dto.response.FeaturedVideoResponse;
import com.happyworld.mekong.entity.FeaturedVideo;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.FeaturedVideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FeaturedVideoService {

    private final FeaturedVideoRepository featuredVideoRepository;

    @Transactional(readOnly = true)
    public List<FeaturedVideoResponse> getAllVideos() {
        log.debug("Getting all featured videos");
        return featuredVideoRepository.findByIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FeaturedVideoResponse> getVideosByType(FeaturedVideo.VideoType type) {
        log.debug("Getting videos by type: {}", type);
        return featuredVideoRepository.findByTypeAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc(type)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FeaturedVideoResponse> getFeaturedVideos() {
        log.debug("Getting featured videos");
        return featuredVideoRepository.findByIsFeaturedTrueAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FeaturedVideoResponse getVideoById(Long id) {
        log.debug("Getting video by id: {}", id);
        FeaturedVideo video = featuredVideoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Featured video not found with id: " + id));
        return convertToResponse(video);
    }

    @Transactional
    public FeaturedVideoResponse createVideo(FeaturedVideoRequest request) {
        log.debug("Creating featured video with title: {}", request.getTitle());
        
        FeaturedVideo video = FeaturedVideo.builder()
                .title(request.getTitle())
                .titleEn(request.getTitleEn())
                .thumbnailUrl(request.getThumbnailUrl())
                .videoUrl(request.getVideoUrl())
                .description(request.getDescription())
                .descriptionEn(request.getDescriptionEn())
                .durationSeconds(request.getDurationSeconds())
                .videoPlatform(request.getVideoPlatform())
                .videoId(request.getVideoId())
                .type(request.getType())
                .displayOrder(request.getDisplayOrder())
                .isActive(request.getIsActive())
                .isFeatured(request.getIsFeatured())
                .author(request.getAuthor())
                .publishedDate(request.getPublishedDate())
                .build();

        video = featuredVideoRepository.save(video);
        log.info("Created featured video with id: {}", video.getId());
        
        return convertToResponse(video);
    }

    @Transactional
    public FeaturedVideoResponse updateVideo(Long id, FeaturedVideoRequest request) {
        log.debug("Updating featured video with id: {}", id);
        
        FeaturedVideo video = featuredVideoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Featured video not found with id: " + id));

        video.setTitle(request.getTitle());
        video.setTitleEn(request.getTitleEn());
        video.setThumbnailUrl(request.getThumbnailUrl());
        video.setVideoUrl(request.getVideoUrl());
        video.setDescription(request.getDescription());
        video.setDescriptionEn(request.getDescriptionEn());
        video.setDurationSeconds(request.getDurationSeconds());
        video.setVideoPlatform(request.getVideoPlatform());
        video.setVideoId(request.getVideoId());
        video.setType(request.getType());
        video.setDisplayOrder(request.getDisplayOrder());
        video.setIsActive(request.getIsActive());
        video.setIsFeatured(request.getIsFeatured());
        video.setAuthor(request.getAuthor());
        video.setPublishedDate(request.getPublishedDate());

        video = featuredVideoRepository.save(video);
        log.info("Updated featured video with id: {}", id);
        
        return convertToResponse(video);
    }

    @Transactional
    public void deleteVideo(Long id) {
        log.debug("Deleting featured video with id: {}", id);
        
        FeaturedVideo video = featuredVideoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Featured video not found with id: " + id));
        
        video.softDelete();
        featuredVideoRepository.save(video);
        
        log.info("Soft deleted featured video with id: {}", id);
    }

    @Transactional
    public void incrementViewCount(Long id) {
        FeaturedVideo video = featuredVideoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Featured video not found with id: " + id));
        video.incrementViewCount();
        featuredVideoRepository.save(video);
    }

    private FeaturedVideoResponse convertToResponse(FeaturedVideo video) {
        return FeaturedVideoResponse.builder()
                .id(video.getId())
                .title(video.getTitle())
                .titleEn(video.getTitleEn())
                .thumbnailUrl(video.getThumbnailUrl())
                .videoUrl(video.getVideoUrl())
                .description(video.getDescription())
                .descriptionEn(video.getDescriptionEn())
                .durationSeconds(video.getDurationSeconds())
                .videoPlatform(video.getVideoPlatform())
                .videoId(video.getVideoId())
                .type(video.getType())
                .displayOrder(video.getDisplayOrder())
                .isActive(video.getIsActive())
                .isFeatured(video.getIsFeatured())
                .viewCount(video.getViewCount())
                .author(video.getAuthor())
                .publishedDate(video.getPublishedDate())
                .createdAt(video.getCreatedAt())
                .updatedAt(video.getUpdatedAt())
                .build();
    }
}

