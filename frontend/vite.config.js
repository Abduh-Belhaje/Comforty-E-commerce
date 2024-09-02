import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  outDir: "dist", // This should match the COPY path in the Dockerfile

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
