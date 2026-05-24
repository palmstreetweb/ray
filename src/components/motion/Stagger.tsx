"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { type ElementType, type ReactNode } from "react";

type StaggerProps = {
  children: ReactNode;
  as?: ElementType;
  stagger?: number;
  delay?: number;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Parent for staggered child reveals. Pair with <StaggerItem>.
 * A floor for motion — override with bespoke animations per build.
 */
export function Stagger({
  children,
  as = "div",
  stagger = 0.08,
  delay = 0,
  once = true,
  ...rest
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (prefersReducedMotion) {
    return <MotionTag {...rest}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  as?: ElementType;
  y?: number;
  duration?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

export function StaggerItem({
  children,
  as = "div",
  y = 16,
  duration = 0.6,
  ...rest
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (prefersReducedMotion) {
    return <MotionTag {...rest}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
