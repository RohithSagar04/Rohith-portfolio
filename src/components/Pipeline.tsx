import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'
import { Devicon } from './Devicon'

const STEPS = [
  { label: 'Developer', icon: 'devicon-devicon-plain', kind: 'custom' as const },
  { label: 'GitHub', icon: 'github', kind: 'devicon' as const },
  { label: 'Jenkins CI', icon: 'jenkins', kind: 'devicon' as const },
  { label: 'Docker Build', icon: 'docker', kind: 'devicon' as const },
  { label: 'Kubernetes Deploy', icon: 'kubernetes', kind: 'devicon' as const },
  { label: 'Monitoring', icon: 'prometheus', kind: 'devicon' as const },
]

function StepIcon({ step }: { step: (typeof STEPS)[number] }) {
  if (step.kind === 'custom') {
    return (
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 text-slate-100">
        <span className="text-sm font-bold">{'</>'}</span>
      </span>
    )
  }
  return (
    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 text-slate-100">
      <Devicon name={step.icon} className="text-2xl" />
    </span>
  )
}

export function Pipeline() {
  return (
    <GlassCard className="overflow-hidden p-6">
      <div className="relative">
        <div className="absolute left-0 right-0 top-[36px] h-px bg-white/10" />
        <motion.div
          className="absolute left-0 right-0 top-[35px] h-[3px] bg-devops-line opacity-70"
          initial={{ x: '-35%' }}
          animate={{ x: '35%' }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="grid gap-4 md:grid-cols-6">
          {STEPS.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative"
            >
              <div className="mx-auto flex max-w-[220px] flex-col items-center text-center">
                <StepIcon step={s} />
                <div className="mt-3 text-sm font-semibold text-slate-50">{s.label}</div>
                <div className="mt-1 text-xs text-slate-300/80">
                  {idx === 0 && 'Commit-ready changes'}
                  {idx === 1 && 'PRs • reviews • checks'}
                  {idx === 2 && 'Build • test • artifacts'}
                  {idx === 3 && 'Image + vulnerability scan'}
                  {idx === 4 && 'Rollout + policy'}
                  {idx === 5 && 'SLOs • dashboards • alerts'}
                </div>
              </div>

              {/* Pulse indicator */}
              <motion.div
                className="absolute left-1/2 top-[31px] h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500 shadow-[0_0_24px_rgba(168,85,247,.5)]"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.18 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

