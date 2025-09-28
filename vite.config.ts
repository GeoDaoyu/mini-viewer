import { defineConfig } from "vite";

export default defineConfig({
  base: "/mini-viewer",
  build: {
    lib: {
      entry: "./lib/main.ts",
      name: "mini-viewer",
      fileName: "mini-viewer",
    },
  },
});
