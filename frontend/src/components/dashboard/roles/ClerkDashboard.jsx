import {
  Activity,
  ArrowRight,
  Briefcase,
  Clock,
  FileText,
  LayoutGrid,
  ShieldCheck,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ClerkDashboard({ user, summary }) {
  const stats = [
    { label: 'Students', value: summary?.totalStudents || 0, icon: Users, shell: 'bg-amber-100 text-amber-700' },
    { label: 'Faculty', value: summary?.totalStaff || 0, icon: Briefcase, shell: 'bg-orange-100 text-orange-700' },
    { label: 'Resources', value: summary?.totalResources || 0, icon: FileText, shell: 'bg-emerald-100 text-emerald-700' },
  ]

  const actions = [
    { role: 'Faculty Member', desc: 'Faculty onboarding and updates', to: '/register?role=STAFF', icon: Briefcase, shell: 'bg-orange-100 text-orange-700' },
    { role: 'Student Node', desc: 'New learner provisioning', to: '/register?role=STUDENT', icon: UserPlus, shell: 'bg-amber-100 text-amber-700' },
  ]

  return (
    <div className="space-y-6 pb-8 animate-in">
      <section className="portal-banner rounded-[2.4rem] p-8 sm:p-10">
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
              <ShieldCheck size={13} />
              Clerk Registry | VIIT
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Registry operations for
              <span className="block bg-[linear-gradient(135deg,#f59e0b_0%,#f97316_44%,#ea580c_100%)] bg-clip-text text-transparent">
                {user?.fullName?.split(' ')[0]}
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-800 sm:text-base">
              The registry command center now follows a professional light-theme design system, ensuring a clean and focused workspace for administrative operations.
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
          <div className="portal-panel portal-3d rounded-[2.4rem] p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
                  <Zap size={12} />
                  Provisioning Hub
                </div>
                <h2 className="mt-4 text-2xl font-black text-slate-900">Fast access to onboarding workflows</h2>
              </div>
              <Link to="/register" className="portal-button-secondary flex h-11 w-11 items-center justify-center rounded-2xl">
                <LayoutGrid size={18} />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {actions.map((action) => (
                <Link key={action.role} to={action.to} className="portal-panel portal-3d rounded-[1.8rem] p-6 transition-colors hover:border-amber-200">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.shell}`}>
                      <action.icon size={26} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-900">{action.role}</h3>
                      <p className="mt-1 text-xs font-medium text-slate-700">{action.desc}</p>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-slate-700" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="portal-panel portal-3d rounded-[2rem] p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-700">Registry Status</p>
                <h3 className="mt-2 text-xl font-black text-slate-900">Stable academic operations</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">System uptime</p>
                  <p className="mt-1 text-lg font-black text-emerald-600">99.9%</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">Active sessions</p>
                  <p className="mt-1 text-lg font-black text-slate-900">128 nodes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lg:col-span-4 space-y-6">
          <div className="portal-panel portal-3d rounded-[2.4rem] p-8">
            <div className="portal-chip text-[10px] font-black uppercase tracking-[0.22em]">
              <Clock size={12} />
              Recent Activity
            </div>
            <div className="mt-6 space-y-4">
              {[
                { userLabel: 'R. Sharma', action: 'Student Registration', time: '12m ago', shell: 'bg-emerald-500' },
                { userLabel: 'S. Patil', action: 'Faculty Sync', time: '1h ago', shell: 'bg-orange-500' },
                { userLabel: 'A. Deshmukh', action: 'Identity Update', time: '3h ago', shell: 'bg-rose-500' },
              ].map((item) => (
                <div
                  key={`${item.userLabel}-${item.action}`}
                  className="portal-3d flex items-center gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 p-4 transition hover:border-amber-200 hover:bg-white"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-black text-slate-800">
                    {item.userLabel.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black text-slate-900">{item.userLabel}</p>
                    <p className="mt-1 truncate text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700">{item.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700">{item.time}</p>
                    <div className={`ml-auto mt-2 h-2 w-2 rounded-full ${item.shell} opacity-60`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="portal-panel portal-3d rounded-[2.4rem] p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-700">Protocol Guard</p>
                <h3 className="mt-1 text-xl font-black text-slate-900">Protected Intake</h3>
              </div>
            </div>
            <p className="mt-5 text-sm font-medium leading-7 text-slate-700">
              Clerk actions are logged and synchronized so account creation stays traceable, consistent, and easy to audit.
            </p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-full bg-[linear-gradient(90deg,#facc15_0%,#fb923c_50%,#f87171_100%)] opacity-60" />
            </div>
          </div>

          <div className="portal-panel portal-3d rounded-[2rem] p-6">
            <div className="flex items-center gap-4">
              <Activity size={20} className="text-emerald-600" />
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-700">Live Response</p>
                <h3 className="mt-1 text-lg font-black text-slate-900">System operations active</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
