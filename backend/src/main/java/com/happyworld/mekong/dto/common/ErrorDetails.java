package com.happyworld.mekong.dto.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorDetails {

    private String code;
    private String message;
    private Map<String, List<String>> details;
}

