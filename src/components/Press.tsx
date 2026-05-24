"use client";

import { motion, useReducedMotion } from "motion/react";
import { content } from "@/lib/content";

export default function Press() {
  const prefersReducedMotion = useReducedMotion();
  const { press } = content;

  return (
    <section
      id="press"
      className="relative px-5 sm:px-10 py-28 sm:py-36 bg-[var(--ink)] text-[var(--bg)] border-y border-[var(--ink)]"
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent)] mb-6" style={{ fontFamily: "var(--font-mono), monospace" }}>
              {press.kicker}
            </div>
            <h2
              className="text-[clamp(2.4rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] font-medium"
              style={{ fontFamily: "var(--font-display), serif", color: "var(--bg)" }}
            >
              <span className="italic">{press.heading}</span>
            </h2>
          </div>
          <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]" style={{ fontFamily: "var(--font-mono), monospace" }}>
            {press.items.length} placements · last 12 months
          </span>
        </div>

        <ol className="divide-y divide-white/15 border-y border-white/15">
          {press.items.map((p, i) => (
            <motion.li
              key={`${p.publication}-${i}`}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="group"
            >
              <a
                href={p.link}
                className="grid grid-cols-12 gap-4 sm:gap-6 py-7 sm:py-9 items-baseline hover:bg-white/[0.04] -mx-3 px-3 transition-colors"
              >
                <span
                  className="col-span-1 text-[10px] uppercase tracking-[0.28em] text-[var(--accent)] tabular-nums pt-1"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-11 sm:col-span-4">
                  <div
                    className="text-2xl sm:text-3xl tracking-[-0.01em] italic group-hover:text-[var(--accent)] transition-colors"
                    style={{ fontFamily: "var(--font-display), serif", color: "var(--bg)" }}
                  >
                    {p.publication}
                  </div>
                </div>
                <p
                  className="col-span-12 sm:col-span-5 text-sm leading-relaxed"
                  style={{ color: "rgba(244,240,232,0.7)" }}
                >
                  {p.story}
                </p>
                <span
                  className="col-span-12 sm:col-span-2 sm:text-right text-[10px] uppercase tracking-[0.28em]"
                  style={{ fontFamily: "var(--font-mono), monospace", color: "rgba(244,240,232,0.55)" }}
                >
                  {p.date}
                </span>
              </a>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
