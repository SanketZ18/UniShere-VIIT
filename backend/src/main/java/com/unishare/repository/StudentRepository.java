package com.unishare.repository;

import com.unishare.model.Student;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student, String> {

    Optional<Student> findByEmailIgnoreCase(String email);

    Optional<Student> findByPrn(String prn);

    boolean existsByPrn(String prn);

    boolean existsByEmailIgnoreCase(String email);
}
