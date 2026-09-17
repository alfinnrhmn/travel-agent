// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Set SITE_URL in production (for example: https://www.example.com) so
  // canonical and social preview URLs are absolute.
  site: process.env.SITE_URL,
  image: {
    breakpoints: [480, 640, 768, 1024, 1280, 1600, 1920],
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});
