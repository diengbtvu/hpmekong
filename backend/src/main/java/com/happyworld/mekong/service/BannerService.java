package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.BannerRequest;
import com.happyworld.mekong.dto.response.BannerResponse;
import com.happyworld.mekong.entity.Banner;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BannerService {

    private final BannerRepository bannerRepository;

    @Transactional(readOnly = true)
    public List<BannerResponse> getAllBanners() {
        log.debug("Getting all banners");
        return bannerRepository.findByIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BannerResponse> getActiveBanners() {
        log.debug("Getting active scheduled banners");
        return bannerRepository.findActiveScheduledBanners()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BannerResponse> getBannersByType(Banner.BannerType type) {
        log.debug("Getting banners by type: {}", type);
        return bannerRepository.findActiveScheduledBannersByType(type)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BannerResponse getBannerById(Long id) {
        log.debug("Getting banner by id: {}", id);
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Banner not found with id: " + id));
        return convertToResponse(banner);
    }

    @Transactional
    public BannerResponse createBanner(BannerRequest request) {
        log.debug("Creating banner with title: {}", request.getTitle());
        
        Banner banner = Banner.builder()
                .title(request.getTitle())
                .titleEn(request.getTitleEn())
                .subtitle(request.getSubtitle())
                .subtitleEn(request.getSubtitleEn())
                .description(request.getDescription())
                .descriptionEn(request.getDescriptionEn())
                .imageUrl(request.getImageUrl())
                .mobileImageUrl(request.getMobileImageUrl())
                .linkUrl(request.getLinkUrl())
                .linkText(request.getLinkText())
                .linkTextEn(request.getLinkTextEn())
                .openInNewTab(request.getOpenInNewTab())
                .type(request.getType())
                .displayOrder(request.getDisplayOrder())
                .isActive(request.getIsActive())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        banner = bannerRepository.save(banner);
        log.info("Created banner with id: {}", banner.getId());
        
        return convertToResponse(banner);
    }

    @Transactional
    public BannerResponse updateBanner(Long id, BannerRequest request) {
        log.debug("Updating banner with id: {}", id);
        
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Banner not found with id: " + id));

        banner.setTitle(request.getTitle());
        banner.setTitleEn(request.getTitleEn());
        banner.setSubtitle(request.getSubtitle());
        banner.setSubtitleEn(request.getSubtitleEn());
        banner.setDescription(request.getDescription());
        banner.setDescriptionEn(request.getDescriptionEn());
        banner.setImageUrl(request.getImageUrl());
        banner.setMobileImageUrl(request.getMobileImageUrl());
        banner.setLinkUrl(request.getLinkUrl());
        banner.setLinkText(request.getLinkText());
        banner.setLinkTextEn(request.getLinkTextEn());
        banner.setOpenInNewTab(request.getOpenInNewTab());
        banner.setType(request.getType());
        banner.setDisplayOrder(request.getDisplayOrder());
        banner.setIsActive(request.getIsActive());
        banner.setStartDate(request.getStartDate());
        banner.setEndDate(request.getEndDate());

        banner = bannerRepository.save(banner);
        log.info("Updated banner with id: {}", id);
        
        return convertToResponse(banner);
    }

    @Transactional
    public void deleteBanner(Long id) {
        log.debug("Deleting banner with id: {}", id);
        
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Banner not found with id: " + id));
        
        banner.softDelete();
        bannerRepository.save(banner);
        
        log.info("Soft deleted banner with id: {}", id);
    }

    @Transactional
    public void incrementViewCount(Long id) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Banner not found with id: " + id));
        banner.incrementViewCount();
        bannerRepository.save(banner);
    }

    @Transactional
    public void incrementClickCount(Long id) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Banner not found with id: " + id));
        banner.incrementClickCount();
        bannerRepository.save(banner);
    }

    private BannerResponse convertToResponse(Banner banner) {
        return BannerResponse.builder()
                .id(banner.getId())
                .title(banner.getTitle())
                .titleEn(banner.getTitleEn())
                .subtitle(banner.getSubtitle())
                .subtitleEn(banner.getSubtitleEn())
                .description(banner.getDescription())
                .descriptionEn(banner.getDescriptionEn())
                .imageUrl(banner.getImageUrl())
                .mobileImageUrl(banner.getMobileImageUrl())
                .linkUrl(banner.getLinkUrl())
                .linkText(banner.getLinkText())
                .linkTextEn(banner.getLinkTextEn())
                .openInNewTab(banner.getOpenInNewTab())
                .type(banner.getType())
                .displayOrder(banner.getDisplayOrder())
                .isActive(banner.getIsActive())
                .startDate(banner.getStartDate())
                .endDate(banner.getEndDate())
                .clickCount(banner.getClickCount())
                .viewCount(banner.getViewCount())
                .createdAt(banner.getCreatedAt())
                .updatedAt(banner.getUpdatedAt())
                .build();
    }
}

