"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
  id: string;
};

export default function ProjectSelector({ value, onChange, options, label, id }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [focusIdx, setFocusIdx] = useState(Math.max(0, options.indexOf(value)));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusIdx((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusIdx((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(options[focusIdx]);
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div ref={ref} className="relative">
      <label
        htmlFor={id}
        className="block text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)] mb-2"
        style={{ fontFamily: "var(--font-mono), monospace" }}
      >
        {label}
      </label>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="w-full text-left px-0 py-3 bg-transparent border-b border-[var(--ink)]/30 text-[var(--ink)] flex items-center justify-between transition-colors hover:border-[var(--ink)] focus:border-b-2 focus:border-[var(--accent-hover)] focus:pb-[11px] focus:[box-shadow:none] text-xl italic"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        <span>{value}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[var(--accent-hover)] text-sm"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            tabIndex={-1}
            aria-label={label}
            aria-activedescendant={`${id}-opt-${focusIdx}`}
            onKeyDown={handleListKey}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            ref={(el) => {
              if (el && open) el.focus();
            }}
            className="absolute z-30 left-0 right-0 mt-2 bg-[var(--bg)] border border-[var(--ink)] shadow-xl py-2 max-h-72 overflow-auto"
          >
            {options.map((opt, i) => {
              const selected = opt === value;
              const focused = i === focusIdx;
              return (
                <li
                  key={opt}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setFocusIdx(i)}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className={`px-5 py-3 cursor-pointer flex items-center justify-between transition-colors italic ${
                    focused
                      ? "bg-[var(--ink)] text-[var(--bg)]"
                      : "text-[var(--ink)]"
                  }`}
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  <span className="text-lg">{opt}</span>
                  {selected && <span className="not-italic text-[var(--accent)]">●</span>}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
