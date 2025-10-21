package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Leader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaderRepository extends JpaRepository<Leader, Long> {
    
    Page<Leader> findByIsActiveTrue(Pageable pageable);
    
    List<Leader> findByIsActiveTrueOrderByDisplayOrderAsc();
    
    List<Leader> findByIsFeaturedTrueAndIsActiveTrueOrderByDisplayOrderAsc();
}
