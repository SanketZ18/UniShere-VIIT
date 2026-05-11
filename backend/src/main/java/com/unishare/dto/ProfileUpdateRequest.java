package com.unishare.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.Data;

@Data
public class ProfileUpdateRequest {
    private String fullName;

    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be 10 digits")
    private String mobile;

    @Email
    private String email;

    private com.unishare.model.enums.Gender gender;
    private LocalDate birthDate;

    @Pattern(regexp = "^$|^.{8,}$", message = "Password must be at least 8 characters if provided")
    private String password; // Optional update
    private String oldPassword; // Required if password is provided
}
