import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Menu, Plus, X } from "lucide-react";
import { copyByLang, type Lang } from "@/content/copy";
import { withBase } from "@/lib/base-path";

const LINKEDIN = "https://www.linkedin.com/in/fredrik-roos-1b252726";
const SERVICE_IMAGES = [withBase("/images/offer-strategy.jpg"), withBase("/images/offer-project.jpg"), withBase("/images/offer-ux.jpg"), withBase("/images/offer-pim.jpg")];
const ERIK_LINE_SV =
  "Erik  ·  AI-prototyper  ·  Produkttexter  ·  Agenter  ·  Video med AI  ·  AI i sprinten  ·  Agil Scrum  ·  Appar  ·  ";
const ERIK_LINE_EN =
  "Erik  ·  AI prototypes  ·  Product copy  ·  Agents  ·  AI video  ·  AI in the sprint  ·  Agile Scrum  ·  Apps  ·  ";

export function HomePage({ lang }: { lang: Lang }) {
  const copy = copyByLang[lang];
  const [open, setOpen] = useState(false);
  const [faq, setFaq] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState("");
  const [draft, setDraft] = useState({ name: "", company: "", email: "", message: "" });
  const heroSlides = [
    {
      src: lang === "sv" ? withBase("/images/hero-banner.png") : withBase("/images/hero-banner-en-v2.jpg"),
      alt:
        lang === "sv"
          ? "Fredrik Roos. Creacom Consulting AB är hans konsultbolag i Stockholm och hjälper företag som säljer online, både mot konsument och mot andra företag."
          : "Fredrik Roos. Creacom Consulting AB is his consultancy in Stockholm. It helps companies that sell online, both to consumers and to other businesses.",
      kicker: "",
      title: "",
    },
    {
      src: withBase("/images/erik-kick.png?v=6"),
      alt: lang === "sv" ? "Möt Erik. Han sparkar och jonglerar sina skills." : "Meet Erik. He kicks and juggles his skills.",
      kicker: lang === "sv" ? "Nytt" : "New",
      title: lang === "sv" ? "Möt Erik" : "Meet Erik",
      contain: true,
    },
    ...copy.services.items.map((item, index) => ({
      src: SERVICE_IMAGES[index],
      alt: item.title,
      kicker: item.n.replaceAll("/", ""),
      title: item.title,
    })),
  ];
  const [slide, setSlide] = useState(0);
  const dragX = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setSlide((current) => (current + 1) % heroSlides.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [heroSlides.length]);

  function go(next: number) {
    setSlide((next + heroSlides.length) % heroSlides.length);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    dragX.current = event.clientX;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (dragX.current == null) return;
    const delta = event.clientX - dragX.current;
    dragX.current = null;
    if (delta > 48) go(slide - 1);
    if (delta < -48) go(slide + 1);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const text = [
      `${copy.contact.prefixes.name}: ${draft.name}`,
      `${copy.contact.prefixes.company}: ${draft.company}`,
      `${copy.contact.prefixes.email}: ${draft.email}`,
      "",
      draft.message,
    ].join("\n");
    setReady(text);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden text-fg">
      <style>{`
        @keyframes erik-roll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .erik-roll { animation: erik-roll 32s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .erik-roll { animation: none; } }
      `}</style>
      <div className="page-glow" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-between px-6 md:px-16" aria-hidden>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-full w-px bg-fg/5" />
        ))}
      </div>

      <div className="relative z-10">
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-fg focus:px-4 focus:py-3 focus:text-bg"
        >
          {copy.skip}
        </a>

        <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
            <a href="#topp" className="leading-none">
              <span className="text-lg font-medium tracking-tight">creacom</span>
              <span className="mt-1 block font-mono text-[9px] tracking-[0.28em] text-muted uppercase">Consulting AB</span>
            </a>
            <nav className="hidden items-center gap-6 lg:flex">
              {copy.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm tracking-wide text-muted uppercase transition-colors duration-200 hover:text-fg"
                >
                  {item.label}
                </a>
              ))}
              <LangSwitch lang={lang} />
              <a href={`#${copy.contact.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-fg">
                {copy.cta}
                <ArrowUpRight className="size-4" />
              </a>
            </nav>
            <div className="flex items-center gap-2 lg:hidden">
              <LangSwitch lang={lang} />
              <button
                type="button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center"
                aria-expanded={open}
                aria-label={open ? copy.menuClose : copy.menuOpen}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          {open ? (
            <nav className="flex flex-col border-t border-line px-5 py-2 lg:hidden">
              {copy.nav.map((item) => (
                <a key={item.href} href={item.href} className="min-h-11 py-3 text-lg uppercase" onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ))}
              <a href={`#${copy.contact.id}`} className="min-h-11 py-3 text-lg text-accent uppercase" onClick={() => setOpen(false)}>
                {copy.cta}
              </a>
            </nav>
          ) : null}
        </header>

        <main id="innehall">
          <section id="topp" className="mx-auto max-w-6xl px-5 pt-8">
            <h1 className="sr-only">
              {copy.hero.l1} — {copy.hero.l2}
            </h1>
            <div
              className="relative aspect-[3/2] overflow-hidden rounded-2xl"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              {heroSlides.map((item, index) => (
                <div
                  key={item.src}
                  className={`absolute inset-0 bg-black transition-opacity duration-700 ${index === slide ? "opacity-100" : "pointer-events-none opacity-0"}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={1600}
                    height={1000}
                    className={`h-full w-full ${"contain" in item && item.contain ? "object-contain" : "object-cover"}`}
                  />
                  {item.title ? (
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/25 to-black/10">
                      <div className="absolute inset-x-0 bottom-0 p-6 pb-14 md:p-10 md:pb-16">
                        <p className="font-mono text-xs tracking-widest text-accent uppercase">{item.kicker}</p>
                        <p className="mt-2 max-w-xl text-3xl font-medium tracking-tight uppercase md:text-5xl">{item.title}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
              <button
                type="button"
                className="absolute top-1/2 left-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
                aria-label={lang === "sv" ? "Föregående bild" : "Previous image"}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => go(slide - 1)}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                className="absolute top-1/2 right-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white"
                aria-label={lang === "sv" ? "Nästa bild" : "Next image"}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => go(slide + 1)}
              >
                <ChevronRight className="size-5" />
              </button>
              <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
                {heroSlides.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    aria-label={item.title || "Fredrik"}
                    aria-current={index === slide}
                    className={`h-2.5 rounded-full ${index === slide ? "w-7 bg-accent" : "w-2.5 bg-white"}`}
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => setSlide(index)}
                  />
                ))}
              </div>
            </div>
          </section>

          <section id={copy.services.id} className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="font-mono text-xs tracking-widest text-accent uppercase">{copy.services.kicker}</p>
                <h2 className="mt-3 text-4xl leading-none font-medium tracking-tight uppercase md:text-5xl">{copy.services.title}</h2>
              </div>
              <p className="leading-relaxed text-muted">{copy.about.left}</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {copy.services.items.map((item, index) => (
                <article key={item.title} className="relative overflow-hidden rounded-2xl">
                  <img src={SERVICE_IMAGES[index]} alt="" width={960} height={640} className="aspect-[4/3] w-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-mono text-xs text-accent">{item.n.replaceAll("/", "")}</p>
                    <h3 className="mt-1 text-lg leading-tight font-medium tracking-tight">{item.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-white/75">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id={copy.cases.id} className="mx-auto max-w-6xl px-5 py-8 md:py-12">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">{copy.cases.kicker}</p>
            <h2 className="mt-3 max-w-xl text-4xl leading-none font-medium tracking-tight uppercase md:text-5xl">{copy.cases.title}</h2>
            <div className="mt-8 space-y-3">
              {copy.cases.items.map((item) => (
                <article key={item.name} className="grid gap-2 rounded-2xl bg-white/5 px-5 py-5 md:grid-cols-12 md:items-center md:px-6">
                  <h3 className="font-medium tracking-tight md:col-span-3">{item.name}</h3>
                  <p className="text-sm leading-relaxed text-muted md:col-span-9">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="process" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">{copy.process.kicker}</p>
            <h2 className="mt-3 max-w-xl text-4xl leading-none font-medium tracking-tight uppercase md:text-5xl">
              {copy.process.title1}
              <br />
              {copy.process.title2}
            </h2>
            <ol className="mt-12 grid gap-8 md:grid-cols-4">
              {copy.process.steps.map((step) => (
                <li key={step.n}>
                  <p className="font-mono text-xs text-accent">{step.n.replace(".", "")}</p>
                  <h3 className="mt-3 text-sm font-medium tracking-[0.16em] uppercase">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id={copy.about.id} className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">{copy.about.kicker}</p>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <img
                src={withBase("/images/fredrik.png")}
                alt="Fredrik Roos"
                width={128}
                height={128}
                className="portrait-glow size-28 rounded-full object-cover"
              />
              <div>
                <h2 className="text-3xl font-medium tracking-tight uppercase md:text-4xl">{copy.about.name}</h2>
                <p className="mt-3 text-lg text-fg">{copy.about.left}</p>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{copy.about.right}</p>
              </div>
            </div>
            <div className="mt-16 grid items-center gap-8 md:grid-cols-2">
              <div className="relative flex justify-end md:order-2">
                <img
                  src={withBase("/images/erik-kick.png?v=6")}
                  alt={lang === "sv" ? "Erik gör en taekwondospark och jonglerar bollar med Scrum, projekt, appar, video, AI, kod, agent och text" : "Erik throwing a taekwondo kick while juggling balls labeled Scrum, project, apps, video, AI, code, agent and text"}
                  width={966}
                  height={1492}
                  className="h-auto w-80 md:w-96"
                />
              </div>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center md:order-1">
                <img
                  src={withBase("/images/erik.png")}
                  alt="Erik"
                  width={900}
                  height={900}
                  className="portrait-glow size-28 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="font-mono text-xs tracking-widest text-accent uppercase">{lang === "sv" ? "/Nytt" : "/New"}</p>
                  <h2 className="mt-3 text-3xl font-medium tracking-tight uppercase md:text-4xl">Erik</h2>
                  <p className="mt-3 text-lg text-fg">
                    {lang === "sv"
                      ? "Nytt tillskott i Creacom. Han bygger AI-prototyper, skriver produkttexter, sätter upp enkla agenter och tar fram video och reklamutkast. Han hjälper också teamet att använda AI i sprinten."
                      : "New at Creacom. He builds AI prototypes, writes product copy, sets up simple agents, and drafts video and ads. He also helps a team use AI in the sprint."}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-full border border-white/10 py-3">
              <p className="erik-roll flex w-max text-sm tracking-wide whitespace-nowrap text-muted">
                <span>{lang === "sv" ? ERIK_LINE_SV : ERIK_LINE_EN}</span>
                <span>{lang === "sv" ? ERIK_LINE_SV : ERIK_LINE_EN}</span>
              </p>
            </div>
          </section>

          <section id={copy.contact.id} className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">{copy.contact.kicker}</p>
            <h2 className="mt-3 text-4xl font-medium tracking-tight uppercase md:text-6xl">{copy.contact.title}</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="soft-frame p-6 md:p-8">
                <p className="text-sm text-muted">Creacom Consulting AB</p>
                <p className="mt-2 text-lg">Stockholm</p>
                <p className="mt-6 text-sm text-muted">{copy.contact.org}</p>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-2 text-accent">
                  LinkedIn
                  <ArrowUpRight className="size-4" />
                </a>
                <p className="mt-6 text-sm leading-relaxed text-muted">{copy.contact.note}</p>
              </div>
              <div className="soft-frame p-6 md:p-8">
                <form onSubmit={onSubmit} className="space-y-4">
                  <Field label={copy.contact.fields.name} value={draft.name} onChange={(name) => setDraft((c) => ({ ...c, name }))} />
                  <Field
                    label={copy.contact.fields.email}
                    type="email"
                    value={draft.email}
                    onChange={(email) => setDraft((c) => ({ ...c, email }))}
                  />
                  <Field
                    label={copy.contact.fields.company}
                    value={draft.company}
                    onChange={(company) => setDraft((c) => ({ ...c, company }))}
                  />
                  <label className="block font-mono text-xs tracking-widest text-muted uppercase">
                    {copy.contact.fields.message}
                    <textarea
                      required
                      rows={4}
                      value={draft.message}
                      onChange={(event) => setDraft((c) => ({ ...c, message: event.target.value }))}
                      className="field-input mt-2 w-full rounded-2xl px-3 py-3 font-sans text-base text-fg"
                    />
                  </label>
                  <button
                    type="submit"
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-fg/8 text-sm tracking-widest uppercase transition-colors duration-200 hover:bg-accent"
                  >
                    {copy.contact.submit}
                  </button>
                  {ready ? <p className="text-sm text-fg">{copied ? copy.contact.copied : copy.contact.ready}</p> : null}
                  {ready ? <pre className="overflow-x-auto rounded-2xl bg-bg/40 p-4 text-sm whitespace-pre-wrap">{ready}</pre> : null}
                </form>
              </div>
            </div>
          </section>

          <section id={copy.faq.id} className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">{copy.faq.kicker}</p>
            <h2 className="mt-3 text-4xl font-medium tracking-tight uppercase md:text-5xl">{copy.faq.title}</h2>
            <div className="mt-10">
              {copy.faq.items.map((item) => {
                const expanded = faq === item.q;
                return (
                  <div key={item.q} className="border-b border-fg/10">
                    <button
                      type="button"
                      className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left"
                      aria-expanded={expanded}
                      onClick={() => setFaq(expanded ? null : item.q)}
                    >
                      <span className="font-medium tracking-tight">{item.q}</span>
                      <Plus className={`size-5 shrink-0 text-accent transition-transform duration-200 ${expanded ? "rotate-45" : ""}`} />
                    </button>
                    {expanded ? <p className="max-w-2xl pb-5 leading-relaxed text-muted">{item.a}</p> : null}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 pb-20">
            <div className="soft-frame px-6 py-16 text-center md:px-16">
              <h2 className="text-3xl font-medium tracking-tight uppercase md:text-5xl">
                {copy.close.before} <span className="text-accent">{copy.close.accent}</span> {copy.close.after}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">{copy.close.text}</p>
              <a
                href={`#${copy.contact.id}`}
                className="mt-8 inline-flex min-h-11 items-center bg-fg px-6 text-sm font-medium tracking-widest text-bg uppercase"
              >
                {copy.cta}
              </a>
            </div>
          </section>
        </main>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-fg">Creacom.</p>
              <p className="mt-2">© 2026 Creacom Consulting AB</p>
            </div>
            <div className="flex gap-8">
              <a href={withBase("/erik")} className="min-h-11 py-2 uppercase">
                Erik
              </a>
              <a href={withBase("/ux")} className="min-h-11 py-2 uppercase">
                UX
              </a>
              <a href={withBase("/tidigare")} className="min-h-11 py-2 uppercase">
                {copy.footer.archive}
              </a>
              <a href={LINKEDIN} className="min-h-11 py-2 uppercase" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function LangSwitch({ lang }: { lang: Lang }) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs tracking-widest">
      <a href={withBase("/")} hrefLang="sv" aria-current={lang === "sv" ? "page" : undefined} className={`inline-flex min-h-11 items-center ${lang === "sv" ? "text-fg" : "text-muted"}`}>
        SV
      </a>
      <span className="text-muted" aria-hidden>
        /
      </span>
      <a href={withBase("/en")} hrefLang="en" aria-current={lang === "en" ? "page" : undefined} className={`inline-flex min-h-11 items-center ${lang === "en" ? "text-fg" : "text-muted"}`}>
        EN
      </a>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block font-mono text-xs tracking-widest text-muted uppercase">
      {label}
      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-input mt-2 min-h-11 w-full rounded-2xl px-3 font-sans text-base text-fg normal-case"
      />
    </label>
  );
}
