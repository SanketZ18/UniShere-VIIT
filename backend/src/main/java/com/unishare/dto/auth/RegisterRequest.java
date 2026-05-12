package com.unishare.dto.auth;

import com.unishare.model.enums.Department;
import com.unishare.model.enums.Gender;
import com.unishare.model.enums.Role;
import com.unishare.model.enums.UserStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotNull
    private Role role;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

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
    private UserStatus status;

    @NotNull
    private java.time.LocalDate birthDate;

    private String prn;

    @Min(1)
    @Max(5)
    private Integer year;

    @Min(1)
    @Max(10)
    private Integer semester;

    private String division;
    private String batchYear;
    private String staffId;
    private String designation;

    @Size(max = 20)
    private List<String> subjects = new ArrayList<>();
}
