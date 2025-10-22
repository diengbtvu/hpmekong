package com.happyworld.mekong.service;

import com.happyworld.mekong.constant.MessageConstants;
import com.happyworld.mekong.dto.request.EnrollmentRequest;
import com.happyworld.mekong.dto.response.EnrollmentResponse;
import com.happyworld.mekong.entity.*;
import com.happyworld.mekong.exception.BadRequestException;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CertificateRepository certificateRepository;

    @Transactional
    public EnrollmentResponse enrollCourse(Long userId, EnrollmentRequest request) {
        log.info("User {} enrolling in course {}", userId, request.getCourseId());

        // Check if already enrolled
        var existingEnrollment = enrollmentRepository
                .findByUserIdAndCourseId(userId, request.getCourseId());
        
        if (existingEnrollment.isPresent()) {
            Enrollment enrollment = existingEnrollment.get();
            // If already ACTIVE or COMPLETED, throw error
            if (enrollment.getStatus() == Enrollment.EnrollmentStatus.ACTIVE || 
                enrollment.getStatus() == Enrollment.EnrollmentStatus.COMPLETED) {
                throw new BadRequestException(MessageConstants.ERROR_ALREADY_ENROLLED);
            }
            // If PENDING, return existing enrollment (for payment retry)
            log.info("Returning existing PENDING enrollment for user {} in course {}", userId, request.getCourseId());
            return mapToEnrollmentResponse(enrollment);
        }

        // Get course
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", request.getCourseId()));

        // Check if course is published
        if (course.getStatus() != Course.CourseStatus.PUBLISHED) {
            throw new BadRequestException(MessageConstants.ERROR_COURSE_NOT_PUBLISHED);
        }

        // Get user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // Create enrollment
        Enrollment enrollment = Enrollment.builder()
                .user(user)
                .course(course)
                .totalLessons(course.getTotalLessons())
                .enrolledAt(LocalDateTime.now())
                .build();

        // If course is free, activate immediately
        if (course.getIsFree()) {
            enrollment.setStatus(Enrollment.EnrollmentStatus.ACTIVE);
            enrollment.setAmountPaid(BigDecimal.ZERO);
            enrollment.setStartedAt(LocalDateTime.now());
        } else {
            // For paid courses, create with PENDING status
            // Webhook will activate after payment success
            enrollment.setStatus(Enrollment.EnrollmentStatus.PENDING);
            enrollment.setAmountPaid(course.getPrice());
        }

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);

        // Update course stats only for new enrollments
        Integer currentStudents = course.getTotalStudents();
        course.setTotalStudents(currentStudents != null ? currentStudents + 1 : 1);
        courseRepository.save(course);

        log.info("Enrollment created successfully for user {} in course {} with status {}", 
                userId, course.getId(), savedEnrollment.getStatus());

        return mapToEnrollmentResponse(savedEnrollment);
    }

    @Transactional(readOnly = true)
    public Page<EnrollmentResponse> getMyEnrollments(Long userId, Pageable pageable) {
        Page<Enrollment> enrollments = enrollmentRepository.findAllByUserId(userId, pageable);
        return enrollments.map(this::mapToEnrollmentResponse);
    }

    @Transactional(readOnly = true)
    public EnrollmentResponse getEnrollmentById(Long id, Long userId) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment", "id", id));

        // Check ownership
        if (!enrollment.getUser().getId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền truy cập enrollment này");
        }

        return mapToEnrollmentResponse(enrollment);
    }

    @Transactional
    public EnrollmentResponse updateProgress(Long enrollmentId, Long userId, int completedLessons) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment", "id", enrollmentId));

        // Check ownership
        if (!enrollment.getUser().getId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền cập nhật enrollment này");
        }

        enrollment.setCompletedLessons(completedLessons);

        // Calculate progress percentage
        if (enrollment.getTotalLessons() > 0) {
            BigDecimal percentage = BigDecimal.valueOf(completedLessons)
                    .divide(BigDecimal.valueOf(enrollment.getTotalLessons()), 2, BigDecimal.ROUND_HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
            enrollment.setProgressPercentage(percentage);

            // Check if completed
            if (completedLessons >= enrollment.getTotalLessons()) {
                enrollment.setStatus(Enrollment.EnrollmentStatus.COMPLETED);
                enrollment.setCompletedAt(LocalDateTime.now());

                // Issue certificate if course has certificate
                if (enrollment.getCourse().getHasCertificate() && !enrollment.getCertificateIssued()) {
                    issueCertificate(enrollment);
                }
            }
        }

        // Set started_at if first lesson completed
        if (enrollment.getStartedAt() == null && completedLessons > 0) {
            enrollment.setStartedAt(LocalDateTime.now());
        }

        Enrollment updated = enrollmentRepository.save(enrollment);
        log.info("Progress updated for enrollment {}: {} lessons completed", enrollmentId, completedLessons);

        return mapToEnrollmentResponse(updated);
    }

    @Transactional
    protected void issueCertificate(Enrollment enrollment) {
        log.info("Issuing certificate for enrollment {}", enrollment.getId());

        // Generate certificate code
        String code = generateCertificateCode();

        Certificate certificate = Certificate.builder()
                .enrollment(enrollment)
                .user(enrollment.getUser())
                .course(enrollment.getCourse())
                .certificateCode(code)
                .isValid(true)
                .issuedAt(LocalDateTime.now())
                .verificationUrl("https://happyworldmekong.com/certificates/verify/" + code)
                .build();

        certificateRepository.save(certificate);

        enrollment.setCertificateIssued(true);
        enrollment.setCertificateIssuedAt(LocalDateTime.now());
        enrollmentRepository.save(enrollment);

        log.info("Certificate {} issued for enrollment {}", code, enrollment.getId());
        // TODO: Send certificate email
    }

    private String generateCertificateCode() {
        String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String uuid = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String code = "MK-CERT-" + date + "-" + uuid;

        // Ensure uniqueness
        while (certificateRepository.existsByCertificateCode(code)) {
            uuid = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            code = "MK-CERT-" + date + "-" + uuid;
        }

        return code;
    }

    @Transactional(readOnly = true)
    public Page<EnrollmentResponse> getAllEnrollments(Pageable pageable) {
        log.info("Getting all enrollments with pagination");
        return enrollmentRepository.findAll(pageable).map(this::mapToEnrollmentResponse);
    }

    private EnrollmentResponse mapToEnrollmentResponse(Enrollment enrollment) {
        Course course = enrollment.getCourse();

        return EnrollmentResponse.builder()
                .id(enrollment.getId())
                .course(EnrollmentResponse.CourseBasicResponse.builder()
                        .id(course.getId())
                        .title(course.getTitle())
                        .slug(course.getSlug())
                        .thumbnailUrl(course.getThumbnailUrl())
                        .totalLessons(course.getTotalLessons())
                        .durationHours(course.getDurationHours())
                        .build())
                .status(enrollment.getStatus().name())
                .progressPercentage(enrollment.getProgressPercentage())
                .completedLessons(enrollment.getCompletedLessons())
                .totalLessons(enrollment.getTotalLessons())
                .certificateIssued(enrollment.getCertificateIssued())
                .certificateIssuedAt(enrollment.getCertificateIssuedAt())
                .enrolledAt(enrollment.getEnrolledAt())
                .startedAt(enrollment.getStartedAt())
                .completedAt(enrollment.getCompletedAt())
                .expiresAt(enrollment.getExpiresAt())
                .amountPaid(enrollment.getAmountPaid())
                .hasReviewed(enrollment.getHasReviewed())
                .build();
    }
}

