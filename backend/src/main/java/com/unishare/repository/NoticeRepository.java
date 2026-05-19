package com.unishare.repository;

import com.unishare.model.Notice;
import com.unishare.model.enums.Department;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NoticeRepository extends MongoRepository<Notice, String> {
    List<Notice> findByDepartmentOrderByCreatedAtDesc(Department department);
    List<Notice> findAllByOrderByCreatedAtDesc();
}
