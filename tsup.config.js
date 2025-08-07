import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/bin/index.ts'],
  format: ['esm'],
  target: 'node18',
  outDir: 'dist'
});