package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {

    List<Achievement> findByIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc();

    List<Achievement> findByTypeAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc(Achievement.AchievementType type);

    List<Achievement> findByIsFeaturedTrueAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc();
}

