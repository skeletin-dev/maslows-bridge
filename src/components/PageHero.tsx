import { motion } from "motion/react";
import { useSiteMotion } from "../hooks/useSiteMotion";
import { SITE } from "../site";

export type PageHeroProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  /** solid: flat · gradient: wash only · atmosphere: shared hero photo + Home-like gradients · image: custom URL */
  variant?: "solid" | "gradient" | "image" | "atmosphere";
  imageUrl?: string;
  /** default: prose column · large: wider title column (e.g. Contact) */
  size?: "default" | "large";
  className?: string;
};

export function PageHero({
  title,
  subtitle,
  eyebrow,
  variant = "solid",
  imageUrl,
  size = "default",
  className = "",
}: PageHeroProps) {
  const m = useSiteMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: m.isReduced ? 0 : m.staggerHeading,
        delayChildren: m.isReduced ? 0 : m.delayHeading,
      },
    },
  };

  const item = {
    hidden: m.isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: m.yHeading },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: m.section * 0.85, ease: m.ease },
    },
  };

  const maxW = size === "large" ? "max-w-6xl" : "max-w-3xl";
  const titleClass =
    size === "large"
      ? "font-display text-4xl font-bold tracking-[-0.025em] text-mb-text-on-dark sm:text-5xl lg:text-6xl"
      : "font-display text-3xl font-bold tracking-[-0.025em] text-mb-text-on-dark sm:text-4xl lg:text-5xl";

  const isImage = variant === "image" && imageUrl;
  const isAtmosphere = variant === "atmosphere";

  const shellClass = [
    "relative overflow-hidden border-b border-white/10 px-4 sm:px-6",
    isAtmosphere
      ? "flex min-h-[min(44dvh,32rem)] flex-col justify-center py-16 sm:min-h-[min(50dvh,38rem)] sm:py-20"
      : "py-14 sm:py-20",
    !isImage && !isAtmosphere && variant === "gradient"
      ? "bg-mb-surface"
      : !isImage && !isAtmosphere
        ? "bg-mb-surface"
        : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={shellClass}>
      {isImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-mb-surface/88 via-mb-surface/72 to-mb-surface/95"
            aria-hidden
          />
        </>
      ) : isAtmosphere ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${SITE.heroBackgroundSrc})` }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-mb-surface/82 via-mb-surface-elevated/38 to-mb-surface/[0.96]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mb-surface via-mb-surface/50 to-mb-surface/35"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_85%_15%,rgba(199,158,71,0.09),transparent)]"
            aria-hidden
          />
          {/* Breathing orbs — layered gold + teal glows */}
          <motion.div
            className="pointer-events-none absolute right-[14%] top-[18%] h-44 w-44 rounded-full bg-mb-accent/12 blur-3xl"
            animate={{ y: [0, -18, 0], opacity: [0.45, 0.85, 0.45], scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute bottom-[12%] left-[8%] h-32 w-32 rounded-full bg-mb-hope/20 blur-2xl"
            animate={{ y: [0, 14, 0], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute bottom-[30%] right-[4%] h-20 w-20 rounded-full bg-mb-accent/10 blur-xl"
            animate={{ y: [0, -10, 0], x: [0, 6, 0], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            aria-hidden
          />
        </>
      ) : variant === "gradient" ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-mb-surface-elevated/45 via-transparent to-mb-surface"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,rgba(199,158,71,0.14),transparent)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_30%,rgba(91,138,120,0.09),transparent)]"
            aria-hidden
          />
        </>
      ) : null}

      <div className={`relative z-[1] mx-auto w-full ${maxW}`}>
        <motion.div initial="hidden" animate="visible" variants={container}>
          {eyebrow ? (
            <motion.p
              variants={item}
              className="inline-flex items-center gap-2 rounded-md border border-mb-accent/30 bg-mb-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-mb-accent"
            >
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.h1
            variants={item}
            className={`${titleClass} ${eyebrow ? "mt-5" : ""}`}
          >
            {title}
          </motion.h1>
          {subtitle ? (
            <motion.p
              variants={item}
              className={`mt-4 font-sans leading-relaxed text-mb-text-on-dark/80 ${size === "large" ? "max-w-2xl text-lg sm:text-xl" : "max-w-xl text-base sm:text-lg"}`}
            >
              {subtitle}
            </motion.p>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}
