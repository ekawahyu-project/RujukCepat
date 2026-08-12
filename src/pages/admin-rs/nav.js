import {
  LayoutDashboard,
  FilePlus2,
  Inbox,
  Activity,
  Loader2,
  History,
  Building2,
  MapPin,
  CalendarDays,
  Clock
} from 'lucide-react'

export const adminRsNav = [
  { name: 'Dashboard', to: '/admin-rs/dashboard', icon: LayoutDashboard },
  { name: 'Buat Rujukan', to: '/admin-rs/buat-rujukan', icon: FilePlus2 },
  { name: 'Rujukan Masuk', to: '/admin-rs/rujukan-masuk', icon: Inbox },
  { name: 'Rujukan Aktif', to: '/admin-rs/rujukan-aktif', icon: Activity },
  { name: 'Rujukan Diproses', to: '/admin-rs/rujukan-diproses', icon: Loader2 },
  { name: 'Riwayat Rujukan', to: '/admin-rs/riwayat-rujukan', icon: History },
  { name: 'Ketersediaan', to: '/admin-rs/ketersediaan', icon: Building2 },
  { name: 'Rekomendasi Fasilitas', to: '/admin-rs/rekomendasi', icon: MapPin },
  { name: 'Jadwal Dokter', to: '/admin-rs/jadwal-dokter', icon: CalendarDays },
  { name: 'Riwayat Update', to: '/admin-rs/riwayat-update', icon: Clock },
]
