package com.unishare.repository;

import com.unishare.model.Resource;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResourceRepository extends MongoRepository<Resource, String> {

    List<Resource> findByUploadedBy(String uploadedBy);

    Optional<Resource> findByResourceKey(String resourceKey);
    boolean existsByResourceKey(String resourceKey);
    long countByStorageFileName(String storageFileName);
}
