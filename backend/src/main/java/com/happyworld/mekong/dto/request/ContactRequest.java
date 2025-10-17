package com.happyworld.mekong.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactRequest {
    
    @NotBlank(message = "Tên là bắt buộc")
    @Size(max = 255, message = "Tên không quá 255 ký tự")
    private String name;
    
    @NotBlank(message = "Email là bắt buộc")
    @Email(message = "Email không hợp lệ")
    private String email;
    
    @Size(max = 20, message = "Số điện thoại không quá 20 ký tự")
    private String phone;
    
    @NotBlank(message = "Chủ đề là bắt buộc")
    @Size(max = 500, message = "Chủ đề không quá 500 ký tự")
    private String subject;
    
    @NotBlank(message = "Nội dung là bắt buộc")
    @Size(max = 2000, message = "Nội dung không quá 2000 ký tự")
    private String message;
}

