package com.happyworld.mekong.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Async
    public void sendWelcomeEmail(String toEmail, String fullName) {
        log.info("Sending welcome email to: {}", toEmail);

        Map<String, Object> variables = new HashMap<>();
        variables.put("name", fullName);
        variables.put("appUrl", frontendUrl);

        sendHtmlEmail(
                toEmail,
                "Chào mừng đến với Happy World Mekong",
                "welcome",
                variables
        );
    }

    @Async
    public void sendVerificationEmail(String toEmail, String fullName, String verificationToken) {
        log.info("Sending verification email to: {}", toEmail);

        Map<String, Object> variables = new HashMap<>();
        variables.put("name", fullName);
        variables.put("verificationLink", frontendUrl + "/verify-email?token=" + verificationToken);

        sendHtmlEmail(
                toEmail,
                "Xác thực tài khoản Happy World Mekong",
                "verification",
                variables
        );
    }

    @Async
    public void sendPasswordResetEmail(String toEmail, String fullName, String resetToken) {
        log.info("Sending password reset email to: {}", toEmail);

        Map<String, Object> variables = new HashMap<>();
        variables.put("name", fullName);
        variables.put("resetLink", frontendUrl + "/reset-password?token=" + resetToken);

        sendHtmlEmail(
                toEmail,
                "Đặt lại mật khẩu",
                "password-reset",
                variables
        );
    }

    @Async
    public void sendEnrollmentConfirmationEmail(String toEmail, String fullName, String courseTitle, String courseUrl) {
        log.info("Sending enrollment confirmation email to: {}", toEmail);

        Map<String, Object> variables = new HashMap<>();
        variables.put("name", fullName);
        variables.put("courseTitle", courseTitle);
        variables.put("courseUrl", frontendUrl + "/courses/" + courseUrl);

        sendHtmlEmail(
                toEmail,
                "Chào mừng bạn đến với " + courseTitle,
                "enrollment-confirmation",
                variables
        );
    }

    @Async
    public void sendCertificateEmail(String toEmail, String fullName, String courseTitle, String certificateCode) {
        log.info("Sending certificate email to: {}", toEmail);

        Map<String, Object> variables = new HashMap<>();
        variables.put("name", fullName);
        variables.put("courseTitle", courseTitle);
        variables.put("certificateCode", certificateCode);
        variables.put("certificateUrl", frontendUrl + "/certificates/" + certificateCode);

        sendHtmlEmail(
                toEmail,
                "Chúc mừng bạn hoàn thành khóa học: " + courseTitle,
                "certificate",
                variables
        );
    }

    @Async
    public void sendContactReplyEmail(String toEmail, String name, String replyMessage) {
        log.info("Sending contact reply email to: {}", toEmail);

        Map<String, Object> variables = new HashMap<>();
        variables.put("name", name);
        variables.put("message", replyMessage);

        sendHtmlEmail(
                toEmail,
                "Phản hồi từ Happy World Mekong",
                "contact-reply",
                variables
        );
    }

    private void sendHtmlEmail(String to, String subject, String templateName, Map<String, Object> variables) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            Context context = new Context();
            context.setVariables(variables);
            
            String html = templateEngine.process("email/" + templateName, context);

            helper.setFrom(fromEmail, "Happy World Mekong");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);

            mailSender.send(message);
            log.info("Email sent successfully to: {}", to);

        } catch (MessagingException e) {
            log.error("Failed to send email to: {}", to, e);
        } catch (Exception e) {
            log.error("Unexpected error sending email to: {}", to, e);
        }
    }

    @Async
    public void sendSimpleEmail(String to, String subject, String text) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

            helper.setFrom(fromEmail, "Happy World Mekong");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, false);

            mailSender.send(message);
            log.info("Simple email sent to: {}", to);

        } catch (Exception e) {
            log.error("Failed to send simple email to: {}", to, e);
        }
    }
}

