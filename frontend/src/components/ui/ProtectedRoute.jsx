import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function FullscreenLoader() {
  return (
    <div className="portal-dashboard-shell flex min-h-screen items-center justify-center">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-amber-300" />
    </div>
  )
}

export default function ProtectedRoute({ allowedRoles }) {
  const { booting, isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (booting) {
    return <FullscreenLoader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location, loginRequired: true }} />
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
