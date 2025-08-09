/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        fuchsia: {
          100: '#fdf4ff',
          300: '#c084fc',
          400: '#a855f7',
          500: '#a855f7',
          600: '#9333ea',
          900: '#581c87',
        },
        purple: {
          950: '#2d1b69',
        },
        indigo: {
          950: '#1e1b4b',
        }
      }
    },
  },
  plugins: [],
}
