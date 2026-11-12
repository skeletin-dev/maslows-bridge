import { useId, useRef, useState } from "react";
import { PICKER_ACCEPT } from "../../lib/prepareImage";

type ImageDropzoneProps = {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
  /** e.g. "3 of 30 photos" */
  hint?: string;
};

/** Click-to-browse + drag-and-drop photo picker. On phones it opens the photo library/camera. */
export function ImageDropzone({ onFiles, disabled = false, hint }: ImageDropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFiles(list: FileList | null) {
    const files = Array.from(list ?? []);
    if (files.length) onFiles(files);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <label
      htmlFor={inputId}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (!disabled) handleFiles(e.dataTransfer.files);
      }}
      className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-7 text-center transition focus-within:ring-2 focus-within:ring-blue-500/25 ${
        disabled
          ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60"
          : dragging
            ? "cursor-copy border-blue-400 bg-blue-50"
            : "cursor-pointer border-slate-300 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"
      }`}
    >
      <svg className="h-8 w-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span className="text-sm font-medium text-slate-700">
        <span className="text-blue-600">Choose photos</span>
        <span className="hidden sm:inline"> or drag them here</span>
      </span>
      <span className="text-xs text-slate-500">
        JPEG, PNG, WebP, GIF or iPhone photos. Large photos are resized automatically.
      </span>
      {hint ? <span className="text-xs font-medium text-slate-400">{hint}</span> : null}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={PICKER_ACCEPT}
        multiple
        disabled={disabled}
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </label>
  );
}
