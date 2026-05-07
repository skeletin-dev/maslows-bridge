import { Link } from "react-router-dom";
import { FadeIn } from "../components/FadeIn";
import { PageHero } from "../components/PageHero";
import { pillPrimary, sectionDarkGlow, sectionLightGlow } from "../components/pageLayout";

const SHARMANE_PHOTO =
  "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800,h=860,fit=crop/YNqMewVXyDSQ4p6z/d4b5835b-0085-488a-9ce8-784998e4c309-eJtmcfu9dsQBYhC0.jpg";

const achievements = [
  { label: "Black Excellence Leadership Award", icon: "★" },
  { label: "Homeless Services Professional", icon: "✦" },
  { label: "Psychology & Human Services", icon: "◆" },
];

const focusAreas = [
  "Homelessness & housing instability",
  "Mental health advocacy",
  "Entrepreneurship & community development",
  "Faith-based outreach",
];

export function Team() {
  return (
    <>
      <PageHero
        eyebrow="People"
        title="Our team"
        subtitle="The people who show up for our neighbors—with compassion, skill, and faith."
        variant="atmosphere"
      />

      {/* ── LEADERSHIP INTRO ── */}
      <section className={sectionLightGlow} aria-labelledby="leadership-heading">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <p
              id="leadership-heading"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-mb-accent-solid"
            >
              Leadership
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-mb-ink sm:text-3xl">
              Driven by purpose
            </h2>
            <div className="mt-4 h-px max-w-xs bg-mb-mist" aria-hidden />
          </FadeIn>

          {/* Profile card */}
          <FadeIn delay={0.08}>
            <article className="mt-10 overflow-hidden rounded-xl border border-mb-mist/60 bg-white shadow-mb-card ring-1 ring-black/[0.03] sm:mt-12">
              {/* Gold top rule */}
              <div className="h-0.5 w-full bg-mb-hope" aria-hidden />

              <div className="flex flex-col gap-10 p-8 sm:gap-12 sm:p-10 lg:flex-row lg:items-start lg:gap-14">
                {/* Photo column */}
                <div className="mx-auto w-full max-w-xs shrink-0 lg:mx-0 lg:max-w-[260px]">
                  <div className="overflow-hidden rounded-xl border border-mb-mist/60 bg-mb-cream shadow-mb-card ring-1 ring-black/5">
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

                  {/* Achievement badges */}
                  <div className="mt-5 space-y-2">
                    {achievements.map((a) => (
                      <div
                        key={a.label}
                        className="flex items-center gap-3 rounded-lg border border-mb-mist/70 bg-mb-cream px-4 py-2.5"
                      >
                        <span className="text-mb-accent-solid" aria-hidden>
                          {a.icon}
                        </span>
                        <span className="text-xs font-medium text-mb-ink/80">{a.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio column */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-2xl font-bold text-mb-ink sm:text-3xl">
                      Sharmane Watkins
                    </h2>
                    <span className="rounded-full border border-mb-hope/30 bg-mb-hope/8 px-3 py-1 text-xs font-semibold text-mb-hope">
                      Executive Director
                    </span>
                  </div>

                  <div className="mt-8 space-y-5 text-base leading-relaxed text-mb-ink/85 sm:text-[1.0625rem]">
                    <p>
                      Sharmane is a devoted advocate, entrepreneur, and woman of faith whose life
                      reflects the heart of Maslow&apos;s Bridge—restoring hope, dignity, and belonging
                      to those experiencing homelessness and mental health challenges. Her own journey
                      of instability and hardship inspired her to dedicate her life to helping others
                      rise above adversity.
                    </p>
                    <p>
                      With professional experience in homeless services, entrepreneurship, and
                      psychology, Ms. Watkins brings both practical insight and deep empathy to her work.
                      Sharmane is a recipient of Black Excellence Leadership Awards, recognizing her
                      commitment to empowering underserved communities.
                    </p>
                    <p>
                      She believes true healing begins when people are seen, heard, and supported with
                      compassion. Guided by faith, she strives to create opportunities for individuals
                      dealing with life crisis to reclaim stability, strength, and hope. Together with
                      the Maslow&apos;s Bridge team, she is committed to building spaces where love,
                      faith, and restoration meet real-world change.
                    </p>
                  </div>

                  {/* Focus areas */}
                  <div className="mt-8 border-t border-mb-mist/80 pt-8">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-mb-accent-solid">
                      Areas of focus
                    </p>
                    <ul className="flex flex-wrap gap-2" role="list">
                      {focusAreas.map((area) => (
                        <li
                          key={area}
                          className="rounded-full border border-mb-mist bg-mb-cream px-3 py-1.5 text-sm font-medium text-mb-ink/85"
                        >
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className={`${sectionDarkGlow}`} aria-labelledby="team-cta-heading">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <FadeIn>
              <div className="mb-5 h-0.5 w-12 bg-mb-accent" aria-hidden />
              <h2
                id="team-cta-heading"
                className="font-display text-2xl font-bold text-mb-text-on-dark sm:text-3xl"
              >
                Join the work
              </h2>
              <p className="mt-4 text-base leading-relaxed text-mb-text-on-dark/80">
                We&apos;re always looking for passionate people—volunteers, advocates, and partners
                who believe that showing up makes a difference. If that&apos;s you, reach out.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact-us" className={pillPrimary}>
                  Connect with us
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="rounded-xl border border-white/12 bg-mb-surface-elevated/55 p-8 shadow-mb-glass backdrop-blur-sm sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-wider text-mb-accent">
                  What we value in people
                </p>
                <ul className="mt-5 space-y-4" role="list">
                  {[
                    "Genuine compassion for people in crisis",
                    "Respect for dignity and personal agency",
                    "Commitment to long-term presence",
                    "Faith-aligned service and purpose",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mb-accent"
                        aria-hidden
                      />
                      <span className="text-sm leading-relaxed text-mb-text-on-dark/85 sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
