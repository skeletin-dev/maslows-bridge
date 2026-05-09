import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "motion/react";
import { Link } from "react-router-dom";
import { FadeIn, StaggerItem, StaggerList } from "../components/FadeIn";
import { pillPrimary, pillSecondary } from "../components/pageLayout";
import { useSiteMotion } from "../hooks/useSiteMotion";
import { SITE } from "../site";

// ── Data ─────────────────────────────────────────────────────────────────────

const pillars = [
  {
    num: "01",
    title: "Job training",
    body: "Practical skills and support that open doors to employment and self-sufficiency.",
    to: "/services",
  },
  {
    num: "02",
    title: "Everyday resources",
    body: "Food, clothing, hygiene, and essentials that meet people where they are.",
    to: "/services",
  },
  {
    num: "03",
    title: "Community",
    body: "Relationships and advocacy that remind every neighbor they belong.",
    to: "/about",
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Neighbors served" },
  { value: 4, suffix: "", label: "Core programs" },
  { value: 10, suffix: "+", label: "Partner organizations" },
  { value: 100, suffix: "%", label: "Free to all" },
];

const steps = [
  {
    num: "01",
    title: "Reach out",
    body: "Walk in, call, or email—no referral required. We meet every neighbor exactly where they are, without judgment.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Get connected",
    body: "We listen, assess your situation, and match you to the services and referrals that fit your needs right now.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Build stability",
    body: "Through case management, workshops, emergency housing referrals, and job connections, we work toward lasting progress—together.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
        />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Move forward",
    body: "Goals take time. We stay in your story after the crisis moment—following up, celebrating wins, and adjusting the plan.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
        />
      </svg>
    ),
  },
];

const involvement = [
  {
    title: "Volunteer",
    body: "Bring your time, skills, or voice. Help facilitate workshops, support outreach events, or assist with day-to-day operations.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
        />
      </svg>
    ),
    cta: "Volunteer with us",
    to: "/contact-us",
    color: "bg-mb-hope/12 text-mb-hope",
  },
  {
    title: "Donate",
    body: "Every dollar goes directly to keeping our services free. Support emergency supplies, workshop materials, and case management staff.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
    cta: "Make a donation",
    to: "/contact-us",
    color: "bg-mb-accent/12 text-mb-accent",
  },
  {
    title: "Partner",
    body: "Employers, nonprofits, and faith communities—connect your resources to our network. Together we close more gaps.",
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
        />
      </svg>
    ),
    cta: "Become a partner",
    to: "/contact-us",
    color: "bg-mb-surface-elevated/60 text-mb-text-muted",
  },
];

