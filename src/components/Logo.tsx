import { business } from "@/lib/business";

type Props = { className?: string };

// Tier 1 — refined wordmark only. The model is the brand.
export default function Logo({ className = "" }: Props) {
  return (
    <span
      aria-label={`${business.firstName} ${business.lastName}`}
      className={`inline-flex items-baseline gap-2 select-none ${className}`}
      style={{ fontFamily: "var(--font-display), serif", letterSpacing: "0.18em" }}
    >
      <span className="text-base font-medium uppercase tracking-[0.32em]">
        Gabriela
      </span>
      <span className="text-base font-bold uppercase tracking-[0.32em] italic">
        Ray
      </span>
    </span>
  );
}
