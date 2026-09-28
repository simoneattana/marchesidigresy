/**
 * build-tokens.mjs — genera src/styles/tokens.generated.css dai file /design/*.md
 *
 * Ogni file Markdown in /design ha un frontmatter YAML che descrive i token.
 * Questo script lo appiattisce in CSS custom properties su :root.
 * responsive.md è speciale: genera @media reali che ridefiniscono i token
 * (i @media NON possono leggere le var, ma POSSONO ridefinirle: funziona a runtime).
 *
 * È l'unico "compilatore" del design system. Modifichi un .md → rilanci → il sito cambia.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const designDir = join(root, 'design');
const outFile = join(root, 'src', 'styles', 'tokens.generated.css');

/** Appiattisce {a:{b:'x'}} -> [['a-b','x']]. Ignora array e non-scalari (metadati). */
function flatten(obj, prefix = '') {
  const out = [];
  for (const [k, v] of Object.entries(obj ?? {})) {
    const key = prefix ? `${prefix}-${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      out.push(...flatten(v, key));
    } else if (typeof v === 'string' || typeof v === 'number') {
      out.push([key, String(v)]);
    }
  }
  return out;
}

function fm(name) {
  return matter(readFileSync(join(designDir, name), 'utf8')).data;
}

const files = readdirSync(designDir).filter((f) => f.endsWith('.md'));
const rootVars = [];
for (const f of files) {
  if (f === 'responsive.md') continue; // gestito a parte
  rootVars.push(...flatten(fm(f)));
}

// responsive.md -> var dei breakpoint + @media che ridefiniscono i token
const resp = fm('responsive.md');
const bp = resp.bp ?? {};
for (const [k, v] of Object.entries(bp)) rootVars.push([`bp-${k}`, String(v)]);

let css = `/* ⚠️ FILE GENERATO da scripts/build-tokens.mjs — non modificare a mano.\n`;
css += `   La fonte di verità sono i file in /design/*.md */\n\n:root {\n`;
for (const [k, v] of rootVars) css += `  --${k}: ${v};\n`;
css += `}\n`;

// override responsive: overrides[bpName] = { token: valore }
const overrides = resp.overrides ?? {};
for (const [bpName, tokens] of Object.entries(overrides)) {
  const width = bp[bpName];
  if (!width) continue;
  css += `\n@media (max-width: ${width}) {\n  :root {\n`;
  for (const [t, val] of flatten(tokens)) css += `    --${t}: ${val};\n`;
  css += `  }\n}\n`;
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, css);
console.log(`✓ tokens.generated.css — ${rootVars.length} token, ${Object.keys(overrides).length} blocchi responsive`);
