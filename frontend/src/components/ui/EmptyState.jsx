export default function EmptyState({ title, description, action }) {
  return (
    <div className="portal-panel portal-3d rounded-[2rem] p-8 text-center">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-700">UniShare Portal</p>
      <h3 className="mt-3 font-display text-2xl text-slate-900 font-black">{title}</h3>
      <p className="mx-auto mt-3 max-w-lg text-sm font-semibold leading-7 text-slate-800">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
