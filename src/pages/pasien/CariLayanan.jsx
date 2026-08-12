import { Search, MapPin, Stethoscope, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../components/DashboardLayout'
import { pasienNav } from './nav'

const CARI_ITEMS = [
  { title: 'Cari Rumah Sakit', desc: 'Temukan rumah sakit berdasarkan lokasi dan fasilitas', icon: MapPin, to: '/cari-rumah-sakit' },
  { title: 'Cari IGD Terdekat', desc: 'Cari IGD dengan ketersediaan bed kosong', icon: Activity, to: '/cari-rumah-sakit?q=igd' },
  { title: 'Cari Spesialis', desc: 'Temukan dokter spesialis sesuai kebutuhan Anda', icon: Stethoscope, to: '/cari-rumah-sakit' },
]

export default function CariLayanan() {
  return (
    <DashboardLayout nav={pasienNav} roleLabel="Portal Pasien">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Cari Layanan</h1>
        <p className="mt-1 text-sm text-ink-soft">Temukan fasilitas kesehatan yang sesuai dengan kebutuhan Anda.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {CARI_ITEMS.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="group flex flex-col justify-between rounded-xl border border-line bg-surface p-5 transition-all hover:border-deep/50 hover:shadow-sm"
          >
            <div>
              <div className="mb-4 inline-flex rounded-lg bg-surface-tint p-3 text-ink-faint group-hover:bg-secondary group-hover:text-deep-dark transition-colors">
                <item.icon size={20} />
              </div>
              <h3 className="mb-1.5 font-semibold text-ink group-hover:text-deep-dark transition-colors">{item.title}</h3>
              <p className="text-sm text-ink-soft">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 rounded-xl border border-line bg-surface-tint p-6 text-center">
        <Search size={32} className="mx-auto mb-3 text-ink-faint" />
        <h3 className="mb-1 font-semibold text-ink">Gunakan Pencarian Publik</h3>
        <p className="text-sm text-ink-soft">Saat ini fitur pencarian layanan terintegrasi dengan direktori publik RujukCepat.</p>
        <Link to="/cari-rumah-sakit" className="mt-4 inline-flex items-center justify-center rounded-lg bg-deep px-4 py-2 text-sm font-medium text-white hover:bg-deep-dark">
          Mulai Mencari
        </Link>
      </div>
    </DashboardLayout>
  )
}
