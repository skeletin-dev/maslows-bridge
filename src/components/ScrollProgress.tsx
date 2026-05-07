import { useScroll } from "motion/react";
import { motion } from "motion/react";

/**
 * Thin gold progress bar pinned to the very top of the viewport.
 * Fills left-to-right as the user scrolls the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[999] h-[2px] origin-left bg-gradient-to-r from-mb-accent via-mb-accent-solid to-mb-hope"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}
