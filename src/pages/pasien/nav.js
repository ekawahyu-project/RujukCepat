import {
  LayoutDashboard,
  Search,
  ClipboardList,
  PillBottle,
  History,
  User
} from 'lucide-react'

export const pasienNav = [
  { name: 'Dashboard', to: '/pasien/dashboard', icon: LayoutDashboard },
  { name: 'Cari Layanan', to: '/pasien/cari-layanan', icon: Search },
  { name: 'Rujukan Saya', to: '/pasien/rujukan', icon: ClipboardList },
  { name: 'Layanan Obat', to: '/pasien/obat', icon: PillBottle },
  { name: 'Riwayat Layanan', to: '/pasien/riwayat', icon: History },
  { name: 'Profil', to: '/pasien/profil', icon: User },
]
