import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(() => {
  const isProd = process.env.NODE_ENV === 'production';

  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['cjs', 'es'],
        fileName: (format) => (format === 'cjs' ? 'index.cjs' : 'index.mjs'),
        minify: isProd,
      },
      sourcemap: !isProd,
      rollupOptions: {
        external: ['zod'],
        output: [
          {
            // CJS build
            format: 'cjs',
            entryFileNames: `[name].cjs`,
            chunkFileNames: `[name].js`,
            assetFileNames: `[name].[ext]`,
            preserveModules: !isProd,
          },
          {
            // ESM build
            format: 'es',
            entryFileNames: `[name].mjs`,
            chunkFileNames: `[name].js`,
            assetFileNames: `[name].[ext]`,
            preserveModules: !isProd,
          },
        ],
      },
    },
    plugins: [
      dts({
        include: 'src/**/*.{ts,tsx}', // Include all TypeScript files
        staticImport: true, // Optionally, ensure static imports are handled
        insertTypesEntry: true, // Ensure the types entry file is generated
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      exclude: ['zod'],
    },
  };
});
