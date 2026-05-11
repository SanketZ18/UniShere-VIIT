package com.unishare.controller;

import com.unishare.dto.ApiResponse;
import com.unishare.dto.StudentResponse;
import com.unishare.dto.StudentUpdateRequest;
import com.unishare.service.StudentService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','DIRECTOR','SENIOR_CLERK','HOD','STAFF')")
    public ResponseEntity<ApiResponse<List<StudentResponse>>> getStudents() {
        return ResponseEntity.ok(ApiResponse.success("Students fetched successfully", studentService.getAllStudents()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','DIRECTOR','SENIOR_CLERK','HOD','STUDENT')")
    public ResponseEntity<ApiResponse<StudentResponse>> updateStudent(
            @PathVariable String id,
            @Valid @RequestBody StudentUpdateRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Student updated successfully",
                studentService.updateStudent(id, request, userDetails.getUsername())
        ));
    }
}
