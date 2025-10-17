package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {

    List<Banner> findByIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc();

    List<Banner> findByTypeAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc(Banner.BannerType type);

    @Query("SELECT b FROM Banner b WHERE b.isActive = true AND b.deletedAt IS NULL " +
           "AND (b.startDate IS NULL OR b.startDate <= CURRENT_TIMESTAMP) " +
           "AND (b.endDate IS NULL OR b.endDate >= CURRENT_TIMESTAMP) " +
           "ORDER BY b.displayOrder ASC")
    List<Banner> findActiveScheduledBanners();

    @Query("SELECT b FROM Banner b WHERE b.type = :type AND b.isActive = true AND b.deletedAt IS NULL " +
           "AND (b.startDate IS NULL OR b.startDate <= CURRENT_TIMESTAMP) " +
           "AND (b.endDate IS NULL OR b.endDate >= CURRENT_TIMESTAMP) " +
           "ORDER BY b.displayOrder ASC")
    List<Banner> findActiveScheduledBannersByType(Banner.BannerType type);
}

