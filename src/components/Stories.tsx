"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { content } from "@/lib/content";

export default function Stories() {
  const prefersReducedMotion = useReducedMotion();
  const { stories } = content;

  return (
    <section
      id="stories"
      className="relative px-5 sm:px-10 py-28 sm:py-36 border-t border-[var(--rule)]"
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-end">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent-hover)] mb-6" style={{ fontFamily: "var(--font-mono), monospace" }}>
              {stories.kicker}
            </div>
            <h2
              className="text-[clamp(2.4rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.03em] text-[var(--ink)] font-medium"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              {stories.heading.split(" ").map((w, i, arr) => (
                <span key={i} className={i === arr.length - 2 || i === arr.length - 1 ? "italic" : ""}>
                  {w}{i < arr.length - 1 ? " " : ""}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-10">
          {stories.items.map((s, i) => {
            const isLandscape = s.cover.alt.toLowerCase().includes("marble");
            return (
              <motion.li
                key={s.slug}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                id={s.slug}
                className={`group ${
                  i === 0
                    ? "md:col-span-7"
                    : i === 1
                    ? "md:col-span-5"
                    : "md:col-span-12"
                }`}
              >
                <Link href={`/stories/${s.slug}`} className="block">
                  <div
                    className="relative overflow-hidden mb-6"
                    style={{ aspectRatio: isLandscape || i === 2 ? "16/9" : "4/5" }}
                  >
                    <Image
                      src={s.cover.src}
                      alt={s.cover.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover frame-hover"
                    />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white drop-shadow" style={{ fontFamily: "var(--font-mono), monospace" }}>
                      <span>0{i + 1} / 0{stories.items.length}</span>
                      <span className="text-[var(--accent)]">{s.year.split(" · ")[1] ?? s.year}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 items-baseline">
                    <h3
                      className="col-span-12 md:col-span-7 text-3xl sm:text-4xl text-[var(--ink)] tracking-[-0.02em] group-hover:text-[var(--accent-hover)] transition-colors"
                      style={{ fontFamily: "var(--font-display), serif" }}
                    >
                      <span className="italic">{s.title}.</span>
                    </h3>
                    <p
                      className="col-span-12 md:col-span-5 text-sm text-[var(--ink-muted)] leading-relaxed"
                    >
                      {s.subtitle}
                    </p>
                  </div>
                  <p className="mt-4 text-base text-[var(--ink-muted)] leading-relaxed max-w-[60ch]">
                    {s.blurb}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--ink)] swipe-underline"
                  >
                    Open the story
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
