"use client";

import { motion, useReducedMotion } from "motion/react";
import { content } from "@/lib/content";
import { business } from "@/lib/business";

export default function Intro() {
  const prefersReducedMotion = useReducedMotion();
  const { intro } = content;

  return (
    <section
      id="about"
      className="relative px-5 sm:px-10 py-28 sm:py-36 border-t border-[var(--rule)]"
    >
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-3">
          <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent-hover)]" style={{ fontFamily: "var(--font-mono), monospace" }}>
            {intro.kicker}
          </div>
        </div>
        <div className="lg:col-span-9">
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.18] tracking-[-0.01em] text-[var(--ink)] max-w-[42ch] mb-12 italic font-medium"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            &ldquo;Editorial, beauty, runway, campaign. <span className="text-[var(--accent-hover)]">A long look, a quiet hand, a face that reads twice.</span>&rdquo;
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-[80ch] text-[var(--ink-muted)] text-base leading-[1.75]">
            {intro.body.map((p, i) => (
              <motion.p
                key={i}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className={i === 0 ? "md:col-span-2 md:text-lg text-[var(--ink)]" : ""}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Quick stats strip */}
          <div
            id="stats"
            className="mt-14 pt-8 border-t border-[var(--rule)] grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-6"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">Height</div>
              <div className="text-base mt-1 text-[var(--ink)]">{business.stats.height}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">Bust</div>
              <div className="text-base mt-1 text-[var(--ink)]">{business.stats.bust}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">Waist</div>
              <div className="text-base mt-1 text-[var(--ink)]">{business.stats.waist}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">Hips</div>
              <div className="text-base mt-1 text-[var(--ink)]">{business.stats.hips}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">Hair</div>
              <div className="text-base mt-1 text-[var(--ink)]">{business.stats.hair}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">Eyes</div>
              <div className="text-base mt-1 text-[var(--ink)]">{business.stats.eyes}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">Dress</div>
              <div className="text-base mt-1 text-[var(--ink)]">{business.stats.dress}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">Shoe</div>
              <div className="text-base mt-1 text-[var(--ink)]">{business.stats.shoe}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
