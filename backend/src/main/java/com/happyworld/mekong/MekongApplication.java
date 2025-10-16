package com.happyworld.mekong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class MekongApplication {

    public static void main(String[] args) {
        SpringApplication.run(MekongApplication.class, args);
        System.out.println("\n✅ Happy World Mekong Backend Started Successfully!");
        System.out.println("📚 API Documentation: http://localhost:8080/api/v1");
        System.out.println("🔍 Health Check: http://localhost:8080/actuator/health\n");
    }
}

