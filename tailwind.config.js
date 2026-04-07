/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fbf9fb',
          100: '#f6f0f7',
          200: '#eee4f0',
          300: '#dfcfe3',
          400: '#cab0d0',
          500: '#b491bb',
          600: '#a47dab',
          700: '#88618f',
          800: '#715376',
          900: '#5d4360',
          950: '#3f2942',
        }
      }
    }
  },
  plugins: [],
}