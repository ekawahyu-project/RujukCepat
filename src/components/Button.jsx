import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-deep text-white hover:bg-deep-dark',
  soft: 'bg-secondary text-deep-dark hover:bg-primary',
  outline: 'border border-line text-ink hover:border-deep hover:text-deep-dark bg-transparent',
  ghost: 'text-ink-soft hover:text-ink hover:bg-surface-tint',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-[0.95rem]',
}

export default function Button({
  as,
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  icon: Icon,
  iconRight = false,
  ...rest
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`
  const content = (
    <>
      {Icon && !iconRight && <Icon size={16} strokeWidth={2} />}
      {children}
      {Icon && iconRight && <Icon size={16} strokeWidth={2} />}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    )
  }
  const Comp = as || 'button'
  return (
    <Comp className={cls} {...rest}>
      {content}
    </Comp>
  )
}
