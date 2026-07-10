import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const legacyRedirectPaths = [
  '/parceiros',
  '/es/parceiros',
  '/es/bonus',
  '/es/monetizacao',
  '/es/artigos',
];

function isLegacyRedirectPath(page) {
  const pathname = new URL(page).pathname.replace(/\/+$/, '') || '/';
  return legacyRedirectPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export default defineConfig({
  site: 'https://radardigital.ai',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !isLegacyRedirectPath(page),
    }),
  ],
});
