import Image from "next/image"
import NoPosterAvailable from "@/assets/no-poster-available.jpg"
import { DashboardRecentItem } from "@/types/dashboard"

function timeAgo(date: Date) {
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (days <= 0) return "today"
  if (days === 1) return "yesterday"
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} ${months === 1 ? "month" : "months"} ago`
  const years = Math.floor(months / 12)
  return `${years} ${years === 1 ? "year" : "years"} ago`
}

export default function RecentList({
  items,
}: {
  items: DashboardRecentItem[]
}) {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground py-6 text-center text-sm">
        No items added yet.
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-3">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-md">
            <Image
              src={item.posterSrc || NoPosterAvailable.src}
              alt={item.title}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{item.title}</p>
            {item.subtitle && (
              <p className="text-muted-foreground truncate text-xs">
                {item.subtitle}
              </p>
            )}
          </div>
          <span className="text-muted-foreground shrink-0 text-xs">
            {timeAgo(item.createdAt)}
          </span>
        </li>
      ))}
    </ul>
  )
}
