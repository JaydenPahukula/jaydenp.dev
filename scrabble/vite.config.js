import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist/scrabble',
  },
  assetsInclude: ['src/fonts/*.otf'],
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
