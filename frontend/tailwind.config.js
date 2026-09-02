/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          darkest: '#040d07',
          dark: '#081a0e',
          forest: '#0d2816',
          emerald: '#10b981',
          leaf: '#2ecc71',
        },
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        brand: ['Syne', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
