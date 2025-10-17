package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.SiteSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SiteSettingRepository extends JpaRepository<SiteSetting, Long> {

    Optional<SiteSetting> findBySettingKey(String settingKey);

    List<SiteSetting> findBySettingGroup(String settingGroup);

    List<SiteSetting> findByIsPublicTrueOrderByDisplayOrderAsc();

    List<SiteSetting> findBySettingGroupAndIsPublicTrueOrderByDisplayOrderAsc(String settingGroup);
}

