package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {

    Optional<Post> findBySlug(String slug);

    Page<Post> findAllByStatusAndDeletedAtIsNull(Post.PostStatus status, Pageable pageable);

    Page<Post> findAllByCategoryIdAndStatusAndDeletedAtIsNull(
            Long categoryId, Post.PostStatus status, Pageable pageable);

    Page<Post> findAllByIsFeaturedTrueAndStatusAndDeletedAtIsNull(
            Post.PostStatus status, Pageable pageable);

    boolean existsBySlug(String slug);
}

