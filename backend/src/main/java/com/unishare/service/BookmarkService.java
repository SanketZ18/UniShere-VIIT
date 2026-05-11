package com.unishare.service;

import com.unishare.dto.resource.BookmarkResponse;
import com.unishare.dto.resource.ResourceResponse;
import java.util.List;

public interface BookmarkService {

    BookmarkResponse toggleBookmark(String resourceId, String userEmail);

    List<ResourceResponse> getBookmarks(String userEmail);
}
