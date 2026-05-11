# UniShare - Smart Academic Content Portal

UniShare - Smart Academic Content Portal is a full-stack academic content portal for college departments, starting with MCA and designed to scale to MBA, BBA, and BBA(CA). The project includes a secure Spring Boot backend with JWT authentication and a React + Tailwind frontend with a Three.js-enhanced landing experience.

## Stack

- Backend: Java 17, Spring Boot 3.4, Spring Security, JWT, Spring Data MongoDB
- Frontend: React 19, Vite, Tailwind CSS 4, React Router, Three.js
- Database: MongoDB Atlas
- Deployment: Render for backend, Vercel for frontend

## Implemented Features

- JWT-secured login flow with RBAC for `SUPER_ADMIN`, `DIRECTOR`, `SENIOR_CLERK`, `HOD`, `STAFF`, and `STUDENT`
- Controlled registration flow with role creation restrictions
- Demo-ready seeded users: 1 admin, 2 staff members, and 5 students
- Student, staff, account, resource, bookmark, and download-log Mongo collections
- Staff upload system for PDF/DOC/DOCX files with local file storage
- Search and filter across subject, type, year, semester, and department
- Download tracking and analytics summary for dashboard cards
- Bookmarking and role-aware dashboard actions
- Responsive frontend with protected routes and animated 3D landing hero
- Environment-driven backend/frontend configuration for deployment

## Project Structure

```text
unishare/
├── backend/
├── frontend/
├── render.yaml
└── README.md
```

## Local Setup

### 1. Backend

```bash
cd backend
./mvnw spring-boot:run
```

Set the backend environment variables from `backend/.env.example` in your terminal, IDE run configuration, or Render service settings before starting the app.

### Demo Accounts

These accounts are seeded automatically when `DEMO_DATA_ENABLED=true`:

- Super Admin: `sanket@unishare.edu` / `Sanket@123`
- Staff: `priya.deshmukh@unishare.edu` / `Priya@123`
- Staff: `rahul.patil@unishare.edu` / `Rahul@123`
- Student: `aarav.kulkarni@unishare.edu` / `Aarav@123`
- Student: `sneha.joshi@unishare.edu` / `Sneha@123`
- Student: `rohan.shinde@unishare.edu` / `Rohan@123`
- Student: `neha.more@unishare.edu` / `Neha@123`
- Student: `omkar.jadhav@unishare.edu` / `Omkar@123`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env` from `frontend/.env.example`, then set `VITE_API_BASE_URL` to the backend URL, for example `http://localhost:8080/api`.

## Default API Surface

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/me`
- `GET /api/students`
- `PUT /api/students/{id}`
- `POST /api/staff/upload`
- `GET /api/staff/resources`
- `GET /api/resources`
- `GET /api/resources/{id}`
- `GET /api/resources/{id}/download`
- `DELETE /api/resources/{id}`
- `POST /api/bookmarks/{resourceId}`
- `GET /api/bookmarks`
- `GET /api/dashboard/summary`

## Student Registration via Excel

For bulk student registration, HODs and Staff can upload an `.xlsx` file. The file must have the following columns in order (starting from Column A):

1. **PRN**: Student's Permanent Registration Number (e.g., `20230123456`)
2. **Full Name**: Full name of the student
3. **Email**: Unique email address
4. **Mobile**: 10-digit mobile number
5. **Gender**: `MALE`, `FEMALE`, or `OTHER`
6. **Department**: `MCA` or `MBA`
7. **Year**: Numeric year (e.g., `1`, `2`)
8. **Semester**: Numeric semester (e.g., `1`, `2`, `3`, `4`)
9. **Division**: Division letter (e.g., `A`, `B`)
10. **Password**: (Optional) Default is `PRN@UniShare` if left empty.

> **Note**: The first row is treated as a header and skipped during processing.

## Deployment Notes

- Render:
  Use `render.yaml` or configure the backend manually with the same build/start commands.
- Vercel:
  The SPA rewrite is already configured in `frontend/vercel.json`.
- MongoDB Atlas:
  Add the Atlas URI to `MONGODB_URI`. Spring Boot needs a database name in the URI, so use a form like `mongodb+srv://.../unishare?appName=UniShare`.
- First admin:
  Set `BOOTSTRAP_ADMIN_EMAIL` and `BOOTSTRAP_ADMIN_PASSWORD` to seed the initial `SUPER_ADMIN`.

## Verification

- Backend: `./mvnw test`
- Frontend: `npm run lint`
- Frontend build: `npm run build`

## The flow of fatching the information from SPPU website

The UniShare system uses an automated Background Synchronization Engine to track and fetch new academic content from the SPPU (Savitribai Phule Pune University) website.

Here is a breakdown of how it knows when new content is uploaded and how it fetches that information:

1. Automated Detection (How it "knows")
The system doesn't wait for a user to trigger it. Instead, it uses a Scheduled Task (ExternalAcademicContentInitializer) that runs every 30 minutes by default.

Unique Fingerprinting: For every document it finds, it generates a unique "Resource Key" (e.g., sppu-mca-2024-pattern-papers).
Change Tracking: Before fetching anything, it checks the UniShare database. If the Resource Key already exists, the system knows it's an old file and skips it. If the key is new, it flags it for download.
2. The Fetching Mechanism (How it works)
The system performs a process called Web Scraping using a library called Jsoup. It follows these steps:

Crawling the Portal: The system visits the SPPU examination and circular sections (SharePoint-based portals). It automatically navigates through multiple pages of the "Exam Docs" library.
Targeted Filtering: It specifically looks for files that match the 2024 Pattern for MCA and MBA. It scans the link titles for keywords like "2024", "PATTERN", "MCA", and "MBA".
Deep PDF Inspection: Unlike a simple downloader, UniShare actually "reads" the downloaded PDFs using a tool called Apache PDFBox.
It opens the first two pages of the PDF.
It extracts the Subject Name and Semester directly from the document text to ensure the resource is categorized correctly in your dashboard.
3. Key Data Sources
The system is configured to monitor several specific SPPU URLs:

Syllabus: Monitors the official circulars for the new 2024 NEP Syllabus.
Question Papers: Crawls the examdocs section for the April 2025 (and future) examination series.
Announcements: Scrapes the "News and Announcements" list for any university-wide updates regarding the 2024 pattern.
Summary of Workflow
mermaid
graph TD
    A[Scheduled Trigger - Every 30 mins] --> B[Crawl SPPU SharePoint Lists]
    B --> C{Find .pdf links?}
    C -- Yes --> D{Match '2024 Pattern' & 'MCA/MBA'?}
    D -- Yes --> E[Generate Unique Resource Key]
    E --> F{Is it already in DB?}
    F -- No --> G[Download PDF]
    G --> H[Extract Subject & Sem using AI/Regex]
    H --> I[Save to UniShare Library]
    F -- Yes --> J[Skip]
This ensures that as soon as the university uploads a new 2024 pattern paper or syllabus, it appears on your UniShare Dashboard within 30 minutes without any manual intervention.
