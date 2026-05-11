export default function StatsCard({ label, value, tone, helper }) {
  return (
    <div className={`rounded-[1.8rem] border border-white/10 ${tone} p-5 shadow-[0_25px_60px_rgba(7,15,25,0.18)] backdrop-blur transform-style-3d hover:translate-y-[-5px] hover:translate-z-10 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer`}>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--ink-3)] drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">{label}</p>
      <p className="mt-4 font-display text-4xl text-[var(--ink-1)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--ink-3)] drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">{helper}</p>
    </div>
  )
}
