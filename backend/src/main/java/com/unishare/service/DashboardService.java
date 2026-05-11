package com.unishare.service;

import com.unishare.dto.dashboard.DashboardStatsResponse;

public interface DashboardService {

    DashboardStatsResponse getSummary(String userEmail);
}
