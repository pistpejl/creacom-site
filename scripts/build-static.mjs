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
 * 3. Adds 404.html, .nojekyll and CNAME.
 *
 * Env: STATIC_HOST (default github.creacom.io) — used for CNAME + absolute og:image.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const host = process.env.STATIC_HOST || "github.creacom.io";
const out = join(root, "dist", "client");

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

let count = 0;
for (const file of htmlFiles(out)) {
  const html = readFileSync(file, "utf8");
  writeFileSync(file, injectGrokPwaHead(html, { host, site, cwd: root }));
  count++;
}
console.log(`[build-static] injected head tags into ${count} HTML files`);

const appName = String(site.title ?? "").trim() || "Creacom";
mkdirSync(join(out, "__grok"), { recursive: true });
const manifest = {
  name: appName,
  short_name: appName,
  id: "/",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#000000",
  theme_color: "#000000",
  icons: [{ src: "/__grok/icon-180.png", sizes: "180x180", type: "image/png" }],
};
writeFileSync(join(out, "__grok", "manifest.webmanifest"), JSON.stringify(manifest, null, 2));
writeFileSync(join(out, "__grok", "manifest.json"), JSON.stringify(manifest, null, 2));

const notFound = `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Sidan finns inte — Creacom</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
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
  <nav><a href="/">Till startsidan</a><a href="/en">English</a></nav>
</main>
</body>
</html>
`;
writeFileSync(join(out, "404.html"), notFound);
writeFileSync(join(out, ".nojekyll"), "");
writeFileSync(join(out, "CNAME"), host);
if (!existsSync(join(out, "index.html"))) {
  console.error("[build-static] dist/client/index.html missing");
  process.exit(1);
}
console.log(`[build-static] wrote 404.html, .nojekyll, CNAME (${host}) → ${out}`);
