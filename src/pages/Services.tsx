import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FadeIn } from "../components/FadeIn";
import { PageHero } from "../components/PageHero";
import { pillPrimary, sectionLightGlow } from "../components/pageLayout";
import { useSiteMotion } from "../hooks/useSiteMotion";

// Silky easeOutExpo — feels very natural for entrance animations
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

type ServiceDetail = {
  num: string;
  title: string;
  summary: string;
  body: string;
  highlights: string[];
  icon: ReactNode;
};

function IconWorkshop() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3L4 7v5c0 5 3.5 9.5 8 10.5 4.5-1 8-5.5 8-10.5V7l-8-4z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconHousing() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}
function IconCaseManagement() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 6h13M8 12h13M8 18h13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="3" cy="6" r="1.25" fill="currentColor" />
      <circle cx="3" cy="12" r="1.25" fill="currentColor" />
      <circle cx="3" cy="18" r="1.25" fill="currentColor" />
    </svg>
  );
}
function IconJobs() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M4 9h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M12 13v3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

const services: ServiceDetail[] = [
  {
    num: "01",
    title: "Workshops to enrich individuals' lives",
    summary: "Skills, confidence, and community in a supportive setting.",
    body: "Our enrichment workshops create space to learn, reflect, and grow—with practical tools for daily life and room to build relationships with staff and peers. Sessions are designed to meet people where they are, with respect and encouragement at the center.",
    highlights: [
      "Life skills and personal development topics tailored to participants' needs",
      "Facilitated group settings that foster connection and peer support",
      "A stepping stone toward stability, employment, and long-term goals",
    ],
    icon: <IconWorkshop />,
  },
  {
    num: "02",
    title: "Emergency housing referral services",
    summary: "Help navigating options when shelter can't wait.",
    body: "Housing crises rarely fit business hours. We help people understand emergency shelter, warming programs, and transitional opportunities when they are available—and support with next steps so no one has to figure out the system alone.",
    highlights: [
      "Referrals aligned with current availability and eligibility in our network",
      "Guidance on intake processes, documentation, and what to expect",
      "Coordination with other services so housing plans connect to ongoing support",
    ],
    icon: <IconHousing />,
  },
  {
    num: "03",
    title: "Case management",
    summary: "Consistent support so progress sticks.",
    body: "Case management means having someone in your corner: setting goals together, removing barriers where we can, and checking in over time. We help prioritize needs, follow up on referrals, and celebrate wins—big and small.",
    highlights: [
      "Individualized plans based on your goals and circumstances",
      "Warm handoffs to partner agencies when specialized care is needed",
      "Ongoing follow-up to reduce gaps between appointments and crises",
    ],
    icon: <IconCaseManagement />,
  },
  {
    num: "04",
    title: "Job referrals",
    summary: "Connections toward employment and income.",
    body: "Stable work is often part of rebuilding independence. We connect participants with employer and training partners when possible, and help with the steps that make referrals meaningful—so opportunities match readiness and need.",
    highlights: [
      "Referrals to employers and programs that fit participants' skills and situation",
      "Support with applications, interviews, and workplace expectations where helpful",
      "Alignment with broader goals—housing, transportation, and case management",
    ],
    icon: <IconJobs />,
  },
];

// ── Per-element variant factories ────────────────────────────────────────────
function fromLeft(delay = 0) {
  return {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE_OUT_EXPO, delay } },
  };
}
function fromRight(delay = 0) {
  return {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE_OUT_EXPO, delay } },
  };
}
function fromBottom(delay = 0) {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO, delay } },
  };
}

// ── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: ServiceDetail; index: number }) {
  const m = useSiteMotion();

  // Stagger highlights entry
  const highlightList = {
    hidden: {},
    visible: { transition: { staggerChildren: m.isReduced ? 0 : 0.07, delayChildren: m.isReduced ? 0 : 0.35 } },
  };
  const highlightItem = {
    hidden: m.isReduced ? {} : { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
  };

  // Gold rule draw-in
  const ruleVariant = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.1 } },
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -48px 0px" }}
      className="group relative overflow-hidden rounded-2xl border border-mb-mist/60 bg-white shadow-mb-card transition-shadow duration-300 hover:shadow-mb-card-hover"
    >
      {/* Gold left border — draws down on scroll */}
      <motion.div
        className="absolute inset-y-0 left-0 w-[3px] origin-top bg-mb-accent"
        variants={{
          hidden: { scaleY: 0 },
          visible: { scaleY: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.05 } },
        }}
        aria-hidden
      />

      <div className="px-8 py-10 sm:px-10 sm:py-12 lg:px-12">

        {/* ── Header row: number (from left) ↔ icon (from right) ── */}
        <div className="flex items-start justify-between gap-6">
          <motion.div variants={m.isReduced ? {} : fromLeft(0)} className="flex items-center gap-4">
            {/* Big watermark number */}
            <span
              className="select-none font-display font-bold leading-none text-mb-mist/90 transition-colors duration-300 group-hover:text-mb-accent/20"
              style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
              aria-hidden
            >
              {service.num}
            </span>
            {/* Vertical divider */}
            <div className="hidden h-12 w-px bg-mb-mist sm:block" aria-hidden />
            {/* Eyebrow label */}
            <p className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-mb-accent-solid sm:block">
              Service
            </p>
          </motion.div>

          <motion.div
            variants={m.isReduced ? {} : fromRight(0)}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-mb-hope/10 text-mb-hope ring-1 ring-mb-hope/15 transition-colors duration-300 group-hover:bg-mb-hope/16"
          >
            {service.icon}
          </motion.div>
        </div>

        {/* ── Gold rule ── */}
        <motion.div
          variants={m.isReduced ? {} : ruleVariant}
          className="mt-6 h-px origin-left bg-gradient-to-r from-mb-accent to-mb-accent/10"
          aria-hidden
        />

        {/* ── Title + summary ── */}
        <motion.div variants={m.isReduced ? {} : fromBottom(0.1)} className="mt-6">
          <h3 className="font-display text-2xl font-bold leading-snug text-mb-ink sm:text-[1.65rem]">
            {service.title}
          </h3>
          <p className="mt-2 text-base font-semibold text-mb-hope">{service.summary}</p>
        </motion.div>

        {/* ── Body ── */}
        <motion.p
          variants={m.isReduced ? {} : fromBottom(0.18)}
          className="mt-5 text-base leading-relaxed text-mb-ink/75 sm:text-[1.0625rem]"
        >
          {service.body}
        </motion.p>

        {/* ── Highlights ── */}
        <motion.ul
          variants={highlightList}
          className="mt-8 grid gap-3 border-t border-mb-mist/70 pt-8 sm:grid-cols-3"
        >
          {service.highlights.map((line) => (
            <motion.li
              key={line}
              variants={highlightItem}
              className="flex gap-2.5 text-sm leading-relaxed text-mb-ink/80"
            >
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-mb-hope"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>{line}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* ── Subtle index counter (bottom right) ── */}
        <motion.p
          variants={m.isReduced ? {} : fromRight(0.4)}
          className="mt-8 text-right font-display text-xs font-semibold uppercase tracking-widest text-mb-mist/60"
          aria-hidden
        >
          {index + 1} of {services.length}
        </motion.p>
      </div>
    </motion.article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export function Services() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Maslow's Bridge Provides"
        subtitle="Essential resources for everyday living needs."
        variant="atmosphere"
      />

      {/* ── Services list ── */}
      <section className={sectionLightGlow} aria-labelledby="services-detail-heading">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mb-accent-solid">
                  Four pillars
                </p>
                <h2
                  id="services-detail-heading"
                  className="mt-2 font-display text-2xl font-bold text-mb-ink sm:text-3xl"
                >
                  What we offer
                </h2>
              </div>
              <Link
                to="/contact-us"
                className="focus-ring flex cursor-pointer items-center gap-1.5 rounded-md text-sm font-semibold text-mb-accent-solid transition-colors duration-200 hover:text-mb-ink"
              >
                Get in touch
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            <div className="mt-6 h-px bg-mb-mist" aria-hidden />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mb-ink/80 sm:text-lg">
              Whether you need a safe place to stay tonight, someone to help you plan ahead, or a path
              toward work, Maslow&apos;s Bridge Indy is here to listen, refer, and walk with you.
            </p>
          </FadeIn>

          <div className="mt-12 flex flex-col gap-5">
            {services.map((service, index) => (
              <ServiceCard key={service.num} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="relative overflow-hidden border-t border-white/10 bg-mb-surface px-4 py-20 sm:py-28">
        <div className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-mb-accent/8 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mb-accent/40 to-transparent" aria-hidden />
        <FadeIn>
          <div className="relative mx-auto flex max-w-4xl flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-5 h-0.5 w-12 bg-mb-accent" aria-hidden />
              <h2 className="font-display text-3xl font-bold tracking-tight text-mb-text-on-dark sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-mb-text-on-dark/75">
                Tell us a little about your situation—we&apos;ll respond with next steps and the right referrals for you.
              </p>
            </div>
            <Link to="/contact-us" className={`${pillPrimary} shrink-0 py-4 text-base`}>
              Contact us <span aria-hidden className="ml-1">→</span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
