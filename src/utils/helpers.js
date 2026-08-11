export function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diffMs / 60000)
  if (mins < 1) return 'baru saja'
  if (mins < 60) return `${mins} menit lalu`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs} jam lalu`
  const days = Math.round(hrs / 24)
  return `${days} hari lalu`
}

export function isStale(iso, staleAfterMins = 60) {
  return (Date.now() - new Date(iso).getTime()) / 60000 > staleAfterMins
}

export const STATUS_META = {
  tersedia: { label: 'Tersedia', dot: 'bg-deep', text: 'text-deep-dark', bg: 'bg-secondary' },
  terbatas: { label: 'Terbatas', dot: 'bg-amber', text: 'text-amber', bg: 'bg-amber-bg' },
  penuh: { label: 'Penuh', dot: 'bg-red', text: 'text-red', bg: 'bg-red-bg' },
}

export const OBAT_STATUS_META = {
  diproses: { label: 'Diproses', step: 0 },
  siap: { label: 'Siap Diambil', step: 1 },
  selesai: { label: 'Selesai', step: 2 },
}

export function formatDateTime(iso) {
  return new Date(iso).toLocaleString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}
