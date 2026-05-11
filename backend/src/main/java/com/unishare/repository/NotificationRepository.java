package com.unishare.repository;

import com.unishare.model.Notification;
import com.unishare.model.enums.Department;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByTargetUserIdOrderByCreatedAtDesc(String targetUserId);
    List<Notification> findByDepartmentOrderByCreatedAtDesc(Department department);
    List<Notification> findByTargetUserIdIsNullOrderByCreatedAtDesc();
    
    long countByTargetUserIdAndIsReadFalse(String targetUserId);
    long countByTargetUserIdIsNullAndIsReadFalse();
    
    void deleteByIsReadTrueAndCreatedAtBefore(LocalDateTime expiryDate);
}
