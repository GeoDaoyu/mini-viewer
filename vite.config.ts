import { defineConfig } from "vite";

export default defineConfig({
  base: "/osm-viewer",
  build: {
    lib: {
      entry: "./lib/main.ts",
      name: "osm-viewer",
      fileName: "osm-viewer",
    },
  },
});
