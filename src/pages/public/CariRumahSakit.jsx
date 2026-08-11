import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, MapPin, SlidersHorizontal, X, Map as MapIcon, List } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import HospitalCard from '../../components/HospitalCard'
import { EmptyState, PageWrap } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { hospitalStatus, SERVICE_TYPES } from '../../data/hospitals'
import { haversineKm } from '../../utils/helpers'

const MALANG_CENTER = { lat: -7.9666, lng: 112.6326 }

const pinIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#41956a;border:2.5px solid white;box-shadow:0 1px 4px rgba(0,0,0,.35)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const STATUS_OPTIONS = ['tersedia', 'terbatas', 'penuh']

export default function CariRumahSakit() {
  const [params, setParams] = useSearchParams()
  const { hospitals } = useApp()
  const [q, setQ] = useState(params.get('q') || '')
  const [service, setService] = useState(params.get('layanan') || '')
  const [status, setStatus] = useState('')
  const [maxDist, setMaxDist] = useState(20)
  const [view, setView] = useState('list')
  const [showFilters, setShowFilters] = useState(false)

  const results = useMemo(() => {
    return hospitals
      .map((h) => ({ ...h, distanceKm: haversineKm(MALANG_CENTER.lat, MALANG_CENTER.lng, h.lat, h.lng) }))
      .filter((h) => {
        const matchQ = q ? h.name.toLowerCase().includes(q.toLowerCase()) || h.specialists.some((s) => s.toLowerCase().includes(q.toLowerCase())) : true
        const matchService = service ? h.services.includes(service) : true
        const matchStatus = status ? hospitalStatus(h) === status : true
        const matchDist = h.distanceKm <= maxDist
        return matchQ && matchService && matchStatus && matchDist
      })
      .sort((a, b) => a.distanceKm - b.distanceKm)
  }, [hospitals, q, service, status, maxDist])

  function clearFilters() {
    setQ(''); setService(''); setStatus(''); setMaxDist(20); setParams({})
  }

  const activeFilterCount = [service, status].filter(Boolean).length + (maxDist < 20 ? 1 : 0)

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageWrap className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Cari Rumah Sakit</h1>
          <p className="mt-1 text-sm text-ink-soft">{results.length} rumah sakit ditemukan di sekitar Anda</p>
        </div>

        {/* Search + toggle */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari nama rumah sakit atau spesialisasi..."
              className="w-full rounded-lg border border-line bg-surface py-2.5 pl-10 pr-3 text-sm outline-none placeholder:text-ink-faint focus:border-deep"
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink hover:border-deep"
          >
            <SlidersHorizontal size={16} /> Filter {activeFilterCount > 0 && <span className="rounded-full bg-deep px-1.5 text-xs text-white">{activeFilterCount}</span>}
          </button>
          <div className="inline-flex overflow-hidden rounded-lg border border-line">
            <button onClick={() => setView('list')} className={`px-3 py-2.5 ${view === 'list' ? 'bg-secondary text-deep-dark' : 'text-ink-faint'}`} aria-label="Tampilan daftar"><List size={16} /></button>
            <button onClick={() => setView('map')} className={`px-3 py-2.5 ${view === 'map' ? 'bg-secondary text-deep-dark' : 'text-ink-faint'}`} aria-label="Tampilan peta"><MapIcon size={16} /></button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 grid gap-4 rounded-xl border border-line p-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-soft">Jenis layanan</label>
              <select value={service} onChange={(e) => setService(e.target.value)} className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-deep">
                <option value="">Semua layanan</option>
                {SERVICE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-soft">Status ketersediaan</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-deep">
                <option value="">Semua status</option>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-soft">Jarak maksimum: {maxDist} km</label>
              <input type="range" min="1" max="20" value={maxDist} onChange={(e) => setMaxDist(Number(e.target.value))} className="w-full accent-[#41956a]" />
            </div>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="inline-flex w-fit items-center gap-1 text-sm text-ink-soft hover:text-red">
                <X size={14} /> Hapus semua filter
              </button>
            )}
          </div>
        )}

        {results.length === 0 ? (
          <EmptyState icon={Search} title="Tidak ada rumah sakit ditemukan" description="Coba ubah kata kunci atau perlebar filter jarak & layanan." action={<button onClick={clearFilters} className="text-sm font-medium text-deep-dark underline">Hapus filter</button>} />
        ) : view === 'list' ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((h, i) => <HospitalCard key={h.id} hospital={h} distanceKm={h.distanceKm} index={i} />)}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-line" style={{ height: 520 }}>
            <MapContainer center={[MALANG_CENTER.lat, MALANG_CENTER.lng]} zoom={12} style={{ height: '100%', width: '100%' }}>
              <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {results.map((h) => (
                <Marker key={h.id} position={[h.lat, h.lng]} icon={pinIcon}>
                  <Popup>
                    <p className="font-medium">{h.name}</p>
                    <p className="text-xs text-ink-soft">{h.distanceKm.toFixed(1)} km · {hospitalStatus(h)}</p>
                    <a href={`/rumah-sakit/${h.id}`} className="text-xs font-medium text-deep-dark underline">Lihat detail</a>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-ink-faint">
          <MapPin size={12} /> Jarak dihitung dari lokasi contoh di Kota Malang.
        </p>
      </PageWrap>
      <Footer />
    </div>
  )
}
