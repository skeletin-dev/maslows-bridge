import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FadeIn, StaggerItem, StaggerList } from "../components/FadeIn";
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
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

export function Projects() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["public-projects"],
    queryFn: api.projects.getAll,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects"
        subtitle="Housing and community initiatives we support—building stability alongside our neighbors."
        variant="atmosphere"
      />

      {/* ── PROJECTS GRID ── */}
      <section className={sectionLightGlow} aria-labelledby="projects-heading">
        <div className="mx-auto max-w-6xl">
          {isError ? (
            <FadeIn>
              <div className="flex flex-col items-center gap-4 rounded-xl border border-mb-mist/70 bg-white px-8 py-12 text-center shadow-mb-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-400">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <p className="text-base text-mb-ink/85">
                  {error instanceof Error ? error.message : "Unable to load projects."}
                </p>
                <button
                  type="button"
                  onClick={() => void refetch()}
                  className={pillSecondary}
                >
                  Try again
                </button>
              </div>
            </FadeIn>
          ) : isLoading ? (
            <div className="py-8">
              <div className="mx-auto h-1.5 max-w-xs overflow-hidden rounded-full bg-mb-mist">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-mb-accent/60" />
              </div>
              <p className="mt-6 text-center text-sm text-mb-ink/65">Loading projects…</p>
            </div>
          ) : !data?.length ? (
            <FadeIn>
              <div className="flex flex-col items-center gap-4 rounded-xl border border-mb-mist/70 bg-white px-8 py-14 text-center shadow-mb-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mb-cream text-mb-ink/40">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <p className="text-mb-ink/75">No projects are listed yet. Please check back soon.</p>
              </div>
            </FadeIn>
          ) : (
            <>
              <FadeIn>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mb-accent-solid">
                      On the ground
                    </p>
                    <h2
                      id="projects-heading"
                      className="mt-2 font-display text-2xl font-bold text-mb-ink sm:text-3xl"
                    >
                      Active initiatives
                    </h2>
                  </div>
                  <p className="text-sm text-mb-ink/60">
                    {data.length} {data.length === 1 ? "project" : "projects"}
                  </p>
                </div>
                <div className="mt-6 h-px bg-mb-mist" aria-hidden />
              </FadeIn>

              <StaggerList className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8">
                {data.map((project) => {
                  const isOngoing = !project.end_date;
                  return (
                    <StaggerItem key={project.id}>
                      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-mb-mist/70 bg-white shadow-mb-card motion-safe:transition-[transform,box-shadow] motion-safe:duration-[250ms] motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-mb-card-hover">
                        {/* Gold top rule */}
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-mb-accent" aria-hidden />

                        <div className="flex flex-1 flex-col p-7 pt-8 sm:p-8 sm:pt-9">
                          {/* Status badge */}
                          <div className="mb-4 flex items-center gap-2">
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

                          <h2 className="font-display text-xl font-bold leading-snug text-mb-ink">
                            <Link
                              to={`/projects/${project.slug}`}
                              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mb-accent"
                            >
                              {project.title}
                            </Link>
                          </h2>
                          <p className="mt-3 line-clamp-3 flex-1 text-base leading-relaxed text-mb-ink/80">
                            {project.description}
                          </p>

                          <div className="mt-6 flex items-center justify-between border-t border-mb-mist/80 pt-5">
                            <div className="text-sm text-mb-ink/60">
                              <p className="font-medium text-mb-ink/80">
                                {project.city}, {project.state}
                              </p>
                              <p className="mt-0.5 tabular-nums">
                                {formatDateLabel(project.start_date)}
                                {project.end_date
                                  ? ` – ${formatDateLabel(project.end_date)}`
                                  : " – Present"}
                              </p>
                            </div>
                            <Link
                              to={`/projects/${project.slug}`}
                              className="focus-ring flex cursor-pointer items-center gap-1.5 rounded-md text-sm font-semibold text-mb-accent-solid transition-colors duration-200 hover:text-mb-ink"
                              aria-label={`View details for ${project.title}`}
                            >
                              Details
                              <ArrowIcon />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </StaggerItem>
                  );
                })}
              </StaggerList>
            </>
          )}
        </div>
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
                Support this work
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-mb-text-on-dark/75">
                Questions about partnering, volunteering, or how these projects fit our mission?
                We&apos;d love to connect.
              </p>
            </div>
            <Link to="/contact-us" className={`${pillPrimary} shrink-0 py-4 text-base`}>
              Contact us
              <span aria-hidden className="ml-1">→</span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
