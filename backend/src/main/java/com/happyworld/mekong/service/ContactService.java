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

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final EmailService emailService;
    private final ContactRepository contactRepository;

    @Transactional
    public void sendContact(ContactRequest request) {
        log.info("Processing contact from: {}", request.getEmail());
        
        // Save to database
        Contact contact = Contact.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .subject(request.getSubject())
                .message(request.getMessage())
                .status(Contact.ContactStatus.NEW)
                .build();
        contactRepository.save(contact);
        
        // Send email notification
        String message = String.format(
                "Name: %s\nEmail: %s\nPhone: %s\nSubject: %s\n\nMessage:\n%s",
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getSubject(),
                request.getMessage()
        );
        
        try {
            // Send to admin
            emailService.sendSimpleEmail(
                    "info@happyworldmekong.com",
                    "New Contact Form: " + request.getSubject(),
                    message
            );
            
            // Send confirmation to user
            emailService.sendSimpleEmail(
                    request.getEmail(),
                    "Cảm ơn bạn đã liên hệ - Happy World Mekong",
                    "Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất."
            );
        } catch (Exception e) {
            log.error("Error sending contact email", e);
        }
    }

    public Page<Contact> getAllContacts(Pageable pageable) {
        log.info("Getting all contacts with pagination");
        return contactRepository.findAll(pageable);
    }
}

