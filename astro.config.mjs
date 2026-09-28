import { defineConfig } from 'astro/config';

// Output statico puro: HTML + CSS + asset, nessun runtime server.
// Deploy previsto: Cloudflare Pages (o cPanel/git). Zero canone.
export default defineConfig({
  site: 'https://www.marchesidigresy.com',
  // URL identici alla produzione: senza slash finale (/contatti, non /contatti/)
  trailingSlash: 'never',
  build: { format: 'file' },
  devToolbar: { enabled: false },
  // I redirect legacy (301) sono in public/_redirects (Cloudflare Pages): vero 301, non meta-refresh.
});
