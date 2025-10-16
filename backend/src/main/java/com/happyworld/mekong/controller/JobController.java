package com.happyworld.mekong.controller;

import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.response.JobResponse;
import com.happyworld.mekong.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@Slf4j
public class JobController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<JobResponse>>> getAllJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        log.info("GET /api/v1/jobs - page: {}, size: {}", page, size);
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("publishedAt").descending());
        Page<JobResponse> jobs = jobService.getActiveJobs(pageable);
        
        return ResponseEntity.ok(ApiResponse.success(jobs));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<JobResponse>> getJobBySlug(@PathVariable String slug) {
        log.info("GET /api/v1/jobs/{}", slug);
        
        JobResponse job = jobService.getJobBySlug(slug);
        
        return ResponseEntity.ok(ApiResponse.success(job));
    }
}

