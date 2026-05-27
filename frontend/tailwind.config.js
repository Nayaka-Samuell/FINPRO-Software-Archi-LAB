/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          electric: '#1E1EFF',
          deep: '#1010CC',
          light: '#4A4AFF',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          soft: '#1A1A1A',
          muted: '#3A3A3A',
        },
        chalk: {
          DEFAULT: '#FFFFFF',
          off: '#F5F5F5',
          muted: '#E0E0E0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        widest: '0.2em',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.7s ease forwards',
        slideInLeft: 'slideInLeft 0.7s ease forwards',
        marquee: 'marquee 20s linear infinite',
      },
    },
  },
  plugins: [],
}
