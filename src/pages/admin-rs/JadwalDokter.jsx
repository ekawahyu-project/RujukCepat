import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { EmptyState } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { SPECIALTIES } from '../../data/hospitals'
import { adminRsNav } from './nav'

const emptyForm = { name: '', specialty: SPECIALTIES[0], days: '', hours: '' }

export default function JadwalDokter() {
  const { hospitals, updateHospital, user } = useApp()
  const hospital = hospitals[0]
  const [form, setForm] = useState(emptyForm)
  const [showForm, setShowForm] = useState(false)

  function addDoctor(e) {
    e.preventDefault()
    if (!form.name || !form.days || !form.hours) return
    updateHospital(hospital.id, { doctors: [...hospital.doctors, form], __field: 'Jadwal dokter' }, user?.name)
    setForm(emptyForm)
    setShowForm(false)
  }

  function removeDoctor(name) {
    updateHospital(hospital.id, { doctors: hospital.doctors.filter((d) => d.name !== name), __field: 'Jadwal dokter' }, user?.name)
  }

  return (
    <DashboardLayout nav={adminRsNav} roleLabel="Portal Admin Rumah Sakit">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Jadwal Dokter</h1>
        <Button size="sm" icon={Plus} onClick={() => setShowForm((v) => !v)}>{showForm ? 'Batal' : 'Tambah Dokter'}</Button>
      </div>

      {showForm && (
        <form onSubmit={addDoctor} className="mb-6 grid gap-4 rounded-xl border border-line p-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">Nama dokter</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="dr. Nama, Sp.XX" className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-deep" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">Spesialisasi</label>
            <select value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-deep">
              {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">Hari praktik</label>
            <input value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} placeholder="Senin, Rabu, Jumat" className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-deep" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">Jam praktik</label>
            <input value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} placeholder="08.00–12.00" className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-deep" />
          </div>
          <Button type="submit" size="sm" className="sm:col-span-2 sm:w-fit">Simpan Jadwal</Button>
        </form>
      )}

      {hospital.doctors.length === 0 ? (
        <EmptyState title="Belum ada jadwal dokter" description="Tambahkan jadwal praktik dokter agar tampil pada halaman detail rumah sakit." />
      ) : (
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface-tint text-left text-xs text-ink-faint">
              <tr>
                <th className="px-4 py-3 font-medium">Dokter</th>
                <th className="px-4 py-3 font-medium">Spesialisasi</th>
                <th className="px-4 py-3 font-medium">Hari</th>
                <th className="px-4 py-3 font-medium">Jam</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {hospital.doctors.map((d) => (
                <tr key={d.name} className="hover:bg-surface-tint">
                  <td className="px-4 py-3 text-ink">{d.name}</td>
                  <td className="px-4 py-3 text-ink-soft">{d.specialty}</td>
                  <td className="px-4 py-3 text-ink-soft">{d.days}</td>
                  <td className="px-4 py-3 tnum text-ink-soft">{d.hours}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => removeDoctor(d.name)} className="text-ink-faint hover:text-red" aria-label={`Hapus ${d.name}`}><Trash2 size={15} /></button>
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
