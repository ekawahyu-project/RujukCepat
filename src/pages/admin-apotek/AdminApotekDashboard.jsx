import { Link } from 'react-router-dom'
import { ClipboardList, Loader2, PackageCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { useApp } from '../../context/AppContext'
import { OBAT_STATUS_META, formatDateTime } from '../../utils/helpers'
import { adminApotekNav } from './nav'

export default function AdminApotekDashboard() {
  const { transactions, user } = useApp()
  const counts = transactions.reduce(
    (acc, t) => ({ ...acc, [t.status]: (acc[t.status] || 0) + 1 }),
    { diproses: 0, siap: 0, selesai: 0 }
  )

  const stats = [
    { key: 'total', label: 'Total Transaksi', value: transactions.length, icon: ClipboardList },
    { key: 'diproses', label: 'Diproses', value: counts.diproses, icon: Loader2 },
    { key: 'siap', label: 'Siap Diambil', value: counts.siap, icon: PackageCheck },
    { key: 'selesai', label: 'Selesai', value: counts.selesai, icon: CheckCircle2 },
  ]

  return (
    <DashboardLayout nav={adminApotekNav} roleLabel="Portal Admin Apotek">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Halo, {user?.name}</h1>
      <p className="mt-1 text-sm text-ink-soft">Ringkasan transaksi obat hari ini.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.key} className="rounded-xl border border-line p-5">
            <div className="mb-2 flex items-center gap-2 text-ink-faint"><s.icon size={16} /><p className="text-xs">{s.label}</p></div>
            <p className="tnum text-2xl font-semibold text-ink">{s.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-6 rounded-xl border border-line p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-ink">Transaksi Terbaru</h2>
          <Button to="/admin-apotek/transaksi" variant="ghost" size="sm" icon={ArrowRight} iconRight>Lihat semua</Button>
        </div>
        <div className="divide-y divide-line">
          {transactions.slice(0, 5).map((t) => (
            <Link key={t.code} to={`/admin-apotek/transaksi/${t.code}`} className="flex items-center justify-between gap-3 py-3 hover:bg-surface-tint">
              <div>
                <p className="tnum text-sm font-medium text-ink">{t.code}</p>
                <p className="text-xs text-ink-faint">{formatDateTime(t.history[t.history.length - 1].at)}</p>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-deep-dark">{OBAT_STATUS_META[t.status].label}</span>
            </Link>
          ))}
        </div>
      </section>
    </DashboardLayout>
  )
}
