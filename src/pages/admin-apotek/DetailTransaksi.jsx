import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Check } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { OBAT_STATUS_META, formatDateTime } from '../../utils/helpers'
import { adminApotekNav } from './nav'

const FLOW = ['diproses', 'siap', 'selesai']

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

  return (
    <DashboardLayout nav={adminApotekNav} roleLabel="Portal Admin Apotek">
      <div className="mx-auto max-w-2xl">
        <Link to="/admin-apotek/transaksi" className="mb-4 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-deep-dark"><ChevronLeft size={16} /> Kembali ke daftar transaksi</Link>

        <div className="rounded-xl border border-line p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-ink-faint">Kode Transaksi</p>
              <p className="tnum text-xl font-semibold text-ink">{transaction.code}</p>
              <p className="mt-1 text-sm text-ink-soft">{transaction.pharmacy} · Pasien {transaction.patientInitial}</p>
            </div>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-deep-dark">{OBAT_STATUS_META[transaction.status].label}</span>
          </div>

          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2 text-sm font-medium text-ink">Daftar Obat</p>
            <ul className="space-y-1.5">
              {transaction.medicines.map((m) => (
                <li key={m.name} className="flex justify-between text-sm text-ink-soft"><span>{m.name}</span><span className="tnum">{m.qty}</span></li>
              ))}
            </ul>
          </div>

          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2 text-sm font-medium text-ink">Riwayat Status</p>
            <ul className="space-y-2">
              {transaction.history.map((h, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm">
                  <Check size={14} className="text-deep-dark" />
                  <span className="text-ink">{OBAT_STATUS_META[h.status].label}</span>
                  <span className="tnum text-xs text-ink-faint">{formatDateTime(h.at)}</span>
                </li>
              ))}
            </ul>
          </div>

          {nextStatus ? (
            <Button className="mt-6" onClick={() => updateTransactionStatus(transaction.code, nextStatus)}>
              Ubah Status Menjadi "{OBAT_STATUS_META[nextStatus].label}"
            </Button>
          ) : (
            <p className="mt-6 text-sm text-ink-faint">Transaksi ini telah selesai.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
