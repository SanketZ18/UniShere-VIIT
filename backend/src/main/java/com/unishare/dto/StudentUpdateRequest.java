package com.unishare.dto;

import com.unishare.model.enums.Department;
import com.unishare.model.enums.Gender;
import com.unishare.model.enums.UserStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class StudentUpdateRequest {

    @NotBlank
    private String fullName;

    @NotBlank
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be 10 digits")
    private String mobile;

    @NotNull
    private Gender gender;

    @NotNull
    private Department department;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer year;

    @NotNull
    @Min(1)
    @Max(10)
    private Integer semester;

    @NotBlank
    private String division;

    @NotNull
    private UserStatus status;

    @NotNull
    private java.time.LocalDate birthDate;
}
