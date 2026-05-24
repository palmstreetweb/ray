"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

type Props = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

export default function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const isOpen = index !== null;
  const total = images.length;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange(((index ?? 0) + 1) % total);
      if (e.key === "ArrowLeft") onIndexChange(((index ?? 0) - 1 + total) % total);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, index, onClose, onIndexChange, total]);

  const current = isOpen ? images[index!] : null;

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-[var(--bg-deep)]/97 backdrop-blur-md flex flex-col"
          onClick={onClose}
        >
          {/* Top bar */}
          <div
            className="relative flex items-center justify-between px-5 sm:px-8 h-[68px] text-[var(--bg)] text-[10px] uppercase tracking-[0.28em] flex-shrink-0"
            style={{ fontFamily: "var(--font-mono), monospace" }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[var(--accent)]">
              FRAME {String((index ?? 0) + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="text-[var(--bg)]/70 truncate max-w-[60%] text-center hidden sm:block">
              {current.caption ?? current.alt}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-[var(--bg)] hover:text-[var(--accent)] transition-colors text-xl leading-none p-2 -mr-2"
            >
              ✕
            </button>
          </div>

          {/* Image */}
          <div
            className="flex-1 flex items-center justify-center px-5 sm:px-12 py-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={current.src}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-w-[1200px]"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Prev / next */}
            <button
              type="button"
              aria-label="Previous"
              onClick={() => onIndexChange(((index ?? 0) - 1 + total) % total)}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-[var(--bg)] hover:text-[var(--accent)] transition-colors"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => onIndexChange(((index ?? 0) + 1) % total)}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-[var(--bg)] hover:text-[var(--accent)] transition-colors"
            >
              →
            </button>
          </div>

          {/* Bottom caption */}
          <div
            className="sm:hidden px-5 pb-4 text-[var(--bg)]/70 text-[10px] uppercase tracking-[0.28em] text-center"
            style={{ fontFamily: "var(--font-mono), monospace" }}
            onClick={(e) => e.stopPropagation()}
          >
            {current.caption ?? current.alt}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
