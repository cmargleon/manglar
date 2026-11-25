// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://agenciamanglar.mx/',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // El aviso de privacidad se excluye mientras tenga datos legales pendientes (es noindex).
      // Sin lastmod/changefreq/priority: Google ignora changefreq/priority y un lastmod con la
      // fecha de cada build le resta confianza al sitemap.
      filter: (page) => !page.includes('/aviso-de-privacidad'),
      namespaces: { news: false, xhtml: false, image: false, video: false },
    }),
  ],
  // Fuentes autoalojadas: Astro las descarga en el build y las sirve desde el propio dominio
  // (sin petición bloqueante a Google Fonts) con fallbacks métricos para reducir CLS.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-jakarta',
      weights: [500, 600, 700, 800],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      weights: [400, 500, 600, 700],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
