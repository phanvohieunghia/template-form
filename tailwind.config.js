
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [
    require('./src/configs/tailwind/presets.config')
  ],
  darkMode: ['selector'],
  plugins: [require('./src/configs/tailwind/plugin.config')],
}