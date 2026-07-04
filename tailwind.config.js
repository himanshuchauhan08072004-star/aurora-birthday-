/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F2',
        blush: '#FFD9E3',
        lavender: '#E3DDF7',
        plum: {
          DEFAULT: '#3B1C32',
          light: '#5C2E4F',
          dark: '#26121F',
        },
        gold: '#D8B26A',
        rose: '#F2A9C4',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      backgroundImage: {
        'dreamy-gradient': 'linear-gradient(135deg, #FFF8F2 0%, #FFD9E3 45%, #E3DDF7 100%)',
        'plum-gradient': 'linear-gradient(180deg, #26121F 0%, #3B1C32 60%, #5C2E4F 100%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        twinkle: 'twinkle 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5, filter: 'blur(40px)' },
          '50%': { opacity: 0.9, filter: 'blur(60px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
