import { Activity, Clock, CheckCircle2, XCircle, MessageSquare } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { formatDateTime } from '../../utils/helpers'
import { adminRsNav } from './nav'

const STATUS_META = {
  menunggu_konfirmasi: { label: 'Menunggu Konfirmasi', icon: Clock, color: 'bg-amber-bg text-amber' },
  diterima: { label: 'Diterima RS', icon: CheckCircle2, color: 'bg-secondary text-deep-dark' },
  ditolak: { label: 'Ditolak', icon: XCircle, color: 'bg-red-bg text-red' },
  selesai: { label: 'Selesai', icon: CheckCircle2, color: 'bg-surface-tint text-ink-faint' },
}

export default function RujukanAktif() {
  const { referrals, completeReferral } = useApp()

  const aktif = referrals.filter((r) => r.status !== 'selesai')

  return (
    <DashboardLayout nav={adminRsNav} roleLabel="Portal Admin Rumah Sakit">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Rujukan Aktif</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Pantau status rujukan yang sedang dalam proses konfirmasi rumah sakit.
        </p>
      </div>

      {aktif.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="Tidak ada rujukan aktif"
          description="Semua rujukan sudah selesai, atau belum ada rujukan yang dibuat."
          action={<Button to="/admin-rs/buat-rujukan" size="sm">Buat Rujukan</Button>}
        />
      ) : (
        <div className="space-y-4">
          {aktif.map((r) => {
            const meta = STATUS_META[r.status] || STATUS_META.menunggu_konfirmasi
            const MetaIcon = meta.icon
            return (
              <div key={r.id} className="rounded-xl border border-line p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{r.hospitalName}</p>
                    <p className="tnum mt-0.5 text-xs text-ink-faint">
                      {r.id} · Dibuat {formatDateTime(r.createdAt)}
                    </p>
                  </div>
                  <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.color}`}>
                    <MetaIcon size={11} />
                    {meta.label}
                  </span>
                </div>

                {/* Detail Kondisi */}
                {r.patientCondition && (
                  <div className="mt-3 rounded-lg bg-surface-tint px-3.5 py-2.5 text-sm">
                    <span className="font-medium text-ink-soft">Kondisi: </span>
                    <span className="text-ink">{r.patientCondition}</span>
                  </div>
                )}

                {/* Response dari RS */}
                {r.status === 'diterima' && (
                  <div className="mt-3 rounded-lg border border-secondary bg-secondary/40 px-3.5 py-2.5 text-sm text-deep-dark">
                    <div className="mb-1 flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      <span className="font-medium">Dikonfirmasi RS</span>
                    </div>
                    {r.responseNote && <p className="text-xs">{r.responseNote}</p>}
                    {r.respondedAt && <p className="mt-1 text-xs opacity-70">Pada: {formatDateTime(r.respondedAt)}</p>}
                  </div>
                )}

                {r.status === 'ditolak' && (
                  <div className="mt-3 rounded-lg border border-red-bg bg-red-bg/50 px-3.5 py-2.5 text-sm text-red">
                    <div className="mb-1 flex items-center gap-1.5">
                      <XCircle size={13} />
                      <span className="font-medium">Tidak Dapat Diterima</span>
                    </div>
                    {r.responseNote && <p className="text-xs">{r.responseNote}</p>}
                  </div>
                )}

                {/* Status History */}
                {r.statusHistory && r.statusHistory.length > 1 && (
                  <div className="mt-3 space-y-1 border-t border-line pt-3">
                    <p className="mb-2 text-xs font-medium text-ink-faint">Riwayat Status</p>
                    {r.statusHistory.map((h, i) => (
                      <div key={i} className="flex items-center justify-between text-xs text-ink-soft">
                        <span>{STATUS_META[h.status]?.label || h.status}</span>
                        <span className="tnum text-ink-faint">{formatDateTime(h.at)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action */}
                {r.status === 'diterima' && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={() => completeReferral(r.id)}
                      variant="outline"
                      size="sm"
                    >
                      Tandai Selesai
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}
