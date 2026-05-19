# Deployment Guide for UniShare

This guide provides step-by-step instructions for deploying the **UniShare** project.

## 1. Backend Deployment (Render)

The backend is a Java Spring Boot application. We will deploy it using Render's Infrastructure-as-Code feature (`render.yaml`).

### Steps:
1.  **Connect GitHub**: Log in to [Render](https://render.com) and connect your GitHub account.
2.  **Create Blueprint**: Click **"New +"** and select **"Blueprint"**.
3.  **Select Repository**: Choose the `UniShere-VIIT` repository.
4.  **Configure Service**: Render will automatically detect the `render.yaml` file.
5.  **Set Environment Variables**: In the Render dashboard for your new service, you **must** set the following variables:
    *   `MONGODB_URI`: Your MongoDB Atlas connection string.
    *   `JWT_SECRET`: A long, random string for security.
    *   `CORS_ALLOWED_ORIGINS`: Set this to your Vercel deployment URL (e.g., `https://unishare-frontend.vercel.app`).
    *   `BOOTSTRAP_ADMIN_EMAIL`: Email for the initial admin account.
    *   `BOOTSTRAP_ADMIN_PASSWORD`: Password for the initial admin account.

### Important Note on File Storage:
Render's free tier uses an ephemeral file system. Uploaded files will be deleted whenever the service restarts. For a production app, it is recommended to use **Cloudinary** or **AWS S3** for persistent storage.

---

## 2. Frontend Deployment (Vercel)

The frontend is a Vite + React application.

### Steps:
1.  **Connect GitHub**: Log in to [Vercel](https://vercel.com) and connect your GitHub account.
2.  **Add New Project**: Click **"Add New"** -> **"Project"**.
3.  **Import Repository**: Choose the `UniShere-VIIT` repository.
4.  **Configure Project**:
    *   **Root Directory**: Set this to `frontend`.
    *   **Framework Preset**: Vite.
    *   **Build Command**: `npm run build`.
    *   **Output Directory**: `dist`.
5.  **Environment Variables**: Add the following variable:
    *   `VITE_API_BASE_URL`: Your Render backend API URL (e.g., `https://unishare-backend.onrender.com/api`).
6.  **Deploy**: Click **"Deploy"**.

---

## 3. Post-Deployment Checklist
- [ ] Verify that the backend is running by visiting `https://your-backend.onrender.com/actuator/health`. It should say `{"status":"UP"}`.
- [ ] Update the `CORS_ALLOWED_ORIGINS` in Render with the final Vercel URL if it changed.
- [ ] Log in with the `BOOTSTRAP_ADMIN_EMAIL` you configured to start managing the portal.

---

## 4. Keeping the Backend Active 24/7 (Free Tier Optimization)

Render's free tier web services spin down to zero after 15 minutes of inactivity. When a user visits the site, this causes a "cold start" delay of about 50 seconds.

We have added **eager pre-warming** inside the frontend so the server begins waking up immediately when the user lands on the homepage. To keep the server awake **24/7** so it is always instant, you can use a free external pinging service:

### Option A: Cron-Job.org (Recommended)
1. Go to [Cron-Job.org](https://cron-job.org) and create a free account.
2. Click **"Create Cronjob"**.
3. Set the title to `UniShare Backend Keep-Alive`.
4. Enter the address: `https://your-backend-backend-url.onrender.com/actuator/health` (replace with your actual Render backend URL).
5. Set the execution interval to **Every 10 minutes** (since Render sleeps after 15 minutes).
6. Click **Create**.

### Option B: UptimeRobot (Free Health Monitor)
1. Go to [UptimeRobot.com](https://uptimerobot.com) and create a free account.
2. Click **"Add New Monitor"**.
3. Choose monitor type: **HTTP(S)**.
4. Set Friendly Name: `UniShare Backend`.
5. Enter URL: `https://your-backend-backend-url.onrender.com/actuator/health`.
6. Set Monitoring Interval to **Every 5 or 10 minutes**.
7. Click **Create Monitor**.

*Note: Render provides 750 free instance hours per month. Since a 31-day month has 744 hours, this is enough to keep exactly **one** service running continuously 24/7 without exceeding the free tier.*
