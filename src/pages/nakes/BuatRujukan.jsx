import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronLeft, MapPin, Send } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { StatusBadge, FreshnessNote } from '../../components/StatusBadge'
import { useApp } from '../../context/AppContext'
import { hospitalStatus } from '../../data/hospitals'
import { CONDITION_CATEGORIES } from '../../data/conditions'
import { haversineKm } from '../../utils/helpers'
import { nakesNav } from './nav'

const MALANG_CENTER = { lat: -7.9666, lng: 112.6326 }
const STEP_LABELS = ['Kondisi Pasien', 'Rekomendasi RS', 'Detail RS', 'Konfirmasi']

export default function BuatRujukan() {
  const { hospitals, addReferral } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [category, setCategory] = useState(null)
  const [note, setNote] = useState('')
  const [selectedHospital, setSelectedHospital] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const recommendations = useMemo(() => {
    if (!category) return []
    return hospitals
      .map((h) => ({
        ...h,
        distanceKm: haversineKm(MALANG_CENTER.lat, MALANG_CENTER.lng, h.lat, h.lng),
        status: hospitalStatus(h),
        matches: h.specialists.includes(category.specialty),
      }))
      .filter((h) => h.matches)
      .sort((a, b) => {
        const order = { tersedia: 0, terbatas: 1, penuh: 2 }
        if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status]
        return a.distanceKm - b.distanceKm
      })
  }, [hospitals, category])

  function reasonsFor(h) {
    const r = []
    if (h.status === 'tersedia') r.push(`${h.specialists.includes(category.specialty) ? 'Spesialis ' + category.specialty + ' tersedia' : ''}`)
    else r.push(`Spesialis ${category.specialty} tersedia`)
    r.push(`Jarak ${h.distanceKm.toFixed(1)} km`)
    r.push(`Status: ${h.status === 'tersedia' ? 'Tersedia' : h.status === 'terbatas' ? 'Terbatas' : 'Penuh'}`)
    return r.filter(Boolean)
  }

  function submitReferral() {
    setSubmitting(true)
    setTimeout(() => {
      const id = addReferral({
        conditionCategory: category.label,
        note,
        hospitalId: selectedHospital.id,
        hospitalName: selectedHospital.name,
        reasons: reasonsFor(selectedHospital),
      })
      setSubmitting(false)
      navigate(`/nakes/riwayat/${id}`)
    }, 600)
  }

  return (
    <DashboardLayout nav={nakesNav} roleLabel="Portal Tenaga Kesehatan">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Buat Rujukan</h1>

        {/* Stepper */}
        <div className="my-6 flex items-center">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-medium ${i < step ? 'bg-deep text-white' : i === step ? 'bg-deep text-white' : 'bg-secondary text-ink-faint'}`}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <p className={`mt-1.5 hidden whitespace-nowrap text-xs font-medium sm:block ${i <= step ? 'text-ink' : 'text-ink-faint'}`}>{label}</p>
              </div>
              {i < STEP_LABELS.length - 1 && <div className={`mx-2 h-0.5 flex-1 ${i < step ? 'bg-deep' : 'bg-line'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} className="rounded-xl border border-line p-6">
              <h2 className="mb-1 font-semibold text-ink">Kondisi Pasien</h2>
              <p className="mb-5 text-sm text-ink-soft">Pilih kategori kondisi yang paling sesuai untuk mendapatkan rekomendasi rumah sakit yang relevan.</p>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {CONDITION_CATEGORIES.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setCategory(c)}
                    className={`flex items-center gap-3 rounded-lg border p-3.5 text-left transition-colors ${category?.key === c.key ? 'border-deep bg-secondary' : 'border-line hover:border-deep/50'}`}
                  >
                    <c.icon size={18} className={category?.key === c.key ? 'text-deep-dark' : 'text-ink-faint'} />
                    <span className={`text-sm font-medium ${category?.key === c.key ? 'text-deep-dark' : 'text-ink'}`}>{c.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5">
                <label className="mb-1.5 block text-xs font-medium text-ink-soft">Informasi tambahan (opsional)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Keterangan kondisi pasien yang perlu diketahui RS tujuan..."
                  className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-ink-faint focus:border-deep"
                />
              </div>

              <Button className="mt-5" disabled={!category} onClick={() => setStep(1)}>Lanjutkan</Button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
              <button onClick={() => setStep(0)} className="mb-3 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-deep-dark"><ChevronLeft size={15} /> Ubah kondisi pasien</button>
              <h2 className="mb-1 font-semibold text-ink">Rekomendasi Rumah Sakit</h2>
              <p className="mb-5 text-sm text-ink-soft">Diurutkan berdasarkan ketersediaan, kompetensi, dan jarak untuk kategori "{category?.label}".</p>

              <div className="space-y-3">
                {recommendations.map((h) => (
                  <div key={h.id} className="rounded-xl border border-line p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-ink">{h.name}</p>
                      <StatusBadge status={h.status} size="sm" />
                    </div>
                    <ul className="mt-2 space-y-1">
                      {reasonsFor(h).map((r) => (
                        <li key={r} className="flex items-center gap-1.5 text-sm text-ink-soft"><Check size={13} className="text-deep-dark" /> {r}</li>
                      ))}
                    </ul>
                    <Button size="sm" variant="soft" className="mt-3" onClick={() => { setSelectedHospital(h); setStep(2) }}>Pilih RS</Button>
                  </div>
                ))}
                {recommendations.length === 0 && (
                  <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-ink-soft">Tidak ada RS dengan spesialisasi yang sesuai saat ini.</p>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && selectedHospital && (
            <motion.div key="s2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} className="rounded-xl border border-line p-6">
              <button onClick={() => setStep(1)} className="mb-3 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-deep-dark"><ChevronLeft size={15} /> Pilih RS lain</button>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-ink">{selectedHospital.name}</h2>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-ink-soft"><MapPin size={13} />{selectedHospital.address}</p>
                </div>
                <StatusBadge status={selectedHospital.status} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div className="rounded-lg bg-surface-tint p-3"><p className="text-xs text-ink-faint">Jarak</p><p className="tnum font-medium text-ink">{selectedHospital.distanceKm.toFixed(1)} km</p></div>
                <div className="rounded-lg bg-surface-tint p-3"><p className="text-xs text-ink-faint">IGD</p><p className="tnum font-medium text-ink">{selectedHospital.igd.avail}/{selectedHospital.igd.total}</p></div>
                <div className="rounded-lg bg-surface-tint p-3"><p className="text-xs text-ink-faint">ICU</p><p className="tnum font-medium text-ink">{selectedHospital.icu.avail}/{selectedHospital.icu.total}</p></div>
                <div className="rounded-lg bg-surface-tint p-3"><p className="text-xs text-ink-faint">Diperbarui</p><FreshnessNote iso={selectedHospital.lastUpdated} /></div>
              </div>

              <div className="mt-4">
                <p className="mb-1.5 text-xs font-medium text-ink-soft">Spesialisasi tersedia</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedHospital.specialists.map((s) => (
                    <span key={s} className={`rounded-md px-2.5 py-1 text-xs ${s === category.specialty ? 'bg-deep text-white' : 'bg-surface-tint text-ink-soft'}`}>{s}</span>
                  ))}
                </div>
              </div>

              <Button className="mt-5" onClick={() => setStep(3)}>Lanjutkan ke Konfirmasi</Button>
            </motion.div>
          )}

          {step === 3 && selectedHospital && (
            <motion.div key="s3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }} className="rounded-xl border border-line p-6">
              <button onClick={() => setStep(2)} className="mb-3 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-deep-dark"><ChevronLeft size={15} /> Kembali</button>
              <h2 className="mb-1 font-semibold text-ink">Konfirmasi Rujukan</h2>
              <p className="mb-5 text-sm text-ink-soft">Periksa kembali ringkasan sebelum mengirim permintaan rujukan.</p>

              <dl className="space-y-3 rounded-lg bg-surface-tint p-4 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-ink-soft">Kondisi pasien</dt><dd className="text-right font-medium text-ink">{category.label}</dd></div>
                {note && <div className="flex justify-between gap-3"><dt className="text-ink-soft">Catatan</dt><dd className="text-right text-ink">{note}</dd></div>}
                <div className="flex justify-between gap-3"><dt className="text-ink-soft">Rumah sakit tujuan</dt><dd className="text-right font-medium text-ink">{selectedHospital.name}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-ink-soft">Status ketersediaan</dt><dd><StatusBadge status={selectedHospital.status} size="sm" /></dd></div>
              </dl>

              <div className="mt-4">
                <p className="mb-1.5 text-xs font-medium text-ink-soft">Alasan rekomendasi</p>
                <ul className="space-y-1">
                  {reasonsFor(selectedHospital).map((r) => (
                    <li key={r} className="flex items-center gap-1.5 text-sm text-ink-soft"><Check size={13} className="text-deep-dark" /> {r}</li>
                  ))}
                </ul>
              </div>

              <Button className="mt-5" onClick={submitReferral} disabled={submitting} icon={Send}>
                {submitting ? 'Mengirim...' : 'Kirim Permintaan Rujukan'}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}
