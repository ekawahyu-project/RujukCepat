import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'
import { useApp } from '../context/AppContext'

const links = [
  { to: '/cari-rumah-sakit', label: 'Cari Rumah Sakit' },
  { to: '/cek-obat', label: 'Cek Status Obat' },
  { to: '/tentang', label: 'Tentang' },
]

const dashboardPath = {
  pasien: '/pasien/dashboard',
  'admin-rs': '/admin-rs/dashboard',
  'admin-apotek': '/admin-apotek/dashboard',
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useApp()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-deep-dark bg-secondary' : 'text-ink-soft hover:text-ink hover:bg-surface-tint'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Button to={dashboardPath[user.role]} variant="soft" size="sm">
                Dashboard
              </Button>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-ink-soft hover:text-red"
              >
                <LogOut size={15} /> Keluar
              </button>
            </>
          ) : (
            <Button to="/login" variant="primary" size="sm">
              Masuk
            </Button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Buka menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-surface-tint">
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              {user ? (
                <>
                  <Button to={dashboardPath[user.role]} variant="soft" size="sm" className="flex-1" onClick={() => setOpen(false)}>Dashboard</Button>
                  <Button onClick={() => { logout(); setOpen(false) }} variant="outline" size="sm">Keluar</Button>
                </>
              ) : (
                <Button to="/login" variant="primary" size="sm" className="w-full" onClick={() => setOpen(false)}>Masuk</Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
