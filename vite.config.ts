import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [
    svgLoader({
      defaultImport: "raw",
    }),
  ],
  build: {
    outDir: "example-dist",
  },
});
