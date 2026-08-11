import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, PillBottle, Check, Loader2, Store } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Button from '../../components/Button'
import { PageWrap } from '../../components/Misc'
import { useApp } from '../../context/AppContext'
import { OBAT_STATUS_META, formatDateTime } from '../../utils/helpers'

const STEPS = ['diproses', 'siap', 'selesai']

export default function CekObat() {
  const { transactions } = useApp()
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const found = transactions.find((t) => t.code.toLowerCase() === code.trim().toLowerCase())
    setResult(found || null)
    setNotFound(!found)
  }

  const activeStep = result ? STEPS.indexOf(result.status) : -1

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageWrap className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-secondary text-deep-dark">
            <PillBottle size={22} strokeWidth={1.75} />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Cek Status Obat</h1>
          <p className="mt-1.5 text-sm text-ink-soft">Masukkan kode transaksi dari apotek untuk melihat status penyiapan obat Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Contoh: RX-20491"
              className="w-full rounded-lg border border-line bg-surface py-3 pl-10 pr-3 text-sm tnum outline-none placeholder:text-ink-faint focus:border-deep"
            />
          </div>
          <Button type="submit">Cek Status</Button>
        </form>

        <AnimatePresence mode="wait">
          {notFound && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 rounded-lg bg-red-bg px-4 py-3 text-sm text-red">
              Kode transaksi tidak ditemukan. Periksa kembali penulisan kode Anda.
            </motion.p>
          )}

          {result && (
            <motion.div
              key={result.code}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-6 rounded-xl border border-line p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-ink-faint">Kode Transaksi</p>
                  <p className="tnum text-lg font-semibold text-ink">{result.code}</p>
                </div>
                <p className="inline-flex items-center gap-1.5 text-sm text-ink-soft"><Store size={14} /> {result.pharmacy}</p>
              </div>

              {/* Stepper */}
              <div className="mt-6 flex items-center">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-medium ${i <= activeStep ? 'bg-deep text-white' : 'bg-secondary text-ink-faint'}`}>
                        {i < activeStep ? <Check size={14} /> : i === activeStep ? <Loader2 size={14} className="animate-spin" /> : i + 1}
                      </div>
                      <p className={`mt-2 whitespace-nowrap text-xs font-medium ${i <= activeStep ? 'text-ink' : 'text-ink-faint'}`}>{OBAT_STATUS_META[s].label}</p>
                    </div>
                    {i < STEPS.length - 1 && <div className={`mx-2 h-0.5 flex-1 ${i < activeStep ? 'bg-deep' : 'bg-line'}`} />}
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <p className="mb-2 text-sm font-medium text-ink">Daftar Obat</p>
                <ul className="space-y-1.5">
                  {result.medicines.map((m) => (
                    <li key={m.name} className="flex justify-between text-sm text-ink-soft">
                      <span>{m.name}</span>
                      <span className="tnum">{m.qty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 text-xs text-ink-faint">
                Terakhir diperbarui: {formatDateTime(result.history[result.history.length - 1].at)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </PageWrap>
      <Footer />
    </div>
  )
}
