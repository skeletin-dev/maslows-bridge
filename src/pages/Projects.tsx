import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FadeIn, StaggerItem, StaggerList } from "../components/FadeIn";
import { PageHeading } from "../components/PageHeading";
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

export function Projects() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["public-projects"],
    queryFn: api.projects.getAll,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <PageHeading
        title="Projects"
        subtitle="Housing and community initiatives we support—building stability alongside our neighbors."
      />

      <section className="border-b border-mb-mist bg-mb-cream px-4 py-12 sm:py-16">
        {isError ? (
          <FadeIn className="mx-auto max-w-3xl text-center">
            <p className="text-base text-mb-ink/85">
              {error instanceof Error ? error.message : "Unable to load projects."}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-6 inline-flex items-center justify-center rounded-[28px] border border-mb-accent/40 bg-mb-cream px-8 py-3.5 text-sm font-semibold text-mb-accent-solid shadow-sm transition hover:border-mb-accent hover:bg-mb-mist/40 sm:text-base"
            >
              Try again
            </button>
          </FadeIn>
        ) : isLoading ? (
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto h-1 max-w-xs overflow-hidden rounded-full bg-mb-mist">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-mb-accent/50" />
            </div>
            <p className="mt-6 text-center text-sm text-mb-ink/60">Loading projects…</p>
          </div>
        ) : !data?.length ? (
          <FadeIn className="mx-auto max-w-3xl rounded-2xl border border-mb-mist bg-mb-mist/20 px-8 py-10 text-center">
            <p className="text-mb-ink/85">
              No projects are listed yet. Please check back soon.
            </p>
          </FadeIn>
        ) : (
          <StaggerList className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:gap-10">
            {data.map((project) => (
              <StaggerItem key={project.id}>
                <article className="group flex h-full flex-col rounded-2xl border border-mb-mist bg-mb-mist/25 p-6 shadow-sm ring-1 ring-black/5 transition hover:border-mb-accent/35 hover:shadow-md">
                  <div className="mb-4 h-1 w-12 shrink-0 rounded-full bg-mb-hope" />
                  <h2 className="font-display text-xl font-bold text-mb-ink">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="transition-colors hover:text-mb-accent-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mb-accent"
                    >
                      {project.title}
                      <span className="ml-1 inline-block text-mb-accent opacity-0 transition group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-base leading-relaxed text-mb-ink/85">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-mb-mist/80 pt-4 text-sm text-mb-ink/70">
                    <span>
                      {project.city}, {project.state}
                    </span>
                    <span className="text-mb-ink/50">·</span>
                    <span className="tabular-nums">
                      {formatDateLabel(project.start_date)}
                      {project.end_date
                        ? ` – ${formatDateLabel(project.end_date)}`
                        : " – Ongoing"}
                    </span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerList>
        )}
      </section>

      <section className="border-t border-mb-mist bg-mb-surface px-4 py-12 sm:py-16">
        <FadeIn>
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-2xl border border-white/10 bg-mb-surface-elevated/50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="font-display text-xl font-bold text-mb-text-on-dark sm:text-2xl">
                Support this work
              </h2>
              <p className="mt-2 max-w-xl text-mb-text-muted">
                Questions about partnering, volunteering, or how these projects fit our mission?
                We&apos;d love to connect.
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
  );
}
