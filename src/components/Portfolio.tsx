"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { content } from "@/lib/content";
import Lightbox from "./Lightbox";

const FILTERS = ["All", "Editorial", "Beauty", "Headshot"] as const;

export default function Portfolio() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { portfolio } = content;

  const filtered =
    filter === "All"
      ? portfolio.images
      : portfolio.images.filter((img) =>
          (img.caption ?? "").toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <section
      id="portfolio"
      className="relative px-5 sm:px-10 py-28 sm:py-36 bg-[var(--bg-soft)] border-t border-[var(--rule)]"
    >
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-end">
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent-hover)] mb-6" style={{ fontFamily: "var(--font-mono), monospace" }}>
              {portfolio.kicker}
            </div>
            <h2
              className="text-[clamp(2.4rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.03em] text-[var(--ink)] font-medium"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              The <span className="italic">book.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <p className="text-[var(--ink-muted)] leading-relaxed text-base max-w-[42ch]">
              {portfolio.intro}
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.28em]" style={{ fontFamily: "var(--font-mono), monospace" }}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 border transition-colors ${
                    filter === f
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                      : "border-[var(--ink)]/20 text-[var(--ink)] hover:border-[var(--ink)]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Masonry-style grid via CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 [column-fill:_balance]">
          {filtered.map((img, i) => {
            const origIdx = portfolio.images.findIndex((x) => x.src === img.src);
            const aspect = img.aspect === "landscape" ? "16/9" : "3/4";
            return (
              <motion.button
                key={img.src}
                type="button"
                onClick={() => setOpenIdx(origIdx)}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-3%" }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group block w-full mb-4 sm:mb-5 break-inside-avoid text-left overflow-hidden bg-[var(--ink)]/5"
                aria-label={`Open frame ${origIdx + 1}: ${img.alt}`}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover frame-hover"
                  />
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-[var(--bg-deep)]/65 via-transparent to-transparent">
                    <span className="text-[var(--bg)] text-[10px] uppercase tracking-[0.28em] flex items-center justify-between w-full" style={{ fontFamily: "var(--font-mono), monospace" }}>
                      <span>{img.caption}</span>
                      <span>{String(origIdx + 1).padStart(2, "0")}</span>
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <Lightbox
        images={portfolio.images}
        index={openIdx}
        onClose={() => setOpenIdx(null)}
        onIndexChange={setOpenIdx}
      />
    </section>
  );
}
