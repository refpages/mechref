import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://jcrayb.github.io',
  base: 'mechref',
  integrations: [svelte()]
});
