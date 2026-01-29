/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3e2',
          100: '#fde8c5',
          200: '#fbd08b',
          300: '#f9b851',
          400: '#f7a017',
          500: '#d88415',
          600: '#b96812',
          700: '#8a4d0e',
          800: '#5b3209',
          900: '#2c1805',
        },
        secondary: {
          50: '#f5f3f0',
          100: '#ebe7e1',
          200: '#d7cfc3',
          300: '#c3b7a5',
          400: '#af9f87',
          500: '#8b7e6a',
          600: '#6e6454',
          700: '#52493f',
          800: '#37312a',
          900: '#1b1815',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
