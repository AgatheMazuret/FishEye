import { fileURLToPath } from "url";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("./index.html", import.meta.url)),
        photographer: fileURLToPath(
          new URL("./photographer.html", import.meta.url)
        ),
      },
    },
  },
});
