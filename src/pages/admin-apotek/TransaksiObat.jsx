import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { OBAT_STATUS_META, formatDateTime } from '../../utils/helpers'
import { adminApotekNav } from './nav'

export default function TransaksiObat() {
  const { transactions } = useApp()
  const [q, setQ] = useState('')

  const filtered = transactions.filter((t) => t.code.toLowerCase().includes(q.toLowerCase()) || t.patientInitial.toLowerCase().includes(q.toLowerCase()))

  return (
    <DashboardLayout nav={adminApotekNav} roleLabel="Portal Admin Apotek">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-ink">Transaksi Obat</h1>

      <div className="relative mb-5 max-w-sm">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari kode transaksi atau pasien..." className="w-full rounded-lg border border-line bg-surface py-2.5 pl-10 pr-3 text-sm outline-none placeholder:text-ink-faint focus:border-deep" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="Tidak ada transaksi ditemukan" />
      ) : (
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface-tint text-left text-xs text-ink-faint">
              <tr>
                <th className="px-4 py-3 font-medium">Kode</th>
                <th className="px-4 py-3 font-medium">Obat</th>
                <th className="px-4 py-3 font-medium">Waktu Transaksi</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((t) => (
                <tr key={t.code} className="hover:bg-surface-tint">
                  <td className="px-4 py-3 tnum text-ink">{t.code}</td>
                  <td className="px-4 py-3 text-ink-soft">{t.medicines.map((m) => m.name).join(', ')}</td>
                  <td className="px-4 py-3 tnum text-ink-soft">{formatDateTime(t.history[0].at)}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-deep-dark">{OBAT_STATUS_META[t.status].label}</span></td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin-apotek/transaksi/${t.code}`} className="inline-flex items-center gap-1 text-deep-dark hover:underline">Detail <ChevronRight size={14} /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  )
}
