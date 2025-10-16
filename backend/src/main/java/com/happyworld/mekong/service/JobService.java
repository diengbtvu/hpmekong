package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.response.JobResponse;
import com.happyworld.mekong.entity.Job;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobService {

    private final JobRepository jobRepository;

    @Transactional(readOnly = true)
    public Page<JobResponse> getActiveJobs(Pageable pageable) {
        Page<Job> jobs = jobRepository.findAllByStatus(Job.JobStatus.ACTIVE, pageable);
        return jobs.map(this::mapToJobResponse);
    }

    @Transactional(readOnly = true)
    public JobResponse getJobBySlug(String slug) {
        Job job = jobRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "slug", slug));

        // Increment view count
        job.setViewCount(job.getViewCount() + 1);
        jobRepository.save(job);

        return mapToJobResponse(job);
    }

    private JobResponse mapToJobResponse(Job job) {
        JobResponse.JobResponseBuilder builder = JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .slug(job.getSlug())
                .description(job.getDescription())
                .jobType(job.getJobType() != null ? job.getJobType().name() : null)
                .level(job.getLevel())
                .experienceYears(job.getExperienceYears())
                .city(job.getCity())
                .district(job.getDistrict())
                .isRemote(job.getIsRemote())
                .salaryMin(job.getSalaryMin())
                .salaryMax(job.getSalaryMax())
                .salaryCurrency(job.getSalaryCurrency())
                .salaryPeriod(job.getSalaryPeriod() != null ? job.getSalaryPeriod().name() : null)
                .isSalaryNegotiable(job.getIsSalaryNegotiable())
                .showSalary(job.getShowSalary())
                .applicationMethod(job.getApplicationMethod() != null ? job.getApplicationMethod().name() : null)
                .applicationEmail(job.getApplicationEmail())
                .applicationUrl(job.getApplicationUrl())
                .status(job.getStatus().name())
                .isFeatured(job.getIsFeatured())
                .isUrgent(job.getIsUrgent())
                .viewCount(job.getViewCount())
                .applicationCount(job.getApplicationCount())
                .publishedAt(job.getPublishedAt())
                .expiresAt(job.getExpiresAt())
                .createdAt(job.getCreatedAt());

        // Company info
        if (job.getCompany() != null) {
            builder.company(JobResponse.CompanyBasicResponse.builder()
                    .id(job.getCompany().getId())
                    .name(job.getCompany().getName())
                    .slug(job.getCompany().getSlug())
                    .logoUrl(job.getCompany().getLogoUrl())
                    .city(job.getCompany().getCity())
                    .industry(job.getCompany().getIndustry())
                    .build());
        }

        return builder.build();
    }
}

