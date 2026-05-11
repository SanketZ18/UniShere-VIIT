package com.unishare.controller;

import com.unishare.dto.ApiResponse;
import com.unishare.dto.resource.BookmarkResponse;
import com.unishare.dto.resource.ResourceResponse;
import com.unishare.service.BookmarkService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping("/{resourceId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<BookmarkResponse>> toggleBookmark(
            @PathVariable String resourceId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Bookmark status updated successfully",
                bookmarkService.toggleBookmark(resourceId, userDetails.getUsername())
        ));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<ResourceResponse>>> getBookmarks(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(ApiResponse.success(
                "Bookmarked resources fetched successfully",
                bookmarkService.getBookmarks(userDetails.getUsername())
        ));
    }
}
