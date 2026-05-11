package com.unishare.service;

import com.unishare.dto.UserProfileResponse;
import com.unishare.model.UserAccount;
import com.unishare.model.enums.Department;

public interface AccountDirectoryService {

    UserAccount getByEmail(String email);

    UserProfileResponse buildProfile(UserAccount account);

    String getDisplayName(UserAccount account);

    Department getDepartment(UserAccount account);
}
