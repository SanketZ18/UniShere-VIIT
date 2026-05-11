package com.unishare.controller;

import com.unishare.dto.ApiResponse;
import com.unishare.dto.resource.ResourceResponse;
import com.unishare.dto.resource.ResourceUploadRequest;
import com.unishare.service.ResourceService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {

    private final ResourceService resourceService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','DIRECTOR','HOD','STAFF')")
    public ResponseEntity<ApiResponse<ResourceResponse>> upload(
            @Valid @ModelAttribute ResourceUploadRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Resource uploaded successfully",
                resourceService.upload(request, userDetails.getUsername())
        ));
    }

    @GetMapping("/resources")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','DIRECTOR','HOD','STAFF')")
    public ResponseEntity<ApiResponse<List<ResourceResponse>>> myResources(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Uploaded resources fetched successfully",
                resourceService.getResourcesUploadedBy(userDetails.getUsername())
        ));
    }
}
