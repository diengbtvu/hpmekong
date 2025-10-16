package com.happyworld.mekong.dto.response;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {

    private Long id;
    private String title;
    private String slug;
    private String description;
    private List<String> requirements;
    private List<String> benefits;
    
    private CompanyBasicResponse company;
    
    private String jobType;
    private String level;
    private String experienceYears;
    
    private String location;
    private String city;
    private String district;
    private Boolean isRemote;
    
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String salaryCurrency;
    private String salaryPeriod;
    private Boolean isSalaryNegotiable;
    private Boolean showSalary;
    
    private String applicationMethod;
    private String applicationEmail;
    private String applicationUrl;
    
    private List<String> skillsRequired;
    
    private String status;
    private Boolean isFeatured;
    private Boolean isUrgent;
    
    private Integer viewCount;
    private Integer applicationCount;
    
    private LocalDateTime publishedAt;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompanyBasicResponse {
        private Long id;
        private String name;
        private String slug;
        private String logoUrl;
        private String city;
        private String industry;
    }
}

