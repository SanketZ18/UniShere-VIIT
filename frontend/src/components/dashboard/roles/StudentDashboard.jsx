import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  Layers,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function StudentDashboard({ user, summary }) {
  const stats = [
    { label: 'Resources', value: summary?.totalResources || 0, icon: BookOpen, shell: 'bg-amber-100 text-amber-700' },
    { label: 'Downloads', value: summary?.totalDownloads || 0, icon: BookOpen, shell: 'bg-orange-100 text-orange-700' },
    { label: 'Peer Access', value: user?.active ? 'Active' : 'Locked', icon: Users, shell: user?.active ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700' },
  ]

  return (
    <div className="space-y-6 pb-8 animate-in">
      <section className="portal-banner rounded-[2.4rem] p-8 sm:p-10">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
              <GraduationCap size={13} />
              Student Portal | {user?.department || 'MCA'}
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Welcome back,
              <span className="block bg-[linear-gradient(135deg,#f59e0b_0%,#f97316_52%,#ea580c_100%)] bg-clip-text text-transparent">
                {user?.fullName?.split(' ')[0]}
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-800 sm:text-base">
              Your academic workspace now follows a professional light-theme design system, consistent with the institutional landing page for a seamless experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/resources"
              className="portal-button-primary inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-[0.18em]"
            >
              Open Library
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/bookmarks"
              className="portal-button-secondary inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-[0.18em]"
            >
              Saved Resources
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="portal-panel portal-3d rounded-[2rem] p-6">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.shell}`}>
              <stat.icon size={22} />
            </div>
            <p className="mt-5 text-[11px] font-black uppercase tracking-[0.22em] text-slate-700">{stat.label}</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
        <div className="portal-panel portal-3d rounded-[2rem] p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <Search size={22} />
          </div>
          <p className="mt-5 text-[11px] font-black uppercase tracking-[0.22em] text-slate-700">Search Ready</p>
          <p className="mt-2 text-3xl font-black text-slate-900">Fast</p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-8 space-y-6">
          <div className="portal-panel portal-3d rounded-[2.4rem] p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
                  <Layers size={12} />
                  Recent Resources
                </div>
                <h2 className="mt-4 text-2xl font-black text-slate-900">Fresh uploads from your department</h2>
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
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-slate-800">
                            Sem {resource.semester}
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
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-800">No recent resources yet</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="lg:col-span-4 space-y-6">
          <div className="portal-panel portal-3d rounded-[2.4rem] p-8">
            <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
              <Clock size={12} />
              Announcements
            </div>
            <div className="mt-6 space-y-4">
              {summary?.recentAnnouncements?.length ? (
                summary.recentAnnouncements.slice(0, 3).map((announcement) => (
                  <a
                    key={announcement.id}
                    href={announcement.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portal-3d block rounded-[1.5rem] border border-slate-100 bg-slate-50/50 p-4 transition hover:border-amber-200 hover:bg-white"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">SPPU Update</p>
                    <h3 className="mt-2 line-clamp-2 text-sm font-black text-slate-900">{announcement.title}</h3>
                  </a>
                ))
              ) : (
                <p className="text-sm font-medium text-slate-700">No active academic announcements.</p>
              )}
            </div>
          </div>

          <div className="portal-panel portal-3d rounded-[2.4rem] p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Calendar size={22} />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-700">Timeline</p>
                <h3 className="mt-1 text-xl font-black text-slate-900">Current Academic Cycle</h3>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm">
                <span className="font-medium text-slate-800">Mid-term preparation</span>
                <span className="font-black uppercase tracking-[0.18em] text-amber-700">12 days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-800">Term-end review</span>
                <span className="font-black uppercase tracking-[0.18em] text-amber-700">Upcoming</span>
              </div>
            </div>
          </div>




        </section>
      </div>
    </div>
  )
}
