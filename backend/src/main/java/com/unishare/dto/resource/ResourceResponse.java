package com.unishare.dto.resource;

import com.unishare.model.enums.Department;
import com.unishare.model.enums.ResourceType;
import java.time.Instant;

public record ResourceResponse(
        String id,
        String title,
        String description,
        ResourceType type,
        String subject,
        String uploadedBy,
        String uploaderName,
        String fileUrl,
        String fileName,
        String contentType,
        Department department,
        Integer year,
        Integer semester,
        long downloadCount,
        boolean bookmarked,
        Instant createdAt
) {
}
