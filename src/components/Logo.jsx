import { Link } from 'react-router-dom'

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-deep">
        <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
          <path d="M16 8v16M8 16h16" stroke="#ddefe3" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-semibold tracking-tight text-ink text-[1.05rem]">RujukCepat</span>
    </Link>
  )
}
