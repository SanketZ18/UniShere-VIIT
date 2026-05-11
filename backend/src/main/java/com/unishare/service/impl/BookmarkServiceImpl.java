package com.unishare.service.impl;

import com.unishare.dto.resource.BookmarkResponse;
import com.unishare.dto.resource.ResourceResponse;
import com.unishare.exception.ResourceNotFoundException;
import com.unishare.model.Bookmark;
import com.unishare.model.UserAccount;
import com.unishare.repository.BookmarkRepository;
import com.unishare.service.AccountDirectoryService;
import com.unishare.service.BookmarkService;
import com.unishare.util.PortalMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final AccountDirectoryService accountDirectoryService;
    private final ResourceServiceImpl resourceService;

    @Override
    public BookmarkResponse toggleBookmark(String resourceId, String userEmail) {
        resourceService.getResourceEntity(resourceId);
        UserAccount account = accountDirectoryService.getByEmail(userEmail);

        return bookmarkRepository.findByUserAccountIdAndResourceId(account.getId(), resourceId)
                .map(existingBookmark -> {
                    bookmarkRepository.delete(existingBookmark);
                    return new BookmarkResponse(resourceId, false);
                })
                .orElseGet(() -> {
                    bookmarkRepository.save(Bookmark.builder()
                            .resourceId(resourceId)
                            .userAccountId(account.getId())
                            .build());
                    return new BookmarkResponse(resourceId, true);
                });
    }

    @Override
    public List<ResourceResponse> getBookmarks(String userEmail) {
        UserAccount account = accountDirectoryService.getByEmail(userEmail);

        return bookmarkRepository.findByUserAccountId(account.getId()).stream()
                .map(Bookmark::getResourceId)
                .map(resourceId -> {
                    try {
                        return PortalMapper.toResourceResponse(resourceService.getResourceEntity(resourceId), true);
                    } catch (ResourceNotFoundException exception) {
                        return null;
                    }
                })
                .filter(java.util.Objects::nonNull)
                .toList();
    }
}
