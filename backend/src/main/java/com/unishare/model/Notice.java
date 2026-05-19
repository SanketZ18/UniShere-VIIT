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
@Document(collection = "notices")
public class Notice {
    @Id
    private String id;
    
    private String information;
    private Department department;
    
    private String fileName;
    private String fileUrl;
    private String storageFileName;
    private String contentType;
    
    private String uploadedBy;
    private String uploaderName;
    
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
