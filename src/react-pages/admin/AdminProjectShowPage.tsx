import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import api from "../../network/api";
import NotFoundError from "../../errors/notFoundError";

// ── Field component ───────────────────────────────────────────────────────────

function FieldRow({
  label,
  children,
  colSpan = 1,
}: {
  label: string;
  children: React.ReactNode;
  colSpan?: 1 | 2;
}) {
  return (
    <div className={`bg-white p-5 ${colSpan === 2 ? "sm:col-span-2" : ""}`}>
      <dt className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm text-slate-800">{children}</dd>
    </div>
  );
}

// ── Show body ─────────────────────────────────────────────────────────────────

function AdminProjectShowBody({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: project,
    isLoading,
    isError,
    error: loadError,
  } = useQuery({
    queryKey: ["get-project", slug],
    queryFn: () => api.projects.show(slug),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { mutate: destroyProject, isPending: deleting } = useMutation({
    mutationFn: api.projects.destroy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-projects"] });
      queryClient.removeQueries({ queryKey: ["get-project", slug] });
      navigate("/admin", { replace: true });
    },
    onError: (err) => {
      alert(err instanceof Error ? err.message : "Delete failed.");
    },
  });

  function onDelete() {
    if (!project) return;
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    destroyProject(project.id);
  }

  // ── Error state ───────────────────────────────────────────────────────────

  if (isError) {
    const message =
      loadError instanceof NotFoundError
        ? "This project was not found."
        : loadError instanceof Error
          ? loadError.message
          : "Could not load project.";
    return (
      <>
        <AdminPageHeader
          title="Project"
          breadcrumbs={[{ label: "Projects", to: "/admin" }, { label: "Not found" }]}
        />
        <div className="px-6 py-6">
          <div className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {message}
          </div>
          <Link
            to="/admin"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
          >
            ← Back to projects
          </Link>
        </div>
      </>
    );
  }

  // ── Loading state ─────────────────────────────────────────────────────────

  if (isLoading || !project) {
    return (
      <>
        <AdminPageHeader
          title="Loading project…"
          breadcrumbs={[{ label: "Projects", to: "/admin" }, { label: "…" }]}
        />
        <div className="px-6 py-6">
          <div className="space-y-3">
            {[240, 160, 200, 120].map((w) => (
              <div key={w} className={`h-4 animate-pulse rounded bg-slate-100`} style={{ maxWidth: w }} />
            ))}
          </div>
        </div>
      </>
    );
  }

  // ── Detail view ───────────────────────────────────────────────────────────

  const actions = (
    <div className="flex flex-wrap gap-2 sm:justify-end">
      <Link
        to="/admin"
        className="inline-flex cursor-pointer items-center justify-center rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        All projects
      </Link>
      <Link
        to={`/admin/projects/${project.slug}/edit`}
        className="inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        Edit project
      </Link>
      <button
        type="button"
        onClick={onDelete}
        disabled={deleting}
        className="inline-flex cursor-pointer items-center justify-center rounded-md border border-red-300 bg-white px-3.5 py-2 text-sm font-medium text-red-700 shadow-sm transition hover:bg-red-50 disabled:opacity-50"
      >
        {deleting ? "Deleting…" : "Delete"}
      </button>
    </div>
  );

  return (
    <>
      <AdminPageHeader
        title={project.title}
        description={
          <span className="font-mono text-xs text-slate-400">
            ID {project.id} &middot; /{project.slug}
          </span>
        }
        breadcrumbs={[
          { label: "Projects", to: "/admin" },
          { label: project.title },
        ]}
        actions={actions}
      />

      <div className="px-6 py-6">
        {/* Main data grid */}
        <dl className="overflow-hidden rounded-lg border border-slate-200 sm:grid sm:grid-cols-2 sm:divide-x sm:divide-slate-100">
          <div className="divide-y divide-slate-100">
            <FieldRow label="Description" colSpan={2}>
              <p className="whitespace-pre-wrap leading-relaxed text-slate-700">{project.description}</p>
            </FieldRow>
          </div>
        </dl>

        {/* Two column metadata */}
        <dl className="mt-4 overflow-hidden rounded-lg border border-slate-200 sm:grid sm:grid-cols-2">
          <div className="divide-y divide-slate-100 bg-white">
            <FieldRow label="Start date">
              <span className="font-mono text-sm">{project.start_date}</span>
            </FieldRow>
            <FieldRow label="End date">
              {project.end_date
                ? <span className="font-mono text-sm">{project.end_date}</span>
                : <span className="italic text-slate-400">Ongoing</span>}
            </FieldRow>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            <FieldRow label="Location">
              <address className="not-italic">
                {project.street}
                {project.line ?? project.line1
                  ? <>, {project.line ?? project.line1}</>
                  : null}
                <br />
                {project.city}, {project.state} {project.zip_code}
              </address>
            </FieldRow>
            <FieldRow label="Status">
              {!project.end_date ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500 ring-1 ring-inset ring-slate-300/60">
                  Completed
                </span>
              )}
            </FieldRow>
          </div>
        </dl>

        {/* Use of funds */}
        <dl className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <FieldRow label="Use of funds" colSpan={2}>
            {project.use_of_funds.length ? (
              <ul className="mt-1 space-y-1">
                {project.use_of_funds.map((line, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="italic text-slate-400">No entries recorded</span>
            )}
          </FieldRow>
        </dl>

        {/* System footer */}
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-400">
          System record &mdash; ID{" "}
          <span className="font-mono text-slate-500">{project.id}</span>
          {" · "}
          Slug{" "}
          <span className="font-mono text-slate-500">/{project.slug}</span>
        </div>
      </div>
    </>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function AdminProjectShowPage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return null;
  return <AdminProjectShowBody key={slug} slug={slug} />;
}
