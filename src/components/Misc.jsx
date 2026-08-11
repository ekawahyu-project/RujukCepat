import { motion } from 'framer-motion'
import { Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line px-6 py-14 text-center">
      {Icon && (
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-secondary text-deep-dark">
          <Icon size={22} strokeWidth={1.75} />
        </div>
      )}
      <p className="font-medium text-ink">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-sm text-ink-soft">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function ProtectedRoute({ role, children }) {
  const { user } = useApp()
  if (!user || user.role !== role) return <Navigate to="/login" replace />
  return children
}

export function PageWrap({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
