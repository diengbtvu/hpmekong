package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    Optional<Company> findBySlug(String slug);

    Optional<Company> findByOwnerId(Long ownerId);

    boolean existsBySlug(String slug);
}

