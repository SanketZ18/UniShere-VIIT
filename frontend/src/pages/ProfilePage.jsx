import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Eye, EyeOff, Save, User, Mail, Phone, Calendar, Lock, ShieldCheck, BadgeCheck, Users } from 'lucide-react'

export default function ProfilePage() {
  const { user, updateProfile, authBusy } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    gender: user?.gender || 'MALE',
    birthDate: user?.birthDate || '',
    password: '',
    oldPassword: '',
  })
  const [result, setResult] = useState({ type: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setResult({ type: '', message: '' })
    try {
      await updateProfile(form)
      setResult({ type: 'success', message: 'Identity parameters updated successfully.' })
    } catch (error) {
      const responseData = error.response?.data;
      if (responseData?.data && typeof responseData.data === 'object') {
        const details = Object.values(responseData.data).join(', ');
        setResult({ type: 'error', message: `${responseData.message}: ${details}` });
      } else {
        setResult({ type: 'error', message: responseData?.message || 'Update failed.' });
      }
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="portal-page-hero rounded-[2.4rem] px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">Identity Management</h1>
          <p className="text-slate-800 text-sm mt-1 font-semibold">Update your personal information and security credentials.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/20">
          <BadgeCheck size={16} className="text-emerald-700" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">Verified Identity</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="portal-panel portal-3d rounded-2xl p-8 space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-900 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" />
                  <input
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Enter Full Name"
                    className="portal-form-field w-full pl-12 pr-5 py-3 text-sm font-semibold text-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-900 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Enter Email Address"
                    className="portal-form-field w-full pl-12 pr-5 py-3 text-sm font-semibold text-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-900 ml-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" />
                  <input
                    required
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={form.mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setForm({ ...form, mobile: val });
                    }}
                    className="portal-form-field w-full pl-12 pr-5 py-3 text-sm font-semibold text-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-900 ml-1">
                  Birth Date
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" />
                  <input
                    type="date"
                    value={form.birthDate}
                    onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                    className="portal-form-field w-full pl-12 pr-5 py-3 text-sm font-semibold text-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-900 ml-1">
                  Biological Gender
                </label>
                <div className="relative">
                  <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" />
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="portal-form-field w-full appearance-none pl-12 pr-5 py-3 text-sm font-semibold text-black"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-900 ml-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" />
                    <input
                      type="password"
                      value={form.oldPassword}
                      onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
                      placeholder="Enter Current Password"
                      className="portal-form-field w-full pl-12 pr-5 py-3 text-sm font-semibold text-black"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-900 ml-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Enter New Password"
                      className="portal-form-field w-full pl-12 pr-12 py-3 text-sm font-semibold text-black"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 hover:text-white transition">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {result.message && (
              <div className={`rounded-xl border px-5 py-3 text-xs font-bold ${result.type === 'success' ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500' : 'border-rose-500/20 bg-rose-500/5 text-rose-500'}`}>
                {result.message}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                disabled={authBusy} 
                className="portal-button-primary flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-bold disabled:opacity-50"
              >
                <Save size={18} />
                {authBusy ? 'Saving Changes...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <section className="portal-panel portal-3d rounded-2xl p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Access Level</h3>
              <p className="text-xs leading-relaxed text-slate-800 font-medium">
                Your account is registered as <b>{user?.role?.replaceAll('_', ' ')}</b>. 
                This granting you permissions for the <b>{user?.department}</b> academic node.
              </p>
              
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Global UID</span>
                   <span className="text-xs font-mono font-black text-amber-700">{user?.id?.slice(-8).toUpperCase()}</span>
                </div>
              </div>
           </section>

           <div className="portal-panel portal-3d rounded-2xl p-8">
             <h3 className="text-sm font-bold text-slate-950 mb-4">Security Advisory</h3>
             <p className="text-xs leading-relaxed text-slate-800 font-medium">
               We recommend updating your password every 90 days to maintain high security standards for academic data access.
             </p>
           </div>
        </div>
      </div>
    </div>
  )
}
