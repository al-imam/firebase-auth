import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src"),
      "@routes": path.resolve(__dirname, "src/Route"),
      "@context": path.resolve(__dirname, "src/Context"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utility": path.resolve(__dirname, "src/components/utility"),
      "@pages": path.resolve(__dirname, "src/components/pages"),
      "@helper": path.resolve(__dirname, "src/helper"),
    },
  },
});
