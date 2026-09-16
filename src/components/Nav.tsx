export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0d12]/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-xs tracking-widest text-[#e8e6e0]/80">
          MH
        </a>
        <nav className="flex gap-6 font-mono text-xs uppercase tracking-widest text-[#e8e6e0]/60">
          <a href="#work" className="transition-colors hover:text-[#e8e6e0]">
            Work
          </a>
          <a href="#about" className="transition-colors hover:text-[#e8e6e0]">
            About
          </a>
          <a href="#contact" className="transition-colors hover:text-[#e8e6e0]">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
