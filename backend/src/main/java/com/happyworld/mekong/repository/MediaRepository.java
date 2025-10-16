package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Media;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {

    Page<Media> findAllByUploadedById(Long userId, Pageable pageable);

    Page<Media> findAllByType(Media.MediaType type, Pageable pageable);

    Page<Media> findAllByFolder(String folder, Pageable pageable);
}

