"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { content } from "@/lib/content";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();
  const { faq } = content;

  return (
    <section
      id="faq"
      className="relative px-5 sm:px-10 py-28 sm:py-36 border-t border-[var(--rule)]"
    >
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent-hover)] mb-6" style={{ fontFamily: "var(--font-mono), monospace" }}>
            06 — FAQ
          </div>
          <h2
            className="text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.0] tracking-[-0.02em] text-[var(--ink)] font-medium"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            <span className="italic">{faq.heading}</span>
          </h2>
        </div>
        <ul className="lg:col-span-8 border-t border-[var(--rule)]">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.question} className="border-b border-[var(--rule)]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="w-full grid grid-cols-12 gap-4 py-6 sm:py-7 text-left items-baseline group"
                >
                  <span className="col-span-1 text-[10px] uppercase tracking-[0.28em] text-[var(--accent-hover)] tabular-nums" style={{ fontFamily: "var(--font-mono), monospace" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="col-span-10 text-xl sm:text-2xl text-[var(--ink)] leading-snug italic group-hover:text-[var(--accent-hover)] transition-colors"
                    style={{ fontFamily: "var(--font-display), serif" }}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="col-span-1 justify-self-end text-[var(--accent-hover)] text-2xl leading-none"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={prefersReducedMotion ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-4 pb-7 -mt-2">
                        <span className="col-span-1" />
                        <p className="col-span-10 text-[var(--ink-muted)] leading-relaxed text-lg max-w-[60ch]">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
