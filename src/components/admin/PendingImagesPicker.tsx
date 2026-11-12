import { useState } from "react";
import {
  MAX_PROJECT_IMAGES,
  prepareImageForUpload,
  validateImageFile,
} from "../../lib/prepareImage";
import { ImageDropzone } from "./ImageDropzone";
import { ImageTile } from "./ImageTile";

export type PendingImage = { key: string; file: File; previewUrl: string };

let pendingKey = 0;

/** Photos chosen on the "New project" page; they are uploaded after the project is created. */
export function PendingImagesPicker({
  value,
  onChange,
  disabled = false,
}: {
  value: PendingImage[];
  onChange: (next: PendingImage[]) => void;
  disabled?: boolean;
}) {
  const [error, setError] = useState<string | null>(null);

  async function addFiles(files: File[]) {
    setError(null);
    const room = MAX_PROJECT_IMAGES - value.length;
    const problems: string[] = [];
    if (files.length > room) problems.push(`Only ${room} more photo${room === 1 ? "" : "s"} can be added.`);

    const prepared = await Promise.all(files.slice(0, Math.max(room, 0)).map(prepareImageForUpload));
    const added: PendingImage[] = [];
    for (const file of prepared) {
      const invalid = validateImageFile(file);
      if (invalid) problems.push(invalid);
      else added.push({ key: `pending-${pendingKey++}`, file, previewUrl: URL.createObjectURL(file) });
    }
    if (problems.length) setError(problems.join(" "));
    if (added.length) onChange([...value, ...added]);
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = value.slice();
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function remove(index: number) {
    URL.revokeObjectURL(value[index].previewUrl);
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="mb-2 space-y-3">
      <div>
        <p className="text-sm font-medium text-slate-700">Photos (optional)</p>
        <p className="mt-0.5 text-xs text-slate-500">
          Uploaded when you create the project. The first photo is the cover; use the arrows to reorder.
        </p>
      </div>
      {error ? (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}
      {value.length ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {value.map((img, i) => (
            <ImageTile
              key={img.key}
              src={img.previewUrl}
              alt={`Photo ${i + 1}: ${img.file.name}`}
              index={i}
              total={value.length}
              disabled={disabled}
              onMove={(dir) => move(i, dir)}
              onRemove={() => remove(i)}
            />
          ))}
        </ul>
      ) : null}
      <ImageDropzone
        onFiles={(files) => void addFiles(files)}
        disabled={disabled || value.length >= MAX_PROJECT_IMAGES}
        hint={value.length ? `${value.length} of ${MAX_PROJECT_IMAGES} photos` : undefined}
      />
    </div>
  );
}
