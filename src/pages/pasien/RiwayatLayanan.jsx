import { History, PillBottle, ClipboardList } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { formatDateTime, OBAT_STATUS_META } from '../../utils/helpers'
import { pasienNav } from './nav'

const REFERRAL_LABELS = {
  menunggu_konfirmasi: 'Menunggu Konfirmasi',
  diterima: 'Diterima',
  ditolak: 'Ditolak',
  selesai: 'Selesai',
}

const REFERRAL_COLORS = {
  menunggu_konfirmasi: 'bg-amber-bg text-amber',
  diterima: 'bg-secondary text-deep-dark',
  ditolak: 'bg-red-bg text-red',
  selesai: 'bg-surface-tint text-ink-faint',
}

export default function RiwayatLayanan() {
  const { referrals, transactions } = useApp()

  const doneReferrals = referrals.filter((r) => r.status === 'selesai' || r.status === 'ditolak')
  const doneTransactions = transactions.filter((t) => t.status === 'selesai')

  return (
    <DashboardLayout nav={pasienNav} roleLabel="Portal Pasien">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Riwayat Layanan</h1>
        <p className="mt-1 text-sm text-ink-soft">Rekam jejak rujukan dan transaksi obat yang sudah selesai.</p>
      </div>

      {/* Riwayat Rujukan */}
      <section className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-faint">
          <ClipboardList size={14} /> Riwayat Rujukan
        </h2>
        {doneReferrals.length === 0 ? (
          <EmptyState icon={ClipboardList} title="Belum ada riwayat rujukan" description="Rujukan yang sudah selesai akan muncul di sini." />
        ) : (
          <div className="divide-y divide-line rounded-xl border border-line">
            {doneReferrals.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{r.hospitalName}</p>
                  <p className="tnum text-xs text-ink-faint">{r.id} · {formatDateTime(r.createdAt)}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${REFERRAL_COLORS[r.status]}`}>
                  {REFERRAL_LABELS[r.status]}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Riwayat Obat */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-faint">
          <PillBottle size={14} /> Riwayat Obat
        </h2>
        {doneTransactions.length === 0 ? (
          <EmptyState icon={PillBottle} title="Belum ada riwayat obat" description="Transaksi obat yang sudah selesai akan muncul di sini." />
        ) : (
          <div className="divide-y divide-line rounded-xl border border-line">
            {doneTransactions.map((t) => {
              const lastAt = t.history[t.history.length - 1]?.at
              return (
                <div key={t.code} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="tnum text-sm font-medium text-ink">{t.code}</p>
                    <p className="truncate text-xs text-ink-faint">{t.pharmacy} · {lastAt ? formatDateTime(lastAt) : '-'}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-surface-tint px-2.5 py-1 text-xs font-medium text-ink-faint">
                    Selesai
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </DashboardLayout>
  )
}
