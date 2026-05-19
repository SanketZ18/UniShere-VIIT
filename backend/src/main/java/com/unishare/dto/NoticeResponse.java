package com.unishare.dto;

import com.unishare.model.enums.Department;
import java.time.LocalDateTime;

public record NoticeResponse(
    String id,
    String information,
    Department department,
    String fileName,
    String fileUrl,
    String uploaderName,
    LocalDateTime createdAt
) {}
