package com.happyworld.mekong.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vn.payos.PayOS;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class PayOSConfig {

    @Value("${payos.client-id}")
    private String clientId;

    @Value("${payos.api-key}")
    private String apiKey;

    @Value("${payos.checksum-key}")
    private String checksumKey;

    @Bean
    public PayOS payOS() {
        log.info("Initializing PayOS with ClientId: {}, ApiKey exists: {}, ChecksumKey exists: {}",
                clientId != null ? "SET" : "NULL",
                apiKey != null ? "SET" : "NULL",
                checksumKey != null ? "SET" : "NULL");

        if (clientId == null || apiKey == null || checksumKey == null) {
            throw new IllegalStateException("PayOS credentials are not properly configured!");
        }

        return new PayOS(clientId, apiKey, checksumKey);
    }
}
