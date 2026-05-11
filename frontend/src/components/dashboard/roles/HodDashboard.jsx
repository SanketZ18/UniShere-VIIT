import {
  Activity,
  ArrowRight,
  Bell,
  Clock,
  Database,
  FileText,
  Layers,
  PlusCircle,
  ShieldCheck,
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { deleteResource } from '../../../services/resourceService'

export default function HodDashboard({ user, summary }) {
  const [announcements, setAnnouncements] = useState(summary?.recentAnnouncements || [])
  const [deletingId, setDeletingId] = useState(null)

  const stats = [
    { label: 'Total Students', value: summary?.totalStudents || 0, icon: Users, shell: 'bg-amber-100 text-amber-700' },
    { label: 'Resources', value: summary?.totalResources || 0, icon: Database, shell: 'bg-orange-100 text-orange-700' },
    { label: 'Faculty', value: summary?.totalStaff || 0, icon: ShieldCheck, shell: 'bg-emerald-100 text-emerald-700' },
  ]

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return
    
    setDeletingId(id)
    try {
      await deleteResource(id)
      setAnnouncements(prev => prev.filter(a => a.id !== id))
    } catch (err) {
      alert('Failed to delete announcement.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6 pb-8 animate-in">
      <section className="portal-banner rounded-[2.4rem] p-8 sm:p-10">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
              <ShieldCheck size={13} />
              HOD Command | {user?.department}
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Knowledge Governance for the
              <span className="block bg-[linear-gradient(135deg,#f59e0b_0%,#f97316_52%,#ea580c_100%)] bg-clip-text text-transparent">
                {user?.department} Division
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-800 sm:text-base">
              Manage your department's resources, academic announcements, and student metrics from this centralized leadership hub.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="portal-panel portal-3d rounded-[1.8rem] p-5">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.shell}`}>
                  <stat.icon size={20} />
                </div>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.22em] text-slate-700">{stat.label}</p>
                <p className="mt-2 text-2xl font-black text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-8 space-y-6">
          {/* Announcement Management Section */}
          <div className="portal-panel portal-3d rounded-[2.4rem] p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
                  <Bell size={12} />
                  Announcements & Academic Signals
                </div>
                <h2 className="mt-4 text-2xl font-black text-slate-900">Manage Department Notices</h2>
              </div>
              <Link to="/upload" className="portal-button-primary flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-black uppercase tracking-[0.18em]">
                <PlusCircle size={15} />
                Add New
              </Link>
            </div>

            <div className="space-y-4">
              {announcements.length ? (
                announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="portal-3d flex items-center justify-between gap-4 rounded-[1.6rem] border border-slate-100 bg-slate-50/50 p-5 transition hover:border-amber-200 hover:bg-white"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                        <Bell size={22} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-black uppercase tracking-[0.08em] text-slate-900">{announcement.title}</h3>
                        <p className="mt-1 truncate text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">
                          {announcement.type} | {new Date(announcement.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      disabled={deletingId === announcement.id}
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 transition hover:bg-rose-100 disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.8rem] border border-dashed border-slate-200 bg-slate-50/30 px-6 py-12 text-center">
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-800">No active notices to manage</p>
                </div>
              )}
            </div>
          </div>

          {/* Repository Section */}
          <div className="portal-panel portal-3d rounded-[2.4rem] p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
                  <Layers size={12} />
                  Department Repository
                </div>
                <h2 className="mt-4 text-2xl font-black text-slate-900">Recent Syllabus & Notes</h2>
              </div>
              <Link to="/resources" className="portal-button-secondary flex h-11 w-11 items-center justify-center rounded-2xl">
                <Layers size={18} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {summary?.recentResources?.length ? (
                summary.recentResources.slice(0, 4).map((resource) => (
                  <Link
                    key={resource.id}
                    to="/resources"
                    className="portal-3d rounded-[1.6rem] border border-slate-100 bg-slate-50/50 p-5 transition hover:border-amber-200 hover:bg-white"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                        <FileText size={22} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-orange-700">
                            {resource.type}
                          </span>
                        </div>
                        <h3 className="mt-3 truncate text-sm font-black uppercase tracking-[0.08em] text-slate-900">
                          {resource.title}
                        </h3>
                        <p className="mt-1 truncate text-xs font-medium text-slate-700">{resource.subject}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-[1.8rem] border border-dashed border-slate-200 bg-slate-50/30 px-6 py-12 text-center sm:col-span-2">
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-800">No resources found</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="lg:col-span-4 space-y-6">
          {/* Quick Actions */}
          <div className="portal-panel portal-3d rounded-[2.4rem] p-8">
            <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
              <Activity size={12} />
              Quick Actions
            </div>
            <div className="mt-6 space-y-3">
              <Link to="/register" className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 transition hover:border-amber-200">
                <span className="text-sm font-black uppercase tracking-[0.1em] text-slate-900">Manage Students</span>
                <Users size={16} className="text-slate-700" />
              </Link>
              <Link to="/upload" className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 transition hover:border-amber-200">
                <span className="text-sm font-black uppercase tracking-[0.1em] text-slate-900">Upload Resources</span>
                <PlusCircle size={16} className="text-slate-700" />
              </Link>
            </div>
          </div>

          <div className="portal-panel portal-3d rounded-[2.4rem] p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-amber-100 text-amber-700 shadow-xl">
              <ShieldCheck size={30} />
            </div>
            <h3 className="mt-6 text-xl font-black text-slate-900">HOD Verification</h3>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
              You are accessing the leadership node for {user?.department}. All deletions and uploads are logged under your identity.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
