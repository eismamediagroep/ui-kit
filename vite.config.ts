import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    sourcemap: true,
    // Explicit target prevents esbuild from emitting any syntax newer than
    // these browsers support. Without this, Vite's default 'modules' target
    // can leak features that recent Chromium handles but older Safari does
    // not (e.g. logical assignment, certain regex features).
    target: ['safari14', 'chrome87', 'firefox78', 'edge88'],
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Eisma',
      fileName: (format) => {
        if (format === 'es') return 'eisma.js';
        if (format === 'iife') return 'eisma.iife.js';
        if (format === 'umd') return 'eisma.umd.cjs';
        return `eisma.${format}.js`;
      },
      formats: ['es', 'iife', 'umd'],
    },
  },
});
