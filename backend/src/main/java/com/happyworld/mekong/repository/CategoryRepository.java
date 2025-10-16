package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findBySlug(String slug);

    List<Category> findAllByIsActiveTrueAndParentIsNullOrderByDisplayOrder();

    List<Category> findAllByParentIdAndIsActiveTrue(Long parentId);

    boolean existsBySlug(String slug);
}

