import { resolve } from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
  css: {
    postcss: { plugins: [tailwindcss()] },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        koi: resolve(__dirname, "koi/index.html"),
        scrabble: resolve(__dirname, "scrabble/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
