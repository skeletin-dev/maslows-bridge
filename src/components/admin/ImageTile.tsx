type ImageTileProps = {
  src: string;
  alt: string;
  index: number;
  total: number;
  status?: "ready" | "uploading" | "error";
  error?: string;
  disabled?: boolean;
  onMove?: (direction: -1 | 1) => void;
  onRemove?: () => void;
  removeLabel?: string;
};

const iconButton =
  "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-35";

/** A photo thumbnail with always-visible controls (no hover needed, so it works on touch screens). */
export function ImageTile({
  src,
  alt,
  index,
  total,
  status = "ready",
  error,
  disabled = false,
  onMove,
  onRemove,
  removeLabel = "Remove photo",
}: ImageTileProps) {
  const isCover = index === 0;
  return (
    <li className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-slate-100">
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        {isCover && status === "ready" ? (
          <span className="absolute left-2 top-2 rounded bg-slate-900/80 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            Cover
          </span>
        ) : null}
        {status === "uploading" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <svg className="h-6 w-6 animate-spin text-blue-600" viewBox="0 0 24 24" fill="none" aria-label="Uploading">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : null}
        {status === "error" ? (
          <div className="absolute inset-0 flex items-end bg-red-900/45 p-2">
            <p className="rounded bg-white/95 px-2 py-1 text-[11px] leading-snug text-red-700">
              {error ?? "Upload failed"}
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-1 border-t border-slate-100 px-1.5 py-1">
        {onMove ? (
          <div className="flex items-center">
            <button
              type="button"
              className={iconButton}
              onClick={() => onMove(-1)}
              disabled={disabled || index === 0}
              aria-label={`Move photo ${index + 1} earlier`}
              title="Move earlier"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12.5 15 7.5 10l5-5" />
              </svg>
            </button>
            <button
              type="button"
              className={iconButton}
              onClick={() => onMove(1)}
              disabled={disabled || index === total - 1}
              aria-label={`Move photo ${index + 1} later`}
              title="Move later"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m7.5 15 5-5-5-5" />
              </svg>
            </button>
          </div>
        ) : (
          <span className="px-2 text-[11px] text-slate-400">{status === "uploading" ? "Uploading…" : ""}</span>
        )}
        {onRemove ? (
          <button
            type="button"
            className={`${iconButton} text-red-600 hover:bg-red-50 hover:text-red-700`}
            onClick={onRemove}
            disabled={disabled}
            aria-label={`${removeLabel} ${index + 1}`}
            title={removeLabel}
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m-6.25 0 .6 9.02a1.5 1.5 0 0 0 1.5 1.4h4.3a1.5 1.5 0 0 0 1.5-1.4L14.25 6" />
            </svg>
          </button>
        ) : null}
      </div>
    </li>
  );
}
