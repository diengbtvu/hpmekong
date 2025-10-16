package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>, JpaSpecificationExecutor<Course> {

    Optional<Course> findBySlug(String slug);

    Page<Course> findAllByStatusAndDeletedAtIsNull(Course.CourseStatus status, Pageable pageable);

    Page<Course> findAllByCenterIdAndStatusAndDeletedAtIsNull(Long centerId, Course.CourseStatus status, Pageable pageable);

    Page<Course> findAllByCategoryIdAndStatusAndDeletedAtIsNull(Long categoryId, Course.CourseStatus status, Pageable pageable);

    Page<Course> findAllByInstructorIdAndStatusAndDeletedAtIsNull(Long instructorId, Course.CourseStatus status, Pageable pageable);

    Page<Course> findAllByIsFeaturedTrueAndStatusAndDeletedAtIsNull(Course.CourseStatus status, Pageable pageable);

    @Query("SELECT c FROM Course c WHERE c.status = :status AND c.deletedAt IS NULL ORDER BY c.totalStudents DESC")
    Page<Course> findTopCoursesByEnrollments(Course.CourseStatus status, Pageable pageable);

    long countByStatus(Course.CourseStatus status);

    boolean existsBySlug(String slug);
}

