import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";

export default defineConfig({
  css: {
    postcss: { plugins: [tailwindcss()] },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
  },
});
