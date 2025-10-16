package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {

    Optional<Certificate> findByCertificateCode(String certificateCode);

    Optional<Certificate> findByEnrollmentId(Long enrollmentId);

    List<Certificate> findAllByUserId(Long userId);

    boolean existsByCertificateCode(String certificateCode);
}

