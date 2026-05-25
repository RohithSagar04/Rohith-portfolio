import { motion } from 'framer-motion'
import { FaBriefcase, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa'
import { GlassCard } from './GlassCard'

interface ExperienceCardProps {
  role: string
  company: string
  period: string
  location: string
  highlights: readonly string[]
  index: number
}

export function ExperienceCard({ role, company, period, location, highlights, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <GlassCard className="relative overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sky-400 via-violet-500 to-fuchsia-500" />
        
        <div className="pl-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-50">{role}</h3>
              <div className="mt-1 flex items-center gap-2 text-lg font-semibold text-violet-400">
                <FaBriefcase className="text-sm" />
                {company}
              </div>
            </div>
            
            <div className="rounded-xl bg-white/5 px-4 py-2 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <FaCalendar className="text-xs" />
                {period}
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
            <FaMapMarkerAlt className="text-xs" />
            {location}
          </div>

          <div className="mt-6 space-y-3">
            {highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-violet-500" />
                <p className="text-sm text-slate-300/90">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
