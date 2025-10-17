package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.InstructorRequest;
import com.happyworld.mekong.dto.response.InstructorResponse;
import com.happyworld.mekong.entity.Instructor;
import com.happyworld.mekong.entity.User;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.InstructorRepository;
import com.happyworld.mekong.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class InstructorService {

    private final InstructorRepository instructorRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<InstructorResponse> getAllInstructors(Pageable pageable) {
        log.debug("Getting all instructors with pagination");
        Page<Instructor> instructors = instructorRepository.findAll(pageable);
        return instructors.map(this::convertToResponse);
    }

    @Transactional(readOnly = true)
    public InstructorResponse getInstructorById(Long id) {
        log.debug("Getting instructor by id: {}", id);
        Instructor instructor = instructorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found with id: " + id));
        return convertToResponse(instructor);
    }

    private InstructorResponse convertToResponse(Instructor instructor) {
        User user = instructor.getUser();
        return InstructorResponse.builder()
                .id(instructor.getId())
                .name(user.getProfile() != null ? user.getProfile().getFullName() : user.getEmail())
                .bio(instructor.getFullBio())
                .avatarUrl(user.getProfile() != null ? user.getProfile().getAvatarUrl() : null)
                .expertise(instructor.getExpertise())
                .yearsExperience(instructor.getYearsOfExperience())
                .email(user.getEmail())
                .phone(user.getPhone())
                .linkedinUrl(instructor.getLinkedinUrl())
                .facebookUrl(instructor.getFacebookUrl())
                .totalStudents(instructor.getTotalStudents())
                .totalCourses(instructor.getTotalCourses())
                .averageRating(instructor.getAverageRating() != null ? instructor.getAverageRating().doubleValue() : 0.0)
                .isActive(instructor.getIsActive())
                .build();
    }

    @Transactional(readOnly = true)
    public Page<InstructorResponse> getAllInstructorsAdmin(Pageable pageable) {
        log.debug("Admin getting all instructors");
        return instructorRepository.findAll(pageable).map(this::convertToResponse);
    }

    @Transactional
    public InstructorResponse createInstructor(InstructorRequest request) {
        log.info("Creating instructor: {}", request.getName());
        
        // Get or create user - simplified: use admin user (ID 1) as placeholder
        User user = userRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Instructor instructor = new Instructor();
        instructor.setUser(user);
        instructor.setTitle(request.getTitle());
        instructor.setShortBio(request.getBio() != null ? request.getBio().substring(0, Math.min(request.getBio().length(), 200)) : "");
        instructor.setFullBio(request.getBio());
        instructor.setExpertise(request.getExpertise());
        instructor.setYearsOfExperience(request.getYearsOfExperience());
        instructor.setLinkedinUrl(request.getLinkedinUrl());
        instructor.setFacebookUrl(request.getFacebookUrl());
        instructor.setYoutubeUrl(request.getYoutubeUrl());
        instructor.setAverageRating(request.getRating() != null ? java.math.BigDecimal.valueOf(request.getRating()) : BigDecimal.ZERO);
        instructor.setTotalStudents(request.getTotalStudents() != null ? request.getTotalStudents() : 0);
        instructor.setTotalCourses(request.getTotalCourses() != null ? request.getTotalCourses() : 0);
        instructor.setIsActive(request.getIsActive());
        instructor.setIsFeatured(request.getIsFeatured());

        instructor = instructorRepository.save(instructor);
        return convertToResponse(instructor);
    }

    @Transactional
    public InstructorResponse updateInstructor(Long id, InstructorRequest request) {
        log.info("Updating instructor: {}", id);
        
        Instructor instructor = instructorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found"));

        instructor.setTitle(request.getTitle());
        instructor.setShortBio(request.getBio() != null ? request.getBio().substring(0, Math.min(request.getBio().length(), 200)) : instructor.getShortBio());
        instructor.setFullBio(request.getBio());
        instructor.setExpertise(request.getExpertise());
        instructor.setYearsOfExperience(request.getYearsOfExperience());
        instructor.setLinkedinUrl(request.getLinkedinUrl());
        instructor.setFacebookUrl(request.getFacebookUrl());
        instructor.setYoutubeUrl(request.getYoutubeUrl());
        instructor.setAverageRating(request.getRating() != null ? java.math.BigDecimal.valueOf(request.getRating()) : instructor.getAverageRating());
        instructor.setTotalStudents(request.getTotalStudents() != null ? request.getTotalStudents() : instructor.getTotalStudents());
        instructor.setTotalCourses(request.getTotalCourses() != null ? request.getTotalCourses() : instructor.getTotalCourses());
        instructor.setIsActive(request.getIsActive());
        instructor.setIsFeatured(request.getIsFeatured());

        instructor = instructorRepository.save(instructor);
        return convertToResponse(instructor);
    }

    @Transactional
    public void deleteInstructor(Long id) {
        log.info("Deleting instructor: {}", id);
        
        Instructor instructor = instructorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found"));

        instructorRepository.delete(instructor);
    }
}

