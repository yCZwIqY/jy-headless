/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          subdued: '#A47EC8',
          base: '#6420AA',
          highlight: '#7A1DEB',
          text: '#fff'
        },
        secondary: {
          subdued: '#FF8AB8',
          base: '#FF3EA5',
          highlight: '#FF1B87',
          text: '#fff'
        },
        tertiary: {
          subdued: '#F2A8C4',
          base: '#FF7ED4',
          highlight: '#FF57B9',
          text: '#fff'
        }
      }
    },
  },
  plugins: [],
}

