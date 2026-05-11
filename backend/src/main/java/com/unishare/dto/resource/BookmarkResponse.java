package com.unishare.dto.resource;

public record BookmarkResponse(
        String resourceId,
        boolean bookmarked
) {
}
