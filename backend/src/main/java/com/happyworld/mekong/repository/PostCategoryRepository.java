package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostCategoryRepository extends JpaRepository<PostCategory, Long> {
    
    Optional<PostCategory> findBySlug(String slug);
    
    List<PostCategory> findByIsActiveTrueOrderByDisplayOrderAsc();
    
    List<PostCategory> findByParentIsNullAndIsActiveTrueOrderByDisplayOrderAsc();
    
    boolean existsBySlug(String slug);
}
