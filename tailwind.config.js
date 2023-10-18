/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1px'
      },
      colors: {
        black: '#333333',
        white: '#DAD9D6',
        paper: '#E3DAC5',
        primary: '#333333',
        cta: '#D75E3D',
        'cta-2': '#E4AF58',
        'cta-selected': '#CE443A',
        disabled: '#808080'
      }
    },
    fontFamily: {
      orbitron: ['Orbitron', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif']
    }
  },
  plugins: []
}
