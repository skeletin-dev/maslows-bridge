import { Link } from "react-router-dom"
import { FadeIn } from "../components/FadeIn"
import { PageHeading } from "../components/PageHeading"

export function About() {
  return (
    <>
      <PageHeading
        title="About Us"
        subtitle="Empowering the disenfranchised to rebuild their lives."
      />

      <section className="border-b border-mb-mist bg-mb-cream" aria-labelledby="vision-mission-heading">
        <FadeIn className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <h2 id="vision-mission-heading" className="sr-only">
            Vision and mission
          </h2>

          <p className="text-lg font-medium leading-relaxed text-mb-ink sm:text-xl">
            Our vision is a world where no one faces crisis alone. Maslow&apos;s Bridge stands as a constant source of
            care and empowerment, helping individuals move from struggle to stability.
          </p>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-mb-ink/88 sm:text-lg">
            <p>
              Crisis rarely arrives with a roadmap. For many neighbors, instability compounds—housing, health,
              income, and relationships can unravel at once. We believe people deserve more than a cold referral
              or a single meal: they deserve steady presence, honest information, and advocates who remember their
              name.
            </p>
            <p>
              That is why Maslow&apos;s Bridge shows up as a partner for the long arc—not only in the urgent moment,
              but in the slow, courageous work of rebuilding. We walk alongside individuals with respect for their
              story, their agency, and their right to define what stability means for them.
            </p>
          </div>

          <article className="relative mt-12 overflow-hidden rounded-2xl border border-mb-mist/70 bg-mb-mist/25 shadow-sm ring-1 ring-black/3">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-mb-accent-solid" aria-hidden />

            <div className="px-8 pb-10 pt-9 sm:px-10 sm:pb-12 sm:pt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-mb-accent-solid">Vision</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-mb-ink">A community where crisis is shared</h3>
              <p className="mt-4 text-base leading-relaxed text-mb-ink/88 sm:text-[1.0625rem]">
                We imagine neighborhoods—and a wider society—where isolation is not the price of hardship. When
                someone stumbles, there are hands to steady them: mentors, peers, and organizations willing to stay
                in the story after the emergency passes.
              </p>
              <p className="mt-4 text-base leading-relaxed text-mb-ink/88 sm:text-[1.0625rem]">
                Maslow&apos;s Bridge exists to be one of those steady hands in Indianapolis: a bridge from
                uncertainty toward clarity, from survival toward the dignity of choice.
              </p>
            </div>

            <div className="border-t border-mb-mist px-8 pb-10 pt-9 sm:px-10 sm:pb-12 sm:pt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-mb-accent-solid">Mission</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-mb-ink">Serve with compassion</h3>
              <p className="mt-4 text-base leading-relaxed text-mb-ink/88 sm:text-[1.0625rem]">
                Our mission is to serve those experiencing homelessness with compassion, providing essential resources
                and pathways toward stability, dignity, and renewed purpose.
              </p>
              <p className="mt-4 text-base leading-relaxed text-mb-ink/88 sm:text-[1.0625rem]">
                Compassion, for us, is practical: it shows up as patient listening, accessible services, and
                referrals that fit real lives—not checklists. We connect people to food, shelter, employment
                support, and case management because those building blocks matter; we also make room for hope,
                creativity, and the belief that a next chapter is possible.
              </p>
              <p className="mt-4 text-base leading-relaxed text-mb-ink/88 sm:text-[1.0625rem]">
                <span className="font-semibold text-mb-ink">Stability</span> means safer nights and dependable
                support. <span className="font-semibold text-mb-ink">Dignity</span> means being seen as a whole
                person. <span className="font-semibold text-mb-ink">Renewed purpose</span> means rediscovering
                contribution, belonging, and goals that feel within reach.
              </p>
            </div>
          </article>
        </FadeIn>
      </section>

      <section className="border-t border-mb-mist bg-mb-cream px-4 py-12 sm:py-16">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-xl font-bold text-mb-ink sm:text-2xl">Rooted in Maslow&apos;s hierarchy</h2>
          <p className="mt-4 text-base leading-relaxed text-mb-ink/85 sm:text-lg">
            Our name honors a simple truth: basic needs must be met before people can pursue belonging, esteem, and
            self-fulfillment. We meet people at the foundation—safety, nourishment, shelter, and care—while keeping
            the fuller horizon in view. Every program and referral is a step toward a life that feels whole again.
          </p>
          <Link
            to="/services"
            className="mt-8 inline-flex items-center justify-center rounded-[28px] border border-mb-accent/40 bg-mb-cream px-8 py-3.5 text-sm font-semibold text-mb-accent-solid shadow-sm transition hover:border-mb-accent hover:bg-mb-mist/40 sm:text-base"
          >
            Explore our services
          </Link>
        </FadeIn>
      </section>

      <section className="border-t border-mb-mist bg-mb-surface px-4 py-12 sm:py-16">
        <FadeIn>
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-2xl border border-white/10 bg-mb-surface-elevated/50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="font-display text-xl font-bold text-mb-text-on-dark sm:text-2xl">Talk with our team</h2>
            <p className="mt-2 max-w-xl text-mb-text-muted">
              Questions about who we are, how to volunteer, or how to get help? We&apos;d love to hear from you.
            </p>
          </div>
          <Link
            to="/contact-us"
            className="inline-flex shrink-0 items-center justify-center rounded-[28px] bg-mb-accent px-8 py-3.5 text-sm font-semibold text-mb-surface transition hover:bg-mb-accent-hover sm:text-base"
          >
            Contact us
          </Link>
        </div>
        </FadeIn>
      </section>
    </>
  )
}