// ── CountUp ───────────────────────────────────────────────────────────────────
function CountUp({ target, suffix = "" }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, { duration: 1.8, ease: "easeOut" });
    return controls.stop;
  }, [isInView, count, target]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export function Home() {
  const m = useSiteMotion();

  const heroContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: m.isReduced ? 0 : m.staggerHero,
        delayChildren: m.isReduced ? 0 : m.delayHero,
      },
    },
  };

  const heroItem = {
    hidden: m.isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: m.yHero },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: m.section, ease: m.ease },
    },
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-dvh" aria-label="Hero">
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <img
            src={SITE.heroBackgroundSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-mb-surface/88 lg:hidden" />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, #141d2e 0%, #141d2e 46%, rgba(20,29,46,0.72) 62%, rgba(20,29,46,0.10) 80%, transparent 100%)",
            }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 -translate-x-1/4 translate-y-1/4 rounded-full bg-mb-accent/8 blur-3xl"
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          {[
            {
              w: 3,
              top: "22%",
              left: "7%",
              color: "bg-mb-accent/50",
              dur: 4.5,
              delay: 0,
            },
            {
              w: 2,
              top: "48%",
              left: "4%",
              color: "bg-mb-hope/60",
              dur: 5.5,
              delay: 1,
            },
            {
              w: 4,
              top: "72%",
              left: "14%",
              color: "bg-mb-accent/35",
              dur: 6,
              delay: 2,
            },
            {
              w: 2,
              top: "16%",
              left: "44%",
              color: "bg-mb-hope/45",
              dur: 4,
              delay: 0.5,
            },
            {
              w: 3,
              top: "58%",
              left: "38%",
              color: "bg-mb-accent/28",
              dur: 5,
              delay: 1.5,
            },
            {
              w: 2,
              top: "35%",
              left: "50%",
              color: "bg-mb-hope/35",
              dur: 6.5,
              delay: 3,
            },
          ].map((p, i) => (
            <motion.span
              key={i}
              className={`pointer-events-none absolute rounded-full ${p.color}`}
              style={{
                width: p.w * 4,
                height: p.w * 4,
                top: p.top,
                left: p.left,
              }}
              animate={{ y: [0, -10, 0], opacity: [0.35, 0.9, 0.35] }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
              aria-hidden
            />
          ))}
        </div>

        <motion.div
          className="pointer-events-none absolute bottom-16 left-[54%] top-24 z-20 hidden w-px bg-gradient-to-b from-transparent via-mb-accent/60 to-transparent lg:block"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />

        <div className="relative z-10 flex min-h-dvh flex-col justify-center px-6 pb-20 pt-32 sm:px-10 lg:w-[52%] lg:px-16 lg:pb-28 lg:pt-28">
          <motion.div
            className="max-w-lg"
            initial="hidden"
            animate="visible"
            variants={heroContainer}
          >
            <motion.p
              variants={heroItem}
              className="inline-flex items-center gap-2 rounded-md border border-mb-accent/30 bg-mb-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-mb-accent"
            >
              Indianapolis · Nonprofit
            </motion.p>
            <motion.h1
              variants={heroItem}
              className="mt-6 font-display font-bold leading-[0.9] tracking-[-0.025em] text-mb-text-on-dark"
              style={{ fontSize: "clamp(2.75rem, 9vw, 5.75rem)" }}
            >
              {SITE.name.replace("'", "\u2019")}
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="mt-5 max-w-sm text-base font-medium leading-relaxed text-mb-text-on-dark/80 sm:text-lg"
            >
              {SITE.tagline}
            </motion.p>
            <motion.div
              variants={heroItem}
              className="mt-10 flex flex-wrap gap-3 sm:gap-4"
            >
              <Link to="/contact-us" className={`${pillPrimary} px-7 py-3.5`}>
                Get involved
                <span aria-hidden className="ml-1 text-lg leading-none">
                  →
                </span>
              </Link>
              <Link
                to="/services"
                className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/8 px-7 py-3.5 text-sm font-semibold text-mb-text-on-dark transition-[border-color,background-color] duration-200 hover:border-mb-accent/45 hover:bg-white/12 sm:text-base"
              >
                Our services
              </Link>
            </motion.div>
          </motion.div>

          <FadeIn
            className="mt-16 grid gap-8 border-t border-white/12 pt-10 sm:grid-cols-2"
            delay={0.3}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mb-hope">
                Mission
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mb-text-on-dark/78 sm:text-base">
                Maslow&apos;s Bridge meets urgent needs first—then helps
                neighbors rebuild employment, stability, and community ties
                without losing sight of dignity.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mb-hope">
                Approach
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mb-text-on-dark/78 sm:text-base">
                Practical training, everyday resources, and people who stay in
                the story after the crisis moment—so progress lasts.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── IMPACT STATS ─────────────────────────────────────── */}
      {false && (
        <section
          className="relative overflow-hidden border-t border-white/10 bg-mb-surface px-4 py-16 sm:py-20"
          aria-label="Impact statistics"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(199,158,71,0.08),transparent_60%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-mb-accent/35 to-transparent"
            aria-hidden
          />
          <div className="mx-auto max-w-6xl">
            <StaggerList className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="text-center">
                    <p
                      className="font-display font-bold leading-none text-mb-text-on-dark"
                      style={{ fontSize: "clamp(2.4rem, 7vw, 3.75rem)" }}
                    >
                      {stat.value === 100 ? (
                        <CountUp target={stat.value} suffix={stat.suffix} />
                      ) : (
                        <CountUp target={stat.value} suffix={stat.suffix} />
                      )}
                    </p>
                    <p className="mt-3 text-sm font-medium uppercase tracking-wider text-mb-text-on-dark/55">
                      {stat.label}
                    </p>
                    <div
                      className="mx-auto mt-3 h-0.5 w-8 rounded-full bg-mb-accent/50"
                      aria-hidden
                    />
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>
        </section>
      )}

      {/* ── PILLARS ───────────────────────────────────────────── */}
      <section
        className="relative border-t border-mb-mist bg-mb-cream px-4 py-20 sm:py-28"
        aria-labelledby="pillars-heading"
      >
        <div className="mx-auto max-w-6xl">
          <FadeIn className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-mb-accent-solid">
                What we offer
              </p>
              <h2
                id="pillars-heading"
                className="mt-2 font-display text-2xl font-bold text-mb-ink sm:text-3xl"
              >
                Three pillars of support
              </h2>
            </div>
            <Link
              to="/services"
              className="focus-ring flex cursor-pointer items-center gap-1.5 rounded-md text-sm font-semibold text-mb-accent-solid transition-colors duration-200 hover:text-mb-ink"
            >
              All services
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </FadeIn>
          <div className="mt-8 h-px bg-mb-mist" aria-hidden />
          <StaggerList className="mt-10 grid gap-6 sm:gap-8 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.num}>
                <article className="group relative h-full overflow-hidden rounded-xl border border-mb-mist/70 bg-white shadow-mb-card motion-safe:transition-[transform,box-shadow] motion-safe:duration-[250ms] motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-mb-card-hover">
                  <div
                    className="absolute inset-x-0 top-0 h-0.5 bg-mb-accent"
                    aria-hidden
                  />
                  <div className="flex h-full flex-col p-7 pt-8 sm:p-8 sm:pt-9">
                    <p
                      className="font-display font-bold leading-none text-mb-mist"
                      style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
                      aria-hidden
                    >
                      {pillar.num}
                    </p>
                    <h3 className="mt-4 font-sans text-xl font-semibold tracking-tight text-mb-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 flex-1 text-base leading-relaxed text-mb-ink/78">
                      {pillar.body}
                    </p>
                    <Link
                      to={pillar.to}
                      className="focus-ring mt-6 inline-flex cursor-pointer items-center gap-1.5 rounded-md text-sm font-semibold text-mb-accent-solid transition-colors duration-200 hover:text-mb-ink"
                    >
                      Learn more
                      <svg
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── HOW WE HELP ──────────────────────────────────────── */}
      <section
        className="relative border-t border-mb-mist/60 bg-white px-4 py-20 sm:py-28"
        aria-labelledby="how-heading"
      >
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mb-accent-solid">
              Our process
            </p>
            <h2
              id="how-heading"
              className="mt-2 font-display text-2xl font-bold text-mb-ink sm:text-3xl"
            >
              How we help
            </h2>
            <div className="mt-6 h-px bg-mb-mist" aria-hidden />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mb-ink/75 sm:text-lg">
              From the first conversation to long-term follow-up, we walk with
              every neighbor through the steps that lead to stability—at their
              pace, on their terms.
            </p>
          </FadeIn>

          <StaggerList className="mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <StaggerItem key={step.num}>
                <div className="group relative flex flex-col gap-5 rounded-2xl border border-mb-mist/70 bg-mb-cream/50 p-7 transition-[border-color,background-color] duration-200 hover:border-mb-accent/30 hover:bg-white sm:p-8">
                  {/* Step connector line — desktop only */}
                  {i < steps.length - 1 && (
                    <div
                      className="pointer-events-none absolute left-full top-10 z-10 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-mb-accent/30 to-transparent lg:block"
                      aria-hidden
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mb-hope/12 text-mb-hope transition-colors duration-200 group-hover:bg-mb-hope/18">
                      {step.icon}
                    </span>
                    <span className="font-display text-3xl font-bold leading-none text-mb-mist transition-colors duration-200 group-hover:text-mb-accent/20">
                      {step.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-semibold text-mb-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mb-ink/72">
                      {step.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── COMMUNITY QUOTE ──────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-t border-white/10 bg-mb-surface px-4 py-20 sm:py-28"
        aria-label="Community voice"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(91,138,120,0.08),transparent_60%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_20%,rgba(199,158,71,0.07),transparent_55%)]"
          aria-hidden
        />
        <FadeIn>
          <div className="relative mx-auto max-w-4xl text-center">
            {/* Large decorative quote mark */}
            <div
              className="pointer-events-none mx-auto mb-6 select-none font-display font-bold leading-none text-mb-accent/15"
              style={{ fontSize: "clamp(6rem, 16vw, 10rem)" }}
              aria-hidden
            >
              &ldquo;
            </div>
            <blockquote className="relative -mt-10">
              <p className="font-display text-xl font-semibold leading-relaxed text-mb-text-on-dark sm:text-2xl lg:text-3xl">
                Maslow&rsquo;s Bridge didn&rsquo;t just hand me a list of phone
                numbers. They sat with me, made calls with me, and checked in
                weeks later. That kind of support{" "}
                <em className="not-italic text-gradient-gold">
                  changes everything.
                </em>
              </p>
              <footer className="mt-8 flex flex-col items-center gap-1">
                <div className="h-px w-10 bg-mb-accent/50" aria-hidden />
                <cite className="mt-3 block text-sm font-semibold not-italic uppercase tracking-[0.18em] text-mb-text-on-dark/55">
                  Indianapolis neighbor
                </cite>
              </footer>
            </blockquote>
          </div>
        </FadeIn>
      </section>

      {/* ── GET INVOLVED ─────────────────────────────────────── */}
      <section
        className="relative border-t border-mb-mist bg-mb-cream px-4 py-20 sm:py-28"
        aria-labelledby="involved-heading"
      >
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mb-accent-solid">
              Take action
            </p>
            <h2
              id="involved-heading"
              className="mt-2 font-display text-2xl font-bold text-mb-ink sm:text-3xl"
            >
              Three ways to get involved
            </h2>
            <div className="mt-6 h-px bg-mb-mist" aria-hidden />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mb-ink/75 sm:text-lg">
              Whether you give time, money, or connections—every act of support
              widens the bridge for someone who needs it.
            </p>
          </FadeIn>

          <StaggerList className="mt-12 grid gap-6 sm:gap-8 lg:grid-cols-3">
            {involvement.map((item) => (
              <StaggerItem key={item.title}>
                <article className="group flex h-full flex-col rounded-2xl border border-mb-mist/70 bg-white p-8 shadow-mb-card transition-[transform,box-shadow,border-color] duration-[250ms] ease-out hover:border-mb-accent/25 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-mb-card-hover sm:p-9">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.color} transition-colors duration-200`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-mb-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-mb-ink/72">
                    {item.body}
                  </p>
                  <Link
                    to={item.to}
                    className="focus-ring mt-6 inline-flex cursor-pointer items-center gap-1.5 rounded-md text-sm font-semibold text-mb-accent-solid transition-colors duration-200 hover:text-mb-ink"
                  >
                    {item.cta}
                    <svg
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── PROJECTS TEASER ──────────────────────────────────── */}
      <section className="relative border-t border-mb-mist/60 bg-white px-4 py-16 sm:py-20">
        <FadeIn className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 rounded-xl border border-mb-mist/70 bg-mb-cream/60 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-mb-hope/12 text-mb-hope">
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-mb-accent-solid">
                  On the ground
                </p>
                <h2 className="mt-1 font-sans text-xl font-semibold tracking-tight text-mb-ink sm:text-2xl">
                  Current housing &amp; community projects
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-mb-ink/72 sm:text-base">
                  Explore initiatives we run with partners across Indianapolis.
                </p>
              </div>
            </div>
            <Link
              to="/projects"
              className="focus-ring shrink-0 cursor-pointer rounded-lg border border-mb-accent/40 bg-white px-6 py-3 text-sm font-semibold text-mb-accent-solid transition-[border-color,background-color] duration-200 hover:border-mb-accent hover:bg-mb-cream"
            >
              View projects
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── JOIN THE WORK: CTA band ───────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/10 bg-mb-surface px-4 py-20 sm:py-28">
        <motion.div
          className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-mb-accent/8 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mb-accent/40 to-transparent"
          aria-hidden
        />
        <FadeIn>
          <div className="relative mx-auto flex max-w-4xl flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-5 h-0.5 w-12 bg-mb-accent" aria-hidden />
              <h2 className="font-display text-3xl font-bold tracking-tight text-mb-text-on-dark sm:text-4xl">
                Join the work
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-mb-text-on-dark/75 sm:text-lg">
                Volunteer, partner, or reach out—together we can widen the
                bridge home.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <Link
                to="/contact-us"
                className={`${pillPrimary} shrink-0 py-4 text-base`}
              >
                Contact us{" "}
                <span aria-hidden className="ml-1">
                  →
                </span>
              </Link>
              <Link
                to="/services"
                className={`${pillSecondary} shrink-0 py-3 text-sm`}
              >
                See our services
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
