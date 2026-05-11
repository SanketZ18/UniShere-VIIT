package com.unishare.config;

import com.unishare.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BootstrapAdminInitializer implements CommandLineRunner {

    private final AuthService authService;

    @Override
    public void run(String... args) {
        authService.bootstrapAdminIfNeeded();
    }
}
