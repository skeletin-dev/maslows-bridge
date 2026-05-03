import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { ProjectForm } from "../../components/admin/ProjectForm";
import api from "../../network/api";
import ValidationError from "../../errors/validationError";

export function AdminProjectNewPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: api.projects.create,
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ["get-projects"] });
      navigate(`/admin/projects/${created.slug}`, { replace: true });
    },
  });

  function handleCreate(payload: NewProject) {
    mutate(payload);
  }

  const validationError = error instanceof ValidationError ? error : undefined;
  const formError = error
    ? validationError
      ? validationError.message
      : error.message
    : null;

  return (
    <div>
      <AdminPageHeader
        title="New project"
        description="All required fields must match the validation rules of the public API."
        breadcrumbs={[{ label: "Projects", to: "/admin" }, { label: "New" }]}
      />
      <div className="mt-8 border-t border-slate-200/80 pt-8">
        <ProjectForm
          key="new"
          project={null}
          submitLabel="Create project"
          submitting={isPending}
          formError={formError}
          fieldErrors={validationError?.fieldErrors}
          onSubmit={handleCreate}
        />
      </div>
    </div>
  );
}
