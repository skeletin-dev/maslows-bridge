import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useSiteMotion } from "../hooks/useSiteMotion";

export function NotFound() {
  const m = useSiteMotion();

  return (
    <section className="flex min-h-[min(70vh,560px)] flex-col items-center justify-center bg-mb-cream px-4 py-16 sm:py-24">
      <motion.div
        data-motion-pop
        className="w-full max-w-lg will-change-transform"
        initial={m.isReduced ? false : { opacity: 0, y: m.yNotFound, scale: m.scaleNotFound }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: m.isReduced ? 0 : m.section, ease: m.ease }}
      >
        <div className="relative overflow-hidden rounded-3xl border border-mb-mist bg-mb-mist/25 px-8 py-12 text-center shadow-sm ring-1 ring-black/5 sm:px-12 sm:py-14">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-mb-surface text-mb-accent"
            aria-hidden
          >
            <svg
              className="h-9 w-9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </div>

          <p className="mt-6 font-display text-5xl font-bold tabular-nums tracking-tight text-mb-accent/90 sm:text-6xl">
            404
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold text-mb-ink sm:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-base leading-relaxed text-mb-ink/80">
            That link may be outdated, or the page may have moved. If you were
            looking for something specific, try home or contact us—we&apos;re
            glad to help.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-[28px] bg-mb-accent-solid px-8 py-3.5 text-center text-sm font-semibold text-mb-surface transition hover:bg-mb-accent-hover sm:text-base"
            >
              Go to home
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-[28px] border border-mb-accent/45 bg-mb-cream px-8 py-3.5 text-center text-sm font-semibold text-mb-accent-solid transition hover:border-mb-accent hover:bg-mb-mist/40 sm:text-base"
            >
              Contact us
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
