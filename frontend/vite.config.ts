import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react({ tsDecorators: true }), tsconfigPaths()],
  build: {
    outDir: '../dist',
  },
  resolve: {
    alias: {
      core: resolve(__dirname, '../core/src/index.ts'),
    },
  },
});
