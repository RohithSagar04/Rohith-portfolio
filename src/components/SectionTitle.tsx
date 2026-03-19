import { motion } from 'framer-motion'

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
        className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-300 ring-1 ring-white/10"
      >
        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500" />
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="mt-3 max-w-2xl text-pretty text-sm text-slate-300/90 md:text-base"
      >
        {subtitle}
      </motion.p>
    </div>
  )
}

