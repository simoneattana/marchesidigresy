import matter from 'gray-matter';
import { readFileSync, existsSync } from 'node:fs';

/** Percorso del file contenuto per (nome, lingua). EN → content/en/<name>.md (con fallback IT). */
function fileFor(name, lang) {
  if (lang === 'en') {
    const en = new URL(`../../content/en/${name}.md`, import.meta.url);
    if (existsSync(en)) return en;
  }
  return new URL(`../../content/${name}.md`, import.meta.url);
}

/** Legge content[/<lang>]/<name>.md e ne restituisce il frontmatter (i dati). */
export function loadContent(name, lang = 'it') {
  return matter(readFileSync(fileFor(name, lang), 'utf8')).data;
}

/** Dati condivisi del sito (menu + footer) nella lingua richiesta. */
export function loadSite(lang = 'it') {
  return loadContent('site', lang);
}
