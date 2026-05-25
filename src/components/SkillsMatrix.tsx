import { motion } from 'framer-motion'
import { Devicon } from './Devicon'
import { GlassCard } from './GlassCard'

interface Skill {
  name: string
  icon: string
  level: number // 0-100
}

interface SkillsMatrixProps {
  title: string
  skills: readonly Skill[]
  index: number
}

export function SkillsMatrix({ title, skills, index }: SkillsMatrixProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <GlassCard>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-50">{title}</h3>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">
            {skills.length} skills
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Devicon name={skill.icon} className="text-2xl" />
                  </motion.div>
                  <span className="text-sm font-semibold text-slate-50">{skill.name}</span>
                </div>
                <span className="text-xs font-medium text-slate-400">{skill.level}%</span>
              </div>

              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.05, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
