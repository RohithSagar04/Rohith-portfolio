import { useEffect, useMemo, useState } from 'react'
import { cn } from '../lib/cn'

function useTypingCycle(lines: string[], speedMs = 34, pauseMs = 950) {
  const safeLines = useMemo(() => (lines.length ? lines : ['']), [lines])
  const [lineIdx, setLineIdx] = useState(0)
  const [subIdx, setSubIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = safeLines[lineIdx] ?? ''
    const atEnd = subIdx >= current.length
    const atStart = subIdx <= 0

    const nextDelay = atEnd || atStart ? pauseMs : speedMs
    const t = window.setTimeout(() => {
      if (!deleting) {
        if (atEnd) setDeleting(true)
        else setSubIdx((n) => n + 1)
      } else {
        if (atStart) {
          setDeleting(false)
          setLineIdx((i) => (i + 1) % safeLines.length)
        } else setSubIdx((n) => n - 1)
      }
    }, nextDelay)

    return () => window.clearTimeout(t)
  }, [safeLines, lineIdx, subIdx, deleting, speedMs, pauseMs])

  return (safeLines[lineIdx] ?? '').slice(0, subIdx)
}

export function TypingText({
  lines,
  className,
}: {
  lines: string[]
  className?: string
}) {
  const text = useTypingCycle(lines)
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
        {text}
      </span>
      <span className="h-5 w-[2px] animate-pulse rounded-full bg-slate-200/70" aria-hidden="true" />
    </span>
  )
}

