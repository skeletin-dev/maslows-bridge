import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FadeIn, StaggerItem, StaggerList } from "../components/FadeIn";
import { useSiteMotion } from "../hooks/useSiteMotion";
import { SITE } from "../site";

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
      <section className="bg-mb-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 sm:flex-row sm:items-center sm:gap-12 sm:pb-20 sm:pt-14 lg:gap-16">
          <motion.div
            className="flex-1 space-y-6"
            initial="hidden"
            animate="visible"
            variants={heroContainer}
          >
            <motion.p variants={heroItem} className="text-sm font-semibold uppercase tracking-widest text-mb-accent">
              Indianapolis · Nonprofit
            </motion.p>
            <motion.h1
              variants={heroItem}
              className="font-display text-3xl font-bold leading-tight text-mb-text-on-dark sm:text-4xl lg:text-5xl"
            >
              {SITE.tagline}
            </motion.h1>
            <motion.p variants={heroItem} className="max-w-xl text-base leading-relaxed text-mb-text-muted sm:text-lg">
              Maslow&apos;s Bridge is dedicated to supporting neighbors
              experiencing homelessness with job training, everyday resources,
              and community care—helping people move toward stability and
              reintegration with dignity.
            </motion.p>
            <motion.div variants={heroItem} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center rounded-[28px] bg-mb-accent-solid px-8 py-3.5 text-center font-semibold text-mb-surface transition-colors hover:bg-mb-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mb-accent"
              >
                Get involved
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-[28px] border border-mb-accent/50 px-8 py-3.5 text-center font-semibold text-mb-accent transition-colors hover:border-mb-accent hover:bg-mb-accent/10"
              >
                Our services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-mb-mist bg-mb-cream px-4 py-14 sm:py-20">
        <StaggerList className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3 lg:gap-8">
          <StaggerItem>
          <article className="rounded-2xl border border-mb-mist bg-mb-mist/25 p-6 shadow-sm h-full">
            <div className="mb-4 h-1 w-12 rounded-full bg-mb-hope" />
            <h2 className="font-display text-xl font-bold text-mb-ink">
              Job training
            </h2>
            <p className="mt-2 text-mb-ink/85">
              Practical skills and support that open doors to employment and
              self-sufficiency.
            </p>
          </article>
          </StaggerItem>
          <StaggerItem>
          <article className="rounded-2xl border border-mb-mist bg-mb-mist/25 p-6 shadow-sm h-full">
            <div className="mb-4 h-1 w-12 rounded-full bg-mb-hope" />
            <h2 className="font-display text-xl font-bold text-mb-ink">
              Everyday resources
            </h2>
            <p className="mt-2 text-mb-ink/85">
              Essentials that meet people where they are—food, clothing,
              hygiene, and more.
            </p>
          </article>
          </StaggerItem>
          <StaggerItem>
          <article className="rounded-2xl border border-mb-mist bg-mb-mist/25 p-6 shadow-sm h-full">
            <div className="mb-4 h-1 w-12 rounded-full bg-mb-hope" />
            <h2 className="font-display text-xl font-bold text-mb-ink">
              Community
            </h2>
            <p className="mt-2 text-mb-ink/85">
              Relationships and advocacy that remind every neighbor they belong.
            </p>
          </article>
          </StaggerItem>
        </StaggerList>
      </section>

      <section className="bg-mb-surface-elevated px-4 py-14 text-mb-text-on-dark sm:py-16">
        <FadeIn>
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Join the work
              </h2>
              <p className="mt-2 max-w-xl text-mb-text-muted">
                Volunteer, partner, or reach out—together we can widen the bridge
                home.
              </p>
            </div>
            <Link
              to="/contact-us"
              className="inline-flex shrink-0 items-center justify-center rounded-[28px] bg-mb-accent px-8 py-3.5 font-semibold text-mb-surface hover:bg-mb-accent-hover"
            >
              Contact us
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
