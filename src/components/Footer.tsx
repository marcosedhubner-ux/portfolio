import { githubUsername } from "@/lib/projects";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <h2 className="font-serif text-3xl text-[#f4f2ec] sm:text-4xl">
          Open to remote roles.
        </h2>
        <p className="mt-4 max-w-md text-[#e8e6e0]/60">
          Based in Cachoeirinha, Brazil. Happy to work across time zones.
        </p>

        <div className="mt-8 flex flex-col gap-3 font-mono text-sm text-[#e8e6e0]/70 sm:flex-row sm:gap-8">
          <a
            href="mailto:marcosedhubner@gmail.com"
            className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#f4f2ec] hover:decoration-[#f4f2ec]/60"
          >
            marcosedhubner@gmail.com
          </a>
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
        </div>

        <p className="mt-16 font-mono text-[11px] text-[#e8e6e0]/30">
          Designed and built by Marcos Hubner.
        </p>
      </div>
    </footer>
  );
}
