"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  id: string;
  label: string;
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DOW = ["S", "M", "T", "W", "T", "F", "S"];

function fmt(d: Date) {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
function parse(s: string): Date | null {
  if (!s) return null;
  const d = new Date(s);
  if (isNaN(d.getTime())) return null;
  return d;
}

export default function DateField({ value, onChange, id, label }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const initial = parse(value) ?? today;
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

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

  const monthDays = (() => {
    const first = new Date(view.year, view.month, 1);
    const start = first.getDay();
    const days = new Date(view.year, view.month + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < start; i++) cells.push(null);
    for (let i = 1; i <= days; i++) cells.push(i);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  })();

  const selected = parse(value);

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
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="w-full text-left px-0 py-3 bg-transparent border-b border-[var(--ink)]/30 text-[var(--ink)] flex items-center justify-between transition-colors hover:border-[var(--ink)] focus:border-b-2 focus:border-[var(--accent-hover)] focus:pb-[11px] focus:[box-shadow:none] text-xl italic"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        <span>{selected ? fmt(selected) : "Pick a shoot date"}</span>
        <span className="text-[var(--accent-hover)] text-sm">✷</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Pick a date"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 left-0 right-0 mt-2 bg-[var(--bg)] border border-[var(--ink)] shadow-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() =>
                  setView((v) =>
                    v.month === 0
                      ? { year: v.year - 1, month: 11 }
                      : { ...v, month: v.month - 1 }
                  )
                }
                className="w-8 h-8 flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--accent-hover)]"
                aria-label="Previous month"
              >
                ←
              </button>
              <div
                className="italic text-lg text-[var(--ink)]"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                {MONTHS[view.month]} {view.year}
              </div>
              <button
                type="button"
                onClick={() =>
                  setView((v) =>
                    v.month === 11
                      ? { year: v.year + 1, month: 0 }
                      : { ...v, month: v.month + 1 }
                  )
                }
                className="w-8 h-8 flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--accent-hover)]"
                aria-label="Next month"
              >
                →
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] tracking-[0.2em] text-[var(--ink-faint)] uppercase mb-2" style={{ fontFamily: "var(--font-mono), monospace" }}>
              {DOW.map((d, i) => (
                <span key={`${d}-${i}`}>{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {monthDays.map((day, i) => {
                if (day == null) return <span key={i} className="h-9" />;
                const date = new Date(view.year, view.month, day);
                const isPast = date < today;
                const isSelected =
                  selected &&
                  selected.getFullYear() === view.year &&
                  selected.getMonth() === view.month &&
                  selected.getDate() === day;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isPast}
                    onClick={() => {
                      onChange(date.toISOString().slice(0, 10));
                      setOpen(false);
                      triggerRef.current?.focus();
                    }}
                    className={`h-9 text-sm tabular-nums transition-colors ${
                      isSelected
                        ? "bg-[var(--ink)] text-[var(--bg)]"
                        : isPast
                        ? "text-[var(--ink-faint)]/40 cursor-not-allowed"
                        : "text-[var(--ink)] hover:bg-[var(--ink)]/10 hover:text-[var(--accent-hover)]"
                    }`}
                    style={{ fontFamily: "var(--font-mono), monospace" }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--rule)] text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)] flex items-center justify-between" style={{ fontFamily: "var(--font-mono), monospace" }}>
              <span>Tentative · confirm in writing</span>
              <span className="text-[var(--accent-hover)]">{view.year}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
