import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { pillPrimary, pillSecondary } from "../components/pageLayout";
import { useSiteMotion } from "../hooks/useSiteMotion";
import { SITE } from "../site";

export function NotFound() {
  const m = useSiteMotion();

  return (
    <section className="relative flex min-h-[min(85dvh,720px)] flex-col items-center justify-center overflow-hidden px-4 py-16 sm:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${SITE.heroBackgroundSrc})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-mb-surface/90 via-mb-surface/85 to-mb-surface/95"
        aria-hidden
      />

      <motion.div
        data-motion-pop
        className="relative z-[1] w-full max-w-lg will-change-transform"
        initial={
          m.isReduced
            ? false
            : { opacity: 0, y: m.yNotFound, scale: m.scaleNotFound }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: m.isReduced ? 0 : m.section, ease: m.ease }}
      >
        <div
          className={`overflow-hidden rounded-2xl border border-white/15 bg-mb-surface/55 px-8 py-12 text-center shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-12 sm:py-14`}
        >
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-mb-accent/15 text-mb-accent ring-1 ring-white/10"
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

          <p className="mt-6 font-display text-5xl font-bold tabular-nums tracking-tight text-mb-accent sm:text-6xl">
            404
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold text-mb-text-on-dark sm:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-base leading-relaxed text-mb-text-muted">
            That link may be outdated, or the page may have moved. If you were
            looking for something specific, try home or contact us—we&apos;re
            glad to help.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/" className={pillPrimary}>
              Go to home
            </Link>
            <Link
              to="/contact-us"
              className={`${pillSecondary} border-white/25 bg-white/5 text-mb-text-on-dark hover:border-mb-accent/50 hover:bg-white/10`}
            >
              Contact us
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
