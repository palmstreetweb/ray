"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { content } from "@/lib/content";
import { business } from "@/lib/business";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sideY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const { hero } = content;

  return (
    <section
      ref={ref}
      id="top"
      className="relative pt-[100px] pb-12 px-5 sm:px-10 min-h-[100svh] overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto h-full">
        {/* Top kicker bar */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between border-t border-[var(--rule)] pt-4 pb-10 text-[10px] uppercase tracking-[0.32em] text-[var(--ink-muted)] flex-wrap gap-3"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          <span>{hero.kicker}</span>
          <span className="text-[var(--accent-hover)]">Portfolio · Vol. 04 · 2026</span>
          <span>{business.representation}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left column — name + landscape image */}
          <div className="lg:col-span-8 lg:col-start-1 relative">
            <motion.h1
              style={prefersReducedMotion ? undefined : { y: wordY }}
              className="text-[clamp(4rem,16vw,14rem)] leading-[0.84] tracking-[-0.04em] text-[var(--ink)] mb-8 sm:mb-10"
              aria-label={`${business.firstName} ${business.lastName}`}
            >
              <span
                className="block font-medium tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                {business.firstName.split("").map((c, i) => (
                  <span
                    key={i}
                    className="fade-in-letter inline-block"
                    style={{ animationDelay: `${0.04 * i}s` }}
                  >
                    {c}
                  </span>
                ))}
              </span>
              <span
                className="block italic font-medium tracking-[-0.02em] text-[var(--accent-hover)]"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                {business.lastName.split("").map((c, i) => (
                  <span
                    key={i}
                    className="fade-in-letter inline-block"
                    style={{ animationDelay: `${0.55 + 0.05 * i}s` }}
                  >
                    {c}
                  </span>
                ))}
              </span>
            </motion.h1>

            {/* Landscape couture frame */}
            <div className="relative aspect-[16/9] sm:aspect-[16/9] overflow-hidden">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover frame-hover"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-[10px] uppercase tracking-[0.28em] text-white drop-shadow" style={{ fontFamily: "var(--font-mono), monospace" }}>
                <span>FRAME 001 / 018</span>
                <span>EDITORIAL · MARBLE</span>
              </div>
            </div>
          </div>

          {/* Right column — portrait, polaroid stat block */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div
              style={prefersReducedMotion ? undefined : { y: sideY }}
              className="relative aspect-[3/4] w-full overflow-hidden hidden lg:block"
            >
              <Image
                src={hero.sideImage.src}
                alt={hero.sideImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 0vw, 30vw"
                className="object-cover frame-hover"
              />
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="border-t border-[var(--rule)] pt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-xs"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">Height</div>
                <div className="text-[var(--ink)] mt-1">{business.stats.height}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">Hair · Eyes</div>
                <div className="text-[var(--ink)] mt-1">{business.stats.hair} · {business.stats.eyes}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">Dress</div>
                <div className="text-[var(--ink)] mt-1">{business.stats.dress}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)]">Shoe</div>
                <div className="text-[var(--ink)] mt-1">{business.stats.shoe}</div>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col sm:flex-row lg:flex-col gap-3"
            >
              <a
                href="#portfolio"
                className="group inline-flex items-center justify-center gap-3 bg-[var(--ink)] text-[var(--bg)] px-7 py-4 text-xs uppercase tracking-[0.28em] hover:bg-[var(--accent-hover)] transition-colors"
              >
                Open the book
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 border border-[var(--ink)]/30 text-[var(--ink)] px-7 py-4 text-xs uppercase tracking-[0.28em] hover:border-[var(--ink)] transition-colors"
              >
                Request bookings
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
