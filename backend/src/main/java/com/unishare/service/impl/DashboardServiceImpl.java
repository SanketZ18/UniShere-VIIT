package com.unishare.service.impl;

import com.unishare.dto.dashboard.DashboardStatsResponse;
import com.unishare.dto.resource.ResourceResponse;
import com.unishare.model.Resource;
import com.unishare.model.Notice;
import com.unishare.model.UserAccount;
import com.unishare.repository.BookmarkRepository;
import com.unishare.repository.DownloadLogRepository;
import com.unishare.repository.ResourceRepository;
import com.unishare.repository.NoticeRepository;
import com.unishare.repository.StaffRepository;
import com.unishare.repository.StudentRepository;
import com.unishare.repository.UserAccountRepository;
import com.unishare.service.DashboardService;
import com.unishare.util.PortalMapper;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final StudentRepository studentRepository;
    private final StaffRepository staffRepository;
    private final ResourceRepository resourceRepository;
    private final NoticeRepository noticeRepository;
    private final DownloadLogRepository downloadLogRepository;
    private final BookmarkRepository bookmarkRepository;
    private final UserAccountRepository userAccountRepository;

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(DashboardServiceImpl.class);

    @Override
    public DashboardStatsResponse getSummary(String userEmail) {
        List<Resource> resources = resourceRepository.findAll();
        List<com.unishare.model.Student> students = studentRepository.findAll();
        log.info("Total students found in DB: {}", students.size());
        
        Map<String, Long> studentsByDept = students.stream()
                .filter(s -> s.getDepartment() != null)
                .collect(Collectors.groupingBy(s -> s.getDepartment().name(), Collectors.counting()));
        log.info("Students by Dept: {}", studentsByDept);
        
        Map<String, Long> studentsByYear = students.stream()
                .filter(s -> s.getYear() != null)
                .collect(Collectors.groupingBy(s -> s.getYear().toString(), Collectors.counting()));
        log.info("Students by Year: {}", studentsByYear);

        List<com.unishare.model.Staff> staffList = staffRepository.findAll();
        log.info("Total staff found in DB: {}", staffList.size());
        Map<String, Long> staffByDept = staffList.stream()
                .filter(s -> s.getDepartment() != null)
                .collect(Collectors.groupingBy(s -> s.getDepartment().name(), Collectors.counting()));
        log.info("Staff by Dept: {}", staffByDept);
        
        long bookmarkCount = 0;
        UserAccount user = userAccountRepository.findByEmailIgnoreCase(userEmail).orElse(null);
        if (user != null) {
            bookmarkCount = bookmarkRepository.findByUserAccountId(user.getId()).size();
        }

        Map<String, Long> typeStats = resources.stream()
                .collect(Collectors.groupingBy(resource -> resource.getType().name(), Collectors.counting()));
        
        Map<String, Long> departmentStats = resources.stream()
                .collect(Collectors.groupingBy(resource -> resource.getDepartment().name(), Collectors.counting()));
        
        List<ResourceResponse> recentResources = resources.stream()
                .filter(r -> r.getType() != com.unishare.model.enums.ResourceType.ANNOUNCEMENT)
                .sorted(Comparator.comparing(Resource::getCreatedAt).reversed())
                .limit(6)
                .map(resource -> PortalMapper.toResourceResponse(resource, false))
                .toList();

        List<ResourceResponse> recentAnnouncements = noticeRepository.findAll().stream()
                .sorted(Comparator.comparing(Notice::getCreatedAt).reversed())
                .limit(5)
                .map(notice -> new ResourceResponse(
                        notice.getId(),
                        notice.getInformation(),
                        notice.getInformation(),
                        com.unishare.model.enums.ResourceType.ANNOUNCEMENT,
                        notice.getDepartment().name() + " Department",
                        notice.getUploadedBy(),
                        notice.getUploaderName(),
                        notice.getFileUrl(),
                        notice.getFileName(),
                        notice.getContentType(),
                        notice.getDepartment(),
                        1,
                        1,
                        0L,
                        false,
                        false,
                        notice.getCreatedAt().atZone(java.time.ZoneId.systemDefault()).toInstant()
                ))
                .toList();

        return new DashboardStatsResponse(
                studentRepository.count(),
                staffRepository.count(),
                resourceRepository.count(),
                downloadLogRepository.count(),
                bookmarkCount,
                typeStats,
                departmentStats,
                studentsByDept,
                studentsByYear,
                staffByDept,
                recentResources,
                recentAnnouncements
        );
    }
}

