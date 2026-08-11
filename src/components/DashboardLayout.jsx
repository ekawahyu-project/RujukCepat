import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import Logo from './Logo'
import { useApp } from '../context/AppContext'
import { PageWrap } from './Misc'

export default function DashboardLayout({ nav, roleLabel, children }) {
  const { user, logout } = useApp()
  const [open, setOpen] = useState(false)

  const SidebarContent = (
    <>
      <div className="px-5 py-5">
        <Logo />
        <p className="mt-3 rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-deep-dark">{roleLabel}</p>
      </div>
      <nav className="flex-1 space-y-0.5 px-3">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-deep text-white' : 'text-ink-soft hover:bg-surface-tint hover:text-ink'
              }`
            }
          >
            <item.icon size={17} strokeWidth={2} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-line p-3">
        <div className="mb-1 px-3 text-xs text-ink-faint">Masuk sebagai</div>
        <div className="mb-2 px-3 text-sm font-medium text-ink">{user?.name}</div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-red-bg hover:text-red"
        >
          <LogOut size={17} /> Keluar
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-surface-tint md:flex">
      <aside className="hidden w-64 flex-col border-r border-line bg-surface md:flex">{SidebarContent}</aside>

      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-3 md:hidden">
        <Logo />
        <button onClick={() => setOpen(true)} aria-label="Buka menu"><Menu size={22} /></button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="flex w-72 flex-col bg-surface">
            <div className="flex justify-end p-3"><button onClick={() => setOpen(false)} aria-label="Tutup menu"><X size={20} /></button></div>
            {SidebarContent}
          </div>
          <div className="flex-1 bg-ink/30" onClick={() => setOpen(false)} />
        </div>
      )}

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <PageWrap className="mx-auto max-w-6xl">{children}</PageWrap>
      </main>
    </div>
  )
}
