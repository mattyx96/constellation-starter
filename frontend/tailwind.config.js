import scrollbarHide from 'tailwind-scrollbar-hide';
import { config } from 'nebula-ds-react-library';

/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './nebula-ds/**/*.{js,ts,jsx,tsx}', './index.html'],
  theme: {
    extend: { ...config.tw.generateTailwindCompatibleTheme() },
  },
  plugins: [scrollbarHide],
};
