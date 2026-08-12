import { Link } from 'react-router-dom'
import { ClipboardList, Loader2, PackageCheck, CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { useApp } from '../../context/AppContext'
import { OBAT_STATUS_META, formatDateTime } from '../../utils/helpers'
import { adminApotekNav } from './nav'

export default function AdminApotekDashboard() {
  const { transactions, user } = useApp()
  const counts = transactions.reduce(
    (acc, t) => ({ ...acc, [t.status]: (acc[t.status] || 0) + 1 }),
    { menunggu: 0, diproses: 0, siap: 0, selesai: 0 }
  )

  const stats = [
    { key: 'total', label: 'Total Transaksi', value: transactions.length, icon: ClipboardList },
    { key: 'menunggu', label: 'Menunggu Diproses', value: counts.menunggu, icon: Clock },
    { key: 'diproses', label: 'Diproses', value: counts.diproses, icon: Loader2 },
    { key: 'siap', label: 'Siap Diambil', value: counts.siap, icon: PackageCheck },
    { key: 'selesai', label: 'Selesai', value: counts.selesai, icon: CheckCircle2 },
  ]

  return (
    <DashboardLayout nav={adminApotekNav} roleLabel="Portal Admin Apotek">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Halo, {user?.name}</h1>
      <p className="mt-1 text-sm text-ink-soft">Ringkasan transaksi obat hari ini.</p>

      {/* Alert jika ada yang menunggu */}
      {counts.menunggu > 0 && (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-amber bg-amber-bg/50 px-4 py-3">
          <div className="flex items-center gap-2.5 text-sm text-amber">
            <Clock size={16} />
            <span className="font-medium">{counts.menunggu} resep menunggu untuk diterima.</span>
          </div>
          <Button to="/admin-apotek/transaksi" size="sm" variant="outline" className="border-amber text-amber hover:bg-amber-bg shrink-0">
            Proses
          </Button>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
          {transactions.slice(0, 5).map((t) => {
            const meta = OBAT_STATUS_META[t.status]
            return (
              <Link key={t.code} to={`/admin-apotek/transaksi/${t.code}`} className="flex items-center justify-between gap-3 py-3 hover:bg-surface-tint">
                <div>
                  <p className="tnum text-sm font-medium text-ink">{t.code}</p>
                  <p className="text-xs text-ink-faint">{formatDateTime(t.history[t.history.length - 1].at)}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${meta?.color || 'bg-secondary text-deep-dark'}`}>
                  {meta?.label || t.status}
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </DashboardLayout>
  )
}
