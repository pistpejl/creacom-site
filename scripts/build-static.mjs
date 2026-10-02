#!/usr/bin/env node
/**
 * Static export for GitHub Pages (or any static host).
 *
 *   npm run build:static        → dist/client is a fully prerendered static site
 *
 * 1. Runs `vite build` with STATIC_EXPORT=1 (vite.config.ts then skips the
 *    Nitro/Vercel server build and enables TanStack Start prerendering for
 *    /, /en, /erik, /tidigare, /ux).
 * 2. Post-processes the HTML: bakes the share/OG + PWA head tags that the
 *    Nitro middleware (server/middleware/grok-pwa.ts) injects at request time
 *    on the Grok/Vercel deploy, and writes the web manifest as a static file.
 * 3. Adds 404.html, .nojekyll and (for a custom domain) CNAME.
 *
 * Options (CLI flag or env var):
 *   --host=…  / STATIC_HOST  (default github.creacom.io) — public host, used for
 *             CNAME + absolute og:image URLs.
 *   --base=…  / BASE_PATH    (default "/") — public base path. "/creacom-site/"
 *             builds for https://pistpejl.github.io/creacom-site/ (Vite `base` +
 *             TanStack router basepath, see vite.config.ts).
 *   --no-cname / STATIC_CNAME=0 — don't write a CNAME file. Also skipped
 *             automatically when the host is a *.github.io address.
 *
 *   npm run build:static        → https://github.creacom.io/            (CNAME)
 *   npm run build:static:ghio   → https://pistpejl.github.io/creacom-site/ (no CNAME)
 */
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const argValue = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
};
const host = argValue("host") || process.env.STATIC_HOST || "github.creacom.io";
const base = `/${(argValue("base") ?? process.env.BASE_PATH ?? "/").replace(/^\/+|\/+$/g, "")}/`.replace(/\/{2,}/g, "/");
const writeCname =
  !args.includes("--no-cname") && process.env.STATIC_CNAME !== "0" && !/\.github\.io$/i.test(host);
const out = join(root, "dist", "client");
/** "/x" → "<base>x" */
const withBase = (p) => base + p.replace(/^\//, "");
process.env.BASE_PATH = base; // read by vite.config.ts

// Self-hosted copy: no "Created with Grok" banner script, absolute og:image on our host.
process.env.VITE_GROK_EXTENSIONS = process.env.VITE_GROK_EXTENSIONS ?? "0";
process.env.VITE_PUBLIC_HOSTNAME = process.env.VITE_PUBLIC_HOSTNAME ?? host;

const viteBin = join(root, "node_modules", ".bin", "vite");
const r = spawnSync(process.execPath, [join(root, "scripts", "with-app-env.mjs"), viteBin, "build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, STATIC_EXPORT: "1" },
});
if (r.status !== 0) process.exit(r.status ?? 1);

const { injectGrokPwaHead, snapshotOgIdentity } = await import("./grok-pwa-shared.mjs");
const site = snapshotOgIdentity(root).site;

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith(".html")) yield p;
  }
}

// injectGrokPwaHead works with root-relative paths ("/__grok/…", "https://host/og.jpg").
// Under a subpath, normalise our own base-prefixed tags back to root-relative first
// (so it doesn't add duplicates), then prefix everything it emits with the base.
const prefixBase = (html) =>
  base === "/"
    ? html
    : html
        .replaceAll('href="/__grok/', `href="${base}__grok/`)
        .replaceAll(`content="https://${host}/`, `content="https://${host}${base}`);
const stripBase = (html) =>
  base === "/" ? html : html.replaceAll(`href="${base}__grok/`, 'href="/__grok/');

let count = 0;
for (const file of htmlFiles(out)) {
  const html = stripBase(readFileSync(file, "utf8"));
  writeFileSync(file, prefixBase(injectGrokPwaHead(html, { host, site, cwd: root })));
  count++;
}
console.log(`[build-static] injected head tags into ${count} HTML files`);

const appName = String(site.title ?? "").trim() || "Creacom";
mkdirSync(join(out, "__grok"), { recursive: true });
const manifest = {
  name: appName,
  short_name: appName,
  id: base,
  start_url: base,
  scope: base,
  display: "standalone",
  background_color: "#000000",
  theme_color: "#000000",
  icons: [{ src: withBase("/__grok/icon-180.png"), sizes: "180x180", type: "image/png" }],
};
writeFileSync(join(out, "__grok", "manifest.webmanifest"), JSON.stringify(manifest, null, 2));
writeFileSync(join(out, "__grok", "manifest.json"), JSON.stringify(manifest, null, 2));

// GitHub Pages serves 404.html for any missing path (at any depth), so links must be absolute.
const notFound = `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Sidan finns inte — Creacom</title>
<link rel="icon" type="image/svg+xml" href="${withBase("/favicon.svg")}">
<style>
  html,body{margin:0;height:100%;background:#050505;color:#f4f1ea;font-family:"DM Sans",system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
  main{min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;box-sizing:border-box}
  .code{font-family:ui-monospace,"DM Mono",monospace;letter-spacing:.3em;font-size:.8rem;opacity:.6;text-transform:uppercase}
  h1{font-size:clamp(1.8rem,5vw,3rem);margin:.6rem 0 1rem;font-weight:600}
  p{opacity:.75;max-width:32rem;line-height:1.5}
  nav{margin-top:1.5rem;display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}
  a{color:inherit;border:1px solid rgba(244,241,234,.25);border-radius:999px;padding:.7rem 1.4rem;text-decoration:none;font-size:.85rem;letter-spacing:.12em;text-transform:uppercase}
  a:hover{background:rgba(244,241,234,.08)}
</style>
</head>
<body>
<main>
  <div class="code">404</div>
  <h1>Sidan finns inte</h1>
  <p>Sidan du letar efter har flyttats eller finns inte. / The page you are looking for doesn't exist.</p>
  <nav><a href="${withBase("/")}">Till startsidan</a><a href="${withBase("/en")}">English</a></nav>
</main>
</body>
</html>
`;
writeFileSync(join(out, "404.html"), notFound);
writeFileSync(join(out, ".nojekyll"), "");
const cnamePath = join(out, "CNAME");
if (writeCname) writeFileSync(cnamePath, host);
else if (existsSync(cnamePath)) rmSync(cnamePath);
if (!existsSync(join(out, "index.html"))) {
  console.error("[build-static] dist/client/index.html missing");
  process.exit(1);
}
console.log(
  `[build-static] wrote 404.html, .nojekyll${writeCname ? `, CNAME (${host})` : " (no CNAME)"} → ${out}`,
);
console.log(`[build-static] site URL: https://${host}${base}`);
