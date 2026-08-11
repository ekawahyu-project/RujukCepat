import { AlertTriangle } from 'lucide-react'
import { STATUS_META, timeAgo, isStale } from '../utils/helpers'

export function StatusBadge({ status, size = 'md' }) {
  const meta = STATUS_META[status]
  const pad = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${meta.bg} ${meta.text} ${pad} font-medium`}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  )
}

export function FreshnessNote({ iso, className = '' }) {
  const stale = isStale(iso)
  return (
    <span className={`inline-flex items-center gap-1 text-xs tnum ${stale ? 'text-amber' : 'text-ink-faint'} ${className}`}>
      {stale && <AlertTriangle size={12} strokeWidth={2} />}
      Diperbarui {timeAgo(iso)}
    </span>
  )
}
