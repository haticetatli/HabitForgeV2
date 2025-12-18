import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 👇 DAHA MODERN, HAFİF AYDINLIK KOYU TONLAR
        void: '#09090B',    // Zinc 950 - Simsiyah değil, çok koyu antrasit.
        nebula: '#18181B',  // Zinc 900 - Kartlar için bir tık daha açık.
        fog: '#27272A',     // Zinc 800 - Çizgiler ve kenarlıklar.
        
        // 👇 CANLI RENKLER AYNI
        electric: '#00F0FF',
        neon: '#B24BF3',
        energyGold: '#FFB800',
        streakFire: '#FF4D00',
        completionGreen: '#00FF94',
        
        glass: {
          white: 'rgba(255, 255, 255, 0.03)', // Daha şeffaf
          border: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(0, 240, 255, 0.1)',
        },
      },
      fontFamily: {
        display: ['var(--font-clash-display)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config