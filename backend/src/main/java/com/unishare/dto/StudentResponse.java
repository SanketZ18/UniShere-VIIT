package com.unishare.dto;

import com.unishare.model.enums.Department;
import com.unishare.model.enums.Gender;
import com.unishare.model.enums.UserStatus;
import java.time.Instant;

public record StudentResponse(
        String id,
        String prn,
        String fullName,
        String email,
        String mobile,
        Gender gender,
        Department department,
        Integer year,
        Integer semester,
        String division,
        UserStatus status,
        java.time.LocalDate birthDate,
        Instant createdAt
) {
}
