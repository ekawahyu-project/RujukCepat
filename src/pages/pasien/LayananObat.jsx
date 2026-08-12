import { useState } from 'react'
import { PillBottle, Clock, CheckCircle2, Package } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { OBAT_STATUS_META, formatDateTime } from '../../utils/helpers'
import { pasienNav } from './nav'

const STATUS_FILTER = [
  { key: 'semua', label: 'Semua' },
  { key: 'menunggu', label: 'Menunggu' },
  { key: 'diproses', label: 'Diproses' },
  { key: 'siap', label: 'Siap Diambil' },
  { key: 'selesai', label: 'Selesai' },
]

const PROGRESS_STEPS = ['menunggu', 'diproses', 'siap', 'selesai']

function ProgressBar({ status }) {
  const idx = PROGRESS_STEPS.indexOf(status)
  return (
    <div className="mt-3 flex items-center gap-0">
      {PROGRESS_STEPS.map((step, i) => {
        const done = i <= idx
        const meta = OBAT_STATUS_META[step]
        return (
          <div key={step} className="flex flex-1 items-center">
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              done ? 'bg-deep text-white' : 'bg-line text-ink-faint'
            }`}>
              {i + 1}
            </div>
            {i < PROGRESS_STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 transition-colors ${i < idx ? 'bg-deep' : 'bg-line'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function LayananObat() {
  const { transactions } = useApp()
  const [filter, setFilter] = useState('semua')

  const filtered = filter === 'semua' ? transactions : transactions.filter((t) => t.status === filter)
  const active = transactions.filter((t) => t.status !== 'selesai')

  return (
    <DashboardLayout nav={pasienNav} roleLabel="Portal Pasien">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Layanan Obat</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Pantau status obat Anda tanpa perlu menunggu di apotek.
        </p>
      </div>

      {/* Obat Aktif Summary */}
      {active.length > 0 && (
        <div className="mb-6 rounded-xl border border-line bg-surface-tint p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Sedang Diproses</p>
          <p className="mt-1 text-2xl font-semibold tnum text-ink">{active.length} transaksi</p>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {STATUS_FILTER.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f.key
                ? 'bg-deep text-white'
                : 'bg-surface border border-line text-ink-soft hover:border-deep/50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Transaksi List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={PillBottle}
          title="Tidak ada transaksi"
          description="Transaksi obat dengan status ini belum tersedia."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((t) => {
            const meta = OBAT_STATUS_META[t.status]
            const lastAt = t.history[t.history.length - 1]?.at
            return (
              <div key={t.code} className="rounded-xl border border-line p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="tnum font-medium text-ink">{t.code}</p>
                    <p className="text-xs text-ink-faint">{t.pharmacy}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${meta?.color || 'bg-secondary text-deep-dark'}`}>
                    {meta?.label || t.status}
                  </span>
                </div>

                {/* Progress */}
                <ProgressBar status={t.status} />

                {/* Daftar Obat */}
                <div className="mt-3 space-y-1">
                  {t.medicines.map((m, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-ink-soft">{m.name}</span>
                      <span className="tnum text-xs text-ink-faint">{m.qty}</span>
                    </div>
                  ))}
                </div>

                {lastAt && (
                  <p className="mt-2 text-xs text-ink-faint">
                    Diperbarui: {formatDateTime(lastAt)}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}
