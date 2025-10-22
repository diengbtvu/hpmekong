package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseModuleRepository extends JpaRepository<CourseModule, Long> {
    
    List<CourseModule> findByCourseIdOrderByDisplayOrderAsc(Long courseId);
    
    void deleteByCourseId(Long courseId);
}
