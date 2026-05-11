package com.unishare.service.impl;

import com.unishare.model.Notification;
import com.unishare.model.enums.Department;
import com.unishare.repository.NotificationRepository;
import com.unishare.service.NotificationService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public Notification createResourceNotification(String resourceId, String title, Department department, boolean isAutoFetched) {
        String source = isAutoFetched ? "SPPU Academic Feed" : "Department Staff";
        Notification notification = Notification.builder()
                .title("New Resource Available")
                .message("New " + title + " has been added via " + source)
                .type("RESOURCE_ADDED")
                .relatedResourceId(resourceId)
                .department(department)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();
        
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getUserNotifications(String userId, Department department) {
        // Fetch global notifications and department-specific ones
        List<Notification> global = notificationRepository.findByTargetUserIdIsNullOrderByCreatedAtDesc();
        List<Notification> deptSpecific = notificationRepository.findByDepartmentOrderByCreatedAtDesc(department);
        List<Notification> userSpecific = notificationRepository.findByTargetUserIdOrderByCreatedAtDesc(userId);
        
        List<Notification> all = new ArrayList<>();
        all.addAll(userSpecific);
        all.addAll(deptSpecific);
        all.addAll(global);
        
        // Return top 20 latest
        return all.stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .limit(20)
                .collect(Collectors.toList());
    }

    @Override
    public void markAsRead(String notificationId) {
        notificationRepository.findById(notificationId).ifPresent(n -> {
            n.setRead(true);
            notificationRepository.save(n);
        });
    }

    @Override
    public void markAllAsRead(String userId) {
        // In a real system, we'd use a more complex logic for global notifications (maybe a join table for read status)
        // But for simplicity in this project, we'll mark all fetched ones as read
        List<Notification> notifications = notificationRepository.findAll(); // Simplified
        notifications.forEach(n -> {
            if (!n.isRead()) {
                n.setRead(true);
                notificationRepository.save(n);
            }
        });
    }

    @Override
    public long getUnreadCount(String userId) {
        return notificationRepository.countByTargetUserIdIsNullAndIsReadFalse();
    }

    @Override
    @Scheduled(cron = "0 0 * * * *") // Every hour
    public void cleanupOldNotifications() {
        LocalDateTime oneDayAgo = LocalDateTime.now().minusDays(1);
        log.info("Cleaning up read notifications older than one day...");
        notificationRepository.deleteByIsReadTrueAndCreatedAtBefore(oneDayAgo);
    }
}
