package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.CenterRequest;
import com.happyworld.mekong.dto.response.CenterBasicResponse;
import com.happyworld.mekong.entity.Center;
import com.happyworld.mekong.entity.User;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.CenterRepository;
import com.happyworld.mekong.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CenterService {

    private final CenterRepository centerRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<CenterBasicResponse> getAllCenters() {
        log.debug("Getting all centers");
        List<Center> centers = centerRepository.findAll();
        return centers.stream()
                .map(this::convertToBasicResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CenterBasicResponse getCenterBySlug(String slug) {
        log.debug("Getting center by slug: {}", slug);
        Center center = centerRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Center not found with slug: '" + slug + "'"));
        return convertToBasicResponse(center);
    }

    @Transactional(readOnly = true)
    public CenterBasicResponse getCenterById(Long id) {
        log.debug("Getting center by id: {}", id);
        Center center = centerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Center not found with id: " + id));
        return convertToBasicResponse(center);
    }

    @Transactional(readOnly = true)
    public List<CenterBasicResponse> getAllCentersAdmin() {
        log.debug("Admin getting all centers");
        List<Center> centers = centerRepository.findAll();
        return centers.stream()
                .map(this::convertToBasicResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public CenterBasicResponse createCenter(CenterRequest request) {
        log.info("Creating new center: {}", request.getName());
        
        Center center = Center.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .tagline(request.getTagline())
                .description(request.getDescription())
                .logoUrl(request.getLogoUrl())
                .coverImageUrl(request.getCoverImageUrl())
                .primaryColor(request.getPrimaryColor())
                .email(request.getEmail())
                .phone(request.getPhone())
                .website(request.getWebsite())
                .isActive(request.getIsActive())
                .displayOrder(request.getDisplayOrder())
                .metaTitle(request.getMetaTitle())
                .metaDescription(request.getMetaDescription())
                .metaKeywords(request.getMetaKeywords())
                .build();

        if (request.getManagerId() != null) {
            User manager = userRepository.findById(request.getManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getManagerId()));
            center.setManager(manager);
        }

        center = centerRepository.save(center);
        return convertToBasicResponse(center);
    }

    @Transactional
    public CenterBasicResponse updateCenter(Long id, CenterRequest request) {
        log.info("Updating center id: {}", id);
        
        Center center = centerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Center not found with id: " + id));

        center.setName(request.getName());
        center.setSlug(request.getSlug());
        center.setTagline(request.getTagline());
        center.setDescription(request.getDescription());
        center.setLogoUrl(request.getLogoUrl());
        center.setCoverImageUrl(request.getCoverImageUrl());
        center.setPrimaryColor(request.getPrimaryColor());
        center.setEmail(request.getEmail());
        center.setPhone(request.getPhone());
        center.setWebsite(request.getWebsite());
        center.setIsActive(request.getIsActive());
        center.setDisplayOrder(request.getDisplayOrder());
        center.setMetaTitle(request.getMetaTitle());
        center.setMetaDescription(request.getMetaDescription());
        center.setMetaKeywords(request.getMetaKeywords());

        if (request.getManagerId() != null) {
            User manager = userRepository.findById(request.getManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getManagerId()));
            center.setManager(manager);
        } else {
            center.setManager(null);
        }

        center = centerRepository.save(center);
        return convertToBasicResponse(center);
    }

    @Transactional
    public void deleteCenter(Long id) {
        log.info("Deleting center id: {}", id);
        
        Center center = centerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Center not found with id: " + id));

        centerRepository.delete(center);
    }

    private CenterBasicResponse convertToBasicResponse(Center center) {
        return CenterBasicResponse.builder()
                .id(center.getId())
                .name(center.getName())
                .slug(center.getSlug())
                .tagline(center.getTagline())
                .description(center.getDescription())
                .logoUrl(center.getLogoUrl())
                .coverImageUrl(center.getCoverImageUrl())
                .primaryColor(center.getPrimaryColor())
                .email(center.getEmail())
                .phone(center.getPhone())
                .website(center.getWebsite())
                .isActive(center.getIsActive())
                .displayOrder(center.getDisplayOrder())
                .build();
    }
}

