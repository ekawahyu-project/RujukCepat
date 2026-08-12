import { useState } from 'react'
import { Inbox, CheckCircle2, XCircle, Clock } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { formatDateTime } from '../../utils/helpers'
import { adminRsNav } from './nav'

const FILTER_TABS = [
  { key: 'semua', label: 'Semua' },
  { key: 'menunggu_konfirmasi', label: 'Menunggu' },
  { key: 'diterima', label: 'Diterima' },
  { key: 'ditolak', label: 'Ditolak' },
]

const STATUS_META = {
  menunggu_konfirmasi: { label: 'Menunggu', color: 'bg-amber-bg text-amber', icon: Clock },
  diterima: { label: 'Diterima', color: 'bg-secondary text-deep-dark', icon: CheckCircle2 },
  ditolak: { label: 'Ditolak', color: 'bg-red-bg text-red', icon: XCircle },
  selesai: { label: 'Selesai', color: 'bg-surface-tint text-ink-faint', icon: CheckCircle2 },
}

function RespondModal({ referral, onClose, onRespond }) {
  const [note, setNote] = useState('')
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl">
        <h3 className="mb-1 font-semibold text-ink">Respons Rujukan</h3>
        <p className="mb-4 text-sm text-ink-soft">
          Rujukan <span className="tnum font-medium text-ink">{referral.id}</span> dari nakes untuk RS <span className="font-medium">{referral.hospitalName}</span>.
        </p>
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium text-ink-soft">Catatan (opsional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Mis: ICU sudah tersedia, pasien dapat segera dikirim."
            rows={3}
            className="w-full resize-none rounded-lg border border-line bg-surface-tint px-3 py-2 text-sm outline-none placeholder:text-ink-faint focus:border-deep"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => { onRespond('diterima', note); onClose() }}
            className="flex-1"
            icon={CheckCircle2}
          >
            Terima Rujukan
          </Button>
          <Button
            onClick={() => { onRespond('ditolak', note); onClose() }}
            variant="outline"
            className="flex-1 border-red text-red hover:bg-red-bg"
            icon={XCircle}
          >
            Tolak
          </Button>
        </div>
        <button onClick={onClose} className="mt-3 w-full text-center text-xs text-ink-faint hover:text-ink">
          Batal
        </button>
      </div>
    </div>
  )
}

export default function RujukanMasuk() {
  const { referrals, respondReferral } = useApp()
  const [filter, setFilter] = useState('semua')
  const [selected, setSelected] = useState(null)

  const allIncoming = referrals // Semua rujukan di-demo ke RS ini
  const filtered = filter === 'semua' ? allIncoming : allIncoming.filter((r) => r.status === filter)

  const pendingCount = referrals.filter((r) => r.status === 'menunggu_konfirmasi').length

  return (
    <DashboardLayout nav={adminRsNav} roleLabel="Portal Admin Rumah Sakit">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Rujukan Masuk</h1>
          {pendingCount > 0 && (
            <span className="rounded-full bg-amber-bg px-3 py-1 text-xs font-semibold text-amber">
              {pendingCount} menunggu respons
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-ink-soft">
          Kelola rujukan yang masuk dari tenaga kesehatan dan fasilitas pengirim.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {FILTER_TABS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f.key
                ? 'bg-deep text-white'
                : 'border border-line bg-surface text-ink-soft hover:border-deep/50'
            }`}
          >
            {f.label}
            {f.key === 'menunggu_konfirmasi' && pendingCount > 0 && (
              <span className="ml-1.5 rounded-full bg-amber text-white px-1.5 py-0.5 text-[10px] font-bold">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List Rujukan */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Tidak ada rujukan"
          description={filter === 'semua' ? 'Belum ada rujukan masuk dari nakes.' : `Tidak ada rujukan dengan status "${FILTER_TABS.find(f => f.key === filter)?.label}".`}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => {
            const meta = STATUS_META[r.status] || STATUS_META.menunggu_konfirmasi
            const MetaIcon = meta.icon
            return (
              <div key={r.id} className="rounded-xl border border-line p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{r.hospitalName}</p>
                    <p className="tnum mt-0.5 text-xs text-ink-faint">
                      {r.id} · {formatDateTime(r.createdAt)}
                    </p>
                  </div>
                  <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.color}`}>
                    <MetaIcon size={11} />
                    {meta.label}
                  </span>
                </div>

                {r.patientCondition && (
                  <div className="mt-3 rounded-lg bg-surface-tint px-3.5 py-2.5 text-sm">
                    <span className="font-medium text-ink-soft">Kondisi Pasien: </span>
                    <span className="text-ink">{r.patientCondition}</span>
                  </div>
                )}

                {r.responseNote && (
                  <div className="mt-2 text-xs text-ink-soft">
                    <span className="font-medium">Catatan: </span>{r.responseNote}
                  </div>
                )}

                {/* Actions */}
                {r.status === 'menunggu_konfirmasi' && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={() => setSelected(r)}
                      size="sm"
                    >
                      Beri Respons
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Respond Modal */}
      {selected && (
        <RespondModal
          referral={selected}
          onClose={() => setSelected(null)}
          onRespond={(response, note) => respondReferral(selected.id, response, note)}
        />
      )}
    </DashboardLayout>
  )
}
