import { FilePlus2, ArrowRight, Building2 } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { StatusBadge } from '../../components/StatusBadge'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { hospitalStatus } from '../../data/hospitals'
import { formatDateTime } from '../../utils/helpers'
import { nakesNav } from './nav'

const REFERRAL_STATUS_LABEL = { diajukan: 'Diajukan', diterima: 'Diterima', selesai: 'Selesai' }

export default function NakesDashboard() {
  const { user, referrals, hospitals } = useApp()
  const active = referrals.filter((r) => r.status !== 'selesai')
  const available = hospitals.filter((h) => hospitalStatus(h) === 'tersedia')

  return (
    <DashboardLayout nav={nakesNav} roleLabel="Portal Tenaga Kesehatan">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Halo, {user?.name}</h1>
          <p className="mt-1 text-sm text-ink-soft">Kelola proses rujukan pasien Anda di sini.</p>
        </div>
        <Button to="/nakes/buat-rujukan" icon={FilePlus2}>Buat Rujukan</Button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line p-5">
          <p className="text-xs text-ink-faint">Rujukan Aktif</p>
          <p className="mt-1 text-2xl font-semibold tnum text-ink">{active.length}</p>
        </div>
        <div className="rounded-xl border border-line p-5">
          <p className="text-xs text-ink-faint">Total Rujukan Dibuat</p>
          <p className="mt-1 text-2xl font-semibold tnum text-ink">{referrals.length}</p>
        </div>
        <div className="rounded-xl border border-line p-5">
          <p className="text-xs text-ink-faint">RS Berstatus Tersedia</p>
          <p className="mt-1 text-2xl font-semibold tnum text-ink">{available.length}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-line p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-ink">Rujukan Terbaru</h2>
            <Button to="/nakes/riwayat" variant="ghost" size="sm" icon={ArrowRight} iconRight>Lihat semua</Button>
          </div>
          {referrals.length === 0 ? (
            <EmptyState icon={FilePlus2} title="Belum ada rujukan" description="Rujukan yang Anda buat akan muncul di sini." action={<Button to="/nakes/buat-rujukan" size="sm">Buat rujukan pertama</Button>} />
          ) : (
            <div className="divide-y divide-line">
              {referrals.slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{r.hospitalName}</p>
                    <p className="tnum text-xs text-ink-faint">{r.id} · {formatDateTime(r.createdAt)}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-deep-dark">{REFERRAL_STATUS_LABEL[r.status]}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-line p-5">
          <h2 className="mb-3 flex items-center gap-2 font-semibold text-ink"><Building2 size={17} className="text-deep-dark" /> RS Tersedia</h2>
          <div className="space-y-2.5">
            {available.slice(0, 4).map((h) => (
              <div key={h.id} className="flex items-center justify-between gap-2">
                <p className="truncate text-sm text-ink">{h.name}</p>
                <StatusBadge status="tersedia" size="sm" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}
