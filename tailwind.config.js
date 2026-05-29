/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: {
            50: '#FDFBF7',
            100: '#FAF6F0',
            200: '#F3EFE0',
            300: '#E6DFD3',
            400: '#DCD3C4',
            500: '#C8BAA7',
          },
          gold: {
            50: '#FAF6E6',
            100: '#F3E9C2',
            200: '#E6D380',
            300: '#D9BE41',
            400: '#C5A059',
            500: '#B0883D',
            600: '#946E2A',
            700: '#75541E',
          },
          dark: {
            800: '#1F2421',
            900: '#111512',
            950: '#090B0A',
          },
          sage: {
            50: '#F4F7F4',
            100: '#E5EBE6',
            200: '#CCD8CE',
            300: '#A3B8A6',
            400: '#78957C',
            500: '#547258',
          }
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        outfit: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-up': 'scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
