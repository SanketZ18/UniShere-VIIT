import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ui/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'
import BookmarksPage from './pages/BookmarksPage'
import DashboardPage from './pages/DashboardPage'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import ResourcesPage from './pages/ResourcesPage'
import UploadPage from './pages/UploadPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  useEffect(() => {
    // Silently pre-warm the Render free-tier backend on app mount
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085/api'
    const healthUrl = apiBaseUrl.replace(/\/api\/?$/, '/actuator/health')
    
    fetch(healthUrl)
      .then((res) => {
        console.log('UniShare backend pre-warm status:', res.status)
      })
      .catch((err) => {
        console.warn('UniShare backend pre-warm offline/waking up:', err)
      })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
           <Route path="/dashboard" element={<DashboardPage />} />
           <Route path="/resources" element={<ResourcesPage />} />
           <Route path="/bookmarks" element={<BookmarksPage />} />
           <Route path="/profile" element={<ProfilePage />} />
         </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'DIRECTOR', 'HOD', 'STAFF']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/upload" element={<UploadPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'DIRECTOR', 'SENIOR_CLERK', 'HOD']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
