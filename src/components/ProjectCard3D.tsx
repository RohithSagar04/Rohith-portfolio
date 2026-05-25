import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FaGithub, FaArrowRight, FaStar } from 'react-icons/fa'
import { GlassCard } from './GlassCard'
import { useRef } from 'react'

interface ProjectCard3DProps {
  title: string
  tech: readonly string[]
  description: string
  github: string
  demo: string
  highlight?: string
  index: number
}

export function ProjectCard3D({ title, tech, description, github, demo, highlight, index }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full"
    >
      <GlassCard className="relative h-full overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-300"
          whileHover={{ opacity: 0.1 }}
        >
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-sky-500/30 blur-3xl" />
          <div className="absolute -right-24 -top-10 h-64 w-64 rounded-full bg-violet-500/30 blur-3xl" />
        </motion.div>

        <div className="relative" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-50">{title}</h3>
                {highlight && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-sky-500/20 via-violet-500/20 to-fuchsia-500/20 px-2 py-0.5 text-xs font-semibold text-violet-300 ring-1 ring-violet-400/30">
                    <FaStar className="text-[10px]" />
                    {highlight}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300/90">{description}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {tech.map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.05, y: -2 }}
                className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10"
              >
                {t}
              </motion.span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <motion.a
              href={github}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub /> View Code
            </motion.a>
            {demo !== '#' && (
              <motion.a
                href={demo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500/20 via-violet-500/20 to-fuchsia-500/20 px-4 py-2 text-sm font-semibold text-slate-100 ring-1 ring-violet-400/30 transition hover:from-sky-500/30 hover:via-violet-500/30 hover:to-fuchsia-500/30"
                target="_blank"
                rel="noreferrer"
              >
                Live Demo <FaArrowRight />
              </motion.a>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
