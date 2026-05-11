package com.unishare.service;

import com.unishare.model.Notification;
import com.unishare.model.enums.Department;
import java.util.List;

public interface NotificationService {
    Notification createResourceNotification(String resourceId, String title, Department department, boolean isAutoFetched);
    List<Notification> getUserNotifications(String userId, Department department);
    void markAsRead(String notificationId);
    void markAllAsRead(String userId);
    long getUnreadCount(String userId);
    void cleanupOldNotifications();
}
