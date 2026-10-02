# Creacom

Webbplats för Creacom Consulting AB (TanStack Start + React 19 + Vite 8 + Tailwind 4).

Källkoden ligger på `main`. Den publicerade (statiska) sidan ligger på grenen `gh-pages`
och serveras med GitHub Pages.

## Adress

`https://github.creacom.io`

DNS för `creacom.io`:

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
npm run build:static   # statisk export → dist/client (för GitHub Pages)
```

`build:static` kör `vite build` med `STATIC_EXPORT=1` (se `vite.config.ts`): Nitro/Vercel-
serverbygget hoppas över och alla sidor förrenderas med TanStack Starts prerender. Därefter
lägger `scripts/build-static.mjs` till OG-/PWA-taggar, `__grok/manifest.webmanifest`,
`404.html`, `.nojekyll` och `CNAME` (`STATIC_HOST`, standard `github.creacom.io`).

`npm run build` bygger fortfarande den ursprungliga server-versionen (Nitro, preset `vercel`).

## Publicera

```sh
npm run build:static
# lägg innehållet i dist/client på grenen gh-pages (rot) och pusha
```

Kontaktformuläret skickar inget till någon server: det sätter ihop meddelandet och kopierar
det till urklipp, vilket fungerar likadant på statisk hosting.
