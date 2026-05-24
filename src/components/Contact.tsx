"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { content } from "@/lib/content";
import { business } from "@/lib/business";
import ProjectSelector from "./ProjectSelector";
import DateField from "./DateField";

const PROJECTS = [
  "Editorial",
  "Beauty",
  "Lookbook",
  "Campaign",
  "Runway",
  "Catalogue",
  "Press / Interview",
];

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const { contact } = content;

  const [project, setProject] = useState(PROJECTS[0]);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; brief?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Tell us who's booking.";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) next.email = "An email I can reply to.";
    if (brief.trim().length < 12) next.brief = "A sentence or two on the brief.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative px-5 sm:px-10 py-28 sm:py-36 border-t border-[var(--rule)]"
    >
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent-hover)] mb-6" style={{ fontFamily: "var(--font-mono), monospace" }}>
            {contact.kicker}
          </div>
          <h2
            className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.96] tracking-[-0.03em] text-[var(--ink)] font-medium mb-6"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            <span className="italic">{contact.heading}</span>
          </h2>
          <p className="text-[var(--ink-muted)] text-lg leading-relaxed max-w-[44ch] mb-10">{contact.body}</p>

          <div className="pt-8 border-t border-[var(--rule)] space-y-4 text-sm" style={{ fontFamily: "var(--font-mono), monospace" }}>
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)] w-20">Direct</span>
              <a href={`mailto:${business.email}`} className="text-[var(--ink)] hover:text-[var(--accent-hover)] transition-colors swipe-underline">
                {business.email}
              </a>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)] w-20">Phone</span>
              <a href={`tel:${business.phone}`} className="text-[var(--ink)] hover:text-[var(--accent-hover)] transition-colors swipe-underline">
                {business.phone}
              </a>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)] w-20">Based</span>
              <span className="text-[var(--ink)]">{business.address}</span>
            </div>
          </div>

          <p className="mt-10 text-xs italic text-[var(--ink-muted)] leading-relaxed max-w-[44ch] border-t border-[var(--rule)] pt-6" style={{ fontFamily: "var(--font-display), serif" }}>
            {contact.smallprint}
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-[var(--ink)]/15 p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 text-center"
                >
                  <div className="text-[10px] uppercase tracking-[0.32em] text-[var(--accent-hover)] mb-4 flex items-center justify-center gap-3" style={{ fontFamily: "var(--font-mono), monospace" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-hover)]" />
                    Brief received
                  </div>
                  <h3
                    className="text-4xl mb-4 italic"
                    style={{ fontFamily: "var(--font-display), serif", color: "var(--ink)" }}
                  >
                    Reply on the way.
                  </h3>
                  <p className="text-[var(--ink-muted)] max-w-[40ch] mx-auto leading-relaxed">
                    The brief for <span className="text-[var(--accent-hover)]">{project.toLowerCase()}</span> is logged. A note lands at {email} the same day, evenings excepted.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setCompany("");
                      setEmail("");
                      setBrief("");
                      setDate("");
                    }}
                    className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--ink)] swipe-underline"
                    style={{ fontFamily: "var(--font-mono), monospace" }}
                  >
                    Send another brief →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)] mb-2"
                      style={{ fontFamily: "var(--font-mono), monospace" }}
                    >
                      Your name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Mariama Ndiaye"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-err" : undefined}
                      className="w-full bg-transparent border-b border-[var(--ink)]/30 text-[var(--ink)] py-3 italic text-xl hover:border-[var(--ink)] focus:border-b-2 focus:border-[var(--accent-hover)] focus:pb-[11px] transition-colors"
                      style={{ fontFamily: "var(--font-display), serif" }}
                    />
                    {errors.name && (
                      <p id="name-err" className="mt-2 text-xs italic text-[var(--accent-hover)]" style={{ fontFamily: "var(--font-display), serif" }}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)] mb-2"
                      style={{ fontFamily: "var(--font-mono), monospace" }}
                    >
                      Brand / publication
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Vault Magazine"
                      className="w-full bg-transparent border-b border-[var(--ink)]/30 text-[var(--ink)] py-3 italic text-xl hover:border-[var(--ink)] focus:border-b-2 focus:border-[var(--accent-hover)] focus:pb-[11px] transition-colors"
                      style={{ fontFamily: "var(--font-display), serif" }}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)] mb-2"
                      style={{ fontFamily: "var(--font-mono), monospace" }}
                    >
                      Email to reply to
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="bookings@your-studio.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-err" : undefined}
                      className="w-full bg-transparent border-b border-[var(--ink)]/30 text-[var(--ink)] py-3 italic text-xl hover:border-[var(--ink)] focus:border-b-2 focus:border-[var(--accent-hover)] focus:pb-[11px] transition-colors"
                      style={{ fontFamily: "var(--font-display), serif" }}
                    />
                    {errors.email && (
                      <p id="email-err" className="mt-2 text-xs italic text-[var(--accent-hover)]" style={{ fontFamily: "var(--font-display), serif" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <ProjectSelector
                    id="project"
                    label="Project type"
                    value={project}
                    onChange={setProject}
                    options={PROJECTS}
                  />

                  <DateField id="shoot-date" label="Shoot date (tentative)" value={date} onChange={setDate} />

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="brief"
                      className="block text-[10px] uppercase tracking-[0.28em] text-[var(--ink-faint)] mb-2"
                      style={{ fontFamily: "var(--font-mono), monospace" }}
                    >
                      The brief
                    </label>
                    <textarea
                      id="brief"
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      rows={5}
                      placeholder="Dates, location, looks, team, anything I should know…"
                      aria-invalid={!!errors.brief}
                      aria-describedby={errors.brief ? "brief-err" : undefined}
                      className="w-full bg-transparent border border-[var(--ink)]/30 text-[var(--ink)] p-4 leading-relaxed hover:border-[var(--ink)] focus:border-[var(--accent-hover)] focus:[box-shadow:0_0_0_1px_var(--accent-hover)] transition-colors resize-none"
                    />
                    {errors.brief && (
                      <p id="brief-err" className="mt-2 text-xs italic text-[var(--accent-hover)]" style={{ fontFamily: "var(--font-display), serif" }}>
                        {errors.brief}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-3 bg-[var(--ink)] text-[var(--bg)] py-4 text-xs uppercase tracking-[0.28em] hover:bg-[var(--accent-hover)] transition-colors"
                    style={{ fontFamily: "var(--font-mono), monospace" }}
                  >
                    Send the brief
                    <span aria-hidden>→</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
