import { useState } from 'react'
import { Save, Check } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { FreshnessNote } from '../../components/StatusBadge'
import { useApp } from '../../context/AppContext'
import { adminRsNav } from './nav'

const BED_ROWS = [
  { key: 'kelas1', label: 'Kelas 1' },
  { key: 'kelas2', label: 'Kelas 2' },
  { key: 'kelas3', label: 'Kelas 3' },
  { key: 'vip', label: 'VIP' },
]

function NumberField({ label, value, onChange, max }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</label>
      <input
        type="number" min={0} max={max} value={value}
        onChange={(e) => onChange(Math.max(0, Math.min(max, Number(e.target.value))))}
        className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm tnum outline-none focus:border-deep"
      />
    </div>
  )
}

export default function Ketersediaan() {
  const { hospitals, updateHospital, user } = useApp()
  const hospital = hospitals[0]
  const [beds, setBeds] = useState(hospital.beds)
  const [igd, setIgd] = useState(hospital.igd.avail)
  const [icu, setIcu] = useState(hospital.icu.avail)
  const [saved, setSaved] = useState(false)

  function setBedAvail(key, avail) {
    setBeds((b) => ({ ...b, [key]: { ...b[key], avail } }))
  }

  function handleSave() {
    updateHospital(hospital.id, {
      beds,
      igd: { ...hospital.igd, avail: igd },
      icu: { ...hospital.icu, avail: icu },
      __field: 'Ketersediaan kamar, IGD & ICU',
    }, user?.name)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <DashboardLayout nav={adminRsNav} roleLabel="Portal Admin Rumah Sakit">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Ketersediaan</h1>
          <FreshnessNote iso={hospital.lastUpdated} className="mt-1" />
        </div>
        <Button onClick={handleSave} icon={Save}>Simpan Perubahan</Button>
      </div>

      <AnimatePresence>
        {saved && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-5 flex items-center gap-2 rounded-lg bg-secondary px-4 py-3 text-sm text-deep-dark">
            <Check size={16} /> Data ketersediaan berhasil diperbarui. Waktu pembaruan tercatat otomatis.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-line p-5">
          <h2 className="mb-4 font-semibold text-ink">Rawat Inap</h2>
          <div className="grid grid-cols-2 gap-4">
            {BED_ROWS.map((row) => (
              <NumberField
                key={row.key}
                label={`${row.label} (dari ${hospital.beds[row.key].total})`}
                value={beds[row.key].avail}
                max={hospital.beds[row.key].total}
                onChange={(v) => setBedAvail(row.key, v)}
              />
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-xl border border-line p-5">
            <h2 className="mb-4 font-semibold text-ink">IGD</h2>
            <NumberField label={`Kapasitas tersedia (dari ${hospital.igd.total})`} value={igd} max={hospital.igd.total} onChange={setIgd} />
          </section>
          <section className="rounded-xl border border-line p-5">
            <h2 className="mb-4 font-semibold text-ink">ICU</h2>
            <NumberField label={`Kapasitas tersedia (dari ${hospital.icu.total})`} value={icu} max={hospital.icu.total} onChange={setIcu} />
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}
