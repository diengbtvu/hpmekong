package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.PartnerRequest;
import com.happyworld.mekong.dto.response.PartnerResponse;
import com.happyworld.mekong.entity.Partner;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.PartnerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PartnerService {

    private final PartnerRepository partnerRepository;

    @Transactional(readOnly = true)
    public List<PartnerResponse> getAllPartners() {
        log.debug("Getting all partners");
        return partnerRepository.findByIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PartnerResponse> getPartnersByType(Partner.PartnerType type) {
        log.debug("Getting partners by type: {}", type);
        return partnerRepository.findByTypeAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc(type)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PartnerResponse> getFeaturedPartners() {
        log.debug("Getting featured partners");
        return partnerRepository.findByIsFeaturedTrueAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PartnerResponse getPartnerById(Long id) {
        log.debug("Getting partner by id: {}", id);
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Partner not found with id: " + id));
        return convertToResponse(partner);
    }

    @Transactional
    public PartnerResponse createPartner(PartnerRequest request) {
        log.debug("Creating partner with name: {}", request.getName());
        
        Partner partner = Partner.builder()
                .name(request.getName())
                .nameEn(request.getNameEn())
                .logoUrl(request.getLogoUrl())
                .websiteUrl(request.getWebsiteUrl())
                .description(request.getDescription())
                .descriptionEn(request.getDescriptionEn())
                .type(request.getType())
                .displayOrder(request.getDisplayOrder())
                .isActive(request.getIsActive())
                .isFeatured(request.getIsFeatured())
                .build();

        partner = partnerRepository.save(partner);
        log.info("Created partner with id: {}", partner.getId());
        
        return convertToResponse(partner);
    }

    @Transactional
    public PartnerResponse updatePartner(Long id, PartnerRequest request) {
        log.debug("Updating partner with id: {}", id);
        
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Partner not found with id: " + id));

        partner.setName(request.getName());
        partner.setNameEn(request.getNameEn());
        partner.setLogoUrl(request.getLogoUrl());
        partner.setWebsiteUrl(request.getWebsiteUrl());
        partner.setDescription(request.getDescription());
        partner.setDescriptionEn(request.getDescriptionEn());
        partner.setType(request.getType());
        partner.setDisplayOrder(request.getDisplayOrder());
        partner.setIsActive(request.getIsActive());
        partner.setIsFeatured(request.getIsFeatured());

        partner = partnerRepository.save(partner);
        log.info("Updated partner with id: {}", id);
        
        return convertToResponse(partner);
    }

    @Transactional
    public void deletePartner(Long id) {
        log.debug("Deleting partner with id: {}", id);
        
        Partner partner = partnerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Partner not found with id: " + id));
        
        partner.softDelete();
        partnerRepository.save(partner);
        
        log.info("Soft deleted partner with id: {}", id);
    }

    private PartnerResponse convertToResponse(Partner partner) {
        return PartnerResponse.builder()
                .id(partner.getId())
                .name(partner.getName())
                .nameEn(partner.getNameEn())
                .logoUrl(partner.getLogoUrl())
                .websiteUrl(partner.getWebsiteUrl())
                .description(partner.getDescription())
                .descriptionEn(partner.getDescriptionEn())
                .type(partner.getType())
                .displayOrder(partner.getDisplayOrder())
                .isActive(partner.getIsActive())
                .isFeatured(partner.getIsFeatured())
                .createdAt(partner.getCreatedAt())
                .updatedAt(partner.getUpdatedAt())
                .build();
    }
}

