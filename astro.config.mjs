import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Output statico puro: HTML + CSS + asset, nessun runtime server.
// Deploy previsto: Cloudflare Pages (o cPanel/git). Zero canone.
export default defineConfig({
  site: 'https://www.marchesidigresy.com',
  // URL identici alla produzione: senza slash finale (/contatti, non /contatti/)
  trailingSlash: 'never',
  build: { format: 'file' },
  devToolbar: { enabled: false },
  // Sitemap per Search Console: genera /sitemap-index.xml (+ /sitemap-0.xml). robots.txt la indica.
  integrations: [sitemap()],
  // I redirect legacy (301) sono in public/_redirects (Cloudflare Pages): vero 301, non meta-refresh.
});
