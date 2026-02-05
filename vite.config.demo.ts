import { defineConfig } from "vite";

export default defineConfig({
  base: "/mini-viewer",
  build: {
    outDir: "demo",
    rollupOptions: {
      input: "./index.html",
    },
  },
});
