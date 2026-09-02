/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nature: {
          darkest: '#050A07',
          dark: '#0B1F14',
          forest: '#123D25',
          moss: '#1F6B3A',
          leaf: '#2E8B57',
          emerald: '#10B981',
          lime: '#4ADE80',
          glow: '#34D399',
          cream: '#F5F1E8',
          pale: '#D9E8D0',
          muted: '#8EA396',
        },
        cardboard: {
          dark: '#161B17',
          wood: '#1C261F',
          border: '#273E30',
          hover: '#2D4837',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 20px -2px rgba(16, 185, 129, 0.45)',
        'neon-green-lg': '0 0 35px 0px rgba(16, 185, 129, 0.55)',
        'neon-border': 'inset 0 0 15px rgba(16, 185, 129, 0.2)',
        'wood-card': '0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(39, 62, 48, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-line': 'glowLine 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowLine: {
          '0%': { opacity: '0.3', filter: 'drop-shadow(0 0 2px #10B981)' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 8px #4ADE80)' },
        },
      },
    },
  },
  plugins: [],
}
