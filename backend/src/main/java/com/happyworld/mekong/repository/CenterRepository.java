package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CenterRepository extends JpaRepository<Center, Long> {

    Optional<Center> findBySlug(String slug);

    List<Center> findAllByIsActiveTrueOrderByDisplayOrder();

    boolean existsBySlug(String slug);
}

