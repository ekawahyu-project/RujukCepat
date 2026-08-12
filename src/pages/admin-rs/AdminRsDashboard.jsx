import { AlertTriangle, BedDouble, Siren, HeartPulse, Inbox } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { FreshnessNote } from '../../components/StatusBadge'
import { useApp } from '../../context/AppContext'
import { bedTotals } from '../../data/hospitals'
import { isStale } from '../../utils/helpers'
import { adminRsNav } from './nav'

export default function AdminRsDashboard() {
  const { hospitals, user, referrals } = useApp()
  const hospital = hospitals[0]
  const beds = bedTotals(hospital)
  const stale = isStale(hospital.lastUpdated, 60)

  const pendingReferrals = referrals.filter((r) => r.status === 'menunggu_konfirmasi').length
  const acceptedReferrals = referrals.filter((r) => r.status === 'diterima').length

  return (
    <DashboardLayout nav={adminRsNav} roleLabel="Portal Admin Rumah Sakit">
      <div className="mb-1 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{hospital.name}</h1>
      </div>
      <p className="mb-6 text-sm text-ink-soft">Halo, {user?.name}. Kelola data ketersediaan yang tampil ke publik dan tenaga kesehatan.</p>

      {stale && (
        <div className="mb-6 flex items-center gap-2.5 rounded-lg bg-amber-bg px-4 py-3 text-sm text-amber">
          <AlertTriangle size={16} />
          Data belum diperbarui lebih dari 1 jam. Perbarui ketersediaan agar informasi tetap akurat.
        </div>
      )}

      {/* Rujukan Masuk Alert */}
      {pendingReferrals > 0 && (
        <div className="mb-6 flex items-center justify-between gap-3 rounded-lg border border-amber bg-amber-bg/50 px-4 py-3">
          <div className="flex items-center gap-2.5 text-sm text-amber">
            <Inbox size={16} />
            <span className="font-medium">{pendingReferrals} rujukan menunggu konfirmasi Anda.</span>
          </div>
          <Button to="/admin-rs/rujukan-masuk" size="sm" variant="outline" className="border-amber text-amber hover:bg-amber-bg shrink-0">
            Lihat
          </Button>
        </div>
      )}

      {/* Stats: Ketersediaan */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line p-5">
          <div className="mb-2 flex items-center gap-2 text-ink-faint"><BedDouble size={16} /><p className="text-xs">Total Kapasitas Rawat Inap</p></div>
          <p className="tnum text-2xl font-semibold text-ink">{beds.avail}<span className="text-base text-ink-faint">/{beds.total}</span></p>
        </div>
        <div className="rounded-xl border border-line p-5">
          <div className="mb-2 flex items-center gap-2 text-ink-faint"><Siren size={16} /><p className="text-xs">Ketersediaan IGD</p></div>
          <p className="tnum text-2xl font-semibold text-ink">{hospital.igd.avail}<span className="text-base text-ink-faint">/{hospital.igd.total}</span></p>
        </div>
        <div className="rounded-xl border border-line p-5">
          <div className="mb-2 flex items-center gap-2 text-ink-faint"><HeartPulse size={16} /><p className="text-xs">Ketersediaan ICU</p></div>
          <p className="tnum text-2xl font-semibold text-ink">{hospital.icu.avail}<span className="text-base text-ink-faint">/{hospital.icu.total}</span></p>
        </div>
      </div>

      {/* Stats: Rujukan */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line p-5">
          <div className="mb-2 flex items-center gap-2 text-ink-faint"><Inbox size={16} /><p className="text-xs">Rujukan Menunggu Konfirmasi</p></div>
          <p className="tnum text-2xl font-semibold text-ink">{pendingReferrals}</p>
        </div>
        <div className="rounded-xl border border-line p-5">
          <div className="mb-2 flex items-center gap-2 text-ink-faint"><Inbox size={16} /><p className="text-xs">Rujukan Diterima</p></div>
          <p className="tnum text-2xl font-semibold text-ink">{acceptedReferrals}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-line p-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-ink">Waktu update terakhir</p>
          <FreshnessNote iso={hospital.lastUpdated} className="mt-1" />
        </div>
        <Button to="/admin-rs/ketersediaan" size="sm">Perbarui Ketersediaan</Button>
      </div>
    </DashboardLayout>
  )
}
