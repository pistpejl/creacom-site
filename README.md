# Creacom

Webbplats för Creacom Consulting AB (TanStack Start + React 19 + Vite 8 + Tailwind 4).

Källkoden ligger på `main`. Den publicerade (statiska) sidan ligger på grenen `gh-pages`
och serveras med GitHub Pages.

## Adress

Just nu (utan egen domän): `https://pistpejl.github.io/creacom-site/`
— byggs med `npm run build:static:ghio` (bas-sökväg `/creacom-site/`, ingen `CNAME`).

Planerad egen domän: `https://github.creacom.io` — byggs med `npm run build:static`
(bas-sökväg `/`, skriver `CNAME`). Kräver DNS för `creacom.io`:

| Typ | Namn | Värde |
| --- | --- | --- |
| CNAME | `github` | `pistpejl.github.io` |

## Sidor

| Sökväg | Innehåll |
| --- | --- |
| `/` | Startsida (svenska) |
| `/en` | Startsida (engelska) |
| `/ux` | UX-sida |
| `/erik` | Erik (noindex) |
| `/tidigare` | Tidigare utkast |

## Bygga

Kräver Node 22.12+.

```sh
npm install
npm run dev            # utvecklingsserver på :8080
npm run build:static        # statisk export för github.creacom.io → dist/client (med CNAME)
npm run build:static:ghio   # statisk export för pistpejl.github.io/creacom-site/ (utan CNAME)
```

Bas-sökvägen styrs av `BASE_PATH` (eller `--base=`), standard `/`. Den sätter Vites `base`
och TanStack-routerns `basepath` (`vite.config.ts`). Interna länkar och bilder i koden går via
`withBase()` (`src/lib/base-path.ts`) så att de fungerar under både `/` och en undersökväg.
Övriga flaggor till `scripts/build-static.mjs`: `--host=` / `STATIC_HOST` (värd för og:image
och CNAME) och `--no-cname` / `STATIC_CNAME=0` (ingen CNAME skrivs heller för `*.github.io`).

`build:static` kör `vite build` med `STATIC_EXPORT=1` (se `vite.config.ts`): Nitro/Vercel-
serverbygget hoppas över och alla sidor förrenderas med TanStack Starts prerender. Därefter
lägger `scripts/build-static.mjs` till OG-/PWA-taggar, `__grok/manifest.webmanifest`,
`404.html`, `.nojekyll` och (för egen domän) `CNAME` (`STATIC_HOST`, standard `github.creacom.io`).

`npm run build` bygger fortfarande den ursprungliga server-versionen (Nitro, preset `vercel`).

## Publicera

```sh
npm run build:static:ghio   # eller build:static när github.creacom.io har DNS
# lägg innehållet i dist/client på grenen gh-pages (rot) och pusha
```

### Byta till github.creacom.io senare

1. Lägg DNS-posten ovan (`CNAME github → pistpejl.github.io`).
2. `npm run build:static` och publicera `dist/client` (inkl. `CNAME`) på `gh-pages`.
3. Sätt domänen i Pages: `gh api -X PUT repos/pistpejl/creacom-site/pages -f cname=github.creacom.io`
   (eller Settings → Pages → Custom domain), vänta på certifikatet och slå på "Enforce HTTPS".

Kontaktformuläret skickar inget till någon server: det sätter ihop meddelandet och kopierar
det till urklipp, vilket fungerar likadant på statisk hosting.
