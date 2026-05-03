import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import api from "../../network/api";
import NotFoundError from "../../errors/notFoundError";

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
    if (!window.confirm(`Delete “${project.title}”? This cannot be undone.`)) {
      return;
    }
    destroyProject(project.id);
  }

  if (isError) {
    const message =
      loadError instanceof NotFoundError
        ? "This project was not found."
        : loadError instanceof Error
          ? loadError.message
          : "Could not load project.";
    return (
      <div>
        <AdminPageHeader title="Project" />
        <p className="mt-2 text-sm text-red-800">{message}</p>
        <Link
          to="/admin"
          className="mt-4 inline-block text-sm font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
        >
          Back to projects
        </Link>
      </div>
    );
  }

  if (isLoading || !project) {
    return (
      <div>
        <AdminPageHeader title="Project" description="Loading…" />
        <div className="mt-8 flex justify-center py-8">
          <div className="h-1 w-40 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title={project.title}
        description={`Record #${project.id}`}
        breadcrumbs={[
          { label: "Projects", to: "/admin" },
          { label: project.title },
        ]}
        actions={
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <Link
              to="/admin"
              className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50"
            >
              All projects
            </Link>
            <Link
              to={`/admin/projects/${project.slug}/edit`}
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => onDelete()}
              disabled={deleting}
              className="inline-flex items-center justify-center rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-900 hover:bg-red-100 disabled:opacity-50"
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        }
      />

      <dl className="mt-8 grid gap-0 rounded-lg border border-slate-200/90 sm:grid-cols-2 sm:gap-px sm:bg-slate-200/90">
        <div className="bg-white p-4 sm:col-span-2">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Description
          </dt>
          <dd className="mt-1 text-sm text-slate-800 whitespace-pre-wrap">
            {project.description}
          </dd>
        </div>
        <div className="bg-white p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Start date
          </dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">
            {project.start_date}
          </dd>
        </div>
        <div className="bg-white p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            End date
          </dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">
            {project.end_date ?? "—"}
          </dd>
        </div>
        <div className="bg-white p-4 sm:col-span-2">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Use of funds
          </dt>
          <dd className="mt-1 text-sm text-slate-800">
            {project.use_of_funds.length ? (
              <ul className="list-inside list-disc space-y-0.5">
                {project.use_of_funds.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : (
              <span className="text-slate-500">—</span>
            )}
          </dd>
        </div>
        <div className="bg-white p-4 sm:col-span-2">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Address
          </dt>
          <dd className="mt-1 text-sm text-slate-800">
            {project.street}
            {project.line ?? project.line1 ? (
              <>, {project.line ?? project.line1}</>
            ) : null}
            <br />
            {project.city}, {project.state} {project.zip_code}
          </dd>
        </div>
        <div className="bg-slate-50/90 p-3 sm:col-span-2">
          <p className="text-xs text-slate-500">
            System record ID {project.id}
          </p>
        </div>
      </dl>
    </div>
  );
}

export function AdminProjectShowPage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) {
    return null;
  }
  return <AdminProjectShowBody key={slug} slug={slug} />;
}
