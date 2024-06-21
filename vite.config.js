import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
   plugins: [react()],
   server: {
      port: 2000,
      proxy: {
         "/api": {
            target: "http://ip:port",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
         },
      },
   },
});
