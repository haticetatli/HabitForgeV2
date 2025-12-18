export const palette = {
  primary: {
    electric: '#00F0FF',      // Cyan neon - primary CTA
    neon: '#B24BF3',          // Purple neon - secondary actions
    energyGold: '#FFB800',    // XP / rewards
  },
  gradients: {
    cosmic: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    aurora: 'linear-gradient(135deg, #00F0FF 0%, #B24BF3 50%, #FF006E 100%)',
    sunset: 'linear-gradient(180deg, #FF6B6B 0%, #FFE66D 100%)',
    success: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  background: {
    void: '#0A0E27',          // Deep space blue-black
    nebula: '#1A1F3A',        // Mid-layer atmospheric
    fog: '#252B47',           // Foreground fog layer
  },
  glass: {
    white: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
    glow: 'rgba(0, 240, 255, 0.15)',
  },
  accents: {
    streakFire: '#FF4D00',
    completionGreen: '#00FF94',
    warningAmber: '#FFB800',
  }
}

// Tailwind kullanımı için
export const tailwindColors = {
  'void': palette.background.void,
  'nebula': palette.background.nebula,
  'fog': palette.background.fog,
  'electric': palette.primary.electric,
  'neon': palette.primary.neon,
  'energy-gold': palette.primary.energyGold,
  'streak-fire': palette.accents.streakFire,
  'completion-green': palette.accents.completionGreen,
}