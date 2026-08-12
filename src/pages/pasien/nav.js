import { LayoutDashboard, ClipboardList, PillBottle, History } from 'lucide-react'

export const pasienNav = [
  { to: '/pasien/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/pasien/rujukan', label: 'Rujukan Saya', icon: ClipboardList },
  { to: '/pasien/obat', label: 'Layanan Obat', icon: PillBottle },
  { to: '/pasien/riwayat', label: 'Riwayat Layanan', icon: History },
]
