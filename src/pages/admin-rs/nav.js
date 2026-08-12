import { LayoutDashboard, BedDouble, Stethoscope, Inbox, History } from 'lucide-react'

export const adminRsNav = [
  { to: '/admin-rs/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin-rs/rujukan-masuk', label: 'Rujukan Masuk', icon: Inbox },
  { to: '/admin-rs/ketersediaan', label: 'Ketersediaan', icon: BedDouble },
  { to: '/admin-rs/jadwal-dokter', label: 'Jadwal Dokter', icon: Stethoscope },
  { to: '/admin-rs/riwayat', label: 'Riwayat Update', icon: History },
]
