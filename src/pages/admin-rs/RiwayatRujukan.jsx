import { Link } from 'react-router-dom'
import { FilePlus2, ChevronRight } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { formatDateTime } from '../../utils/helpers'
import { adminRsNav } from './nav'

const STATUS_LABEL = { diajukan: 'Diajukan', diterima: 'Diterima', selesai: 'Selesai' }

export default function RiwayatRujukan() {
  const { referrals } = useApp()
  const history = referrals.filter((r) => r.status === 'selesai' || r.status === 'ditolak')

  return (
    <DashboardLayout nav={adminRsNav} roleLabel="Portal Admin Rumah Sakit">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Riwayat Rujukan</h1>
        <Button to="/admin-rs/buat-rujukan" size="sm" icon={FilePlus2}>Buat Rujukan</Button>
      </div>

      {referrals.length === 0 ? (
        <EmptyState icon={FilePlus2} title="Belum ada riwayat rujukan" description="Rujukan yang Anda ajukan akan tercatat di sini lengkap dengan statusnya." action={<Button to="/nakes/buat-rujukan" size="sm">Buat rujukan pertama</Button>} />
      ) : (
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface-tint text-left text-xs text-ink-faint">
              <tr>
                <th className="px-4 py-3 font-medium">Nomor</th>
                <th className="px-4 py-3 font-medium">RS Tujuan</th>
                <th className="px-4 py-3 font-medium">Tanggal</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {referrals.map((r) => (
                <tr key={r.id} className="hover:bg-surface-tint">
                  <td className="px-4 py-3 tnum text-ink">{r.id}</td>
                  <td className="px-4 py-3 text-ink">{r.hospitalName}</td>
                  <td className="px-4 py-3 tnum text-ink-soft">{formatDateTime(r.createdAt)}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-deep-dark">{STATUS_LABEL[r.status]}</span></td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin-rs/riwayat/${r.id}`} className="inline-flex items-center gap-1 text-deep-dark hover:underline">
                      Detail <ChevronRight size={14} />
                    </Link>
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
