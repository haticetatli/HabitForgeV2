export const typography = {
  display: {
    family: "'Clash Display', 'SF Pro Display', sans-serif",
    weight: 700,
    sizes: {
      hero: '4.5rem',      // 72px
      large: '3rem',       // 48px
      medium: '2.25rem',   // 36px
    }
  },
  headline: {
    family: "'Inter Variable', sans-serif",
    weight: 600,
    sizes: {
      h1: '2rem',
      h2: '1.5rem',
      h3: '1.25rem',
    }
  },
  body: {
    family: "'Inter Variable', sans-serif",
    weight: 400,
    sizes: {
      large: '1.125rem',
      base: '1rem',
      small: '0.875rem',
    }
  },
  numeric: {
    family: "'JetBrains Mono', 'SF Mono', monospace",
    weight: 500,
  }
}

// CSS değişkenleri için
export const typographyCSS = `
  :root {
    --font-clash-display: 'Clash Display', 'SF Pro Display', sans-serif;
    --font-inter: 'Inter Variable', sans-serif;
    --font-jetbrains: 'JetBrains Mono', 'SF Mono', monospace;
  }
`