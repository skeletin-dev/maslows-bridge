import { Link } from "react-router-dom";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../network/api";

// ── Helpers ───────────────────────────────────────────────────────────────────

function StatusBadge({ endDate }: { endDate: string | null }) {
  if (!endDate) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 ring-1 ring-inset ring-slate-300/60">
      Completed
    </span>
  );
}

function SkeletonRows() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <tr key={i}>
          <td className="px-5 py-4">
            <div className="h-4 w-48 animate-pulse rounded bg-slate-100" />
          </td>
          <td className="px-5 py-4">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
          </td>
          <td className="px-5 py-4">
            <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
          </td>
          <td className="px-5 py-4">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
          </td>
          <td className="px-5 py-4 text-right">
            <div className="ml-auto h-7 w-20 animate-pulse rounded bg-slate-100" />
          </td>
        </tr>
      ))}
    </>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function AdminProjectsListPage() {
  const queryClient = useQueryClient();
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ["get-projects"],
    queryFn: api.projects.getAll,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { mutate, variables, isPending } = useMutation({
    mutationFn: api.projects.destroy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-projects"] });
    },
    onError: (err) => console.error("destroy error:", err),
  });

  function onDelete(id: string) {
    if (!window.confirm("Delete this project? This cannot be undone.")) return;
    mutate(id);
  }

  const primaryAction = (
    <Link
      to="/admin/projects/new"
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 12h14M12 5v14" />
      </svg>
      New project
    </Link>
  );

  if (isError) {
    return (
      <>
        <AdminPageHeader title="Projects" description="View and manage portfolio projects." />
        <div className="px-6 py-6">
          <div className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error instanceof Error ? error.message : "Something went wrong loading projects."}
          </div>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-3 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Try again
          </button>
        </div>
      </>
    );
  }

  const count = data?.length ?? 0;

  return (
    <>
      <AdminPageHeader
        title="Projects"
        description="Manage and publish portfolio project records."
        actions={primaryAction}
      />

      <div className="px-6 py-6">
        {/* Stats row */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Total records
            </p>
            <p className="mt-1 font-sans text-2xl font-bold tabular-nums text-slate-900">
              {isLoading ? <span className="inline-block h-7 w-8 animate-pulse rounded bg-slate-100" /> : count}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Active
            </p>
            <p className="mt-1 font-sans text-2xl font-bold tabular-nums text-emerald-600">
              {isLoading
                ? <span className="inline-block h-7 w-8 animate-pulse rounded bg-slate-100" />
                : (data?.filter((p) => !p.end_date).length ?? 0)}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Completed
            </p>
            <p className="mt-1 font-sans text-2xl font-bold tabular-nums text-slate-500">
              {isLoading
                ? <span className="inline-block h-7 w-8 animate-pulse rounded bg-slate-100" />
                : (data?.filter((p) => !!p.end_date).length ?? 0)}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Project</th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Timeline</th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Location</th>
                <th className="w-[1%] px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {isLoading ? (
                <SkeletonRows />
              ) : count === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="h-10 w-10 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
                        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-5.8a2 2 0 0 1-1.6-.8l-1-1.2A2 2 0 0 0 9.2 3H5a2 2 0 0 0-2 2Z" />
                      </svg>
                      <p className="text-sm font-medium text-slate-500">No projects yet</p>
                      <Link
                        to="/admin/projects/new"
                        className="rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Create your first project
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                data!.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-5 py-3.5">
                      <Link
                        to={`/admin/projects/${p.slug}`}
                        className="font-medium text-slate-900 transition-colors hover:text-blue-600"
                      >
                        {p.title}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500">
                      {p.start_date}
                      {p.end_date ? <> &rarr; {p.end_date}</> : null}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge endDate={p.end_date} />
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">
                      {p.city}, {p.state}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap items-center justify-end gap-1.5">
                        <Link
                          to={`/admin/projects/${p.slug}`}
                          className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                        >
                          View
                        </Link>
                        <Link
                          to={`/admin/projects/${p.slug}/edit`}
                          className="rounded border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 shadow-sm transition hover:bg-blue-100"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => void onDelete(p.id)}
                          disabled={isPending && variables === p.id}
                          className="cursor-pointer rounded border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-600 shadow-sm transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {isPending && variables === p.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        {!isLoading && count > 0 && (
          <p className="mt-3 text-xs text-slate-400">
            {count} record{count !== 1 ? "s" : ""} total &mdash; changes appear on the public site after your next release.
          </p>
        )}
      </div>
    </>
  );
}
