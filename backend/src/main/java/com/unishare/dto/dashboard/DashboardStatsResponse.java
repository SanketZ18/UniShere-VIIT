package com.unishare.dto.dashboard;

import com.unishare.dto.resource.ResourceResponse;
import java.util.List;
import java.util.Map;

public record DashboardStatsResponse(
        long totalStudents,
        long totalStaff,
        long totalResources,
        long totalDownloads,
        long totalBookmarks,
        Map<String, Long> resourcesByType,
        Map<String, Long> resourcesByDepartment,
        Map<String, Long> studentsByDepartment,
        Map<String, Long> studentsByYear,
        Map<String, Long> staffByDepartment,
        List<ResourceResponse> recentResources,
        List<ResourceResponse> recentAnnouncements
) {
}
