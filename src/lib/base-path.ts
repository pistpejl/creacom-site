/**
 * Public base path the site is served from (Vite `base`, set at build time via
 * BASE_PATH — e.g. "/creacom-site/" for https://pistpejl.github.io/creacom-site/,
 * "/" for a custom domain). Always ends with "/".
 */
const raw = import.meta.env.BASE_URL || "/";
export const BASE_URL = raw.endsWith("/") ? raw : `${raw}/`;

/** Prefix a root-relative path ("/images/x.png", "/en", "/") with the base path. */
export function withBase(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return BASE_URL + path.slice(1);
}
