import { Link } from "react-router-dom"
import { FadeIn } from "../components/FadeIn"
import { PageHeading } from "../components/PageHeading"

const cardClass =
  "relative overflow-hidden rounded-2xl border border-mb-mist/70 bg-mb-mist/25 p-8 shadow-sm ring-1 ring-black/3 sm:p-10"

function SectionAccent() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-mb-accent-solid"
      aria-hidden
    />
  )
}

export function History() {
  return (
    <>
      <PageHeading
        title="History"
        subtitle="From The Maslow Project to Maslow's Bridge—a story of compassion, faith, and community."
      />

      <section
        className="border-b border-mb-mist bg-mb-cream px-4 py-12 sm:py-16"
        aria-labelledby="history-story"
      >
        <FadeIn className="mx-auto max-w-3xl">
          <h2 id="history-story" className="sr-only">
            Our history
          </h2>
          <article className={cardClass}>
            <SectionAccent />
            <div className="relative space-y-6 text-base leading-relaxed text-mb-ink/90 sm:text-[1.0625rem]">
              <p>
                Maslow&apos;s Bridge began as The Maslow Project, a grassroots outreach effort rooted in compassion and
                faith. What started as a simple vision to restore hope and dignity to those experiencing homelessness
                soon grew into a broader mission to empower transformation and strengthen entire communities.
              </p>
              <p>
                The Founder is a compassionate community advocate devoted to creating opportunities for individuals in
                need. Guided by faith and purpose, he drew upon his background in theology and human services to turn the
                Maslow Project into a living mission of service. His early works focused on providing both practical
                support and spiritual encouragement, helping individuals navigate the challenges of homelessness and life
                transitions.
              </p>
              <p>
                As the movement expanded, so did its vision. The Maslow Project evolved into Maslow&apos;s Bridge,
                symbolizing the connection between compassion and empowerment, faith and action, hope and renewal.
                Furthermore, the organization continues to develop programs that continue to uplift individuals and
                families while inspiring community-wide transformation. The founders and their associates together worked
                tirelessly as the project developed into Maslow&apos;s Bridge. They together are dedicated to
                strengthening families, uplifting underserved communities, creating spaces of hope, and love while
                connecting individuals to vital resources to ensure that every person feels seen, valued, and supported.
                Together, their shared faith and unwavering dedication transformed what was once The Maslow Project into
                Maslow&apos;s Bridge — a growing, faith-driven organization committed to restoring lives, rebuilding
                communities, and reminding the world that compassion still changes everything.
              </p>
            </div>
          </article>
        </FadeIn>
      </section>

      <section className="border-t border-mb-mist bg-mb-surface px-4 py-12 sm:py-16">
        <FadeIn>
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-2xl border border-white/10 bg-mb-surface-elevated/50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="font-display text-xl font-bold text-mb-text-on-dark sm:text-2xl">Be part of the story</h2>
            <p className="mt-2 max-w-xl text-mb-text-muted">
              Learn more about our work, explore services, or reach out to connect.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-[28px] border border-white/20 px-6 py-3 text-center text-sm font-semibold text-mb-text-on-dark transition hover:border-white/40 hover:bg-white/5 sm:text-base"
            >
              About us
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center rounded-[28px] bg-mb-accent px-8 py-3.5 text-center text-sm font-semibold text-mb-surface transition hover:bg-mb-accent-hover sm:text-base"
            >
              Contact us
            </Link>
          </div>
        </div>
        </FadeIn>
      </section>
    </>
  )
}
