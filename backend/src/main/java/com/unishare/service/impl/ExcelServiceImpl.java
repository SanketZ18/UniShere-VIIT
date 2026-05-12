package com.unishare.service.impl;

import com.unishare.dto.auth.RegisterRequest;
import com.unishare.model.enums.Department;
import com.unishare.model.enums.Gender;
import com.unishare.model.enums.Role;
import com.unishare.model.enums.UserStatus;
import com.unishare.service.ExcelService;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ExcelServiceImpl implements ExcelService {

    @Override
    public List<RegisterRequest> parseStudentExcel(InputStream inputStream) {
        List<RegisterRequest> requests = new ArrayList<>();
        try (Workbook workbook = new XSSFWorkbook(inputStream)) {
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            // Skip header row
            if (rows.hasNext()) {
                rows.next();
            }

            while (rows.hasNext()) {
                Row currentRow = rows.next();
                try {
                    RegisterRequest request = new RegisterRequest();
                    request.setRole(Role.STUDENT);
                    request.setStatus(UserStatus.ACTIVE);

                    // Col 0: PRN
                    request.setPrn(getCellValue(currentRow.getCell(0)));
                    // Col 1: Full Name
                    request.setFullName(getCellValue(currentRow.getCell(1)));
                    // Col 2: Email
                    request.setEmail(getCellValue(currentRow.getCell(2)));
                    // Col 3: Mobile
                    request.setMobile(getCellValue(currentRow.getCell(3)));
                    // Col 4: Gender (MALE/FEMALE/OTHER)
                    String genderStr = getCellValue(currentRow.getCell(4));
                    if (!genderStr.isBlank()) {
                        request.setGender(Gender.valueOf(genderStr.toUpperCase()));
                    }
                    // Col 5: Department (MCA/MBA)
                    String deptStr = getCellValue(currentRow.getCell(5));
                    if (!deptStr.isBlank()) {
                        request.setDepartment(Department.valueOf(deptStr.toUpperCase()));
                    }
                    // Col 6: Year
                    request.setYear(getNumericValue(currentRow.getCell(6)));
                    // Col 7: Semester
                    request.setSemester(getNumericValue(currentRow.getCell(7)));
                    // Col 8: Division
                    request.setDivision(getCellValue(currentRow.getCell(8)));
                    
                    // Col 9: Birth Date (YYYY-MM-DD)
                    String birthDateStr = getCellValue(currentRow.getCell(9));
                    if (!birthDateStr.isBlank()) {
                        request.setBirthDate(java.time.LocalDate.parse(birthDateStr));
                    }

                    // Password defaults to PRN@UniShare if not provided
                    String password = getCellValue(currentRow.getCell(10));
                    if (password.isBlank()) {
                        password = request.getPrn() + "@UniShare";
                    }
                    request.setPassword(password);

                    // Col 11: Batch Year (e.g., 2022-26)
                    request.setBatchYear(getCellValue(currentRow.getCell(11)));

                    if (!request.getEmail().isBlank() && !request.getPrn().isBlank()) {
                        requests.add(request);
                    }
                } catch (Exception e) {
                    log.warn("Failed to parse Excel row {}: {}", currentRow.getRowNum(), e.getMessage());
                }
            }
        } catch (Exception e) {
            log.error("Error parsing Excel file", e);
            throw new RuntimeException("Failed to parse Excel file: " + e.getMessage());
        }
        return requests;
    }

    private int getNumericValue(Cell cell) {
        if (cell == null) return 0;
        try {
            if (cell.getCellType() == CellType.NUMERIC) {
                return (int) cell.getNumericCellValue();
            } else if (cell.getCellType() == CellType.STRING) {
                return Integer.parseInt(cell.getStringCellValue().trim());
            }
        } catch (Exception e) {
            log.warn("Failed to parse numeric value from cell: {}", e.getMessage());
        }
        return 0;
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return "";
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> String.valueOf((long) cell.getNumericCellValue());
            default -> "";
        };
    }
}
