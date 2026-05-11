package com.unishare.repository;

import com.unishare.model.DownloadLog;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DownloadLogRepository extends MongoRepository<DownloadLog, String> {

    long countByResourceId(String resourceId);

    List<DownloadLog> findTop10ByOrderByDownloadedAtDesc();
}
