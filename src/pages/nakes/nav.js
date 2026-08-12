import { LayoutDashboard, FilePlus2, Activity, History } from 'lucide-react'

export const nakesNav = [
  { to: '/nakes/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/nakes/buat-rujukan', label: 'Buat Rujukan', icon: FilePlus2 },
  { to: '/nakes/rujukan-aktif', label: 'Rujukan Aktif', icon: Activity },
  { to: '/nakes/riwayat', label: 'Riwayat Rujukan', icon: History },
]
