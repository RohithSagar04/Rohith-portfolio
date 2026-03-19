import { cn } from '../lib/cn'

export function Devicon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  // Devicon uses class names like: devicon-docker-plain
  // Some icons have variants; we default to "plain".
  const normalized = name.toLowerCase()
  return <i className={cn(`devicon-${normalized}-plain`, className)} aria-hidden="true" />
}

