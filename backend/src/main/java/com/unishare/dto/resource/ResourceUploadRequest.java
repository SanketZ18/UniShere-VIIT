package com.unishare.dto.resource;

import com.unishare.model.enums.Department;
import com.unishare.model.enums.ResourceType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ResourceUploadRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private ResourceType type;

    @NotBlank
    private String subject;

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

    @NotNull
    private MultipartFile file;
}
