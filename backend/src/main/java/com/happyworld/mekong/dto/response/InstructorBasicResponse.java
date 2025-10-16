package com.happyworld.mekong.dto.response;

import lombok.*;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InstructorBasicResponse {
    private Long id;
    private String name;
    private String title;
    private String avatarUrl;
    private String shortBio;
    private BigDecimal averageRating;
    private Integer totalStudents;
    private Integer totalCourses;
}

