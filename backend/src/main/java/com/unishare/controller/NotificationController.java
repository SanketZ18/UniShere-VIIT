package com.unishare.controller;

import com.unishare.model.Notification;
import com.unishare.model.UserAccount;
import com.unishare.service.AccountDirectoryService;
import com.unishare.service.NotificationService;
import java.security.Principal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final AccountDirectoryService accountDirectoryService;

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(Principal principal) {
        UserAccount user = accountDirectoryService.getByEmail(principal.getName());
        return ResponseEntity.ok(notificationService.getUserNotifications(user.getId(), accountDirectoryService.getDepartment(user)));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount(Principal principal) {
        UserAccount user = accountDirectoryService.getByEmail(principal.getName());
        return ResponseEntity.ok(notificationService.getUnreadCount(user.getId()));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable String id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/read-all")
    public ResponseEntity<Void> markAllAsRead(Principal principal) {
        UserAccount user = accountDirectoryService.getByEmail(principal.getName());
        notificationService.markAllAsRead(user.getId());
        return ResponseEntity.ok().build();
    }
}
