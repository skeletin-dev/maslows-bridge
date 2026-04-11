import { Link } from "react-router-dom";
import { SITE } from "../site";

export function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-mb-surface">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-mb-accent/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-mb-hope/20 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 sm:flex-row sm:items-center sm:gap-12 sm:pb-20 sm:pt-14 lg:gap-16">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-mb-accent">
              Indianapolis · Nonprofit
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight text-mb-text-on-dark sm:text-4xl lg:text-5xl">
              {SITE.tagline}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-mb-text-muted sm:text-lg">
              Maslow&apos;s Bridge is dedicated to supporting neighbors
              experiencing homelessness with job training, everyday resources,
              and community care—helping people move toward stability and
              reintegration with dignity.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-mb-mist bg-mb-cream px-4 py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-3 lg:gap-8">
          <article className="rounded-2xl border border-mb-mist bg-white p-6 shadow-sm">
            <div className="mb-4 h-1 w-12 rounded-full bg-mb-hope" />
            <h2 className="font-display text-xl font-bold text-mb-ink">
              Job training
            </h2>
            <p className="mt-2 text-mb-ink/85">
              Practical skills and support that open doors to employment and
              self-sufficiency.
            </p>
          </article>
          <article className="rounded-2xl border border-mb-mist bg-white p-6 shadow-sm">
            <div className="mb-4 h-1 w-12 rounded-full bg-mb-hope" />
            <h2 className="font-display text-xl font-bold text-mb-ink">
              Everyday resources
            </h2>
            <p className="mt-2 text-mb-ink/85">
              Essentials that meet people where they are—food, clothing,
              hygiene, and more.
            </p>
          </article>
          <article className="rounded-2xl border border-mb-mist bg-white p-6 shadow-sm">
            <div className="mb-4 h-1 w-12 rounded-full bg-mb-hope" />
            <h2 className="font-display text-xl font-bold text-mb-ink">
              Community
            </h2>
            <p className="mt-2 text-mb-ink/85">
              Relationships and advocacy that remind every neighbor they belong.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-mb-surface-elevated px-4 py-14 text-mb-text-on-dark sm:py-16">
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
      </section>
    </>
  );
}
