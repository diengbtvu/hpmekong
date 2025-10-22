package com.happyworld.mekong.controller;

import com.happyworld.mekong.dto.common.ApiResponse;
import com.happyworld.mekong.dto.request.ContactRequest;
import com.happyworld.mekong.entity.Contact;
import com.happyworld.mekong.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/contacts")
    public ResponseEntity<ApiResponse<Void>> submitContact(@Valid @RequestBody ContactRequest request) {
        log.info("POST /api/v1/contacts - Submit contact form from: {}", request.getEmail());
        contactService.sendContact(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(null, "Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm."));
    }

    @GetMapping("/admin/contacts")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<Contact>>> getAllContacts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        log.info("GET /api/v1/admin/contacts - Admin get all contacts");
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Contact> contacts = contactService.getAllContacts(pageable);
        
        return ResponseEntity.ok(ApiResponse.success(contacts.getContent()));
    }

    @PatchMapping("/admin/contacts/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Contact>> updateContactStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        log.info("PATCH /api/v1/admin/contacts/{}/status - Update status to: {}", id, status);
        Contact updated = contactService.updateContactStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success(updated, "Cập nhật trạng thái thành công"));
    }

    @PatchMapping("/admin/contacts/{id}/note")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Contact>> updateContactNote(
            @PathVariable Long id,
            @RequestParam String note) {
        log.info("PATCH /api/v1/admin/contacts/{}/note - Update admin note", id);
        Contact updated = contactService.updateContactNote(id, note);
        return ResponseEntity.ok(ApiResponse.success(updated, "Cập nhật ghi chú thành công"));
    }
}

