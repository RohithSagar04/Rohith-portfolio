import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070A12',
          900: '#0B1020',
          800: '#101A2E',
        },
      },
      boxShadow: {
        glass:
          '0 10px 30px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06)',
      },
      backgroundImage: {
        'devops-radial':
          'radial-gradient(1200px 600px at 20% 0%, rgba(124,58,237,.35), transparent 55%), radial-gradient(900px 500px at 80% 20%, rgba(59,130,246,.28), transparent 60%), radial-gradient(800px 600px at 60% 80%, rgba(14,165,233,.18), transparent 60%)',
        'devops-line':
          'linear-gradient(90deg, rgba(59,130,246,.0), rgba(59,130,246,.55), rgba(124,58,237,.55), rgba(236,72,153,.0))',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-30%)' },
          '100%': { transform: 'translateX(30%)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [typography],
}

