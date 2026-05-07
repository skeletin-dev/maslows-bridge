/**
 * Public page section + card patterns — Civic Editorial redesign.
 * Smaller radii, ruled accents, editorial left-border cards, clean section bands.
 * Motion: translate-y lift only (no scale) for stability (ui-ux-pro-max: 200–250ms).
 */
const motionLift =
  "motion-safe:transition-[transform,box-shadow] motion-safe:duration-[250ms] motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-mb-card-hover";

export const sectionLight =
  "relative border-b border-mb-mist bg-mb-cream px-4 py-16 sm:py-24";

/** Cream band — clean, editorial. */
export const sectionLightGlow =
  "relative border-b border-mb-mist bg-mb-cream px-4 py-16 sm:py-24";

export const sectionDark =
  "relative border-t border-white/10 bg-mb-surface px-4 py-16 sm:py-24";

/** Dark navy band with a subtle gold bloom at top (pairs with PageHero atmosphere). */
export const sectionDarkGlow =
  "relative border-t border-white/10 bg-mb-surface bg-[radial-gradient(ellipse_80%_45%_at_50%_-20%,rgba(199,158,71,0.09),transparent_55%)] px-4 py-16 sm:py-24";

/** Dark section panel — editorial border, no blur on light bg. */
export const editorialPanel =
  "rounded-xl border border-white/12 bg-mb-surface-elevated/55 p-8 shadow-mb-glass backdrop-blur-sm transition-[border-color,box-shadow] duration-[250ms] ease-out hover:border-white/20 hover:shadow-mb-card sm:p-10";

/** Light section card — white, gold top rule, editorial. */
export const contentCard = [
  "relative overflow-hidden rounded-xl border border-mb-mist/60 bg-white shadow-mb-card ring-1 ring-black/[0.03]",
  "before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-mb-hope",
  motionLift,
].join(" ");

/** Dark section glass card — keep backdrop blur for dark contexts. */
export const glassCard = [
  "rounded-xl border border-white/18 bg-mb-surface/50 shadow-mb-glass backdrop-blur-2xl",
  motionLift,
].join(" ");

/** Light section pillar card — left gold border accent, editorial. */
export const pillarCard = [
  "h-full rounded-xl border border-mb-mist/60 border-l-2 border-l-mb-accent bg-white p-8 shadow-mb-card",
  motionLift,
].join(" ");

export const pillPrimary =
  "btn-shimmer focus-ring inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-mb-accent px-8 py-3.5 text-sm font-semibold text-mb-surface shadow-[0_12px_36px_-12px_rgba(199,158,71,0.55)] transition-[background-color,box-shadow,transform] duration-[250ms] ease-out hover:bg-mb-accent-hover motion-safe:hover:scale-[1.02] sm:text-base";

export const pillSecondary =
  "btn-shimmer focus-ring inline-flex cursor-pointer items-center justify-center rounded-lg border border-mb-accent/40 bg-white px-8 py-3.5 text-sm font-semibold text-mb-accent-solid shadow-sm transition-[border-color,background-color,transform] duration-[250ms] ease-out hover:border-mb-accent hover:bg-mb-cream sm:text-base motion-safe:hover:scale-[1.01]";
