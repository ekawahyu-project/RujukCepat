import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Check, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'
import { EmptyState } from '../../components/Misc'
import Button from '../../components/Button'
import { useApp } from '../../context/AppContext'
import { adminRsNav } from './nav'

export default function DetailRujukan() {
  const { id } = useParams()
  const { referrals } = useApp()
  const referral = referrals.find((r) => r.id === id)

  if (!referral) {
    return (
    <DashboardLayout nav={adminRsNav} roleLabel="Portal Admin Rumah Sakit">
        <EmptyState title="Rujukan tidak ditemukan" action={<Button to="/admin-rs/riwayat" size="sm">Kembali ke riwayat</Button>} />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout nav={adminRsNav} roleLabel="Portal Admin Rumah Sakit">
      <div className="mx-auto max-w-2xl">
        <Link to="/admin-rs/riwayat" className="mb-4 inline-flex items-center gap-1 text-sm text-ink-soft hover:text-deep-dark"><ChevronLeft size={16} /> Kembali ke riwayat</Link>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center gap-3 rounded-xl bg-secondary p-5">
          <CheckCircle2 className="text-deep-dark" size={26} />
          <div>
            <p className="font-medium text-deep-dark">Permintaan rujukan terkirim</p>
            <p className="text-sm text-deep-dark/80">Nomor rujukan {referral.id}</p>
          </div>
        </motion.div>

        <div className="rounded-xl border border-line p-6">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-ink-soft">Nomor Rujukan</dt><dd className="tnum font-medium text-ink">{referral.id}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-ink-soft">Kondisi Pasien</dt><dd className="text-ink">{referral.conditionCategory}</dd></div>
            {referral.note && <div className="flex justify-between gap-3"><dt className="text-ink-soft">Catatan</dt><dd className="text-right text-ink">{referral.note}</dd></div>}
            <div className="flex justify-between gap-3"><dt className="text-ink-soft">Rumah Sakit Tujuan</dt><dd className="text-right font-medium text-ink">{referral.hospitalName}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-ink-soft">Tanggal Pengajuan</dt><dd className="tnum text-ink">{formatDateTime(referral.createdAt)}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-ink-soft">Status</dt><dd><span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-deep-dark">Diajukan</span></dd></div>
          </dl>

          <div className="mt-5 border-t border-line pt-4">
            <p className="mb-2 text-xs font-medium text-ink-soft">Alasan Rekomendasi</p>
            <ul className="space-y-1">
              {referral.reasons.map((r) => (
                <li key={r} className="flex items-center gap-1.5 text-sm text-ink-soft"><Check size={13} className="text-deep-dark" /> {r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
