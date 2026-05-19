package com.unishare.controller;

import com.unishare.dto.ApiResponse;
import com.unishare.dto.NoticeResponse;
import com.unishare.model.enums.Department;
import com.unishare.service.NoticeService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','DIRECTOR','HOD','STAFF')")
    public ResponseEntity<ApiResponse<NoticeResponse>> createNotice(
            @RequestParam("information") String information,
            @RequestParam("department") Department department,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Notice uploaded successfully",
                noticeService.createNotice(information, department, file, userDetails.getUsername())
        ));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<NoticeResponse>>> getNotices(
            @RequestParam(value = "department", required = false) Department department
    ) {
        List<NoticeResponse> notices;
        if (department != null) {
            notices = noticeService.getNoticesByDepartment(department);
        } else {
            notices = noticeService.getAllNotices();
        }
        return ResponseEntity.ok(ApiResponse.success("Notices fetched successfully", notices));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','DIRECTOR','HOD','STAFF')")
    public ResponseEntity<ApiResponse<Void>> deleteNotice(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        noticeService.deleteNotice(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Notice deleted successfully", null));
    }
}
