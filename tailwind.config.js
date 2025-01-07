/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [
    require('./tailwind.config.presets')
  ],
  darkMode: ['selector'],
  plugins: [],
}