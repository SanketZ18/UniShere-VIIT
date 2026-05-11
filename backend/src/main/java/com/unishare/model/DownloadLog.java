package com.unishare.model;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "download_logs")
public class DownloadLog {

    @Id
    private String id;
    private String userAccountId;
    private String resourceId;

    @CreatedDate
    private Instant downloadedAt;
}
