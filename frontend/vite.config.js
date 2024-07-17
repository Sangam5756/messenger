import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: "#00AcB4",
      },
    },
  },

  plugins: [react()],
});
