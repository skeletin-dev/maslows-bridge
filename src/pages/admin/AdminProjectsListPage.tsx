import { Link } from "react-router-dom";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../network/api";

export function AdminProjectsListPage() {
  const queryClient = useQueryClient();
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["get-projects"],
    queryFn: api.projects.getAll,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { mutate, variables, isPending } = useMutation({
    mutationFn: api.projects.destroy,
    onSuccess: () => {
      console.log("invalidating");
      queryClient.invalidateQueries({ queryKey: ["get-projects"] });
    },
    onError: (err) => console.error("destroy error:", err),
  });

  function onDelete(id: string) {
    mutate(id);
  }

  if (isError) {
    return (
      <div>
        <AdminPageHeader
          title="Projects"
          description="View and manage portfolio projects."
        />
        <p className="mt-4 text-sm text-red-800">{error.message}</p>
        <button
          type="button"
          onClick={() => {}}
          className="mt-4 text-sm font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
        >
          Try again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <AdminPageHeader
          title="Projects"
          description="Loading the directory…"
        />
        <div className="mt-8 flex items-center justify-center py-12 text-sm text-slate-500">
          <div className="h-1 w-40 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-400" />
          </div>
        </div>
      </div>
    );
  }

  const count = data.length;

  if (count === 0) {
    return (
      <div>
        <AdminPageHeader
          title="Projects"
          description="No projects have been created yet. Add your first one to get started."
          actions={
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              New project
            </Link>
          }
        />
        <div className="mt-8 rounded-lg border border-dashed border-slate-200 bg-slate-50/80 px-6 py-10 text-center">
          <p className="text-sm text-slate-600">The portfolio list is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        description="View, open, and maintain portfolio project records."
        actions={
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            New project
          </Link>
        }
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200/90 bg-slate-50/90 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Active records
          </p>
          <p className="mt-0.5 text-2xl font-semibold tabular-nums text-slate-900">
            {count}
          </p>
        </div>
        <div className="hidden rounded-lg border border-slate-200/80 bg-white px-4 py-3 sm:block sm:col-span-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Data scope
          </p>
          <p className="mt-0.5 text-sm text-slate-600">
            Changes appear on the public site when published through your
            standard release process.
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200/90">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/90 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Timeline</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="w-[1%] px-4 py-3 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {data.map((p) => (
              <tr key={p.id} className="transition hover:bg-slate-50/80">
                <td className="px-4 py-3">
                  <Link
                    to={`/admin/projects/${p.slug}`}
                    className="font-medium text-slate-900 hover:text-slate-600 hover:underline"
                  >
                    {p.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  <span className="whitespace-nowrap">
                    {p.start_date}
                    {p.end_date ? ` → ${p.end_date}` : ""}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {p.city}, {p.state}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center justify-end gap-1.5">
                    <Link
                      to={`/admin/projects/${p.slug}`}
                      className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50"
                    >
                      View
                    </Link>
                    <Link
                      to={`/admin/projects/${p.slug}/edit`}
                      className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 shadow-sm hover:bg-slate-50"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => void onDelete(p.id)}
                      disabled={isPending && variables === p.id}
                      className="rounded border border-red-200 bg-red-50/80 px-2.5 py-1.5 text-xs font-medium text-red-800 hover:bg-red-100 disabled:opacity-50"
                    >
                      {isPending && variables === p.id ? "…" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
