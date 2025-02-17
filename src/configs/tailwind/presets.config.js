/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'up-in': {
          '0%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'up-out': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(50%)' },
        },
        'down-in': {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'down-out': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        'left-in': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'left-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'right-in': {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'right-out': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
        'zoom-out': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.5)' },
        },
        'down-zoom-in': {
          '0%': { transform: 'translateY(-100%) scale(0.3)' },
          '100%': { transform: 'translateY(0) scale(1)' },
        },
        'down-zoom-out': {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(100%) scale(0.3)' },
        },
        'width-out': {
          from: { width: '300px' },
          to: { width: '0' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in forwards',
        'fade-out': 'fade-out 0.3s ease-in forwards',

        'fade-down-zoom-in': 'down-zoom-in 0.3s ease-in forwards, fade-in 0.3s ease-in forwards',
        'fade-down-zoom-out': 'down-zoom-out 0.3s ease-in forwards, fade-out 0.3s ease-in forwards',

        'fade-right-in': 'fade-in 0.3s ease-in forwards, right-in 0.3s ease-in forwards',
        'fade-right-out': 'fade-out 0.3s ease-in forwards, right-out 0.3s ease-in forwards',

        'fade-left-in': 'fade-in 0.3s ease-in forwards, left-in 0.3s ease-in forwards',
        'fade-left-out': 'fade-out 0.3s ease-in forwards, left-out 0.3s ease-in forwards',

        'fade-up-in': 'fade-in 0.3s ease-in forwards, up-in 0.3s ease-in forwards',
        'fade-up-out': 'fade-out 0.3s ease-in forwards, up-out 0.3s ease-in forwards',

        'fade-down-in': 'fade-in 0.3s ease-in forwards, down-in 0.3s ease-in forwards',
        'fade-down-out': 'fade-out 0.3s ease-in forwards, down-out 0.3s ease-in forwards',

        'panel-in': 'fade-in 0.3s ease-in forwards, left-in 0.3s ease-in forwards',
        'panel-out': 'fade-out 0.3s ease-in forwards, left-out 0.3s ease-in forwards, width-out 0.05s 0.25s forwards',

      },
    },
  },
}