import { Loader2 } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { formatDateTime } from '../../utils/helpers'
import { adminRsNav } from './nav'

export default function RujukanDiproses() {
  const { referrals } = useApp()
  // Rujukan yang masuk dan sudah diterima oleh RS ini
  const diproses = referrals.filter((r) => r.status === 'diterima')

  return (
    <DashboardLayout nav={adminRsNav} roleLabel="Portal Admin Rumah Sakit">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Rujukan Diproses</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Daftar pasien rujukan yang sedang dalam penanganan atau perjalanan ke fasilitas Anda.
        </p>
      </div>

      {diproses.length === 0 ? (
        <EmptyState
          icon={Loader2}
          title="Tidak ada rujukan diproses"
          description="Rujukan masuk yang telah Anda terima akan muncul di sini."
        />
      ) : (
        <div className="space-y-4">
          {diproses.map((r) => (
            <div key={r.id} className="rounded-xl border border-secondary bg-secondary/20 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">Dari: {r.hospitalName}</p>
                  <p className="tnum mt-0.5 text-xs text-ink-faint">
                    ID Rujukan: {r.id} · Diterima {r.respondedAt ? formatDateTime(r.respondedAt) : '-'}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-deep-dark">
                  Sedang Diproses
                </span>
              </div>
              {r.patientCondition && (
                <div className="mt-3 rounded-lg bg-surface px-3.5 py-2.5 text-sm">
                  <span className="font-medium text-ink-soft">Kondisi: </span>
                  <span className="text-ink">{r.patientCondition}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
