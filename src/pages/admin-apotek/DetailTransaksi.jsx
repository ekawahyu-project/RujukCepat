import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Check, PackageCheck, Loader2, CheckCircle2, Clock } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { OBAT_STATUS_META, formatDateTime } from '../../utils/helpers'
import { adminApotekNav } from './nav'

const FLOW = ['menunggu', 'diproses', 'siap', 'selesai']

const STEP_ICONS = {
  menunggu: Clock,
  diproses: Loader2,
  siap: PackageCheck,
  selesai: CheckCircle2,
}

const NEXT_LABEL = {
  menunggu: 'Terima Resep — Mulai Proses',
  diproses: 'Tandai Siap Diambil',
  siap: 'Tandai Selesai',
}

export default function DetailTransaksi() {
  const { code } = useParams()
  const { transactions, updateTransactionStatus } = useApp()
  const transaction = transactions.find((t) => t.code === code)

  if (!transaction) {
    return (
      <DashboardLayout nav={adminApotekNav} roleLabel="Portal Admin Apotek">
        <EmptyState title="Transaksi tidak ditemukan" action={<Button to="/admin-apotek/transaksi" size="sm">Kembali</Button>} />
      </DashboardLayout>
    )
  }

  const currentIndex = FLOW.indexOf(transaction.status)
  const nextStatus = FLOW[currentIndex + 1]
  const meta = OBAT_STATUS_META[transaction.status]

  return (
    <DashboardLayout nav={adminApotekNav} roleLabel="Portal Admin Apotek">
      <div className="mx-auto max-w-2xl">
        <Link to="/admin-apotek/transaksi" className="mb-4 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-deep-dark">
          <ChevronLeft size={16} /> Kembali ke daftar transaksi
        </Link>

        <div className="rounded-xl border border-line p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-ink-faint">Kode Transaksi</p>
              <p className="tnum text-xl font-semibold text-ink">{transaction.code}</p>
              <p className="mt-1 text-sm text-ink-soft">{transaction.pharmacy} · Pasien {transaction.patientInitial}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${meta?.color || 'bg-secondary text-deep-dark'}`}>
              {meta?.label || transaction.status}
            </span>
          </div>

          {/* Progress Visual */}
          <div className="mt-5 flex items-center gap-0 border-t border-line pt-4">
            {FLOW.map((step, i) => {
              const done = i <= currentIndex
              const StepIcon = STEP_ICONS[step]
              const stepMeta = OBAT_STATUS_META[step]
              return (
                <div key={step} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                      done ? 'bg-deep text-white' : 'bg-line text-ink-faint'
                    }`}>
                      <StepIcon size={14} />
                    </div>
                    <span className={`text-[10px] font-medium ${done ? 'text-deep-dark' : 'text-ink-faint'}`}>
                      {stepMeta?.label?.split(' ')[0]}
                    </span>
                  </div>
                  {i < FLOW.length - 1 && (
                    <div className={`mb-4 h-0.5 flex-1 transition-colors ${i < currentIndex ? 'bg-deep' : 'bg-line'}`} />
                  )}
                </div>
              )
            })}
          </div>

          {/* Daftar Obat */}
          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2 text-sm font-medium text-ink">Daftar Obat</p>
            <ul className="space-y-1.5">
              {transaction.medicines.map((m) => (
                <li key={m.name} className="flex justify-between text-sm text-ink-soft">
                  <span>{m.name}</span>
                  <span className="tnum">{m.qty}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Riwayat Status */}
          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2 text-sm font-medium text-ink">Riwayat Status</p>
            <ul className="space-y-2">
              {transaction.history.map((h, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm">
                  <Check size={14} className="text-deep-dark" />
                  <span className="text-ink">{OBAT_STATUS_META[h.status]?.label || h.status}</span>
                  <span className="tnum text-xs text-ink-faint">{formatDateTime(h.at)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          {nextStatus ? (
            <Button
              className="mt-6"
              onClick={() => updateTransactionStatus(transaction.code, nextStatus)}
              icon={nextStatus === 'diproses' ? Loader2 : nextStatus === 'siap' ? PackageCheck : CheckCircle2}
            >
              {NEXT_LABEL[transaction.status] || `Ubah ke ${OBAT_STATUS_META[nextStatus]?.label}`}
            </Button>
          ) : (
            <div className="mt-6 flex items-center gap-2 rounded-lg bg-surface-tint px-4 py-3 text-sm text-ink-faint">
              <CheckCircle2 size={15} className="text-deep-dark" />
              Transaksi ini telah selesai.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
