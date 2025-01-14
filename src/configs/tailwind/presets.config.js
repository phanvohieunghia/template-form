/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      keyframes: {
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fadeInUp': {
          '0%': {
            opacity: '0',
            transform: 'translateY(50%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'zoomIn': {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
        'fadeOut': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'fadeInUp-zoomIn': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-100%) scale(0.3)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          },
        },
        'fadeOutUp-zoomOut': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(100%) scale(0.3)'
          },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.1s ease-in forwards',
        'fade-in-up': 'fadeInUp 0.1s ease-in forwards',
        'fade-out': 'fadeOut 0.1s ease-out forwards',
        'zoom-in': 'zoomIn 0.1s ease-in forwards',
        'fadeInUp-zoomIn': 'fadeInUp-zoomIn 0.1s ease-in forwards',
        'fadeOutUp-zoomOut': 'fadeOutUp-zoomOut 0.1s ease-in forwards'
      },
    },
  },
}