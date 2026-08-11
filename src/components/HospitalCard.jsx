import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatusBadge, FreshnessNote } from './StatusBadge'
import { hospitalStatus, bedTotals } from '../data/hospitals'

export default function HospitalCard({ hospital, distanceKm, index = 0 }) {
  const status = hospitalStatus(hospital)
  const beds = bedTotals(hospital)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.04 }}
    >
      <Link
        to={`/rumah-sakit/${hospital.id}`}
        className="group block rounded-xl border border-line bg-surface p-5 transition-all hover:border-deep hover:shadow-[0_4px_20px_-8px_rgba(20,39,32,0.15)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-ink group-hover:text-deep-dark">{hospital.name}</h3>
            <p className="text-sm text-ink-soft">{hospital.type}</p>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} className="text-ink-faint" />
            {distanceKm != null ? `${distanceKm.toFixed(1)} km` : hospital.address}
          </span>
          <span className="tnum">Kamar tersedia: {beds.avail}/{beds.total}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {hospital.specialists.slice(0, 4).map((s) => (
            <span key={s} className="rounded-md bg-surface-tint px-2 py-0.5 text-xs text-ink-soft">{s}</span>
          ))}
          {hospital.specialists.length > 4 && (
            <span className="rounded-md bg-surface-tint px-2 py-0.5 text-xs text-ink-faint">+{hospital.specialists.length - 4}</span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          <FreshnessNote iso={hospital.lastUpdated} />
          <span className="inline-flex items-center gap-1 text-sm font-medium text-deep-dark opacity-0 transition-opacity group-hover:opacity-100">
            Lihat detail <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
