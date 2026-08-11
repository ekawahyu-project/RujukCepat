import { LayoutDashboard, ListOrdered } from 'lucide-react'

export const adminApotekNav = [
  { to: '/admin-apotek/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin-apotek/transaksi', label: 'Transaksi Obat', icon: ListOrdered },
]
