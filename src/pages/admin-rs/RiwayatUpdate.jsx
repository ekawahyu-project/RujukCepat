import { History } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { formatDateTime } from '../../utils/helpers'
import { adminRsNav } from './nav'

export default function RiwayatUpdate() {
  const { hospitals, updateLog } = useApp()
  const hospital = hospitals[0]
  const logs = updateLog.filter((l) => l.hospitalId === hospital.id)

  return (
    <DashboardLayout nav={adminRsNav} roleLabel="Portal Admin Rumah Sakit">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-ink">Riwayat Update</h1>

      {logs.length === 0 ? (
        <EmptyState icon={History} title="Belum ada riwayat perubahan" description="Setiap perubahan data ketersediaan atau jadwal dokter akan tercatat di sini." />
      ) : (
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface-tint text-left text-xs text-ink-faint">
              <tr>
                <th className="px-4 py-3 font-medium">Data diperbarui</th>
                <th className="px-4 py-3 font-medium">Admin</th>
                <th className="px-4 py-3 font-medium">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-surface-tint">
                  <td className="px-4 py-3 text-ink">{l.field}</td>
                  <td className="px-4 py-3 text-ink-soft">{l.actor}</td>
                  <td className="px-4 py-3 tnum text-ink-soft">{formatDateTime(l.at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  )
}
