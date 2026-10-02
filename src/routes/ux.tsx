import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/ux")({
  head: () => ({
    meta: [
      { title: "Creacom — UX" },
      { name: "description", content: "How the Creacom site is built: one page, from the offer to a conversation." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: UxPage,
});

const services = [
  ["01", "Strategy and business analysis", "Needs become a brief that both leadership and the team can work from.", "/images/offer-strategy.jpg"],
  ["02", "Project management", "From scope to delivery. The bridge between the buyer and the people who build.", "/images/offer-project.jpg"],
  ["03", "Design, UX and marketing", "Interfaces and campaigns based on how the customer buys.", "/images/offer-ux.jpg"],
  ["04", "Product information and technology", "One source for product data, and requirements the team can take further.", "/images/offer-pim.jpg"],
];

const cases = [
  ["Bluestone PIM", "Product information and project management for telco commerce."],
  ["Telenor", "Digital commerce. Offers for both businesses and consumers."],
  ["Tre", "Range and purchase flows, on time and on budget."],
];

const steps = [
  ["01", "Understand the business", "How you sell, who the customer is, and what is holding growth back."],
  ["02", "Build the strategy", "Range, flow, channels, and what should be delivered first."],
  ["03", "Deliver", "Requirements the team can build. Time and budget hold."],
  ["04", "Scale what works", "Think big, start small, scale fast."],
];

function UxPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-fg">
      <div className="page-glow" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-between px-6 md:px-16" aria-hidden>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-full w-px bg-fg/5" />
        ))}
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
            <a href="/en" className="leading-none">
              <span className="text-lg font-medium tracking-tight">creacom</span>
              <span className="mt-1 block font-mono text-[9px] tracking-[0.28em] text-muted uppercase">Consulting AB</span>
            </a>
            <nav className="hidden items-center gap-6 lg:flex">
              {[
                ["#services", "Services"],
                ["#work", "Cases"],
                ["#process", "Process"],
                ["#about", "About"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="text-sm tracking-wide text-muted uppercase">
                  {label}
                </a>
              ))}
              <a href="/en" className="text-sm tracking-wide text-fg uppercase">
                EN
              </a>
              <a href="/en#contact" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-fg">
                Get in touch
                <ArrowUpRight className="size-4" />
              </a>
            </nav>
            <a href="/en" className="text-sm tracking-widest text-muted uppercase lg:hidden">
              EN
            </a>
          </div>
        </header>

        <main>
          <section className="mx-auto max-w-6xl px-5 pt-8">
            <img
              src="/images/hero-banner-en-v2.jpg"
              alt="Fredrik Roos. From strategy to results — for your commerce."
              width={1600}
              height={1000}
              className="w-full rounded-2xl"
            />
          </section>

          <section id="services" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="font-mono text-xs tracking-widest text-accent uppercase">/UX</p>
                <h1 className="mt-3 text-4xl leading-none font-medium tracking-tight uppercase md:text-5xl">What the page is for</h1>
              </div>
              <p className="leading-relaxed text-muted">
                One page. It tells a buyer who Creacom is, what they can hire, and how to get in touch. It is not a brochure, and it does not invent results.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {services.map(([n, title, text, src]) => (
                <article key={title} className="relative overflow-hidden rounded-2xl">
                  <img src={src} alt="" width={960} height={640} className="aspect-[16/10] w-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-black/10" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-mono text-xs text-accent">{n}</p>
                    <h2 className="mt-2 text-2xl font-medium tracking-tight">{title}</h2>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-white/75">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="work" className="mx-auto max-w-6xl px-5 py-8 md:py-12">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">/Cases</p>
            <h2 className="mt-3 max-w-xl text-4xl leading-none font-medium tracking-tight uppercase md:text-5xl">In practice</h2>
            <div className="mt-8 space-y-3">
              {cases.map(([name, text]) => (
                <article key={name} className="grid gap-2 rounded-2xl bg-white/5 px-5 py-5 md:grid-cols-12 md:items-center md:px-6">
                  <h3 className="font-medium tracking-tight md:col-span-3">{name}</h3>
                  <p className="text-sm leading-relaxed text-muted md:col-span-9">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="process" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">/Process</p>
            <h2 className="mt-3 max-w-xl text-4xl leading-none font-medium tracking-tight uppercase md:text-5xl">
              How Creacom
              <br />
              works
            </h2>
            <ol className="mt-12 grid gap-8 md:grid-cols-4">
              {steps.map(([n, title, text]) => (
                <li key={n}>
                  <p className="font-mono text-xs text-accent">{n}</p>
                  <h3 className="mt-3 text-sm font-medium tracking-[0.16em] uppercase">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="about" className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">/About</p>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <img src="/images/fredrik.png" alt="Fredrik Roos" width={128} height={128} className="portrait-glow size-28 rounded-full object-cover" />
              <div>
                <h2 className="text-3xl font-medium tracking-tight uppercase md:text-4xl">Fredrik Roos</h2>
                <p className="mt-3 text-lg text-fg">
                  An e-commerce strategist with a background in B2B and B2C. The whole chain: UX and design, supply chain, project management, marketing, and sales.
                </p>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">
                  The portrait stays in the first screen. The longer story comes after the offer, the cases, and the process.
                </p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 pb-20">
            <div className="soft-frame px-6 py-16 text-center md:px-16">
              <h2 className="text-3xl font-medium tracking-tight uppercase md:text-5xl">
                Same page in <span className="text-accent">English</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">The Swedish and English sites share this layout. The hero image carries the language.</p>
              <a href="/en" className="mt-8 inline-flex min-h-11 items-center bg-fg px-6 text-sm font-medium tracking-widest text-bg uppercase">
                Open the English page
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
            <a href="/en" className="min-h-11 py-2 uppercase">
              English site
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
