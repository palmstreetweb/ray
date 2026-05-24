"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { content } from "@/lib/content";
import Logo from "./Logo";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--rule)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1500px] px-5 sm:px-10 h-[78px] flex items-center justify-between">
          <a href="#top" className="text-[var(--ink)] hover:text-[var(--accent-hover)] transition-colors">
            <Logo />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.28em]">
            {content.nav.links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="text-[var(--ink)] hover:text-[var(--accent-hover)] transition-colors swipe-underline"
              >
                {l.name}
              </a>
            ))}
            <a
              href={content.nav.cta.href}
              className="ml-3 inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--bg)] px-5 py-2.5 text-[11px] uppercase tracking-[0.28em] hover:bg-[var(--accent-hover)] transition-colors"
            >
              {content.nav.cta.name}
            </a>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center text-[var(--ink)] hover:text-[var(--accent-hover)] transition-colors"
            onClick={() => setOpen((s) => !s)}
          >
            <span className="flex flex-col gap-1.5">
              <span className={`block h-px w-6 bg-current transition-transform ${open ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block h-px w-6 bg-current transition-transform ${open ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-[var(--bg)] pt-[78px] flex flex-col"
            onClick={() => setOpen(false)}
          >
            <nav className="flex-1 flex flex-col px-8 py-12 gap-7">
              {content.nav.links.map((l, i) => (
                <motion.a
                  key={l.name}
                  href={l.href}
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.05, duration: 0.4 }}
                  className="text-4xl text-[var(--ink)] italic"
                  style={{ fontFamily: "var(--font-display), serif" }}
                  onClick={() => setOpen(false)}
                >
                  {l.name}
                </motion.a>
              ))}
              <motion.a
                href={content.nav.cta.href}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-6 inline-flex w-fit items-center gap-3 bg-[var(--ink)] text-[var(--bg)] px-6 py-3 text-sm uppercase tracking-[0.28em]"
                onClick={() => setOpen(false)}
              >
                {content.nav.cta.name}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
