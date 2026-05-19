package com.unishare.service;

import com.unishare.dto.NoticeResponse;
import com.unishare.model.enums.Department;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface NoticeService {
    NoticeResponse createNotice(String information, Department department, MultipartFile file, String uploaderEmail);
    List<NoticeResponse> getAllNotices();
    List<NoticeResponse> getNoticesByDepartment(Department department);
    void deleteNotice(String id, String requesterEmail);
}
