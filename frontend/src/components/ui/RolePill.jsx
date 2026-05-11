const roleStyles = {
  SUPER_ADMIN: 'bg-amber-300/20 text-amber-100 ring-amber-200/30',
  DIRECTOR: 'bg-orange-300/20 text-orange-100 ring-orange-200/30',
  SENIOR_CLERK: 'bg-lime-300/20 text-lime-100 ring-lime-200/30',
  HOD: 'bg-rose-300/20 text-rose-100 ring-rose-200/30',
  STAFF: 'bg-yellow-300/20 text-yellow-100 ring-yellow-200/30',
  STUDENT: 'bg-emerald-300/20 text-emerald-100 ring-emerald-200/30',
}

export default function RolePill({ role }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${roleStyles[role] || 'bg-white/10 text-white ring-white/20'}`}>
      {role.replaceAll('_', ' ')}
    </span>
  )
}
