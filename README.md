# Rohith Portfolio (React + Vite)

Modern DevOps-themed portfolio with glassmorphism UI, particles background, Framer Motion animations, typing hero, CI/CD workflow visualization, and GitHub contribution graph.

## Tech

- React + Vite
- TailwindCSS
- Framer Motion
- tsParticles background
- Devicon icons
- GitHub Pages deployment (`gh-pages`)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repo (recommended name: `devops-portfolio`)
2. Push this folder to the repo
3. Run:

```bash
npm run deploy
```

This publishes the `dist/` folder to the `gh-pages` branch. In GitHub:

- Settings → Pages → **Deploy from a branch**
- Branch: `gh-pages` / root

## Customize (important)

- **GitHub graph**: update `username` in `src/App.tsx` (currently `octocat`)
- **Links**: replace `href: '#'` placeholders for GitHub/LinkedIn/projects
- **Contact email**: update `your.email@example.com`
- **Resume**: replace `public/resume.pdf` with your real resume (keep the same filename)

