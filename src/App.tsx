import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowRight } from 'react-icons/fa'
import { cn } from './lib/cn'
import { ParticleField } from './components/ParticleField'
import { Devicon } from './components/Devicon'
import { GlassCard } from './components/GlassCard'
import { TypingText } from './components/TypingText'
import { Pipeline } from './components/Pipeline'
import { SectionTitle } from './components/SectionTitle'

type SectionId =
  | 'top'
  | 'about'
  | 'skills'
  | 'workflow'
  | 'projects'
  | 'certifications'
  | 'journey'
  | 'contact'

const SECTIONS: Array<{ id: SectionId; label: string }> = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

const SKILLS = {
  'Cloud & DevOps': [
    { name: 'AWS (Basics)', icon: 'amazonwebservices' },
    { name: 'Jenkins', icon: 'jenkins' },
    { name: 'Maven', icon: 'maven' },
    { name: 'Ansible', icon: 'ansible' },
    { name: 'Git', icon: 'git' },
  ],
  'DevOps Tools': [
    { name: 'Docker', icon: 'docker' },
    { name: 'Kubernetes', icon: 'kubernetes' },
    { name: 'Gradle', icon: 'gradle' },
    { name: 'Linux', icon: 'linux' },
  ],
  Programming: [
    { name: 'Python', icon: 'python' },
    { name: 'Java', icon: 'java' },
    { name: 'C', icon: 'c' },
    { name: 'C++', icon: 'cplusplus' },
  ],
  Backend: [
    { name: 'Django', icon: 'django' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'MySQL', icon: 'mysql' },
  ],
  Web: [
    { name: 'HTML', icon: 'html5' },
    { name: 'CSS', icon: 'css3' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'React', icon: 'react' },
    { name: 'TailwindCSS', icon: 'tailwindcss' },
  ],
} as const

const PROJECTS = [
  {
    title: 'Detection of Axillary Lymph Node (ALN) Metastasis in Breast Cancer',
    tech: ['Python', 'TensorFlow', 'Keras', 'EfficientNet-B0', 'Medical Imaging'],
    description:
      'Built a deep learning system to predict ALN metastasis from histopathological images using a fine-tuned EfficientNet-B0 model with patch-based preprocessing and clinical parameter integration.',
    github: 'https://github.com/RohithSagar04',
    demo: '#',
  },
  {
    title: 'Phishing Website Detection',
    tech: ['HTML', 'CSS', 'Python', 'Machine Learning'],
    description:
      'Implemented a phishing website detection workflow and trained a model to classify websites for real-time checks.',
    github: 'https://github.com/RohithSagar04',
    demo: '#',
  },
  {
    title: 'Movie Review App',
    tech: ['React 18', 'HTML', 'CSS', 'Node.js'],
    description:
      'Developed a user-friendly platform for movie insights with a React-based UI and a Node.js backend.',
    github: 'https://github.com/RohithSagar04',
    demo: '#',
  },
] as const

const CERTS = [
  'Internship — Full Stack Development (Varcons Technologies Pvt. Ltd.)',
  'Hackathon Participation — Intercollegiate events (rapid prototyping & teamwork)',
  'IEEE Certification — AI-Based Detection of ALN Metastasis (INSPIRE 2025, MIT College)',
] as const

const JOURNEY = [
  { title: 'Learning programming', detail: 'Solidifying CS fundamentals and problem solving.' },
  { title: 'Exploring cloud', detail: 'Understanding compute, networking, IAM, and cost trade-offs.' },
  { title: 'DevOps tools', detail: 'Automating builds, testing, releases, and infrastructure workflows.' },
  { title: 'Building CI/CD pipelines', detail: 'Shipping changes with confidence through observability and guardrails.' },
] as const

function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, setTheme }
}

