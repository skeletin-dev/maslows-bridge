import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FadeIn } from "../components/FadeIn";
import { PageHero } from "../components/PageHero";
import {
  pillPrimary,
  pillSecondary,
  sectionLightGlow,
} from "../components/pageLayout";
import api from "../network/api";

function formatDateLabel(value: string) {
  const d = new Date(value + "T12:00:00");
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatUseOfFundLabel(value: string) {
  return value
    .split("_")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function LocationIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

export function ProjectShow() {
  const { slug = "" } = useParams<{ slug: string }>();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["public-project", slug],
    queryFn: () => api.projects.show(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (!slug) {
    return (
      <>
        <PageHero title="Project" subtitle="Missing project link." variant="atmosphere" />
        <section className={sectionLightGlow}>
          <FadeIn className="mx-auto max-w-3xl">
            <Link
              to="/projects"
              className="focus-ring inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-mb-accent-solid underline-offset-2 hover:underline"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to projects
            </Link>
          </FadeIn>
        </section>
      </>
    );
  }

  const isOngoing = data && !data.end_date;

  return (
    <>
      {isError ? (
        <PageHero
          title="Project"
          subtitle={error instanceof Error ? error.message : "This project could not be loaded."}
          variant="atmosphere"
        />
      ) : isLoading || !data ? (
        <PageHero title="Project" subtitle="Loading…" variant="atmosphere" />
      ) : (
        <PageHero
          title={data.title}
          subtitle={`${data.city}, ${data.state}`}
          eyebrow={isOngoing ? "Ongoing project" : "Completed project"}
          variant="atmosphere"
        />
      )}

      <section className={sectionLightGlow}>
        {isError ? (
          <FadeIn className="mx-auto max-w-3xl">
            <div className="flex flex-col gap-4 rounded-xl border border-red-100 bg-white px-8 py-10 shadow-mb-card sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base text-mb-ink/80">
                We couldn&apos;t load this project. Please try again.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/projects"
                  className="focus-ring inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-mb-accent-solid underline-offset-2 hover:underline"
                >
                  ← All projects
                </Link>
                <button type="button" onClick={() => void refetch()} className={pillSecondary}>
                  Try again
                </button>
              </div>
            </div>
          </FadeIn>
        ) : isLoading || !data ? (
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto h-1.5 max-w-xs overflow-hidden rounded-full bg-mb-mist">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-mb-accent/60" />
            </div>
            <p className="mt-6 text-center text-sm text-mb-ink/65">Loading project details…</p>
          </div>
        ) : (
          <FadeIn className="mx-auto max-w-4xl space-y-10">
            {/* Back link */}
            <Link
              to="/projects"
              className="focus-ring inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-mb-ink/60 transition-colors duration-200 hover:text-mb-accent-solid"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              All projects
            </Link>

            {/* Description */}
            <div>
              <div className="mb-5 h-0.5 w-12 bg-mb-accent" aria-hidden />
              <p className="text-lg leading-relaxed text-mb-ink/85 sm:text-xl">{data.description}</p>
            </div>

            {/* Location + Timeline cards */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-mb-mist/70 bg-white shadow-mb-card ring-1 ring-black/[0.03]">
                <div className="border-b border-mb-mist/60 bg-mb-cream/50 px-6 py-4">
                  <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-mb-accent-solid">
                    <LocationIcon />
                    Location
                  </div>
                </div>
                <div className="px-6 py-5">
                  <p className="font-medium leading-relaxed text-mb-ink">
                    {data.street}
                    {data.line || data.line1 ? (
                      <>
                        <br />
                        {data.line ?? data.line1}
                      </>
                    ) : null}
                    <br />
                    {data.city}, {data.state} {data.zip_code}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-mb-mist/70 bg-white shadow-mb-card ring-1 ring-black/[0.03]">
                <div className="border-b border-mb-mist/60 bg-mb-cream/50 px-6 py-4">
                  <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-mb-accent-solid">
                    <CalendarIcon />
                    Timeline
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isOngoing
                          ? "bg-mb-hope/10 text-mb-hope"
                          : "bg-mb-mist/80 text-mb-ink/60"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isOngoing ? "bg-mb-hope" : "bg-mb-ink/40"
                        }`}
                        aria-hidden
                      />
                      {isOngoing ? "Ongoing" : "Completed"}
                    </span>
                  </div>
                  <p className="mt-3 font-medium text-mb-ink">
                    {formatDateLabel(data.start_date)}
                    {data.end_date ? (
                      <>
                        <span className="text-mb-ink/45"> — </span>
                        {formatDateLabel(data.end_date)}
                      </>
                    ) : (
                      <span className="text-mb-ink/55"> — Present</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Use of funds */}
            {data.use_of_funds?.length ? (
              <div className="overflow-hidden rounded-xl border border-mb-mist/70 bg-white shadow-mb-card ring-1 ring-black/[0.03]">
                <div className="border-b border-mb-mist/60 bg-mb-cream/50 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-mb-accent-solid">
                    Use of funds
                  </p>
                </div>
                <div className="px-6 py-5">
                  <ul className="flex flex-wrap gap-2" role="list">
                    {data.use_of_funds.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-mb-mist bg-mb-cream px-4 py-1.5 text-sm font-medium text-mb-ink/85"
                      >
                        {formatUseOfFundLabel(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/projects" className={pillSecondary}>
                ← All projects
              </Link>
              <Link to="/contact-us" className={pillPrimary}>
                Contact us
              </Link>
            </div>
          </FadeIn>
        )}
      </section>

      {!isError && !isLoading && data ? (
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
                  Support this initiative
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-mb-text-on-dark/75">
                  Reach out to discuss partnership, volunteering, or referrals.
                </p>
              </div>
              <Link to="/contact-us" className={`${pillPrimary} shrink-0 py-4 text-base`}>
                Get in touch
                <span aria-hidden className="ml-1">→</span>
              </Link>
            </div>
          </FadeIn>
        </section>
      ) : null}
    </>
  );
}
