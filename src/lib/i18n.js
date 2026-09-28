// Helper i18n: lingua dal path, URL localizzati, elenco pagine con EN pronta, stringhe UI.
export const DEFAULT_LANG = 'it';
export const LANGS = ['it', 'en'];

// Pagine che hanno già la versione EN (path canonici IT, senza /en).
export const EN_AVAILABLE = new Set([
  '/',
  '/sostenibilita',
  '/wine-resort',
  '/letenute',
  '/martinenga',
  '/monte-aribaldo',
  '/la-serra',
  '/monte-colombo',
  '/i-vini',
  '/contatti',
  '/cookiepolicy',
]);

/** Normalizza il pathname: toglie `.html`/`index.html` (build.format:'file') e lo slash finale. */
function normalizePath(pathname) {
  let p = (pathname || '/').replace(/\/index\.html$/i, '/').replace(/\.html$/i, '');
  p = p.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

/** Path canonico IT (senza prefisso /en) a partire dal pathname corrente. */
export function canonicalPath(pathname) {
  const p = normalizePath(pathname);
  if (p === '/en') return '/';
  if (p.startsWith('/en/')) return p.slice(3) || '/';
  return p;
}

/** Lingua dedotta dal pathname. */
export function langFromPath(pathname) {
  const p = normalizePath(pathname);
  return (p === '/en' || p.startsWith('/en/')) ? 'en' : 'it';
}

/** URL (senza slash finale, come in produzione) di una pagina, dato il path canonico IT e la lingua. */
export function localizedUrl(canonical, lang) {
  if (lang === 'en') return canonical === '/' ? '/en' : `/en${canonical}`;
  return canonical; // '/' resta '/', '/contatti' resta '/contatti'
}

/** La pagina (path canonico) ha una versione EN pronta? */
export function hasEn(canonical) {
  // Tutte le schede vino /vini/<slug> hanno la versione EN generata dallo stesso dato.
  if (canonical.startsWith('/vini/')) return true;
  return EN_AVAILABLE.has(canonical);
}

/** Localizza un href interno per la lingua: in EN → /en/<pagina> se pronta, altrimenti resta IT.
 *  Lascia invariati link esterni e ancore. Preserva l'eventuale #hash. */
export function localizeHref(href, lang) {
  if (lang !== 'en' || typeof href !== 'string' || !href.startsWith('/')) return href;
  const i = href.indexOf('#');
  const path = i === -1 ? href : href.slice(0, i);
  const hash = i === -1 ? '' : href.slice(i);
  const canonical = path.replace(/\/+$/, '') || '/';
  if (!hasEn(canonical)) return href;          // pagina EN non ancora pronta → resta IT
  return localizedUrl(canonical, 'en') + hash; // /en/<pagina>/[#hash]
}

// Stringhe UI non presenti in site.md (banner cookie).
export const UI = {
  it: {
    cookie_text: 'Questo sito usa solo cookie tecnici necessari al funzionamento e non effettua profilazione.',
    cookie_policy: 'Cookie Policy',
    cookie_accept: 'Accetta',
    cookie_reject: 'Rifiuta',
  },
  en: {
    cookie_text: 'This site only uses technical cookies required for its operation and does not profile users.',
    cookie_policy: 'Cookie Policy',
    cookie_accept: 'Accept',
    cookie_reject: 'Decline',
  },
};
