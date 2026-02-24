import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/mini-viewer",
  resolve: {
    alias: {
      "@": resolve(__dirname, "lib"),
    },
  },
  build: {
    lib: {
      entry: "./lib/main.ts",
      name: "mini-viewer",
      fileName: "mini-viewer",
    },
  },
});
