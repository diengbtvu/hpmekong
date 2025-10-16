package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    Optional<Enrollment> findByUserIdAndCourseId(Long userId, Long courseId);

    Page<Enrollment> findAllByUserId(Long userId, Pageable pageable);

    Page<Enrollment> findAllByUserIdAndStatus(Long userId, Enrollment.EnrollmentStatus status, Pageable pageable);

    Page<Enrollment> findAllByCourseId(Long courseId, Pageable pageable);

    boolean existsByUserIdAndCourseId(Long userId, Long courseId);

    long countByStatus(Enrollment.EnrollmentStatus status);
}

