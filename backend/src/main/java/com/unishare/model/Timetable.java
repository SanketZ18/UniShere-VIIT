package com.unishare.model;

import com.unishare.model.enums.Department;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "timetables")
public class Timetable {
    @Id
    private String id;
    
    private Department department;
    private Integer semester;
    
    private String batch; // e.g. "Batch : 2024-26"
    private String pattern; // e.g. "2024 Pattern"
    private String wef; // e.g. "2nd September 2024, Monday"
    private String classroom; // e.g. "C5"
    private String lab; // e.g. "LAB - 3"
    private String classCoordinator; // e.g. "Mr. Rakesh Kulkarni"
    
    private List<TimetableRow> rows;
    private List<CourseDetail> courses;
    
    private String updatedBy;
    private String uploaderName;
    
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimetableRow {
        private String time; // e.g. "9.00 to 10.00 am"
        private boolean isBreak; // true if this is a Tea or Lunch break row
        private String breakName; // e.g. "Tea" or "Lunch"
        
        // Subject initials or name for each day
        private String monday;
        private String tuesday;
        private String wednesday;
        private String thursday;
        private String friday;
        private String saturday;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CourseDetail {
        private String srNo; // e.g. "1", or "7" or empty
        private String courseTitle; // e.g. "Python Programming"
        private String courseCode; // e.g. "IT11"
        private String cp; // e.g. "3" (Credits)
        private String ext; // e.g. "50"
        private String intMarks; // e.g. "25"
        private String faculty; // e.g. "Ms. Vaishnavi Tilekar"
        
        private boolean isHeader; // true for separator rows like "*Practical" or "Soft Skills and IKS"
        private String headerText; // if isHeader is true, the text to display across the columns
    }
}
