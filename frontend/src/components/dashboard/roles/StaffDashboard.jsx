import {
  Activity,
  ArrowRight,
  Clock,
  FileText,
  Layers,
  TrendingUp,
  Upload,
  Users,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function StaffDashboard({ user, summary }) {
  const stats = [
    { label: 'Uploads', value: summary?.totalResources || 0, icon: Upload, shell: 'bg-amber-100 text-amber-700' },
    { label: 'Student Reach', value: '240+', icon: Users, shell: 'bg-orange-100 text-orange-700' },
    { label: 'System Status', value: 'Prime', icon: Activity, shell: 'bg-emerald-100 text-emerald-700' },
  ]

  return (
    <div className="space-y-6 pb-8 animate-in">
      <section className="portal-banner rounded-[2.4rem] p-8 sm:p-10">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
              <Zap size={13} />
              Staff Dashboard | {user?.department}
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Curating Knowledge for the
              <span className="block bg-[linear-gradient(135deg,#f59e0b_0%,#f97316_52%,#ea580c_100%)] bg-clip-text text-transparent">
                {user?.department} Department
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-800 sm:text-base">
              The staff experience now uses the same portal palette and calmer motion language so publishing and reviewing materials feels cleaner and more focused.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/upload"
              className="portal-button-primary inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-[0.18em]"
            >
              Publish Content
              <Upload size={15} />
            </Link>
            <Link
              to="/resources"
              className="portal-button-secondary inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-black uppercase tracking-[0.18em]"
            >
              View Repository
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="portal-panel portal-3d rounded-[2rem] p-6">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.shell}`}>
              <stat.icon size={22} />
            </div>
            <p className="mt-5 text-[11px] font-black uppercase tracking-[0.22em] text-slate-700">{stat.label}</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{stat.value}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-8 space-y-6">
          <div className="portal-panel portal-3d rounded-[2.4rem] p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
                  <Layers size={12} />
                  Repository
                </div>
                <h2 className="mt-4 text-2xl font-black text-slate-900">Department repository overview</h2>
              </div>
              <Link to="/resources" className="portal-button-secondary flex h-11 w-11 items-center justify-center rounded-2xl">
                <Layers size={18} />
              </Link>
            </div>

            <div className="space-y-4">
              {summary?.recentResources?.length ? (
                summary.recentResources.slice(0, 5).map((resource) => (
                  <div
                    key={resource.id}
                    className="portal-3d flex items-center justify-between gap-4 rounded-[1.6rem] border border-slate-100 bg-slate-50/50 p-5 transition hover:border-amber-200 hover:bg-white"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                        <FileText size={22} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-black uppercase tracking-[0.08em] text-slate-900">{resource.title}</h3>
                        <p className="mt-1 truncate text-xs font-medium text-slate-700">
                          {resource.subject} | Semester {resource.semester}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 items-center gap-3 sm:flex">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-700">
                        {resource.type}
                      </span>
                      <ArrowRight size={16} className="text-slate-700" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.8rem] border border-dashed border-slate-200 bg-slate-50/30 px-6 py-12 text-center">
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-800">No uploaded files yet</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="lg:col-span-4 space-y-6">
          <div className="portal-panel portal-3d rounded-[2.4rem] p-8">
            <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
              <TrendingUp size={12} />
              Academic Signals
            </div>
            <div className="mt-6 space-y-4">
              {summary?.recentAnnouncements?.length ? (
                summary.recentAnnouncements.slice(0, 3).map((announcement) => (
                  announcement.fileUrl ? (
                    <a
                      key={announcement.id}
                      href={announcement.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portal-3d block rounded-[1.5rem] border border-slate-100 bg-slate-50/50 p-4 transition hover:border-amber-200 hover:bg-white"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-emerald-700">
                          {announcement.subject || 'Active Notice'}
                        </p>
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.1em] text-amber-800">
                          Attachment
                        </span>
                      </div>
                      <h3 className="mt-2 line-clamp-2 text-sm font-black text-slate-900">{announcement.title}</h3>
                    </a>
                  ) : (
                    <div
                      key={announcement.id}
                      className="portal-3d block rounded-[1.5rem] border border-slate-100 bg-slate-50/50 p-4 bg-slate-50/30"
                    >
                      <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-600">
                        {announcement.subject || 'Active Notice'}
                      </p>
                      <h3 className="mt-2 text-sm font-semibold text-slate-900">{announcement.title}</h3>
                    </div>
                  )
                ))
              ) : (
                <p className="text-sm font-medium text-slate-700">No department notices available right now.</p>
              )}
            </div>
            <Link
              to="/upload"
              className="portal-button-secondary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-xs font-black uppercase tracking-[0.18em]"
            >
              Quick Upload
              <Upload size={15} />
            </Link>
          </div>

          <div className="portal-panel portal-3d rounded-[2.4rem] p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                <Upload size={22} />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-700">Rapid Sync</p>
                <h3 className="mt-1 text-xl font-black text-slate-900">Ready to publish</h3>
              </div>
            </div>
            <p className="mt-5 text-sm font-medium leading-7 text-slate-700">
              Upload notes, question papers, and syllabus files with the same color language used on the landing page for a smoother visual flow.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
