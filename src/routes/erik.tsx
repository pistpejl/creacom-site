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
      <img
        src={withBase("/images/erik-jonglerar.png")}
        alt="Erik jonglerar bollar märkta Scrum, projekt, appar, video, AI och kod"
        width={1152}
        height={1728}
        className="mx-auto w-full max-w-3xl"
      />
      <div className="overflow-hidden border-y border-white/10 bg-black py-4">
        <p className="erik-roll flex w-max text-lg tracking-wide whitespace-nowrap text-white/90">
          <span>{line}</span>
          <span>{line}</span>
        </p>
      </div>
    </main>
  );
}
