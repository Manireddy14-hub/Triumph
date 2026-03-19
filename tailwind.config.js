/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        triumph: {
          black: '#0B0B0E',
          red: '#C8102E',
          steel: '#A7B0BE',
          ash: '#F5F6F8',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
}

