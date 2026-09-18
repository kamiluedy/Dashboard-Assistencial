import type { LucideIcon } from "lucide-react"

interface KpiCardProps {
  label: string
  value: string
  icon: LucideIcon
  helper?: string
}

export function KpiCard({ label, value, icon: Icon, helper }: KpiCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#1c5cab] bg-[#2a78d6] p-4 shadow-sm">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
        <Icon size={20} strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold text-white" style={{ fontVariantNumeric: "proportional-nums" }}>
          {value}
        </p>
        <p className="truncate text-xs text-white/80">{label}</p>
        {helper && <p className="truncate text-[11px] text-white/60">{helper}</p>}
      </div>
    </div>
  )
}
