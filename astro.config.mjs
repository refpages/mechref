import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  ssite: 'https://jcrayb.github.io',
  integrations: [svelte()]
});
