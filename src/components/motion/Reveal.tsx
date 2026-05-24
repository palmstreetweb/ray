"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Generic in-view reveal. A floor for motion — override with bespoke
 * animations per build instead of repeating <Reveal> everywhere.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  duration = 0.6,
  y = 16,
  once = true,
  ...rest
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (prefersReducedMotion) {
    return <MotionTag {...rest}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
