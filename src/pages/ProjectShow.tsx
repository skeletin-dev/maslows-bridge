import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FadeIn } from "../components/FadeIn";
import { PageHeading } from "../components/PageHeading";
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
        <PageHeading title="Project" subtitle="Missing project link." />
        <section className="bg-mb-cream px-4 py-12">
          <FadeIn className="mx-auto max-w-3xl">
            <Link
              to="/projects"
              className="text-sm font-semibold text-mb-accent-solid underline-offset-2 hover:underline"
            >
              ← Back to projects
            </Link>
          </FadeIn>
        </section>
      </>
    );
  }

  return (
    <>
      {isError ? (
        <PageHeading
          title="Project"
          subtitle={
            error instanceof Error ? error.message : "This project could not be loaded."
          }
        />
      ) : isLoading || !data ? (
        <PageHeading title="Project" subtitle="Loading…" />
      ) : (
        <PageHeading
          title={data.title}
          subtitle={`${data.city}, ${data.state}${
            data.end_date
              ? ` · ${formatDateLabel(data.start_date)} – ${formatDateLabel(data.end_date)}`
              : ` · Since ${formatDateLabel(data.start_date)}`
          }`}
        />
      )}

      <section className="border-b border-mb-mist bg-mb-cream px-4 py-12 sm:py-16">
        {isError ? (
          <FadeIn className="mx-auto max-w-3xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/projects"
                className="inline-flex text-sm font-semibold text-mb-accent-solid underline-offset-2 hover:underline"
              >
                ← All projects
              </Link>
              <button
                type="button"
                onClick={() => void refetch()}
                className="inline-flex items-center justify-center rounded-[28px] border border-mb-accent/40 bg-mb-cream px-6 py-3 text-sm font-semibold text-mb-accent-solid transition hover:border-mb-accent hover:bg-mb-mist/40"
              >
                Try again
              </button>
            </div>
          </FadeIn>
        ) : isLoading || !data ? (
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto h-1 max-w-xs overflow-hidden rounded-full bg-mb-mist">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-mb-accent/50" />
            </div>
          </div>
        ) : (
          <FadeIn className="mx-auto max-w-3xl space-y-10">
            <p className="text-lg leading-relaxed text-mb-ink/88 sm:text-xl">
              {data.description}
            </p>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="rounded-2xl border border-mb-mist/70 bg-mb-mist/20 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-mb-accent-solid">
                  Location
                </p>
                <p className="mt-3 font-medium text-mb-ink">
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
              <div className="rounded-2xl border border-mb-mist/70 bg-mb-mist/20 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-mb-accent-solid">
                  Timeline
                </p>
                <p className="mt-3 font-medium text-mb-ink">
                  {formatDateLabel(data.start_date)}
                  {data.end_date ? (
                    <>
                      <span className="text-mb-ink/50"> — </span>
                      {formatDateLabel(data.end_date)}
                    </>
                  ) : (
                    <span className="text-mb-ink/60"> — Ongoing</span>
                  )}
                </p>
              </div>
            </div>

            {data.use_of_funds?.length ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-mb-accent-solid">
                  Use of funds
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {data.use_of_funds.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-mb-mist bg-white px-3 py-1.5 text-sm font-medium text-mb-ink/90 shadow-sm"
                    >
                      {formatUseOfFundLabel(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center rounded-[28px] border border-mb-accent/45 bg-mb-cream px-8 py-3.5 text-sm font-semibold text-mb-accent-solid transition hover:border-mb-accent hover:bg-mb-mist/40 sm:text-base"
              >
                ← All projects
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center rounded-[28px] bg-mb-accent px-8 py-3.5 text-sm font-semibold text-mb-surface transition hover:bg-mb-accent-hover sm:text-base"
              >
                Contact us
              </Link>
            </div>
          </FadeIn>
        )}
      </section>
    </>
  );
}
