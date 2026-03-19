import type { PropsWithChildren } from 'react'
import { cn } from '../lib/cn'

export function GlassCard({
  children,
  className,
}: PropsWithChildren<{
  className?: string
}>) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl bg-white/[0.06] p-6 shadow-glass ring-1 ring-white/10 backdrop-blur-xl',
        'border border-white/5',
        // premium gradient stroke on hover
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:p-px before:opacity-0 before:transition before:duration-500',
        'before:bg-[linear-gradient(135deg,rgba(56,189,248,.0),rgba(56,189,248,.35),rgba(168,85,247,.35),rgba(236,72,153,.22),rgba(56,189,248,.0))]',
        'before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] before:[mask-composite:xor] before:[-webkit-mask-composite:xor]',
        'hover:before:opacity-100',
        // soft glow
        'after:pointer-events-none after:absolute after:-inset-24 after:opacity-0 after:transition after:duration-500',
        'after:bg-[radial-gradient(closest-side,rgba(56,189,248,.16),transparent_70%)] after:blur-2xl',
        'hover:after:opacity-100',
        className,
      )}
    >
      {/* shine sweep */}
      <div className="pointer-events-none absolute -inset-y-8 -left-16 w-40 rotate-12 bg-gradient-to-b from-white/0 via-white/10 to-white/0 opacity-0 transition duration-500 group-hover:opacity-100 group-hover:translate-x-[420%]" />
      {children}
    </div>
  )
}

