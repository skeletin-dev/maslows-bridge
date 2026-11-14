import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import api from "../../network/api";
import ValidationError from "../../errors/validationError";
import {
  MAX_PROJECT_IMAGES,
  prepareImageForUpload,
  validateImageFile,
} from "../../lib/prepareImage";
import { ImageDropzone } from "./ImageDropzone";
import { ImageTile } from "./ImageTile";

type Upload = {
  key: number;
  previewUrl: string;
  status: "uploading" | "error";
  error?: string;
};

function errorMessage(e: unknown) {
  if (e instanceof ValidationError) return e.fieldErrors?.images?.join(" ") ?? e.message;
  return e instanceof Error ? e.message : "Something went wrong.";
}

/** Photo manager for an existing project. Every change is saved to the API immediately. */
export function ProjectImagesManager({
  project,
  initialError = null,
}: {
  project: Project;
  initialError?: string | null;
}) {
  const queryClient = useQueryClient();
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [error, setError] = useState<string | null>(initialError);
  const [busy, setBusy] = useState(false);
  const nextKey = useRef(0);
  const images = project.images ?? [];
  const queryKey = ["get-project", project.slug];

  // Free preview blobs if we leave mid-upload.
  const previewUrls = useRef(new Set<string>());
  useEffect(() => {
    const urls = previewUrls.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  function applyUpdate(updated: Project) {
    queryClient.setQueryData(queryKey, updated);
    queryClient.invalidateQueries({ queryKey: ["get-projects"] });
  }

  function dropUpload(key: number) {
    setUploads((prev) => {
      const gone = prev.find((u) => u.key === key);
      if (gone) {
        URL.revokeObjectURL(gone.previewUrl);
        previewUrls.current.delete(gone.previewUrl);
      }
      return prev.filter((u) => u.key !== key);
    });
  }

  async function addFiles(files: File[]) {
    setError(null);
    const inFlight = uploads.filter((u) => u.status === "uploading").length;
    const room = MAX_PROJECT_IMAGES - images.length - inFlight;
    if (room <= 0) {
      setError(`A project can have up to ${MAX_PROJECT_IMAGES} photos.`);
      return;
    }
    if (files.length > room) {
      setError(`Only ${room} more photo${room === 1 ? "" : "s"} can be added (limit ${MAX_PROJECT_IMAGES}).`);
    }

    const prepared = await Promise.all(files.slice(0, room).map(prepareImageForUpload));
    const problems: string[] = [];
    const entries: (Upload & { file: File })[] = [];
    for (const file of prepared) {
      const invalid = validateImageFile(file);
      if (invalid) {
        problems.push(invalid);
        continue;
      }
      const previewUrl = URL.createObjectURL(file);
      previewUrls.current.add(previewUrl);
      entries.push({ key: nextKey.current++, file, previewUrl, status: "uploading" });
    }
    if (problems.length) setError(problems.join(" "));
    setUploads((prev) => [...prev, ...entries]);

    // One at a time, so photos land in the order they were picked.
    for (const entry of entries) {
      try {
        applyUpdate(await api.projects.uploadImages(project.id, [entry.file]));
        dropUpload(entry.key);
      } catch (e) {
        setUploads((prev) =>
          prev.map((u) => (u.key === entry.key ? { ...u, status: "error", error: errorMessage(e) } : u)),
        );
      }
    }
  }

  async function removeImage(image: ProjectImage, index: number) {
    if (!window.confirm(`Delete photo ${index + 1}? This can't be undone.`)) return;
    setBusy(true);
    setError(null);
    try {
      applyUpdate(await api.projects.deleteImage({ id: project.id, imageId: image.id }));
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  async function moveImage(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const reordered = images.slice();
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

    const previous = project;
    queryClient.setQueryData(queryKey, { ...project, images: reordered }); // optimistic
    setBusy(true);
    setError(null);
    try {
      applyUpdate(
        await api.projects.reorderImages({ id: project.id, imageIds: reordered.map((i) => i.id) }),
      );
    } catch (e) {
      queryClient.setQueryData(queryKey, previous);
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }

  const total = images.length + uploads.length;

  return (
    <div className="space-y-4">
      {error ? (
        <div role="alert" className="flex items-start justify-between gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} className="shrink-0 cursor-pointer text-xs font-medium text-red-700 underline">
            Dismiss
          </button>
        </div>
      ) : null}

      {total > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, i) => (
            <ImageTile
              key={image.id}
              src={image.url}
              alt={`Photo ${i + 1}: ${image.filename}`}
              index={i}
              total={images.length}
              disabled={busy}
              onMove={(dir) => void moveImage(i, dir)}
              onRemove={() => void removeImage(image, i)}
              removeLabel="Delete photo"
            />
          ))}
          {uploads.map((u, i) => (
            <ImageTile
              key={`upload-${u.key}`}
              src={u.previewUrl}
              alt="Photo being uploaded"
              index={images.length + i}
              total={total}
              status={u.status}
              error={u.error}
              onRemove={u.status === "error" ? () => dropUpload(u.key) : undefined}
              removeLabel="Dismiss failed upload"
            />
          ))}
        </ul>
      ) : null}

      <ImageDropzone
        onFiles={(files) => void addFiles(files)}
        disabled={images.length >= MAX_PROJECT_IMAGES}
        hint={`${images.length} of ${MAX_PROJECT_IMAGES} photos`}
      />
    </div>
  );
}
