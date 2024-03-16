import scrollbarHide from 'tailwind-scrollbar-hide'

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './nebula-ds/**/*.{js,ts,jsx,tsx}',
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
        disabled: '#808080',
        error: '#FF0000', // Error color
        success: '#4CAF50', // Success color
        warning: '#FFC107', // Warning color
        info: '#2196F3' // Info color
      }
    },
    fontFamily: {
      orbitron: ['Orbitron', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif']
    }
  },
  plugins: [scrollbarHide]
}
