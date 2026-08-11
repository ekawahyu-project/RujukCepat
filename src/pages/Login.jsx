import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stethoscope, Building2, PillBottle, LogIn } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { PageWrap } from '../components/Misc'
import { useApp } from '../context/AppContext'

const roles = [
  { key: 'nakes', label: 'Tenaga Kesehatan', icon: Stethoscope, redirect: '/nakes/dashboard' },
  { key: 'admin-rs', label: 'Admin Rumah Sakit', icon: Building2, redirect: '/admin-rs/dashboard' },
  { key: 'admin-apotek', label: 'Admin Apotek', icon: PillBottle, redirect: '/admin-apotek/dashboard' },
]

export default function Login() {
  const [role, setRole] = useState('nakes')
  const [name, setName] = useState('')
  const { login } = useApp()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const active = roles.find((r) => r.key === role)
    login(role, name.trim() || 'Pengguna Demo')
    navigate(active.redirect)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageWrap className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Masuk ke RujukCepat</h1>
          <p className="mt-1.5 text-sm text-ink-soft">Pilih peran Anda untuk mengakses dashboard terkait.</p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-2">
          {roles.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRole(r.key)}
              className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-4 text-center transition-colors ${
                role === r.key ? 'border-deep bg-secondary' : 'border-line hover:border-deep/50'
              }`}
            >
              <r.icon size={20} className={role === r.key ? 'text-deep-dark' : 'text-ink-faint'} />
              <span className={`text-xs font-medium leading-tight ${role === r.key ? 'text-deep-dark' : 'text-ink-soft'}`}>{r.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-line p-6">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">Nama</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda"
              className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-ink-faint focus:border-deep"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">Kata sandi</label>
            <input
              type="password"
              placeholder="••••••••"
              defaultValue="demo1234"
              className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-ink-faint focus:border-deep"
            />
          </div>
          <Button type="submit" className="w-full" icon={LogIn}>Masuk sebagai {roles.find((r) => r.key === role).label}</Button>
          <p className="text-center text-xs text-ink-faint">Mode demo — kredensial apa pun akan diterima.</p>
        </form>
      </PageWrap>
      <Footer />
    </div>
  )
}
