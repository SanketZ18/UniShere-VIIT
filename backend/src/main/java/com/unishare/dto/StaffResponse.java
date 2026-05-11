package com.unishare.dto;

import com.unishare.model.enums.Department;
import com.unishare.model.enums.Gender;
import com.unishare.model.enums.UserStatus;
import java.time.Instant;
import java.util.List;

public record StaffResponse(
        String id,
        String staffId,
        String fullName,
        String email,
        String mobile,
        Gender gender,
        String designation,
        Department department,
        List<String> subjects,
        UserStatus status,
        java.time.LocalDate birthDate,
        Instant createdAt
) {
}
