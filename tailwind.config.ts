import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        accent: 'var(--accent)',
        text: 'var(--text)',
        'text-2': 'var(--text-2)',
        'text-3': 'var(--text-3)',
      },
      boxShadow: {
        nexux: 'var(--shadow-nexux)',
        'nexux-2': 'var(--shadow-nexux-2)',
        card: 'var(--shadow-card)',
      },
      backgroundImage: {
        'gradient-primary': 'var(--bg-gradient)',
        'gradient-accent': 'var(--bg-gradient-2)',
        'gradient-light': 'var(--bg-gradient-light)',
      },
      borderRadius: {
        'nexux': '1rem',
        'nexux-lg': '1.5rem',
      },
      transitionProperty: {
        'all': 'var(--transition-base)',
        'smooth': 'var(--transition-smooth)',
      },
    },
  },
  plugins: [],
}

export default config