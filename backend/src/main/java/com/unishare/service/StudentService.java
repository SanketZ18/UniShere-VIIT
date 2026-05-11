package com.unishare.service;

import com.unishare.dto.StudentResponse;
import com.unishare.dto.StudentUpdateRequest;
import java.util.List;

public interface StudentService {

    List<StudentResponse> getAllStudents();

    StudentResponse updateStudent(String id, StudentUpdateRequest request, String requesterEmail);
}
