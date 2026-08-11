import { ShieldCheck, Timer, Users2, Eye, HeartHandshake, Layers } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { PageWrap } from '../../components/Misc'

const principles = [
  { icon: Timer, title: 'Fast', desc: 'Informasi penting dapat ditemukan dengan sedikit langkah.' },
  { icon: Eye, title: 'Clear', desc: 'Status ketersediaan mudah dipahami tanpa interpretasi rumit.' },
  { icon: ShieldCheck, title: 'Transparent', desc: 'Sistem selalu menunjukkan kapan informasi terakhir diperbarui.' },
  { icon: HeartHandshake, title: 'Human-Centered', desc: 'Antarmuka mempertimbangkan kondisi pengguna dalam situasi mendesak.' },
  { icon: Layers, title: 'Role-Based', desc: 'Informasi dan tindakan disesuaikan kebutuhan tiap peran pengguna.' },
  { icon: Users2, title: 'Trustworthy', desc: 'Informasi disajikan konsisten, jelas, dan tidak menyesatkan.' },
]

export default function Tentang() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageWrap>
        <section className="border-b border-line bg-surface-tint">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Satu ekosistem untuk layanan kesehatan yang lebih cepat.</h1>
            <p className="mt-4 text-ink-soft leading-relaxed">
              RujukCepat mengintegrasikan informasi rumah sakit, tenaga kesehatan, pasien, dan apotek — supaya keputusan medis tidak lagi bergantung pada telepon satu per satu dan menunggu tanpa kepastian.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-xl font-semibold tracking-tight text-ink">Prinsip desain kami</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="rounded-xl border border-line p-5">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-secondary text-deep-dark">
                  <p.icon size={18} strokeWidth={2} />
                </div>
                <p className="font-medium text-ink">{p.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-line bg-surface-tint">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="mb-8 text-xl font-semibold tracking-tight text-ink">Empat pengalaman utama</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { role: 'Masyarakat & Pasien', desc: 'Mencari rumah sakit dan mengecek status obat.' },
                { role: 'Tenaga Kesehatan', desc: 'Mencari rekomendasi RS dan melakukan proses rujukan.' },
                { role: 'Admin Rumah Sakit', desc: 'Mengelola data ketersediaan dan jadwal layanan.' },
                { role: 'Admin Apotek', desc: 'Mengelola status transaksi obat pasien.' },
              ].map((r) => (
                <div key={r.role} className="rounded-xl bg-surface p-5">
                  <p className="font-medium text-ink">{r.role}</p>
                  <p className="mt-1.5 text-sm text-ink-soft">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageWrap>
      <Footer />
    </div>
  )
}
