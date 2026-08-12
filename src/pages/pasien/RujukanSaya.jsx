import { Link } from 'react-router-dom'
import { ClipboardList, CheckCircle2, XCircle, Clock, Search } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { formatDateTime } from '../../utils/helpers'
import { pasienNav } from './nav'

const STATUS_META = {
  menunggu_konfirmasi: { label: 'Menunggu Konfirmasi', icon: Clock, color: 'bg-amber-bg text-amber' },
  diterima: { label: 'Diterima', icon: CheckCircle2, color: 'bg-secondary text-deep-dark' },
  ditolak: { label: 'Ditolak', icon: XCircle, color: 'bg-red-bg text-red' },
  selesai: { label: 'Selesai', icon: CheckCircle2, color: 'bg-surface-tint text-ink-faint' },
}

export default function RujukanSaya() {
  const { referrals } = useApp()

  const active = referrals.filter((r) => r.status !== 'selesai' && r.status !== 'ditolak')
  const history = referrals.filter((r) => r.status === 'selesai' || r.status === 'ditolak')

  return (
    <DashboardLayout nav={pasienNav} roleLabel="Portal Pasien">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Rujukan Saya</h1>
          <p className="mt-1 text-sm text-ink-soft">Pantau status rujukan yang sedang berjalan.</p>
        </div>
        <Button to="/cari-rumah-sakit" variant="outline" size="sm" icon={Search}>
          Cari RS
        </Button>
      </div>

      {/* Rujukan Aktif */}
      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-faint">Rujukan Aktif</h2>
        {active.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="Tidak ada rujukan aktif"
            description="Rujukan aktif Anda akan muncul di sini."
          />
        ) : (
          <div className="space-y-3">
            {active.map((r) => {
              const meta = STATUS_META[r.status] || STATUS_META.menunggu_konfirmasi
              return (
                <div key={r.id} className="rounded-xl border border-line p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-ink">{r.hospitalName}</p>
                      <p className="tnum mt-0.5 text-xs text-ink-faint">{r.id} · {formatDateTime(r.createdAt)}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${meta.color}`}>
                      {meta.label}
                    </span>
                  </div>
                  {r.patientCondition && (
                    <p className="mt-2 text-sm text-ink-soft">
                      <span className="font-medium">Kondisi:</span> {r.patientCondition}
                    </p>
                  )}
                  {r.status === 'diterima' && r.responseNote && (
                    <div className="mt-2 rounded-lg bg-secondary/60 px-3 py-2 text-xs text-deep-dark">
                      Catatan RS: {r.responseNote}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Riwayat */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-faint">Riwayat</h2>
        {history.length === 0 ? (
          <p className="text-sm text-ink-faint">Belum ada riwayat rujukan.</p>
        ) : (
          <div className="divide-y divide-line rounded-xl border border-line">
            {history.map((r) => {
              const meta = STATUS_META[r.status] || STATUS_META.selesai
              return (
                <div key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{r.hospitalName}</p>
                    <p className="tnum text-xs text-ink-faint">{r.id} · {formatDateTime(r.createdAt)}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${meta.color}`}>
                    {meta.label}
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
