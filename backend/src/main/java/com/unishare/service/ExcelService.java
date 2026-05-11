package com.unishare.service;

import com.unishare.dto.auth.RegisterRequest;
import java.io.InputStream;
import java.util.List;

public interface ExcelService {
    List<RegisterRequest> parseStudentExcel(InputStream inputStream);
}
