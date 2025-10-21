package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.LeaderRequest;
import com.happyworld.mekong.dto.response.LeaderResponse;
import com.happyworld.mekong.entity.Leader;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.LeaderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LeaderService {

    private final LeaderRepository leaderRepository;

    @Transactional(readOnly = true)
    public List<LeaderResponse> getActiveLeaders() {
        log.debug("Getting all active leaders");
        List<Leader> leaders = leaderRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
        return leaders.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<LeaderResponse> getFeaturedLeaders() {
        log.debug("Getting featured leaders");
        List<Leader> leaders = leaderRepository.findByIsFeaturedTrueAndIsActiveTrueOrderByDisplayOrderAsc();
        return leaders.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Page<LeaderResponse> getAllLeadersAdmin(Pageable pageable) {
        log.debug("Admin getting all leaders");
        return leaderRepository.findAll(pageable).map(this::convertToResponse);
    }

    @Transactional(readOnly = true)
    public LeaderResponse getLeaderById(Long id) {
        log.debug("Getting leader by id: {}", id);
        Leader leader = leaderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leader not found with id: " + id));
        return convertToResponse(leader);
    }

    @Transactional
    public LeaderResponse createLeader(LeaderRequest request) {
        log.info("Creating leader: {}", request.getFullName());
        
        Leader leader = Leader.builder()
                .fullName(request.getFullName())
                .position(request.getPosition())
                .avatarUrl(request.getAvatarUrl())
                .bio(request.getBio())
                .email(request.getEmail())
                .phone(request.getPhone())
                .linkedinUrl(request.getLinkedinUrl())
                .facebookUrl(request.getFacebookUrl())
                .twitterUrl(request.getTwitterUrl())
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .isFeatured(request.getIsFeatured() != null ? request.getIsFeatured() : false)
                .build();
        
        leader = leaderRepository.save(leader);
        return convertToResponse(leader);
    }

    @Transactional
    public LeaderResponse updateLeader(Long id, LeaderRequest request) {
        log.info("Updating leader: {}", id);
        
        Leader leader = leaderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leader not found"));
        
        leader.setFullName(request.getFullName());
        leader.setPosition(request.getPosition());
        leader.setAvatarUrl(request.getAvatarUrl());
        leader.setBio(request.getBio());
        leader.setEmail(request.getEmail());
        leader.setPhone(request.getPhone());
        leader.setLinkedinUrl(request.getLinkedinUrl());
        leader.setFacebookUrl(request.getFacebookUrl());
        leader.setTwitterUrl(request.getTwitterUrl());
        leader.setDisplayOrder(request.getDisplayOrder());
        leader.setIsActive(request.getIsActive());
        leader.setIsFeatured(request.getIsFeatured());
        
        leader = leaderRepository.save(leader);
        return convertToResponse(leader);
    }

    @Transactional
    public void deleteLeader(Long id) {
        log.info("Deleting leader: {}", id);
        
        Leader leader = leaderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leader not found"));
        
        leaderRepository.delete(leader);
    }

    private LeaderResponse convertToResponse(Leader leader) {
        return LeaderResponse.builder()
                .id(leader.getId())
                .fullName(leader.getFullName())
                .position(leader.getPosition())
                .avatarUrl(leader.getAvatarUrl())
                .bio(leader.getBio())
                .email(leader.getEmail())
                .phone(leader.getPhone())
                .linkedinUrl(leader.getLinkedinUrl())
                .facebookUrl(leader.getFacebookUrl())
                .twitterUrl(leader.getTwitterUrl())
                .displayOrder(leader.getDisplayOrder())
                .isActive(leader.getIsActive())
                .isFeatured(leader.getIsFeatured())
                .createdAt(leader.getCreatedAt())
                .updatedAt(leader.getUpdatedAt())
                .build();
    }
}
