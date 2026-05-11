package com.unishare.config;

import com.unishare.service.ExternalAcademicContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ExternalAcademicContentInitializer implements CommandLineRunner {

    private final ExternalAcademicContentService externalAcademicContentService;

    @Override
    public void run(String... args) {
        // Run initial sync in a background thread to avoid blocking startup
        new Thread(() -> {
            try {
                Thread.sleep(5000); // Wait a few seconds for system to settle
                externalAcademicContentService.syncConfiguredResources();
            } catch (Exception e) {
                // Background sync failure shouldn't crash the app
            }
        }).start();
    }

    @Scheduled(
            fixedDelayString = "${app.external-content.sync-interval-ms:1800000}",
            initialDelayString = "${app.external-content.sync-initial-delay-ms:300000}"
    )
    public void syncOnSchedule() {
        externalAcademicContentService.syncConfiguredResources();
    }
}
