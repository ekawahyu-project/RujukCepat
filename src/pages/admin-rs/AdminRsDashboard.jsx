import { AlertTriangle, BedDouble, Siren, HeartPulse, Inbox, FilePlus2, ArrowRight } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { FreshnessNote } from '../../components/StatusBadge'
import { useApp } from '../../context/AppContext'
import { bedTotals, hospitalStatus } from '../../data/hospitals'
import { isStale, formatDateTime } from '../../utils/helpers'
import { adminRsNav } from './nav'

const REFERRAL_STATUS_META = {
  menunggu_konfirmasi: { label: 'Menunggu Konfirmasi', color: 'bg-amber-bg text-amber' },
  diterima: { label: 'Diterima', color: 'bg-secondary text-deep-dark' },
  ditolak: { label: 'Ditolak', color: 'bg-red-bg text-red' },
  selesai: { label: 'Selesai', color: 'bg-surface-tint text-ink-faint' },
}

export default function AdminRsDashboard() {
  const { hospitals, user, referrals } = useApp()
  const hospital = hospitals[0]
  const beds = bedTotals(hospital)
  const stale = isStale(hospital.lastUpdated, 60)

  // Referrals as Receiving Hospital (Rujukan Masuk)
  const pendingIncoming = referrals.filter((r) => r.status === 'menunggu_konfirmasi').length
  const acceptedIncoming = referrals.filter((r) => r.status === 'diterima').length

  // Referrals as Sending Hospital (Rujukan Keluar/Aktif)
  const activeOutgoing = referrals.filter((r) => r.status !== 'selesai' && r.status !== 'ditolak')

  return (
    <DashboardLayout nav={adminRsNav} roleLabel="Portal Admin Rumah Sakit">
      <div className="mb-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{hospital.name}</h1>
          <p className="mt-1 text-sm text-ink-soft">Halo, {user?.name}. Kelola ketersediaan fasilitas dan arus rujukan pasien.</p>
        </div>
        <Button to="/admin-rs/buat-rujukan" icon={FilePlus2}>Buat Rujukan</Button>
      </div>

      {stale && (
        <div className="mt-6 flex items-center gap-2.5 rounded-lg bg-amber-bg px-4 py-3 text-sm text-amber">
          <AlertTriangle size={16} />
          Data ketersediaan belum diperbarui lebih dari 1 jam. Perbarui agar rujukan masuk lebih tepat sasaran.
        </div>
      )}

      {/* Rujukan Masuk Alert */}
      {pendingIncoming > 0 && (
        <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border border-amber bg-amber-bg/50 px-4 py-3">
          <div className="flex items-center gap-2.5 text-sm text-amber">
            <Inbox size={16} />
            <span className="font-medium">{pendingIncoming} rujukan masuk menunggu konfirmasi Anda.</span>
          </div>
          <Button to="/admin-rs/rujukan-masuk" size="sm" variant="outline" className="border-amber text-amber hover:bg-amber-bg shrink-0">
            Tinjau
          </Button>
        </div>
      )}

      {/* Stats: Ketersediaan & Rujukan */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-line p-5">
          <div className="mb-2 flex items-center gap-2 text-ink-faint"><Inbox size={16} /><p className="text-xs">Rujukan Masuk (Menunggu)</p></div>
          <p className="tnum text-2xl font-semibold text-ink">{pendingIncoming}</p>
        </div>
        <div className="rounded-xl border border-line p-5">
          <div className="mb-2 flex items-center gap-2 text-ink-faint"><FilePlus2 size={16} /><p className="text-xs">Rujukan Keluar (Aktif)</p></div>
          <p className="tnum text-2xl font-semibold text-ink">{activeOutgoing.length}</p>
        </div>
        <div className="rounded-xl border border-line p-5">
          <div className="mb-2 flex items-center gap-2 text-ink-faint"><BedDouble size={16} /><p className="text-xs">Kapasitas Rawat Inap</p></div>
          <p className="tnum text-2xl font-semibold text-ink">{beds.avail}<span className="text-base text-ink-faint">/{beds.total}</span></p>
        </div>
        <div className="rounded-xl border border-line p-5">
          <div className="mb-2 flex items-center gap-2 text-ink-faint"><Siren size={16} /><p className="text-xs">Ketersediaan IGD</p></div>
          <p className="tnum text-2xl font-semibold text-ink">{hospital.igd.avail}<span className="text-base text-ink-faint">/{hospital.igd.total}</span></p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-line p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-ink">Rujukan Keluar Terbaru</h2>
            <Button to="/admin-rs/rujukan-aktif" variant="ghost" size="sm" icon={ArrowRight} iconRight>Lihat semua</Button>
          </div>
          <div className="divide-y divide-line">
            {activeOutgoing.slice(0, 4).map((r) => {
              const meta = REFERRAL_STATUS_META[r.status] || REFERRAL_STATUS_META.menunggu_konfirmasi
              return (
                <div key={r.id} className="flex items-center justify-between gap-3 py-3">
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
        </section>

        <section className="rounded-xl border border-line p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-ink">Pembaruan Ketersediaan</h2>
            <Button to="/admin-rs/ketersediaan" size="sm" variant="soft">Update Ketersediaan</Button>
          </div>
          <div className="rounded-lg bg-surface-tint p-4">
            <p className="text-sm font-medium text-ink">Update Terakhir</p>
            <FreshnessNote iso={hospital.lastUpdated} className="mt-1" />
          </div>
          
          <div className="mt-4 rounded-lg border border-line p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-soft">Status Publik</span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${hospitalStatus(hospital) === 'tersedia' ? 'bg-secondary text-deep-dark' : 'bg-red-bg text-red'}`}>
                {hospitalStatus(hospital) === 'tersedia' ? 'Tersedia' : 'Penuh'}
              </span>
            </div>
          </div>
        </section>
      </div>

    </DashboardLayout>
  )
}
