import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Siren, PillBottle, MapPin, ClipboardList, Building2, ArrowRight, ShieldCheck, Timer, Users } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Button from '../../components/Button'
import { StatusBadge, FreshnessNote } from '../../components/StatusBadge'
import { initialHospitals, hospitalStatus } from '../../data/hospitals'
import { useApp } from '../../context/AppContext'

const quickActions = [
  { icon: Search, label: 'Cari Rumah Sakit', to: '/cari-rumah-sakit' },
  { icon: Siren, label: 'Cari IGD Terdekat', to: '/cari-rumah-sakit?layanan=IGD+24+Jam' },
  { icon: PillBottle, label: 'Cek Status Obat', to: '/cek-obat' },
]

const steps = [
  { icon: Search, title: 'Cari fasilitas', desc: 'Temukan rumah sakit berdasarkan lokasi, layanan, dan ketersediaan saat ini.' },
  { icon: ClipboardList, title: 'Lihat kepastian', desc: 'Setiap status ketersediaan tertera waktu pembaruan terakhirnya.' },
  { icon: Building2, title: 'Ambil tindakan', desc: 'Hubungi RS langsung, atau ajukan rujukan bila Anda tenaga kesehatan.' },
]

export default function Landing() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { hospitals } = useApp()
  const preview = hospitals.slice(0, 4)

  function submitSearch(e) {
    e.preventDefault()
    navigate(`/cari-rumah-sakit${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-line bg-surface-tint">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="mb-4 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-deep-dark"
            >
              Integrasi Layanan Kesehatan
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl"
            >
              Kepastian layanan kesehatan, tanpa menunggu tanpa arah.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 max-w-lg text-base text-ink-soft leading-relaxed"
            >
              RujukCepat menampilkan ketersediaan kamar, IGD, dan ICU rumah sakit secara transparan — lengkap dengan waktu pembaruan, supaya keputusan Anda tidak berdasar data basi.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
              onSubmit={submitSearch} className="mt-8 flex max-w-lg gap-2"
            >
              <div className="relative flex-1">
                <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Nama rumah sakit, layanan, atau area..."
                  className="w-full rounded-lg border border-line bg-surface py-3 pl-10 pr-3 text-sm outline-none placeholder:text-ink-faint focus:border-deep"
                />
              </div>
              <Button type="submit">Cari</Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {quickActions.map((a) => (
                <Button key={a.label} to={a.to} variant="outline" size="sm" icon={a.icon}>{a.label}</Button>
              ))}
            </motion.div>
          </div>

          {/* Signature: live-style availability preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border border-line bg-surface p-5 shadow-[0_8px_30px_-12px_rgba(20,39,32,0.18)]"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-ink">Ketersediaan terkini</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-faint">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-deep"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                live preview
              </span>
            </div>
            <div className="space-y-2.5">
              {preview.map((h) => (
                <div key={h.id} className="flex items-center justify-between gap-3 rounded-lg border border-line px-3.5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{h.name}</p>
                    <FreshnessNote iso={h.lastUpdated} className="mt-0.5" />
                  </div>
                  <StatusBadge status={hospitalStatus(h)} size="sm" />
                </div>
              ))}
            </div>
            <Button to="/cari-rumah-sakit" variant="ghost" size="sm" className="mt-3 w-full justify-between" icon={ArrowRight} iconRight>
              Lihat semua rumah sakit
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {[
            { icon: Timer, label: 'Cepat', desc: 'Informasi penting ditemukan dalam sedikit langkah.' },
            { icon: ShieldCheck, label: 'Transparan', desc: 'Setiap data mencantumkan waktu pembaruan terakhir.' },
            { icon: Users, label: 'Berbasis peran', desc: 'Tampilan disesuaikan untuk masyarakat, nakes, dan admin.' },
          ].map((t) => (
            <div key={t.label} className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-deep-dark">
                <t.icon size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="font-medium text-ink">{t.label}</p>
                <p className="text-sm text-ink-soft">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 max-w-lg">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Cara kerja RujukCepat</h2>
          <p className="mt-2 text-ink-soft">Tiga langkah dari mencari hingga mendapat kepastian layanan.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl border border-line p-5"
            >
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-secondary text-deep-dark">
                <s.icon size={18} strokeWidth={2} />
              </div>
              <p className="font-medium text-ink">{s.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Nakes CTA */}
      <section className="border-y border-line bg-secondary/40">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Tenaga kesehatan, buat rujukan lebih cepat.</h2>
            <p className="mt-2 text-ink-soft">
              Dapatkan rekomendasi rumah sakit berdasarkan kondisi pasien, kompetensi RS, ketersediaan, dan jarak — lengkap dengan alasan rekomendasinya.
            </p>
          </div>
          <Button to="/login" size="lg" icon={ArrowRight} iconRight>Masuk sebagai Nakes</Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
