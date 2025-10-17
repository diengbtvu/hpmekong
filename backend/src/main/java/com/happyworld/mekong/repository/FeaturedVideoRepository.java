package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.FeaturedVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeaturedVideoRepository extends JpaRepository<FeaturedVideo, Long> {

    List<FeaturedVideo> findByIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc();

    List<FeaturedVideo> findByTypeAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc(FeaturedVideo.VideoType type);

    List<FeaturedVideo> findByIsFeaturedTrueAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc();
}

