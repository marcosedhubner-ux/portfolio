import { githubUsername } from "@/lib/projects";

export function Hero() {
  return (
    <section id="top" className="bg-dots relative overflow-hidden border-b border-white/10">
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <p className="font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/50">
          Marcos Hubner — Full-Stack Developer — Cachoeirinha, Brazil / Remote
        </p>

        <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.1] text-[#f4f2ec] sm:text-6xl">
          I build the part <em className="italic text-[#f4f2ec]/70">after</em> the CRUD.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#e8e6e0]/70 sm:text-lg">
          Five full-stack products, each built around one problem worth solving properly —
          conflict-free scheduling, a concurrency-safe inventory ledger, real-time collaboration,
          fair debt-settlement, and a restaurant order state machine. All open source, all tested,
          all documented.
        </p>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-[#e8e6e0]/70">
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#f4f2ec] hover:decoration-[#f4f2ec]/60"
          >
            github.com/{githubUsername}
          </a>
          <a
            href="https://www.linkedin.com/in/marcos-eduardo-leite-hubner-4a0bb0254/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#f4f2ec] hover:decoration-[#f4f2ec]/60"
          >
            linkedin.com/in/marcos-eduardo-leite-hubner
          </a>
          <a
            href="mailto:marcosedhubner@gmail.com"
            className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#f4f2ec] hover:decoration-[#f4f2ec]/60"
          >
            marcosedhubner@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
