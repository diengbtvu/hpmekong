package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.ContactRequest;
import com.happyworld.mekong.entity.Contact;
import com.happyworld.mekong.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final EmailService emailService;
    private final ContactRepository contactRepository;

    @Transactional
    public void sendContact(ContactRequest request) {
        log.info("Processing contact from: {}", request.getEmail());
        
        // Save to database first (this should always succeed)
        Contact contact = Contact.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .topic(request.getTopic())
                .subject(request.getSubject())
                .message(request.getMessage())
                .status(Contact.ContactStatus.NEW)
                .build();
        
        Contact saved = contactRepository.save(contact);
        log.info("Contact saved to database with ID: {}", saved.getId());
        
        // Send email notification (non-blocking - failure should not affect save)
        try {
            String message = String.format(
                    "Name: %s\nEmail: %s\nPhone: %s\nSubject: %s\n\nMessage:\n%s",
                    request.getName(),
                    request.getEmail(),
                    request.getPhone(),
                    request.getSubject(),
                    request.getMessage()
            );
            
            // Send to admin
            emailService.sendSimpleEmail(
                    "info@happyworldmekong.com",
                    "New Contact Form: " + request.getSubject(),
                    message
            );
            log.info("Notification email sent to admin");
            
            // Send confirmation to user
            emailService.sendSimpleEmail(
                    request.getEmail(),
                    "Cảm ơn bạn đã liên hệ - Happy World Mekong",
                    "Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất."
            );
            log.info("Confirmation email sent to user");
        } catch (Exception e) {
            // Email failure should not prevent contact from being saved
            log.warn("Failed to send contact email notification: {}", e.getMessage());
        }
    }

    public Page<Contact> getAllContacts(Pageable pageable) {
        log.info("Getting all contacts with pagination");
        return contactRepository.findAll(pageable);
    }

    @Transactional
    public Contact updateContactStatus(Long id, String statusStr) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
        
        Contact.ContactStatus newStatus = Contact.ContactStatus.valueOf(statusStr.toUpperCase());
        contact.setStatus(newStatus);
        
        if (newStatus == Contact.ContactStatus.RESOLVED || newStatus == Contact.ContactStatus.CLOSED) {
            contact.setHandledAt(LocalDateTime.now());
        }
        
        log.info("Updated contact {} status to {}", id, newStatus);
        return contactRepository.save(contact);
    }

    @Transactional
    public Contact updateContactNote(Long id, String note) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
        
        contact.setAdminNote(note);
        log.info("Updated contact {} admin note", id);
        return contactRepository.save(contact);
    }
}

