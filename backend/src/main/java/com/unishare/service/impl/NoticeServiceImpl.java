package com.unishare.service.impl;

import com.unishare.dto.NoticeResponse;
import com.unishare.exception.ResourceNotFoundException;
import com.unishare.exception.UnauthorizedOperationException;
import com.unishare.model.Notice;
import com.unishare.model.UserAccount;
import com.unishare.model.enums.Department;
import com.unishare.model.enums.Role;
import com.unishare.repository.NoticeRepository;
import com.unishare.service.AccountDirectoryService;
import com.unishare.service.FileStorageService;
import com.unishare.service.NoticeService;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;
    private final FileStorageService fileStorageService;
    private final AccountDirectoryService accountDirectoryService;

    @Override
    public NoticeResponse createNotice(String information, Department department, MultipartFile file, String uploaderEmail) {
        UserAccount uploader = accountDirectoryService.getByEmail(uploaderEmail);
        if (!(uploader.getRole() == Role.HOD || uploader.getRole() == Role.SUPER_ADMIN || uploader.getRole() == Role.DIRECTOR || uploader.getRole() == Role.STAFF)) {
            throw new UnauthorizedOperationException("Only authorized staff can create department notices");
        }

        String fileName = null;
        String fileUrl = null;
        String storageFileName = null;
        String contentType = null;

        if (file != null && !file.isEmpty()) {
            FileStorageService.StoredFile storedFile = fileStorageService.store(file);
            fileName = storedFile.originalFileName();
            fileUrl = storedFile.storageFileName();
            storageFileName = storedFile.storageFileName();
            contentType = storedFile.contentType();
        }

        Notice notice = noticeRepository.save(Notice.builder()
                .information(information)
                .department(department)
                .fileName(fileName)
                .fileUrl(fileUrl)
                .storageFileName(storageFileName)
                .contentType(contentType)
                .uploadedBy(uploader.getId())
                .uploaderName(accountDirectoryService.getDisplayName(uploader))
                .createdAt(LocalDateTime.now())
                .build());

        log.info("Notice {} created by {}", notice.getId(), uploaderEmail);
        return mapToResponse(notice);
    }

    @Override
    public List<NoticeResponse> getAllNotices() {
        return noticeRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<NoticeResponse> getNoticesByDepartment(Department department) {
        return noticeRepository.findByDepartmentOrderByCreatedAtDesc(department).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void deleteNotice(String id, String requesterEmail) {
        UserAccount requester = accountDirectoryService.getByEmail(requesterEmail);
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notice not found"));

        boolean sameUploader = requester.getId().equals(notice.getUploadedBy());
        boolean elevated = requester.getRole() == Role.SUPER_ADMIN || requester.getRole() == Role.DIRECTOR
                || requester.getRole() == Role.HOD;

        if (!sameUploader && !elevated) {
            throw new UnauthorizedOperationException("You are not allowed to delete this notice");
        }

        noticeRepository.deleteById(id);
        try {
            if (notice.getStorageFileName() != null && !notice.getStorageFileName().isBlank()) {
                fileStorageService.delete(notice.getStorageFileName());
            }
        } catch (IOException exception) {
            log.warn("Notice deleted but file cleanup failed for {}", notice.getStorageFileName(), exception);
        }
        log.info("Notice {} deleted by {}", id, requesterEmail);
    }

    private NoticeResponse mapToResponse(Notice notice) {
        return new NoticeResponse(
                notice.getId(),
                notice.getInformation(),
                notice.getDepartment(),
                notice.getFileName(),
                notice.getFileUrl(),
                notice.getUploaderName(),
                notice.getCreatedAt()
        );
    }
}
