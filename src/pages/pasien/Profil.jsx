import { User, CreditCard, Settings, Edit3 } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import Button from '../../components/Button'
import { useApp } from '../../context/AppContext'
import { pasienNav } from './nav'

export default function Profil() {
  const { user, logout } = useApp()

  return (
    <DashboardLayout nav={pasienNav} roleLabel="Portal Pasien">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Profil Saya</h1>
        <p className="mt-1 text-sm text-ink-soft">Kelola informasi pribadi dan pengaturan akun Anda.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Kolom Kiri: Info & Pembiayaan */}
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-line p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-semibold text-ink"><User size={18} /> Informasi Pribadi</h2>
              <Button size="sm" variant="ghost" icon={Edit3}>Edit</Button>
            </div>
            <dl className="grid gap-y-4 sm:grid-cols-2">
              <div><dt className="text-xs text-ink-faint">Nama Lengkap</dt><dd className="mt-1 text-sm font-medium text-ink">{user?.name}</dd></div>
              <div><dt className="text-xs text-ink-faint">Nomor Induk Kependudukan (NIK)</dt><dd className="mt-1 tnum text-sm font-medium text-ink">3573012345678901</dd></div>
              <div><dt className="text-xs text-ink-faint">Tanggal Lahir</dt><dd className="mt-1 text-sm font-medium text-ink">12 Agustus 1990</dd></div>
              <div><dt className="text-xs text-ink-faint">No. Telepon</dt><dd className="mt-1 tnum text-sm font-medium text-ink">0812-3456-7890</dd></div>
            </dl>
          </section>

          <section className="rounded-xl border border-line p-5">
            <h2 className="mb-4 flex items-center gap-2 font-semibold text-ink"><CreditCard size={18} /> Jenis Pembiayaan</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-deep bg-secondary/30 p-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-semibold text-deep-dark">BPJS Kesehatan</span>
                  <span className="rounded bg-deep px-1.5 py-0.5 text-[10px] font-bold text-white">AKTIF</span>
                </div>
                <p className="tnum text-sm text-ink-soft">No. 0001234567890</p>
                <p className="mt-2 text-xs text-ink-faint">Kelas 2</p>
              </div>
              <div className="rounded-lg border border-line p-4 opacity-60 grayscale">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-semibold text-ink">Asuransi Swasta</span>
                  <span className="rounded bg-line px-1.5 py-0.5 text-[10px] font-bold text-ink-soft">TIDAK AKTIF</span>
                </div>
                <p className="text-sm text-ink-soft">Belum ditambahkan</p>
              </div>
            </div>
          </section>
        </div>

        {/* Kolom Kanan: Pengaturan */}
        <div className="space-y-6">
          <section className="rounded-xl border border-line p-5">
            <h2 className="mb-4 flex items-center gap-2 font-semibold text-ink"><Settings size={18} /> Pengaturan</h2>
            <div className="space-y-3">
              <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm text-ink-soft hover:bg-surface-tint hover:text-ink">
                <span>Notifikasi</span>
                <span className="text-xs text-ink-faint">Aktif</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm text-ink-soft hover:bg-surface-tint hover:text-ink">
                <span>Bahasa</span>
                <span className="text-xs text-ink-faint">Indonesia</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm text-ink-soft hover:bg-surface-tint hover:text-ink">
                <span>Ubah Kata Sandi</span>
              </button>
            </div>
            
            <div className="mt-6 border-t border-line pt-4">
              <Button onClick={logout} variant="outline" className="w-full border-red text-red hover:bg-red-bg">Keluar Akun</Button>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  )
}
