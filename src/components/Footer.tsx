import { business } from "@/lib/business";
import { content } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  const slug = business.name.toLowerCase().replace(/\s+/g, "-");
  return (
    <footer className="relative px-5 sm:px-10 pt-24 pb-10 bg-[var(--bg)] border-t border-[var(--rule)] overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        {/* Giant name */}
        <div className="mb-16 select-none overflow-hidden">
          <div
            className="text-[clamp(5rem,22vw,20rem)] leading-[0.85] tracking-[-0.04em] text-[var(--ink)] font-medium"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {business.firstName}{" "}
            <span className="italic text-[var(--accent-hover)]">{business.lastName}.</span>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 pb-10 border-b border-[var(--rule)]">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 text-[var(--ink-muted)] text-sm leading-relaxed max-w-[36ch]">
              {business.tagline}
            </p>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)] mb-4" style={{ fontFamily: "var(--font-mono), monospace" }}>
              Bookings
            </h4>
            <address className="not-italic text-sm text-[var(--ink-muted)] leading-relaxed space-y-1">
              <div>
                <a href={`mailto:${business.email}`} className="text-[var(--ink)] hover:text-[var(--accent-hover)] transition-colors">
                  {business.email}
                </a>
              </div>
              <div>
                <a href={`tel:${business.phone}`} className="text-[var(--ink)] hover:text-[var(--accent-hover)] transition-colors">
                  {business.phone}
                </a>
              </div>
              <div className="text-[var(--ink-muted)]">{business.address}</div>
            </address>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)] mb-4" style={{ fontFamily: "var(--font-mono), monospace" }}>
              Sections
            </h4>
            <ul className="space-y-2">
              {content.nav.links.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-sm text-[var(--ink)] hover:text-[var(--accent-hover)] transition-colors italic" style={{ fontFamily: "var(--font-display), serif" }}>
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)] mb-4" style={{ fontFamily: "var(--font-mono), monospace" }}>
              Elsewhere
            </h4>
            <ul className="space-y-2">
              {business.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--ink)] hover:text-[var(--accent-hover)] transition-colors italic"
                    style={{ fontFamily: "var(--font-display), serif" }}
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--ink-muted)]"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          <p>{content.footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {content.footer.links.map((l) => (
              <a key={l.name} href={l.href} className="hover:text-[var(--accent-hover)] transition-colors">
                {l.name}
              </a>
            ))}
            <a
              href={`https://palmstreetweb.design?utm_source=${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-hover)] transition-colors"
            >
              Website by Palm Street Web ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
