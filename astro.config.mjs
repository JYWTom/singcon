import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "hybrid",
  integrations: [tailwind(), svelte()],
  adapter: cloudflare(),
  image: {
    service: passthroughImageService(),
  }
});
