package com.unishare.bootstrap;

import com.unishare.model.Staff;
import com.unishare.model.Student;
import com.unishare.model.UserAccount;
import com.unishare.model.enums.Department;
import com.unishare.model.enums.Gender;
import com.unishare.model.enums.Role;
import com.unishare.model.enums.UserStatus;
import com.unishare.repository.StaffRepository;
import com.unishare.repository.StudentRepository;
import com.unishare.repository.UserAccountRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DemoDataInitializer implements CommandLineRunner {

    private final StudentRepository studentRepository;
    private final StaffRepository staffRepository;
    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.demo-data.enabled:true}")
    private boolean demoDataEnabled;

    @Override
    public void run(String... args) {
        if (!demoDataEnabled) {
            log.info("Demo data seeding is disabled");
            return;
        }

        seedAdmin();
        seedStaffMembers();
        seedStudents();
    }

    private void seedAdmin() {
        Staff adminProfile = staffRepository.findByEmailIgnoreCase("sanket@unishare.edu")
                .orElseGet(() -> staffRepository.save(Staff.builder()
                        .staffId("ADMIN001")
                        .fullName("Sanket Zagade")
                        .email("sanket@unishare.edu")
                        .mobile("9876543210")
                        .gender(Gender.MALE)
                        .designation("Super Admin")
                        .department(Department.MCA)
                        .subjects(List.of("Portal Administration", "System Governance"))
                        .status(UserStatus.ACTIVE)
                        .build()));

        upsertAccount("sanket@unishare.edu", "Sanket@123", Role.SUPER_ADMIN, adminProfile.getId());
    }

    private void seedStaffMembers() {
        List<StaffSeed> staffSeeds = List.of(
                new StaffSeed(
                        "STAFF001",
                        "Prof. Priya Deshmukh",
                        "priya.deshmukh@unishare.edu",
                        "9876543211",
                        Gender.FEMALE,
                        "Assistant Professor",
                        Department.MCA,
                        List.of("Advanced Java", "Software Engineering"),
                        "Priya@123"
                ),
                new StaffSeed(
                        "STAFF002",
                        "Prof. Rahul Patil",
                        "rahul.patil@unishare.edu",
                        "9876543212",
                        Gender.MALE,
                        "Assistant Professor",
                        Department.MCA,
                        List.of("Python Programming", "Data Structures"),
                        "Rahul@123"
                )
        );

        for (StaffSeed staffSeed : staffSeeds) {
            Staff staff = staffRepository.findByEmailIgnoreCase(staffSeed.email())
                    .orElseGet(() -> staffRepository.save(Staff.builder()
                            .staffId(staffSeed.staffId())
                            .fullName(staffSeed.fullName())
                            .email(staffSeed.email())
                            .mobile(staffSeed.mobile())
                            .gender(staffSeed.gender())
                            .designation(staffSeed.designation())
                            .department(staffSeed.department())
                            .subjects(staffSeed.subjects())
                            .status(UserStatus.ACTIVE)
                            .build()));

            upsertAccount(staffSeed.email(), staffSeed.password(), Role.STAFF, staff.getId());
        }
    }

    private void seedStudents() {
        List<StudentSeed> studentSeeds = List.of(
                new StudentSeed("MCA24001", "Aarav Kulkarni", "aarav.kulkarni@unishare.edu", "9876543221", Gender.MALE, 1, 1, "A", "Aarav@123"),
                new StudentSeed("MCA24002", "Sneha Joshi", "sneha.joshi@unishare.edu", "9876543222", Gender.FEMALE, 1, 1, "A", "Sneha@123"),
                new StudentSeed("MCA24003", "Rohan Shinde", "rohan.shinde@unishare.edu", "9876543223", Gender.MALE, 1, 2, "A", "Rohan@123"),
                new StudentSeed("MCA24004", "Neha More", "neha.more@unishare.edu", "9876543224", Gender.FEMALE, 1, 2, "B", "Neha@123"),
                new StudentSeed("MCA24005", "Omkar Jadhav", "omkar.jadhav@unishare.edu", "9876543225", Gender.MALE, 2, 3, "A", "Omkar@123")
        );

        for (StudentSeed studentSeed : studentSeeds) {
            Student student = studentRepository.findByEmailIgnoreCase(studentSeed.email())
                    .orElseGet(() -> studentRepository.save(Student.builder()
                            .prn(studentSeed.prn())
                            .fullName(studentSeed.fullName())
                            .email(studentSeed.email())
                            .mobile(studentSeed.mobile())
                            .gender(studentSeed.gender())
                            .department(Department.MCA)
                            .year(studentSeed.year())
                            .semester(studentSeed.semester())
                            .division(studentSeed.division())
                            .status(UserStatus.ACTIVE)
                            .build()));

            upsertAccount(studentSeed.email(), studentSeed.password(), Role.STUDENT, student.getId());
        }
    }

    private void upsertAccount(String email, String rawPassword, Role role, String userId) {
        userAccountRepository.findByEmailIgnoreCase(email)
                .ifPresentOrElse(existingAccount -> {
                    existingAccount.setRole(role);
                    existingAccount.setUserId(userId);
                    userAccountRepository.save(existingAccount);
                }, () -> userAccountRepository.save(UserAccount.builder()
                        .email(email)
                        .password(passwordEncoder.encode(rawPassword))
                        .role(role)
                        .userId(userId)
                        .build()));
    }

    private record StaffSeed(
            String staffId,
            String fullName,
            String email,
            String mobile,
            Gender gender,
            String designation,
            Department department,
            List<String> subjects,
            String password
    ) {
    }

    private record StudentSeed(
            String prn,
            String fullName,
            String email,
            String mobile,
            Gender gender,
            Integer year,
            Integer semester,
            String division,
            String password
    ) {
    }
}
