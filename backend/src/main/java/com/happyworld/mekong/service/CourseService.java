package com.happyworld.mekong.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.happyworld.mekong.dto.request.CourseCreateRequest;
import com.happyworld.mekong.dto.response.*;
import com.happyworld.mekong.entity.*;
import com.happyworld.mekong.exception.BadRequestException;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.*;
import com.happyworld.mekong.util.SlugUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseService {

    private final CourseRepository courseRepository;
    private final CenterRepository centerRepository;
    private final CategoryRepository categoryRepository;
    private final InstructorRepository instructorRepository;
    private final SlugUtils slugUtils;
    private final ObjectMapper objectMapper;

    @Transactional
    public CourseResponse createCourse(CourseCreateRequest request) {
        log.info("Creating course: {}", request.getTitle());

        // Validate center
        Center center = centerRepository.findById(request.getCenterId())
                .orElseThrow(() -> new ResourceNotFoundException("Center", "id", request.getCenterId()));

        // Generate unique slug
        String baseSlug = slugUtils.generateSlug(request.getTitle());
        String slug = baseSlug;
        int attempt = 0;
        while (courseRepository.existsBySlug(slug)) {
            attempt++;
            slug = slugUtils.generateUniqueSlug(baseSlug, attempt);
        }

        // Build course
        Course course = Course.builder()
                .title(request.getTitle())
                .slug(slug)
                .subtitle(request.getSubtitle())
                .description(request.getDescription())
                .center(center)
                .price(request.getPrice())
                .originalPrice(request.getOriginalPrice())
                .discountPercentage(request.getDiscountPercentage())
                .isFree(request.getIsFree())
                .level(Course.CourseLevel.valueOf(request.getLevel().toUpperCase()))
                .language(request.getLanguage())
                .durationHours(request.getDurationHours())
                .deliveryMode(Course.DeliveryMode.valueOf(request.getDeliveryMode().toUpperCase()))
                .status(Course.CourseStatus.DRAFT)
                .thumbnailUrl(request.getThumbnailUrl())
                .previewVideoUrl(request.getPreviewVideoUrl())
                .metaTitle(request.getMetaTitle())
                .metaDescription(request.getMetaDescription())
                .metaKeywords(request.getMetaKeywords())
                .build();

        // Set JSON fields
        try {
            if (request.getWhatYouWillLearn() != null) {
                course.setWhatYouWillLearn(objectMapper.writeValueAsString(request.getWhatYouWillLearn()));
            }
            if (request.getRequirements() != null) {
                course.setRequirements(objectMapper.writeValueAsString(request.getRequirements()));
            }
            if (request.getTargetAudience() != null) {
                course.setTargetAudience(objectMapper.writeValueAsString(request.getTargetAudience()));
            }
        } catch (JsonProcessingException e) {
            throw new BadRequestException("Invalid JSON data");
        }

        // Set category if provided
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", "id", request.getCategoryId()));
            course.setCategory(category);
        }

        // Set instructor if provided
        if (request.getInstructorId() != null) {
            Instructor instructor = instructorRepository.findById(request.getInstructorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Instructor", "id", request.getInstructorId()));
            course.setInstructor(instructor);
        }

        Course savedCourse = courseRepository.save(course);
        log.info("Course created successfully: {} (ID: {})", savedCourse.getTitle(), savedCourse.getId());

        return mapToCourseResponse(savedCourse);
    }

    @Transactional(readOnly = true)
    public CourseResponse getCourseBySlug(String slug) {
        Course course = courseRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "slug", slug));
        
        // Increment view count
        course.setTotalViews(course.getTotalViews() + 1);
        courseRepository.save(course);
        
        return mapToCourseResponse(course);
    }

    @Transactional(readOnly = true)
    public Page<CourseResponse> getPublishedCourses(Pageable pageable) {
        Page<Course> courses = courseRepository.findAllByStatusAndDeletedAtIsNull(
                Course.CourseStatus.PUBLISHED, pageable);
        return courses.map(this::mapToCourseResponse);
    }

    @Transactional(readOnly = true)
    public Page<CourseResponse> getFeaturedCourses(Pageable pageable) {
        Page<Course> courses = courseRepository.findAllByIsFeaturedTrueAndStatusAndDeletedAtIsNull(
                Course.CourseStatus.PUBLISHED, pageable);
        return courses.map(this::mapToCourseResponse);
    }

    @Transactional
    public CourseResponse publishCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));

        if (course.getStatus() == Course.CourseStatus.PUBLISHED) {
            throw new BadRequestException("Course is already published");
        }

        course.setStatus(Course.CourseStatus.PUBLISHED);
        course.setPublishedAt(LocalDateTime.now());

        Course updated = courseRepository.save(course);
        log.info("Course published: {} (ID: {})", updated.getTitle(), updated.getId());

        return mapToCourseResponse(updated);
    }

    @Transactional
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));

        course.softDelete();
        courseRepository.save(course);
        log.info("Course soft deleted: {} (ID: {})", course.getTitle(), course.getId());
    }

    private CourseResponse mapToCourseResponse(Course course) {
        CourseResponse.CourseResponseBuilder builder = CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .slug(course.getSlug())
                .subtitle(course.getSubtitle())
                .description(course.getDescription())
                .thumbnailUrl(course.getThumbnailUrl())
                .previewVideoUrl(course.getPreviewVideoUrl())
                .price(course.getPrice())
                .originalPrice(course.getOriginalPrice())
                .discountPercentage(course.getDiscountPercentage())
                .isFree(course.getIsFree())
                .level(course.getLevel().name())
                .language(course.getLanguage())
                .durationHours(course.getDurationHours())
                .totalLessons(course.getTotalLessons())
                .deliveryMode(course.getDeliveryMode().name())
                .status(course.getStatus().name())
                .isFeatured(course.getIsFeatured())
                .isBestseller(course.getIsBestseller())
                .totalStudents(course.getTotalStudents())
                .averageRating(course.getAverageRating())
                .totalReviews(course.getTotalReviews())
                .totalViews(course.getTotalViews())
                .hasCertificate(course.getHasCertificate())
                .publishedAt(course.getPublishedAt())
                .createdAt(course.getCreatedAt())
                .updatedAt(course.getUpdatedAt());

        // Parse JSON fields
        try {
            if (course.getWhatYouWillLearn() != null) {
                builder.whatYouWillLearn(objectMapper.readValue(
                        course.getWhatYouWillLearn(), objectMapper.getTypeFactory()
                                .constructCollectionType(java.util.List.class, String.class)));
            }
            if (course.getRequirements() != null) {
                builder.requirements(objectMapper.readValue(
                        course.getRequirements(), objectMapper.getTypeFactory()
                                .constructCollectionType(java.util.List.class, String.class)));
            }
            if (course.getTargetAudience() != null) {
                builder.targetAudience(objectMapper.readValue(
                        course.getTargetAudience(), objectMapper.getTypeFactory()
                                .constructCollectionType(java.util.List.class, String.class)));
            }
        } catch (JsonProcessingException e) {
            log.error("Error parsing JSON fields", e);
        }

        // Map relationships
        if (course.getCenter() != null) {
            builder.center(CenterBasicResponse.builder()
                    .id(course.getCenter().getId())
                    .name(course.getCenter().getName())
                    .slug(course.getCenter().getSlug())
                    .logoUrl(course.getCenter().getLogoUrl())
                    .primaryColor(course.getCenter().getPrimaryColor())
                    .build());
        }

        if (course.getCategory() != null) {
            builder.category(CategoryResponse.builder()
                    .id(course.getCategory().getId())
                    .name(course.getCategory().getName())
                    .slug(course.getCategory().getSlug())
                    .build());
        }

        if (course.getInstructor() != null) {
            Instructor instructor = course.getInstructor();
            builder.instructor(InstructorBasicResponse.builder()
                    .id(instructor.getId())
                    .name(instructor.getUser().getProfile().getFullName())
                    .title(instructor.getTitle())
                    .avatarUrl(instructor.getUser().getProfile().getAvatarUrl())
                    .shortBio(instructor.getShortBio())
                    .averageRating(instructor.getAverageRating())
                    .totalStudents(instructor.getTotalStudents())
                    .totalCourses(instructor.getTotalCourses())
                    .build());
        }

        return builder.build();
    }
}

