/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blue: { primary: '#0A84FF', secondary: '#00D4FF', dark: '#0066CC' },
        dark: { 900: '#050709', 800: '#0D1117', 700: '#161B22', 600: '#21262D', border: '#30363D' },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Clash Display', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
