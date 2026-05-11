import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { fetchDashboardSummary } from '../services/dashboardService'
import EmptyState from '../components/ui/EmptyState'

import StudentDashboard from '../components/dashboard/roles/StudentDashboard'
import StaffDashboard from '../components/dashboard/roles/StaffDashboard'
import AdminDashboard from '../components/dashboard/roles/AdminDashboard'
import ClerkDashboard from '../components/dashboard/roles/ClerkDashboard'
import HodDashboard from '../components/dashboard/roles/HodDashboard'

export default function DashboardPage() {
  const { user } = useAuth()
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    fetchDashboardSummary()
      .then((response) => {
        if (active) {
          setSummary(response)
          setError('')
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.response?.data?.message || 'Unable to load dashboard summary.')
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <div className="w-full px-2 py-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="portal-panel h-24 rounded-2xl" />
          ))}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3 animate-pulse">
          <div className="portal-panel lg:col-span-2 h-64 rounded-3xl" />
          <div className="portal-panel h-64 rounded-3xl" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full px-2 py-6">
        <EmptyState title="Dashboard unavailable" description={error} />
      </div>
    )
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'STUDENT':
        return <StudentDashboard user={user} summary={summary} />
      case 'STAFF':
        return <StaffDashboard user={user} summary={summary} />
      case 'SENIOR_CLERK':
        return <ClerkDashboard user={user} summary={summary} />
      case 'HOD':
        return <HodDashboard user={user} summary={summary} />
      case 'DIRECTOR':
      case 'SUPER_ADMIN':
      default:
        return <AdminDashboard user={user} summary={summary} />
    }
  }

  return (
    <div className="w-full px-2 py-2">
      {renderDashboard()}
    </div>
  )
}
