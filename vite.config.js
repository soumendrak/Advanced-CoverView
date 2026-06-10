import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // React 16 predates the automatic JSX runtime, so use the classic transform
  // (every JSX file already imports React).
  plugins: [react({ jsxRuntime: "classic" })],
  // The codebase keeps JSX in `.js` files (a Create React App convention).
  // Tell esbuild to parse them as JSX both during dev/build and when
  // pre-bundling dependencies.
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
  server: {
    // Match the port Create React App used so existing tooling/docs still apply.
    port: 3000,
    open: true,
  },
  build: {
    // CRA emitted to "build/"; keep the same output dir for the deploy pipeline.
    outDir: "build",
  },
});
