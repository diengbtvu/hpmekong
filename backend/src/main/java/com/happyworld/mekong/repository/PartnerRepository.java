package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, Long> {

    List<Partner> findByIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc();

    List<Partner> findByTypeAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc(Partner.PartnerType type);

    List<Partner> findByIsFeaturedTrueAndIsActiveTrueAndDeletedAtIsNullOrderByDisplayOrderAsc();
}

