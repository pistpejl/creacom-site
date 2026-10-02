import { createFileRoute, Link } from "@tanstack/react-router";
import { withBase } from "@/lib/base-path";

export const Route = createFileRoute("/erik")({
  head: () => ({
    meta: [{ title: "Erik — Creacom" }, { name: "robots", content: "noindex" }],
  }),
  component: ErikPage,
});

const line =
  "Erik  ·  AI-prototyper  ·  Produkttexter  ·  Agenter  ·  Video med AI  ·  AI i sprinten  ·  Agil Scrum  ·  Appar  ·  ";

function ErikPage() {
  return (
    <main className="min-h-screen bg-[#09080e] text-white">
      <style>{`
        @keyframes erik-roll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .erik-roll { animation: erik-roll 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .erik-roll { animation: none; } }
      `}</style>
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
        <Link to="/" className="text-sm text-white/70">
          creacom
        </Link>
        <p className="font-mono text-xs tracking-[0.2em] text-[#ff2bd6] uppercase">Erik</p>
      </div>
      <img src={withBase("/images/erik-kliver.jpg")} alt="Erik kliver in genom dörren" width={1152} height={1728} className="mx-auto w-full max-w-3xl" />
      <div className="relative mx-auto w-full max-w-3xl">
        <img
          src={withBase("/images/erik-jonglerar.png")}
          alt="Erik jonglerar bollar märkta Scrum, projekt, appar, video, AI och kod"
          width={1152}
          height={1728}
          className="w-full"
        />
        {/* AiAgent007 stamp — sits in the empty lower-right corner, clear of Erik's face and the balls. */}
        <div className="erik-stamp pointer-events-none absolute right-[3%] bottom-[9%] w-[38%] max-w-[250px] min-w-[120px] -rotate-[10deg] select-none lg:-right-16">
          <div className="relative flex aspect-square items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_40%,#141a24_0%,#0a0c12_70%)] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9),0_0_36px_-6px_rgba(56,170,255,0.45)] ring-2 ring-white/25">
            <div className="absolute inset-[5%] rounded-full border border-dashed border-sky-300/45" aria-hidden />
            <picture className="relative block w-[82%]">
              <source srcSet={withBase("/images/aiagent007.webp")} type="image/webp" />
              <img
                src={withBase("/images/aiagent007.png")}
                alt="AiAgent007 – Med rätt att skapa"
                width={651}
                height={416}
                loading="lazy"
                className="block h-auto w-full"
              />
            </picture>
          </div>
        </div>
      </div>
      <div className="overflow-hidden border-y border-white/10 bg-black py-4">
        <p className="erik-roll flex w-max text-lg tracking-wide whitespace-nowrap text-white/90">
          <span>{line}</span>
          <span>{line}</span>
        </p>
      </div>
    </main>
  );
}
