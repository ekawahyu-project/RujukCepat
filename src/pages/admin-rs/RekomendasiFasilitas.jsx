import { MapPin, Search } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { StatusBadge } from '../../components/StatusBadge'
import { useApp } from '../../context/AppContext'
import { adminRsNav } from './nav'

export default function RekomendasiFasilitas() {
  const { hospitals } = useApp()

  return (
    <DashboardLayout nav={adminRsNav} roleLabel="Portal Admin Rumah Sakit">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Rekomendasi Fasilitas</h1>
          <p className="mt-1 text-sm text-ink-soft">Cari fasilitas kesehatan lain untuk merujuk pasien.</p>
        </div>
        <Button to="/admin-rs/buat-rujukan" icon={Search}>Buat Rujukan Baru</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hospitals.map((h) => (
          <div key={h.id} className="flex flex-col justify-between rounded-xl border border-line p-5">
            <div>
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="font-semibold text-ink">{h.name}</h3>
                <StatusBadge status="tersedia" size="sm" />
              </div>
              <p className="mb-3 inline-flex items-center gap-1.5 text-xs text-ink-soft">
                <MapPin size={14} className="text-ink-faint" /> {h.address}
              </p>
              <div className="mb-4">
                <div className="flex flex-wrap gap-1.5">
                  {h.specialists.slice(0, 3).map((s) => (
                    <span key={s} className="rounded-md bg-surface-tint px-2 py-0.5 text-[10px] text-ink-soft">{s}</span>
                  ))}
                  {h.specialists.length > 3 && <span className="rounded-md bg-surface-tint px-2 py-0.5 text-[10px] text-ink-soft">+{h.specialists.length - 3}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