function scrollToSection(id: SectionId) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function App() {
  const { theme, setTheme } = useTheme()
  const [active, setActive] = useState<SectionId>('top')
  const [showTop, setShowTop] = useState(false)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.25 })

  const observerRef = useRef<IntersectionObserver | null>(null)
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), [])

  useEffect(() => {
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        const id = visible?.target?.id as SectionId | undefined
        if (id) setActive(id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.06, 0.12, 0.25] },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observerRef.current.observe(el)
    }

    return () => observerRef.current?.disconnect()
  }, [sectionIds])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="grain relative text-slate-100 selection:bg-violet-500/25 selection:text-slate-50">
      <motion.div
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500"
        style={{ scaleX: progress }}
      />

      <ParticleField />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-900/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={() => scrollToSection('top')}
            className="group flex items-center gap-2 rounded-xl px-2 py-1 text-left"
            aria-label="Scroll to top"
          >
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 shadow-glass">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-sky-400 via-violet-500 to-fuchsia-500" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight text-slate-50">Rohith</span>
              <span className="block text-xs text-slate-300/80">portfolio</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={cn(
                  'rounded-xl px-3 py-2 text-sm font-medium transition',
                  active === s.id
                    ? 'bg-white/10 text-slate-50 ring-1 ring-white/15'
                    : 'text-slate-300/90 hover:bg-white/5 hover:text-slate-50',
                )}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              className="hidden rounded-xl bg-white/5 px-3 py-2 text-sm font-medium text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10 md:inline-flex"
              href="https://github.com/RohithSagar04"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
            <button
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="rounded-xl bg-white/5 px-3 py-2 text-sm font-medium text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        <section id="top" className="relative pb-14 pt-14 md:pb-20 md:pt-20">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-devops-radial opacity-90" />

          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_22px_rgba(52,211,153,.55)]" />
                Available for internships & entry-level roles
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.05 }}
                className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-50 md:text-6xl"
              >
                Shipping reliable systems with
                <span className="bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  {' '}
                  cloud, automation & CI/CD
                </span>
                .
              </motion.h1>

              <div className="mt-4 text-lg text-slate-300/90 md:text-xl">
                <TypingText
                  lines={['DevOps Enthusiast', 'Cloud Learner', 'Automation Engineer']}
                  className="font-medium"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <button
                  onClick={() => scrollToSection('projects')}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glass transition hover:brightness-110"
                >
                  View Projects <FaArrowRight />
                </button>
                <a
                  href="/Rohith_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10"
                  download
                >
                  Download Resume <FaDownload />
                </a>
                <a
                  href="https://github.com/RohithSagar04"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Profile <FaGithub />
                </a>
              </motion.div>

              <div className="mt-9 flex flex-wrap items-center gap-3 text-sm text-slate-300/90">
                <span className="text-xs uppercase tracking-widest text-slate-400/70">Focus</span>
                <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                  CI/CD Automation
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                  Cloud Foundations
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
                  Observability
                </span>
              </div>
            </div>

            <div className="md:col-span-5">
              <GlassCard className="relative overflow-hidden p-6">
                <div className="absolute inset-0 opacity-60">
                  <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
                  <div className="absolute -right-24 -top-10 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
                </div>

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400/80">
                    Core Stack
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { name: 'Docker', icon: 'docker' },
                      { name: 'Kubernetes', icon: 'kubernetes' },
                      { name: 'AWS', icon: 'amazonwebservices' },
                      { name: 'Jenkins', icon: 'jenkins' },
                      { name: 'GitHub', icon: 'github' },
                      { name: 'Python', icon: 'python' },
                    ].map((x) => (
                      <motion.div
                        key={x.name}
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        className="group rounded-2xl bg-white/5 p-3 ring-1 ring-white/10"
                      >
                        <div className="flex items-center gap-2">
                          <Devicon name={x.icon} className="text-2xl" />
                          <span className="text-sm font-medium text-slate-100">{x.name}</span>
                        </div>
                        <div className="mt-2 h-px w-full bg-white/10" />
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className="h-full w-2/3 rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500"
                            animate={{ x: ['-30%', '30%', '-30%'] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 py-14 md:py-20">
          <SectionTitle
            eyebrow="About Me"
            title="CSE student focused on cloud + automation."
            subtitle="I’m Rohith S T — building skills in AWS fundamentals and DevOps tooling with hands-on projects across automation, ML, and full-stack development."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-12">
            <GlassCard className="md:col-span-7">
              <div className="prose prose-invert max-w-none prose-p:text-slate-300/90">
                <p>
                  I’m seeking opportunities to join a company that helps me enhance my skills, strengthen my
                  knowledge, and realize my potential. I’m excited to explore roles where I can learn fast,
                  contribute consistently, and grow into a strong engineer.
                </p>
                <p>
                  I have hands-on exposure to <strong>Jenkins, Maven, and Ansible</strong> for automation and
                  deployment tasks, and I’m building strong fundamentals across cloud concepts, CI/CD workflows,
                  and reliable engineering practices.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="md:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400/80">
                Skill highlights
              </p>
              <div className="mt-4 grid gap-3">
                {[
                  { label: 'Cloud & DevOps (Basics)', value: 'AWS • Jenkins • Maven • Ansible' },
                  { label: 'Full-stack exposure', value: 'React 18 • Node.js • Django' },
                  { label: 'Programming', value: 'Python • Java • C/C++' },
                  { label: 'Databases', value: 'PostgreSQL • MySQL' },
                ].map((x) => (
                  <motion.div
                    key={x.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                  >
                    <div className="text-sm font-semibold text-slate-50">{x.label}</div>
                    <div className="mt-1 text-sm text-slate-300/85">{x.value}</div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          <GlassCard className="mt-6 overflow-hidden">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400/80">
                  GitHub activity
                </p>
                <p className="mt-1 text-sm text-slate-300/85">
                  Consistency beats intensity — small improvements compound.
                </p>
              </div>
              <div className="hidden h-10 w-32 rounded-full bg-white/5 ring-1 ring-white/10 md:block" />
            </div>
            <div className="mt-6 overflow-x-auto">
              <div className="min-w-[720px]">
                <GitHubCalendar
                  username="RohithSagar04"
                  colorScheme={theme === 'dark' ? 'dark' : 'light'}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                />
              </div>
            </div>
          </GlassCard>
        </section>

        <section id="skills" className="scroll-mt-24 py-14 md:py-20">
          <SectionTitle
            eyebrow="DevOps Skills"
            title="Tools I use to build, ship, and observe."
            subtitle="Grouped by category — each card is animated and icon-driven."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {Object.entries(SKILLS).map(([group, skills]) => (
              <GlassCard key={group}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-50">{group}</h3>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">
                    {skills.length} items
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {skills.map((s) => (
                    <motion.div
                      key={s.name}
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                    >
                      <div className="flex items-center gap-2">
                        <Devicon name={s.icon} className="text-2xl" />
                        <div className="text-sm font-semibold text-slate-50">{s.name}</div>
                      </div>
                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="h-full w-2/3 rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500"
                          animate={{ x: ['-30%', '30%', '-30%'] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="workflow" className="scroll-mt-24 py-14 md:py-20">
          <SectionTitle
            eyebrow="Workflow"
            title="A CI/CD pipeline that feels alive."
            subtitle="Animated pipeline visualization to communicate delivery thinking."
          />
          <div className="mt-10">
            <Pipeline />
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 py-14 md:py-20">
          <SectionTitle
            eyebrow="Projects"
            title="Selected builds — systems, not just apps."
            subtitle="Hover for motion + quick actions for GitHub and live demos."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROJECTS.map((p) => (
              <motion.div
                key={p.title}
                whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-50">{p.title}</h3>
                      <p className="mt-2 text-sm text-slate-300/90">{p.description}</p>
                    </div>
                    <div className="hidden h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-500/20 via-violet-500/20 to-fuchsia-500/20 ring-1 ring-white/10 md:block" />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 ring-1 ring-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={p.github}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGithub /> GitHub
                    </a>
                    <a
                      href={p.demo}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 ring-1 ring-white/10 transition hover:bg-white/10"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo <FaArrowRight />
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="certifications" className="scroll-mt-24 py-14 md:py-20">
          <SectionTitle
            eyebrow="Certifications"
            title="Proof of learning and momentum."
            subtitle="Animated badges to keep it clean and recruiter-friendly."
          />

          <GlassCard className="mt-10">
            <div className="flex flex-wrap gap-3">
              {CERTS.map((c) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  whileHover={{ y: -4 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 ring-1 ring-white/10"
                >
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500" />
                  {c}
                </motion.span>
              ))}
            </div>
          </GlassCard>
        </section>

        <section id="journey" className="scroll-mt-24 py-14 md:py-20">
          <SectionTitle
            eyebrow="DevOps Journey"
            title="Learning timeline"
            subtitle="A simple timeline that shows growth across fundamentals → cloud → automation → pipelines."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {JOURNEY.map((j, idx) => (
              <motion.div
                key={j.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
              >
                <GlassCard>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-10 w-10 rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-glass">
                      <div className="grid h-full w-full place-items-center">
                        <span className="text-sm font-bold text-slate-100">{idx + 1}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-base font-semibold text-slate-50">{j.title}</div>
                      <div className="mt-1 text-sm text-slate-300/90">{j.detail}</div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-14 md:py-20">
          <SectionTitle
            eyebrow="Contact"
            title="Let’s build something reliable."
            subtitle="Reach out with roles, collaboration, or feedback."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Email',
                value: 'rohithsagar04@gmail.com',
                icon: <FaEnvelope />,
                href: 'mailto:rohithsagar04@gmail.com',
              },
              {
                title: 'GitHub',
                value: 'github.com/RohithSagar04',
                icon: <FaGithub />,
                href: 'https://github.com/RohithSagar04',
              },
              {
                title: 'LinkedIn',
                value: 'linkedin.com/in/rohithsagar2610',
                icon: <FaLinkedin />,
                href: 'https://www.linkedin.com/in/rohith-sagar-6b2459267',
              },
            ].map((c) => (
              <motion.a
                key={c.title}
                href={c.href}
                target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={c.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="block"
              >
                <GlassCard className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-50">{c.title}</div>
                      <div className="mt-2 text-sm text-slate-300/90">{c.value}</div>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-500/15 via-violet-500/15 to-fuchsia-500/15 ring-1 ring-white/10 text-slate-100">
                      {c.icon}
                    </div>
                  </div>
                </GlassCard>
              </motion.a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-ink-900/50 py-8 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center text-sm text-slate-300/90 md:flex-row md:text-left">
          <span>Built with React, Tailwind and DevOps passion.</span>
          <span className="text-xs text-slate-400/80">
            Glass UI • Motion • Particles • GitHub Graph
          </span>
        </div>
      </footer>

      <AnimatePresence>
        {/* reserved for future page-level transitions if routing is added */}
      </AnimatePresence>

      <AnimatePresence>
        {showTop ? (
          <motion.button
            key="toTop"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            onClick={() => scrollToSection('top')}
            className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-slate-50 ring-1 ring-white/15 backdrop-blur-xl shadow-glass transition hover:bg-white/15"
            aria-label="Back to top"
          >
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500" />
            Top
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

