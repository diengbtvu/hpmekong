package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long> {

    Optional<Instructor> findByUserId(Long userId);

    List<Instructor> findAllByIsActiveTrue();

    List<Instructor> findAllByIsFeaturedTrueAndIsActiveTrue();

    boolean existsByUserId(Long userId);
}

