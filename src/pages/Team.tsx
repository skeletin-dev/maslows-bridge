import { Link } from "react-router-dom"
import { FadeIn } from "../components/FadeIn"
import { PageHeading } from "../components/PageHeading"

const SHARMANE_PHOTO =
  "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800,h=860,fit=crop/YNqMewVXyDSQ4p6z/d4b5835b-0085-488a-9ce8-784998e4c309-eJtmcfu9dsQBYhC0.jpg"

export function Team() {
  return (
    <>
      <PageHeading
        title="Our team"
        subtitle="The people who show up for our neighbors—with compassion, skill, and faith."
      />

      <section className="border-b border-mb-mist bg-mb-cream" aria-labelledby="leadership-heading">
        <FadeIn className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <p
            id="leadership-heading"
            className="text-xs font-semibold uppercase tracking-wider text-mb-accent-solid"
          >
            Leadership
          </p>

          <article className="mt-8 overflow-hidden rounded-2xl border border-mb-mist/80 bg-mb-mist/20 shadow-sm ring-1 ring-black/5 sm:mt-10">
            <div className="pointer-events-none h-1 w-full bg-mb-accent-solid" aria-hidden />

            <div className="flex flex-col gap-10 p-8 sm:gap-12 sm:p-10 lg:flex-row lg:items-start lg:gap-14">
              <div className="mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:max-w-[280px]">
                <div className="overflow-hidden rounded-2xl border border-mb-mist/60 bg-mb-cream shadow-md ring-1 ring-black/5">
                  <img
                    src={SHARMANE_PHOTO}
                    alt="Portrait of Sharmane Watkins, Executive Director"
                    width={560}
                    height={600}
                    className="aspect-[4/5] w-full object-cover object-top"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-display text-2xl font-bold text-mb-ink sm:text-3xl">Sharmane Watkins</h2>
                <p className="mt-1 text-base font-semibold text-mb-accent-solid sm:text-lg">Executive Director</p>

                <div className="mt-8 space-y-5 text-base leading-relaxed text-mb-ink/90 sm:text-[1.0625rem]">
                  <p>
                    Sharmane is a devoted advocate, entrepreneur, and woman of faith whose life reflects the heart of
                    Maslow&apos;s Bridge—restoring hope, dignity, and belonging to those experiencing homelessness and
                    mental health challenges. Her own journey of instability and hardship inspired her to dedicate her
                    life to helping others rise above adversity.
                  </p>
                  <p>
                    With professional experience in homeless services, entrepreneurship, and psychology, Ms. Watkins
                    brings both practical insight and deep empathy to her work. Sharmane is a recipient of Black
                    Excellence Leadership Awards, recognizing her commitment to empowering underserved communities.
                  </p>
                  <p>
                    She believes true healing begins when people are seen, heard, and supported with compassion. Guided
                    by faith, she strives to create opportunities for individuals dealing with life crisis to reclaim
                    stability, strength, and hope. Together with the Maslow&apos;s Bridge team, she is committed to
                    building spaces where love, faith, and restoration meet real-world change.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </FadeIn>
      </section>

      <section className="border-t border-mb-mist bg-mb-surface px-4 py-12 sm:py-16">
        <FadeIn>
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-2xl border border-white/10 bg-mb-surface-elevated/50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="font-display text-xl font-bold text-mb-text-on-dark sm:text-2xl">Connect with us</h2>
              <p className="mt-2 max-w-xl text-mb-text-muted">
                Questions about our work or how to get involved? We&apos;d love to hear from you.
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
