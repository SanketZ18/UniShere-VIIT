package com.unishare.model;

import com.unishare.model.enums.Department;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "notifications")
public class Notification {
    @Id
    private String id;
    
    private String title;
    private String message;
    private String type; // e.g., "RESOURCE_ADDED", "ANNOUNCEMENT"
    private String relatedResourceId;
    private String targetUserId; // If null, it's a global notification
    private Department department; // For department-specific notifications
    private boolean isRead;
    private LocalDateTime createdAt;
}
