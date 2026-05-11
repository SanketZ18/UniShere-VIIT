package com.unishare.repository;

import com.unishare.model.Staff;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StaffRepository extends MongoRepository<Staff, String> {

    Optional<Staff> findByEmailIgnoreCase(String email);

    Optional<Staff> findByStaffId(String staffId);

    boolean existsByStaffId(String staffId);

    boolean existsByEmailIgnoreCase(String email);
}
