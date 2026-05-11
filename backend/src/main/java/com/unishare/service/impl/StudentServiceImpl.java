package com.unishare.service.impl;

import com.unishare.dto.StudentResponse;
import com.unishare.dto.StudentUpdateRequest;
import com.unishare.exception.ResourceNotFoundException;
import com.unishare.exception.UnauthorizedOperationException;
import com.unishare.model.Student;
import com.unishare.model.UserAccount;
import com.unishare.model.enums.Role;
import com.unishare.repository.StudentRepository;
import com.unishare.service.AccountDirectoryService;
import com.unishare.service.StudentService;
import com.unishare.util.PortalMapper;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final AccountDirectoryService accountDirectoryService;

    @Override
    public List<StudentResponse> getAllStudents() {
        return studentRepository.findAll().stream()
                .sorted(Comparator.comparing(Student::getCreatedAt).reversed())
                .map(PortalMapper::toStudentResponse)
                .toList();
    }

    @Override
    public StudentResponse updateStudent(String id, StudentUpdateRequest request, String requesterEmail) {
        UserAccount requester = accountDirectoryService.getByEmail(requesterEmail);
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        boolean sameStudent = requester.getRole() == Role.STUDENT && id.equals(requester.getUserId());
        boolean privileged = requester.getRole() == Role.SUPER_ADMIN || requester.getRole() == Role.DIRECTOR
                || requester.getRole() == Role.HOD || requester.getRole() == Role.SENIOR_CLERK;

        if (!sameStudent && !privileged) {
            throw new UnauthorizedOperationException("You are not allowed to update this student");
        }

        student.setFullName(request.getFullName());
        student.setMobile(request.getMobile());
        student.setGender(request.getGender());
        student.setDepartment(request.getDepartment());
        student.setYear(request.getYear());
        student.setSemester(request.getSemester());
        student.setDivision(request.getDivision());
        student.setStatus(request.getStatus());

        return PortalMapper.toStudentResponse(studentRepository.save(student));
    }
}
