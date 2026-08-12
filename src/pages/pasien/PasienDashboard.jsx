import { ArrowRight, ClipboardList, PillBottle, Activity, Search } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { StatusBadge } from '../../components/StatusBadge'
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

export default function PasienDashboard() {
  const { user, referrals, transactions } = useApp()

  // Demo: pasien melihat 2 rujukan teratas dan transaksi obat terbaru
  const activeReferrals = referrals.filter((r) => r.status !== 'selesai' && r.status !== 'ditolak')
  const activeTransactions = transactions.filter((t) => t.status !== 'selesai')

  return (
    <DashboardLayout nav={pasienNav} roleLabel="Portal Pasien">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Halo, {user?.name}
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Pantau rujukan dan status obat Anda di sini.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Button to="/cari-rumah-sakit" variant="outline" size="sm" icon={Search} className="justify-start">
          Cari Rumah Sakit
        </Button>
        <Button to="/pasien/rujukan" variant="outline" size="sm" icon={ClipboardList} className="justify-start">
          Lihat Rujukan Saya
        </Button>
        <Button to="/pasien/obat" variant="outline" size="sm" icon={PillBottle} className="justify-start">
          Cek Status Obat
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Rujukan Aktif */}
        <section className="rounded-xl border border-line p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold text-ink">
              <Activity size={17} className="text-deep-dark" />
              Rujukan Aktif
            </h2>
            <Button to="/pasien/rujukan" variant="ghost" size="sm" icon={ArrowRight} iconRight>
              Semua
            </Button>
          </div>
          {activeReferrals.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              title="Tidak ada rujukan aktif"
              description="Rujukan yang masih berjalan akan muncul di sini."
            />
          ) : (
            <div className="divide-y divide-line">
              {activeReferrals.slice(0, 3).map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{r.hospitalName}</p>
                    <p className="tnum text-xs text-ink-faint">
                      {r.id} · {formatDateTime(r.createdAt)}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${REFERRAL_COLORS[r.status]}`}>
                    {REFERRAL_LABELS[r.status]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Status Obat */}
        <section className="rounded-xl border border-line p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold text-ink">
              <PillBottle size={17} className="text-deep-dark" />
              Status Obat
            </h2>
            <Button to="/pasien/obat" variant="ghost" size="sm" icon={ArrowRight} iconRight>
              Semua
            </Button>
          </div>
          {activeTransactions.length === 0 ? (
            <EmptyState
              icon={PillBottle}
              title="Tidak ada transaksi aktif"
              description="Status obat yang sedang diproses akan muncul di sini."
            />
          ) : (
            <div className="divide-y divide-line">
              {activeTransactions.slice(0, 3).map((t) => (
                <div key={t.code} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="tnum text-sm font-medium text-ink">{t.code}</p>
                    <p className="truncate text-xs text-ink-faint">{t.pharmacy}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    OBAT_STATUS_META[t.status]?.color || 'bg-secondary text-deep-dark'
                  }`}>
                    {OBAT_STATUS_META[t.status]?.label || t.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  )
}
