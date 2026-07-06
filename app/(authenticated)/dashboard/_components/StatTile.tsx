import { LucideIcon } from "lucide-react"

type StatTileProps = {
  label: string
  value: number
  icon: LucideIcon
  color: string
}

export default function StatTile({
  label,
  value,
  icon: Icon,
  color,
}: StatTileProps) {
  return (
    <div className="bg-card relative flex items-center gap-4 overflow-hidden rounded-xl border p-5 shadow-sm">
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: color }}
      />
      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-lg"
        style={{
          backgroundColor: `color-mix(in oklch, ${color} 15%, transparent)`,
          color,
        }}
      >
        <Icon className="size-6" />
      </div>
      <div>
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="text-2xl font-semibold tabular-nums">{value}</p>
      </div>
    </div>
  )
}
