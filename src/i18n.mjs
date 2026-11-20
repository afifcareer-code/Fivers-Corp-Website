// Build-time localisation. Pages are authored in English (source of truth);
// the Indonesian version is produced by translating text nodes and a few
// attributes through the dictionary in dict-id.mjs. Missing keys fall back to
// English and are reported by the build.
import { dictId } from "./dict-id.mjs";

const ENT = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&rarr;": "→", "&larr;": "←", "&darr;": "↓", "&mdash;": "—", "&copy;": "©" };
const decode = (s) => s.replace(/&(amp|lt|gt|quot|#39|rarr|larr|darr|mdash|copy);/g, (m) => ENT[m]);
const encode = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const missing = new Set();

// Strings that never need translating (names, tokens, punctuation).
const KEEP = /^(width=.*|index, follow.*|Bahasa Indonesia|English|Fivers|Fivers Corp|Veluna|Financial Tracker|LinguaFlow|FiveClip|Forex Agent|Fivers Digital Office|ID|EN|AI|TECH|AIDP|CBD|MCB|DBI|CAP|VIS|[\d\s.,:;·→←↓+&|/()\-–—"'%]+|Afif Firmansyah|Brebes, Central Java, Indonesia)$/;

export function tr(s, lang = "id") {
  if (lang === "en") return s;
  const k = decode(s).trim();
  if (!k) return s;
  if (dictId[k] !== undefined) return dictId[k];
  if (!KEEP.test(k) && /[A-Za-z]{3}/.test(k)) missing.add(k);
  return s;
}

function trText(raw, lang) {
  const m = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
  const core = m[2];
  if (!core) return raw;
  const k = decode(core);
  if (dictId[k] !== undefined) return m[1] + encode(dictId[k]).replace(/&amp;(rarr|larr|darr);/g, "&$1;") + m[3];
  if (!KEEP.test(k) && /[A-Za-z]{3}/.test(k)) missing.add(k);
  return raw;
}

function deepTr(o, lang) {
  if (typeof o === "string") return dictId[o] !== undefined ? dictId[o] : (missing.add(o), o);
  if (Array.isArray(o)) return o.map((x) => deepTr(x, lang));
  if (o && typeof o === "object") {
    const r = {};
    for (const [k, v] of Object.entries(o)) {
      const skip = k.startsWith("@") || ["url", "item", "logo", "name", "alternateName", "jobTitle", "addressLocality", "addressRegion", "addressCountry", "inLanguage", "position"].includes(k) && !["name"].includes(k);
      r[k] = skip ? v : k === "name" ? (typeof v === "string" && dictId[v] !== undefined ? dictId[v] : v) : deepTr(v, lang);
    }
    return r;
  }
  return o;
}

export function localize(html, lang) {
  if (lang === "en") return html;
  // JSON-LD: translate string values; keep scripts/styles otherwise untouched.
  html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (m, json) => {
    try {
      const o = JSON.parse(json.replace(/\\u003c/g, "<"));
      const t = deepTr(o, lang);
      if (t[0] && t[0]["@graph"]) for (const n of t[0]["@graph"]) if (n.inLanguage) n.inLanguage = "id";
      return `<script type="application/ld+json">${JSON.stringify(t).replace(/</g, "\\u003c")}</script>`;
    } catch { return m; }
  });
  const parts = html.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)/g);
  return parts
    .map((part, i) => {
      if (i % 2 === 1) return part;
      // attributes
      part = part.replace(/\b(aria-label|alt|title|content)="([^"]*)"/g, (m, a, v) => {
        if (a === "content" && !/\s/.test(v)) return m;
        const t = trText(v, lang);
        return t === v ? m : `${a}="${t}"`;
      });
      // text nodes
      return part.replace(/>([^<>]+)</g, (m, t) => ">" + trText(t, lang) + "<");
    })
    .join("");
}
