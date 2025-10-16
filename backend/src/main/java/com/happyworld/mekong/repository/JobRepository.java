package com.happyworld.mekong.repository;

import com.happyworld.mekong.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {

    Optional<Job> findBySlug(String slug);

    Page<Job> findAllByStatus(Job.JobStatus status, Pageable pageable);

    Page<Job> findAllByCompanyIdAndStatus(Long companyId, Job.JobStatus status, Pageable pageable);

    Page<Job> findAllByCityAndStatus(String city, Job.JobStatus status, Pageable pageable);

    Page<Job> findAllByIsFeaturedTrueAndStatus(Job.JobStatus status, Pageable pageable);

    boolean existsBySlug(String slug);
}

