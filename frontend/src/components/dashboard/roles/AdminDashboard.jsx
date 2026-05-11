import {
  Activity,
  ArrowRight,
  Briefcase,
  Clock,
  Database,
  FolderOpen,
  PlusCircle,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminDashboard({ user, summary }) {
  const navigate = useNavigate()

  const stats = [
    { label: 'Students', value: summary?.totalStudents || 0, icon: Users, shell: 'bg-amber-100 text-amber-700' },
    { label: 'Resources', value: summary?.totalResources || 0, icon: Database, shell: 'bg-orange-100 text-orange-700' },
    { label: 'Platform State', value: 'Optimal', icon: Activity, shell: 'bg-emerald-100 text-emerald-700' },
  ]

  const adminActions = [
    { title: 'Create Student Accounts', role: 'STUDENT', icon: PlusCircle, desc: 'Provision new learner profiles', shell: 'bg-amber-100 text-amber-700' },
    { title: 'Create Staff Accounts', role: 'STAFF', icon: FolderOpen, desc: 'Manage faculty and team access', shell: 'bg-orange-100 text-orange-700' },
  ]

  return (
    <div className="space-y-6 pb-8 animate-in">
      <section className="portal-banner rounded-[1.25rem] p-6 sm:p-8">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
              <ShieldCheck size={13} />
              Admin Command Center
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Unified Control for the
              <span className="block bg-[linear-gradient(135deg,#f59e0b_0%,#f97316_48%,#ea580c_100%)] bg-clip-text text-transparent">
                VIIT Academic Portal
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-800 sm:text-base">
              Review activity, manage access, and monitor academic operations from a professional light-theme control surface built for institutional clarity.
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
          <div className="portal-panel portal-3d rounded-[1.25rem] p-6">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
                  <PlusCircle size={12} />
                  Identity Provisioning
                </div>
                <h2 className="mt-4 text-2xl font-black text-slate-900">Create and manage institutional access</h2>
              </div>
              <Link to="/register" className="portal-button-secondary flex h-11 w-11 items-center justify-center rounded-2xl">
                <PlusCircle size={18} />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {adminActions.map((action) => (
                <Link
                  key={action.role}
                  to={`/register?role=${action.role}`}
                  className="portal-panel portal-3d rounded-[1.8rem] p-6 transition-colors hover:border-amber-200"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.shell}`}>
                      <action.icon size={26} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">{action.title}</h3>
                      <p className="mt-1 text-xs font-medium text-slate-700">{action.desc}</p>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-slate-700" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="portal-panel portal-3d rounded-[1.25rem] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database size={20} className="text-amber-600" />
                <h3 className="text-xl font-black text-slate-900">Academic Resource Intelligence</h3>
              </div>
              <Link to="/resources" className="text-[10px] font-black uppercase tracking-widest text-amber-700 hover:underline">
                View Repository
              </Link>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-3">
              {Object.entries(summary?.typeStats || {}).slice(0, 3).map(([type, count]) => (
                <div key={type} className="rounded-3xl border border-slate-100 bg-slate-50/50 p-5 transition hover:border-amber-200 hover:bg-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{type}</p>
                  <p className="mt-2 text-2xl font-black text-slate-900">{count}</p>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full bg-amber-500" style={{ width: `${Math.min(100, (count / (summary?.totalResources || 1)) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-slate-100 pt-8">
              <div className="mb-4 flex items-center gap-2">
                <Activity size={16} className="text-emerald-600" />
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Recent System Activity</h4>
              </div>
              <div className="space-y-3">
                {(summary?.recentResources || []).slice(0, 3).map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <FolderOpen size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 line-clamp-1">{resource.title}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{resource.department} • {resource.type}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400">
                      {new Date(resource.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lg:col-span-4 space-y-6">
          <div className="portal-panel portal-3d rounded-[1.25rem] p-6">
            <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
              <TrendingUp size={12} />
              Student Distribution
            </div>
            <div className="mt-6 space-y-5">
              {['MCA', 'MBA'].map((department) => {
                const count = summary?.studentsByDepartment?.[department] || 0
                const total = (summary?.studentsByDepartment?.MCA || 0) + (summary?.studentsByDepartment?.MBA || 0) || 1
                const width = Math.round((count / total) * 100)

                return (
                  <button
                    key={department}
                    onClick={() => navigate(`/register?role=STUDENT&dept=${department}`)}
                    className="w-full text-left"
                  >
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-black uppercase tracking-[0.18em] text-slate-800">{department}</span>
                      <span className="text-slate-700 font-bold">{count} students</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-[linear-gradient(90deg,#facc15_0%,#f97316_100%)]" style={{ width: `${width}%` }} />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="portal-panel portal-3d rounded-[1.25rem] p-6">
            <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
              <Briefcase size={12} />
              Staff Distribution
            </div>
            <div className="mt-6 space-y-5">
              {['MCA', 'MBA'].map((department) => {
                const count = summary?.staffByDepartment?.[department] || 0
                const total = (summary?.staffByDepartment?.MCA || 0) + (summary?.staffByDepartment?.MBA || 0) || 1
                const width = Math.round((count / total) * 100)

                return (
                  <button
                    key={department}
                    onClick={() => navigate(`/register?role=STAFF&dept=${department}`)}
                    className="w-full text-left"
                  >
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-black uppercase tracking-[0.18em] text-slate-800">{department}</span>
                      <span className="text-slate-700 font-bold">{count} members</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-[linear-gradient(90deg,#fbbf24_0%,#fb7185_100%)]" style={{ width: `${width}%` }} />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="portal-panel portal-3d rounded-[2rem] p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-amber-200 bg-amber-50">
                <div className="absolute h-10 w-10 rounded-full bg-amber-100 animate-ping" />
                <Zap size={24} className="text-amber-600" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-700">System Health</p>
                <h3 className="mt-1 text-xl font-black text-slate-900">Verified Node</h3>
                <p className="mt-1 text-sm font-medium text-slate-700">Administrative services are optimal.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
