import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Phone, Navigation, BedDouble, Siren, HeartPulse, Stethoscope, ChevronLeft, Clock } from 'lucide-react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Button from '../../components/Button'
import { StatusBadge, FreshnessNote } from '../../components/StatusBadge'
import { EmptyState, PageWrap } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { hospitalStatus } from '../../data/hospitals'

const pinIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#41956a;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,.35)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

function BedRow({ label, avail, total }) {
  const pct = Math.round((avail / total) * 100)
  return (
    <div className="py-2.5">
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-ink">{label}</span>
        <span className="tnum font-medium text-ink">{avail}/{total}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary">
        <div className="h-1.5 rounded-full bg-deep" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function DetailRumahSakit() {
  const { id } = useParams()
  const { hospitals } = useApp()
  const hospital = hospitals.find((h) => h.id === id)

  if (!hospital) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <EmptyState title="Rumah sakit tidak ditemukan" description="Data yang Anda cari mungkin sudah tidak tersedia." action={<Button to="/cari-rumah-sakit" size="sm">Kembali ke pencarian</Button>} />
        </div>
        <Footer />
      </div>
    )
  }

  const status = hospitalStatus(hospital)
  const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageWrap>
        <div className="border-b border-line bg-surface-tint">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <Link to="/cari-rumah-sakit" className="mb-4 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-deep-dark"><ChevronLeft size={16} /> Kembali ke pencarian</Link>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm text-ink-soft">{hospital.type}</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{hospital.name}</h1>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-soft"><MapPin size={14} /> {hospital.address}</p>
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <StatusBadge status={status} />
                <FreshnessNote iso={hospital.lastUpdated} />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button as="a" href={gmapsUrl} target="_blank" rel="noreferrer" icon={Navigation}>Petunjuk Arah</Button>
              <Button as="a" href={`tel:${hospital.phone}`} variant="outline" icon={Phone}>{hospital.phone}</Button>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-xl border border-line p-5">
              <h2 className="mb-1 flex items-center gap-2 font-semibold text-ink"><BedDouble size={18} className="text-deep-dark" /> Ketersediaan Rawat Inap</h2>
              <p className="mb-2 text-xs text-ink-faint">Jumlah kamar tersedia dari total kapasitas per kelas.</p>
              <div className="divide-y divide-line">
                <BedRow label="Kelas 1" avail={hospital.beds.kelas1.avail} total={hospital.beds.kelas1.total} />
                <BedRow label="Kelas 2" avail={hospital.beds.kelas2.avail} total={hospital.beds.kelas2.total} />
                <BedRow label="Kelas 3" avail={hospital.beds.kelas3.avail} total={hospital.beds.kelas3.total} />
                <BedRow label="VIP" avail={hospital.beds.vip.avail} total={hospital.beds.vip.total} />
              </div>
            </section>

            <div className="grid gap-6 sm:grid-cols-2">
              <section className="rounded-xl border border-line p-5">
                <h2 className="mb-3 flex items-center gap-2 font-semibold text-ink"><Siren size={18} className="text-deep-dark" /> IGD</h2>
                <BedRow label="Bed tersedia" avail={hospital.igd.avail} total={hospital.igd.total} />
              </section>
              <section className="rounded-xl border border-line p-5">
                <h2 className="mb-3 flex items-center gap-2 font-semibold text-ink"><HeartPulse size={18} className="text-deep-dark" /> ICU</h2>
                <BedRow label="Bed tersedia" avail={hospital.icu.avail} total={hospital.icu.total} />
              </section>
            </div>

            <section className="rounded-xl border border-line p-5">
              <h2 className="mb-3 font-semibold text-ink">Layanan &amp; Spesialisasi</h2>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {hospital.services.map((s) => <span key={s} className="rounded-md bg-surface-tint px-2.5 py-1 text-xs text-ink-soft">{s}</span>)}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {hospital.specialists.map((s) => <span key={s} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-deep-dark">{s}</span>)}
              </div>
            </section>

            <section className="rounded-xl border border-line p-5">
              <h2 className="mb-3 flex items-center gap-2 font-semibold text-ink"><Stethoscope size={18} className="text-deep-dark" /> Jadwal Dokter</h2>
              <div className="divide-y divide-line">
                {hospital.doctors.map((d) => (
                  <div key={d.name} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-sm font-medium text-ink">{d.name}</p>
                      <p className="text-xs text-ink-soft">{d.specialty}</p>
                    </div>
                    <div className="text-right text-xs text-ink-soft">
                      <p>{d.days}</p>
                      <p className="inline-flex items-center gap-1 tnum"><Clock size={11} />{d.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="overflow-hidden rounded-xl border border-line" style={{ height: 260 }}>
              <MapContainer center={[hospital.lat, hospital.lng]} zoom={14} style={{ height: '100%', width: '100%' }} dragging={false} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[hospital.lat, hospital.lng]} icon={pinIcon} />
              </MapContainer>
            </section>
            <motion.section
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="rounded-xl border border-line bg-secondary/50 p-5"
            >
              <p className="text-sm font-medium text-ink">Butuh rujukan dari fasilitas kesehatan?</p>
              <p className="mt-1 text-sm text-ink-soft">Tenaga kesehatan dapat mengajukan rujukan langsung melalui dashboard Nakes.</p>
              <Button to="/login" variant="primary" size="sm" className="mt-3">Masuk sebagai Nakes</Button>
            </motion.section>
          </div>
        </div>
      </PageWrap>
      <Footer />
    </div>
  )
}
