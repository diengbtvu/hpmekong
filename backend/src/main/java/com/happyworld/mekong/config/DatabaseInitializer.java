package com.happyworld.mekong.config;

import com.happyworld.mekong.entity.Role;
import com.happyworld.mekong.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
@Order(1)
public class DatabaseInitializer {

    private final RoleRepository roleRepository;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initializeData() {
        log.info("=== Initializing Database Data ===");
        initializeRoles();
        log.info("=== Database Initialization Completed ===");
    }

    private void initializeRoles() {
        long roleCount = roleRepository.count();
        log.info("Current role count: {}", roleCount);
        
        if (roleCount == 0) {
            log.info("Creating default roles...");

            createRoleIfNotExists("ROLE_SUPER_ADMIN", "Super Admin", "Quyền cao nhất - Full access");
            createRoleIfNotExists("ROLE_ADMIN", "Admin", "Quản trị viên");
            createRoleIfNotExists("ROLE_USER", "User", "Người dùng thông thường");
            createRoleIfNotExists("ROLE_STUDENT", "Student", "Học viên");
            createRoleIfNotExists("ROLE_INSTRUCTOR", "Instructor", "Giảng viên");

            log.info("✅ All roles created successfully!");
        } else {
            log.info("✓ Roles already exist, skipping initialization");
        }
    }

    private void createRoleIfNotExists(String name, String displayName, String description) {
        if (!roleRepository.existsByName(name)) {
            Role role = Role.builder()
                    .name(name)
                    .displayName(displayName)
                    .description(description)
                    .build();
            roleRepository.save(role);
            log.info("✓ Created role: {}", name);
        }
    }
}
