import { useState, type FormEvent } from "react";
import { ArrowUpRight, Menu, Plus, X } from "lucide-react";
import { copyByLang, type Lang } from "@/content/copy";

const LINKEDIN = "https://www.linkedin.com/in/fredrik-roos-1b252726";

export function EditorialPage({ lang }: { lang: Lang }) {
  const copy = copyByLang[lang];
  const [open, setOpen] = useState(false);
  const [faq, setFaq] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState("");
  const [draft, setDraft] = useState({ name: "", company: "", email: "", message: "" });

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
            <a href="#topp" className="text-lg font-medium tracking-tight">
              Creacom.
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
              <a href={`#${copy.contact.id}`} className="inline-flex min-h-11 items-center gap-2 bg-accent px-4 text-sm font-medium text-fg">
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
          <section id="topp" className="mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-20 md:grid-cols-12 md:pt-28 md:pb-32">
            <h1 className="text-5xl leading-none font-medium tracking-tight uppercase md:col-span-7 md:text-7xl">
              {copy.hero.l1}
              <br />
              {copy.hero.l2}
            </h1>
            <div className="md:col-span-5 md:pt-2">
              <img
                src="/images/fredrik.png"
                alt="Fredrik Roos"
                width={256}
                height={256}
                className="portrait-glow size-48 rounded-full object-cover md:size-64"
              />
              <p className="mt-6 font-mono text-xs tracking-widest text-accent uppercase">{copy.hero.kicker}</p>
              <p className="mt-4 max-w-sm leading-relaxed text-muted">{copy.hero.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {copy.services.items.map((item) => (
                  <li key={item.short}>
                    <a href={`#${copy.services.id}`} className="inline-flex min-h-11 items-center border border-fg/15 px-3 text-sm">
                      {item.short}
                    </a>
                  </li>
                ))}
              </ul>
              <a href={`#${copy.contact.id}`} className="mt-6 inline-flex min-h-11 items-center gap-2 bg-accent px-4 text-sm font-medium">
                {copy.cta}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </section>

          <section id={copy.services.id} className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">{copy.services.kicker}</p>
            <h2 className="mt-3 max-w-3xl text-4xl leading-none font-medium tracking-tight uppercase md:text-6xl">
              {copy.services.title}
            </h2>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {copy.services.items.map((item) => (
                <article key={item.title} className="soft-frame p-6 md:p-8">
                  <p className="font-mono text-sm text-accent">{item.n}</p>
                  <h3 className="mt-4 text-2xl font-medium tracking-tight">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id={copy.cases.id} className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="font-mono text-xs tracking-widest text-accent uppercase">{copy.cases.kicker}</p>
                <h2 className="mt-3 text-4xl leading-none font-medium tracking-tight uppercase md:text-6xl">{copy.cases.title}</h2>
              </div>
              <p className="self-end leading-relaxed text-muted md:col-span-5">{copy.cases.intro}</p>
            </div>
            <div className="soft-frame mt-12">
              {copy.cases.items.map((item) => (
                <article key={item.name} className="grid gap-3 border-b border-fg/10 px-6 py-8 last:border-b-0 md:grid-cols-12 md:items-baseline md:px-10">
                  <h3 className="text-3xl font-medium tracking-tight md:col-span-4">{item.name}</h3>
                  <p className="leading-relaxed text-muted md:col-span-8">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="process" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="font-mono text-xs tracking-widest text-accent uppercase">{copy.process.kicker}</p>
                <h2 className="mt-3 text-4xl leading-none font-medium tracking-tight uppercase md:text-6xl">
                  {copy.process.title1}
                  <br />
                  {copy.process.title2}
                </h2>
              </div>
              <p className="self-end leading-relaxed text-muted md:col-span-5">{copy.process.intro}</p>
            </div>
            <ol className="relative mt-16 grid gap-12 md:grid-cols-4">
              <div
                aria-hidden
                className="pointer-events-none absolute top-2 right-6 left-6 hidden h-px bg-linear-to-r from-transparent via-accent/35 to-transparent md:block"
              />
              {copy.process.steps.map((step) => (
                <li key={step.n}>
                  <p className="relative z-10 w-fit bg-bg pr-4 font-mono text-sm text-accent">{step.n}</p>
                  <h3 className="mt-5 text-xl font-medium tracking-tight">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id={copy.about.id} className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="flex items-center gap-5">
              <img
                src="/images/fredrik.png"
                alt=""
                width={96}
                height={96}
                className="portrait-glow size-20 rounded-full object-cover md:size-24"
              />
              <div>
                <p className="font-mono text-xs tracking-widest text-accent uppercase">{copy.about.kicker}</p>
                <h2 className="mt-2 text-4xl font-medium tracking-tight uppercase md:text-6xl">{copy.about.name}</h2>
              </div>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-muted">{copy.about.left}</p>
              <p className="text-lg leading-relaxed text-muted">{copy.about.right}</p>
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
              <a href="#topp" className="min-h-11 py-2 uppercase">
                {copy.footer.home}
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
      <a href="/" hrefLang="sv" aria-current={lang === "sv" ? "page" : undefined} className={`inline-flex min-h-11 items-center ${lang === "sv" ? "text-fg" : "text-muted"}`}>
        SV
      </a>
      <span className="text-muted" aria-hidden>
        /
      </span>
      <a href="/en" hrefLang="en" aria-current={lang === "en" ? "page" : undefined} className={`inline-flex min-h-11 items-center ${lang === "en" ? "text-fg" : "text-muted"}`}>
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
