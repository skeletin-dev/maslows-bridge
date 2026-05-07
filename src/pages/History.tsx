import { Link } from "react-router-dom";
import { FadeIn } from "../components/FadeIn";
import { PageHero } from "../components/PageHero";
import { pillPrimary, sectionDarkGlow, sectionLightGlow } from "../components/pageLayout";

const milestones = [
  {
    era: "The Beginning",
    label: "Grassroots outreach",
    body: "Maslow's Bridge began as The Maslow Project, a grassroots outreach effort rooted in compassion and faith. What started as a simple vision to restore hope and dignity to those experiencing homelessness soon grew into a broader mission to empower transformation and strengthen entire communities.",
  },
  {
    era: "A Mission Takes Shape",
    label: "Faith meets service",
    body: "The Founder—a compassionate community advocate—drew upon his background in theology and human services to turn the Maslow Project into a living mission. His early work focused on providing both practical support and spiritual encouragement, helping individuals navigate the challenges of homelessness and life transitions.",
  },
  {
    era: "Maslow's Bridge",
    label: "Compassion + empowerment",
    body: "As the movement expanded, so did its vision. The Maslow Project evolved into Maslow's Bridge—symbolizing the connection between compassion and empowerment, faith and action, hope and renewal. Together, with unwavering dedication, the team continues to strengthen families, uplift underserved communities, and connect individuals to vital resources so that every person feels seen, valued, and supported.",
  },
];

export function History() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="History"
        subtitle="From The Maslow Project to Maslow's Bridge—a story of compassion, faith, and community."
        variant="atmosphere"
      />

      {/* ── INTRO ── */}
      <section className={sectionLightGlow} aria-labelledby="history-intro-heading">
        <FadeIn className="mx-auto max-w-3xl">
          <div className="mb-6 h-0.5 w-12 bg-mb-accent" aria-hidden />
          <h2
            id="history-intro-heading"
            className="font-display text-2xl font-bold text-mb-ink sm:text-3xl"
          >
            A bridge built from conviction
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mb-ink/80 sm:text-lg">
            What began as a single act of compassion grew into an organization that walks alongside
            individuals through their most difficult chapters. This is the story of how faith,
            community, and purpose converged to create Maslow&apos;s Bridge.
          </p>
        </FadeIn>
      </section>

      {/* ── TIMELINE ── */}
      <section className={sectionDarkGlow} aria-labelledby="timeline-heading">
        <div className="mx-auto max-w-4xl">
          <FadeIn className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mb-accent">
              Our journey
            </p>
            <h2
              id="timeline-heading"
              className="mt-2 font-display text-2xl font-bold text-mb-text-on-dark sm:text-3xl"
            >
              How we got here
            </h2>
            <div className="mt-4 h-px max-w-xs bg-white/10" aria-hidden />
          </FadeIn>

          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="pointer-events-none absolute bottom-0 left-[1.375rem] top-0 hidden w-px bg-gradient-to-b from-mb-accent/40 via-mb-accent/20 to-transparent sm:block"
              aria-hidden
            />

            <ol className="space-y-10" aria-label="Organization timeline">
              {milestones.map((m, i) => (
                <li key={m.era}>
                <FadeIn delay={i * 0.08}>
                  <div className="flex gap-6 sm:gap-8">
                    {/* Step indicator */}
                    <div className="relative flex shrink-0 flex-col items-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-mb-accent/35 bg-mb-surface-elevated/70 text-sm font-bold tabular-nums text-mb-accent shadow-mb-glass ring-1 ring-white/5 backdrop-blur-sm">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Content */}
                    <article className="flex-1 overflow-hidden rounded-xl border border-white/12 bg-mb-surface-elevated/55 p-7 shadow-mb-glass backdrop-blur-sm transition-[border-color] duration-[250ms] hover:border-white/20 sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-wider text-mb-accent">
                        {m.label}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-bold text-mb-text-on-dark sm:text-2xl">
                        {m.era}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-mb-text-on-dark/82 sm:text-[1.0625rem]">
                        {m.body}
                      </p>
                    </article>
                  </div>
                </FadeIn>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section
        className="relative border-b border-mb-mist bg-mb-cream px-4 py-16 sm:py-24"
        aria-labelledby="quote-heading"
      >
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 id="quote-heading" className="sr-only">
            Core belief
          </h2>
          <div
            className="mx-auto mb-6 h-0.5 w-12 bg-mb-accent"
            aria-hidden
          />
          <blockquote>
            <p className="font-display text-2xl font-bold italic leading-snug text-mb-ink sm:text-3xl">
              &ldquo;Compassion still changes everything.&rdquo;
            </p>
            <footer className="mt-5 text-sm font-semibold uppercase tracking-wider text-mb-accent-solid">
              — Maslow&apos;s Bridge
            </footer>
          </blockquote>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-mb-ink/78 sm:text-lg">
            Together, shared faith and unwavering dedication transformed what was once The Maslow
            Project into Maslow&apos;s Bridge—a growing, faith-driven organization committed to
            restoring lives and rebuilding communities.
          </p>
        </FadeIn>
      </section>

      {/* ── CTA BAND ── */}
      <section className="relative overflow-hidden border-t border-white/10 bg-mb-surface px-4 py-20 sm:py-28">
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-mb-accent/8 blur-3xl"
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
                Be part of the story
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-mb-text-on-dark/75">
                Learn more about our work, explore services, or reach out to connect with our team.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link to="/contact-us" className={`${pillPrimary} py-4 text-base`}>
                Contact us
                <span aria-hidden className="ml-1">→</span>
              </Link>
              <Link
                to="/about"
                className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/8 px-7 py-4 text-sm font-semibold text-mb-text-on-dark transition-[border-color,background-color] duration-200 hover:border-mb-accent/45 hover:bg-white/12 sm:text-base"
              >
                About us
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
