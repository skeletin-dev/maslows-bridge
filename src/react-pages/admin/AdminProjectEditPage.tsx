import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { ProjectForm } from "../../components/admin/ProjectForm";
import api from "../../network/api";
import NotFoundError from "../../errors/notFoundError";
import ValidationError from "../../errors/validationError";

function AdminProjectEditBody({ slug }: { slug: string }) {
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

  const {
    mutate,
    isPending,
    error: saveError,
  } = useMutation({
    mutationFn: api.projects.update,
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["get-projects"] });
      queryClient.invalidateQueries({ queryKey: ["get-project", slug] });
      navigate(`/admin/projects/${updated.slug}`, { replace: true });
    },
  });

  function handleUpdate(payload: NewProject) {
    if (!project) return;
    mutate({ id: project.id, payload });
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
          title="Edit project"
          breadcrumbs={[{ label: "Projects", to: "/admin" }, { label: "Edit" }]}
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
          title="Edit project"
          description="Retrieving the latest record…"
          breadcrumbs={[{ label: "Projects", to: "/admin" }, { label: "Edit" }]}
        />
        <div className="px-6 py-6">
          <div className="space-y-3">
            {[240, 160, 320, 120, 280].map((w) => (
              <div key={w} className="h-4 animate-pulse rounded bg-slate-100" style={{ maxWidth: w }} />
            ))}
          </div>
        </div>
      </>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────

  const validationError = saveError instanceof ValidationError ? saveError : undefined;
  const formError = saveError
    ? validationError
      ? validationError.message
      : saveError.message
    : null;

  return (
    <>
      <AdminPageHeader
        title="Edit project"
        description={
          <span className="font-mono text-xs text-slate-400">
            ID {project.id} &middot; {project.title}
          </span>
        }
        breadcrumbs={[
          { label: "Projects", to: "/admin" },
          { label: project.title, to: `/admin/projects/${project.slug}` },
          { label: "Edit" },
        ]}
      />
      <div className="px-6 py-6">
        <ProjectForm
          key={String(project.id)}
          project={project}
          submitLabel="Save changes"
          submitting={isPending}
          formError={formError}
          fieldErrors={validationError?.fieldErrors}
          onSubmit={handleUpdate}
        />
      </div>
    </>
  );
}

export function AdminProjectEditPage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return null;
  return <AdminProjectEditBody key={slug} slug={slug} />;
}
