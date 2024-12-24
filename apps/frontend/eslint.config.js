import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tailwind from 'eslint-plugin-tailwindcss';
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';

/** @type {import('eslint').Linter.Config[]} */
export default {
  extends: ['../../.eslint.config.js'],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    tailwindcss: tailwind,
    react: react,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
