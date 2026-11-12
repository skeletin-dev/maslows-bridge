import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { ProjectForm } from "../../components/admin/ProjectForm";
import {
  PendingImagesPicker,
  type PendingImage,
} from "../../components/admin/PendingImagesPicker";
import api from "../../network/api";
import ValidationError from "../../errors/validationError";

export type EditPageState = { photoError?: string };

export function AdminProjectNewPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [photos, setPhotos] = useState<PendingImage[]>([]);
  const [progress, setProgress] = useState<string | null>(null);

  // Revoke preview URLs when leaving the page.
  const photosRef = useRef(photos);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.previewUrl)), []);

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (payload: NewProject) => {
      const created = await api.projects.create(payload);
      let failed = 0;
      for (const [i, photo] of photos.entries()) {
        setProgress(`Uploading photo ${i + 1} of ${photos.length}…`);
        try {
          await api.projects.uploadImages(created.id, [photo.file]);
        } catch {
          failed++;
        }
      }
      return { created, failed };
    },
    onSettled: () => setProgress(null),
    onSuccess: ({ created, failed }) => {
      queryClient.invalidateQueries({ queryKey: ["get-projects"] });
      if (failed) {
        const state: EditPageState = {
          photoError: `The project was created, but ${failed} photo${failed === 1 ? "" : "s"} couldn't be uploaded. Please add ${failed === 1 ? "it" : "them"} again below.`,
        };
        navigate(`/admin/projects/${created.slug}/edit`, { replace: true, state });
      } else {
        navigate(`/admin/projects/${created.slug}`, { replace: true });
      }
    },
  });

  const validationError = error instanceof ValidationError ? error : undefined;
  const formError = error
    ? validationError
      ? validationError.message
      : error.message
    : null;

  return (
    <>
      <AdminPageHeader
        title="New project"
        description="Fill in all required fields. The record will be live after your next publish."
        breadcrumbs={[{ label: "Projects", to: "/admin" }, { label: "New project" }]}
      />
      <div className="px-6 py-6">
        <ProjectForm
          key="new"
          project={null}
          submitLabel="Create project"
          submitting={isPending}
          submittingLabel={progress ?? "Saving…"}
          formError={formError}
          fieldErrors={validationError?.fieldErrors}
          onSubmit={(payload) => mutate(payload)}
          beforeSubmit={
            <div className="mt-2 border-t border-slate-200 pt-6">
              <PendingImagesPicker value={photos} onChange={setPhotos} disabled={isPending} />
            </div>
          }
        />
      </div>
    </>
  );
}
