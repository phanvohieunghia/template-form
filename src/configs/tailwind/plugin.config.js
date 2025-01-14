import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default
  plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'animate-duration': (value) => ({
          animationDuration: value,
        }),
      },
      { values: theme('transitionDuration') }
    )
  })
