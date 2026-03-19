import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

export function ParticleField() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      fpsLimit: 60,
      detectRetina: true,
      background: { color: { value: 'transparent' } },
      particles: {
        number: { value: 55, density: { enable: true, width: 1200, height: 800 } },
        color: { value: ['#60a5fa', '#a78bfa', '#f0abfc', '#22d3ee'] },
        opacity: { value: { min: 0.06, max: 0.22 } },
        size: { value: { min: 1, max: 3 } },
        links: { enable: true, distance: 120, opacity: 0.12, color: '#93c5fd', width: 1 },
        move: { enable: true, speed: 0.7, direction: 'none', outModes: { default: 'out' } },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
          onClick: { enable: true, mode: 'push' },
        },
        modes: {
          repulse: { distance: 90, duration: 0.35 },
          push: { quantity: 2 },
        },
      },
    }),
    [],
  )

  if (!ready) return null
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Particles id="tsparticles" options={options} />
      <div className="absolute inset-0 bg-devops-radial opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_0%,rgba(255,255,255,.06),transparent_55%)]" />
    </div>
  )
}

