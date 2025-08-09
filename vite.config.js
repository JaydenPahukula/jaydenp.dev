import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

const src = resolve(__dirname, "src");

export default defineConfig({
  plugins: [tailwindcss()],
  root: src,
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(src, "index.html"),
        koi: resolve(src, "koi/index.html"),
        scrabble: resolve(src, "scrabble/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      src: src,
    },
  },
});
