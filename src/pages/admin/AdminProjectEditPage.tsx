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

  console.log(project);

  function handleUpdate(payload: NewProject) {
    mutate({ id: project?.id, payload });
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
        <AdminPageHeader title="Edit project" />
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
        <AdminPageHeader
          title="Edit project"
          description="Retrieving the latest project record…"
        />
        <div className="mt-8 flex justify-center py-8">
          <div className="h-1 w-40 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-400" />
          </div>
        </div>
      </div>
    );
  }

  const validationError =
    saveError instanceof ValidationError ? saveError : undefined;
  const formError = saveError
    ? validationError
      ? validationError.message
      : saveError.message
    : null;

  return (
    <div>
      <AdminPageHeader
        title="Edit project"
        description={`Record #${project.id} · ${project.title}`}
        breadcrumbs={[
          { label: "Projects", to: "/admin" },
          { label: project.title, to: `/admin/projects/${project.id}` },
          { label: "Edit" },
        ]}
      />
      <div className="mt-8 border-t border-slate-200/80 pt-8">
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
    </div>
  );
}

export function AdminProjectEditPage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) {
    return null;
  }
  return <AdminProjectEditBody key={slug} slug={slug} />;
}
