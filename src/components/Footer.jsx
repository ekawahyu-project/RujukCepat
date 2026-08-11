import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-tint">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              Menghubungkan rumah sakit, tenaga kesehatan, pasien, dan apotek dalam satu ekosistem informasi yang transparan.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-3 font-medium text-ink">Layanan</p>
              <ul className="space-y-2 text-ink-soft">
                <li><a href="/cari-rumah-sakit" className="hover:text-deep-dark">Cari Rumah Sakit</a></li>
                <li><a href="/cek-obat" className="hover:text-deep-dark">Cek Status Obat</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-medium text-ink">Untuk Fasilitas</p>
              <ul className="space-y-2 text-ink-soft">
                <li><a href="/login" className="hover:text-deep-dark">Portal Nakes</a></li>
                <li><a href="/login" className="hover:text-deep-dark">Portal Admin RS</a></li>
                <li><a href="/login" className="hover:text-deep-dark">Portal Apotek</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-medium text-ink">Tentang</p>
              <ul className="space-y-2 text-ink-soft">
                <li><a href="/tentang" className="hover:text-deep-dark">RujukCepat</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RujukCepat. Data ditampilkan bersifat contoh untuk keperluan demonstrasi produk.</p>
          <p>Dibangun untuk mempercepat akses layanan kesehatan.</p>
        </div>
      </div>
    </footer>
  )
}
