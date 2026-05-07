import { useCallback, useMemo } from "react";
import type { FieldProps } from "@rjsf/utils";

type ItemErrorSchema = {
  __errors?: string[];
};

type UseOfFundsErrorSchema = {
  __errors?: string[];
} & Record<string, ItemErrorSchema>;

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
      <path d="M10 4.5v11M4.5 10h11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
      <path
        d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m-6.25 0 .6 9.02a1.5 1.5 0 0 0 1.5 1.4h4.3a1.5 1.5 0 0 0 1.5-1.4L14.25 6M8.75 9.5v4.25M11.25 9.5v4.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UseOfFundsField(props: FieldProps) {
  const {
    formData,
    onChange,
    disabled,
    readonly,
    errorSchema,
    fieldPathId,
    required,
  } = props;

  const items = useMemo<string[]>(
    () =>
      Array.isArray(formData)
        ? (formData as unknown[]).map((v) => (typeof v === "string" ? v : ""))
        : [],
    [formData],
  );

  const locked = Boolean(disabled || readonly);
  const rootId = fieldPathId?.$id ?? "root_use_of_funds";
  const rootPath = useMemo(() => fieldPathId?.path ?? [], [fieldPathId?.path]);
  const schemaErrors = (errorSchema ?? {}) as UseOfFundsErrorSchema;
  const topErrors = schemaErrors.__errors ?? [];

  const updateItem = useCallback(
    (index: number, value: string) => {
      const next = items.slice();
      next[index] = value;
      onChange(next, rootPath);
    },
    [items, onChange, rootPath],
  );

  const addItem = useCallback(() => {
    onChange([...items, ""], rootPath);
  }, [items, onChange, rootPath]);

  const removeItem = useCallback(
    (index: number) => {
      onChange(items.filter((_, i) => i !== index), rootPath);
    },
    [items, onChange, rootPath],
  );

  return (
    <div className="use-of-funds-field">
      {/* Label row */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <label
            className="block text-sm font-medium text-slate-700"
            htmlFor={rootId}
          >
            Use of funds
            {required ? (
              <span className="ml-0.5 text-blue-600">*</span>
            ) : null}
          </label>
          <p className="mt-0.5 text-xs text-slate-500">
            How donations are allocated. Blank entries are ignored.
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600 ring-1 ring-inset ring-blue-500/20">
          {items.length} {items.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="mt-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
          <p className="text-sm text-slate-500">No allocation entries yet.</p>
          <button
            type="button"
            onClick={addItem}
            disabled={locked}
            className="mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlusIcon />
            Add entry
          </button>
        </div>
      ) : (
        <ul className="mt-3 space-y-2" id={rootId}>
          {items.map((value, i) => {
            const itemErrors = schemaErrors[i]?.__errors ?? [];
            const itemId = `${rootId}_${i}`;
            const hasError = itemErrors.length > 0;
            return (
              <li
                key={i}
                className={`rounded-md border bg-white p-2.5 shadow-sm transition focus-within:ring-2 ${
                  hasError
                    ? "border-red-300 focus-within:ring-red-500/15"
                    : "border-slate-200 focus-within:border-blue-400 focus-within:ring-blue-500/15"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-100 text-[10px] font-semibold tabular-nums text-slate-500"
                  >
                    {i + 1}
                  </span>
                  <input
                    id={itemId}
                    type="text"
                    value={value ?? ""}
                    onChange={(e) => updateItem(i, e.target.value)}
                    disabled={locked}
                    aria-label={`Use of funds entry ${i + 1}`}
                    aria-invalid={hasError || undefined}
                    placeholder="e.g. Community outreach programs"
                    className="min-w-0 flex-1 rounded border border-transparent bg-transparent px-2.5 py-1.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-200 focus:bg-slate-50 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    disabled={locked}
                    aria-label={`Remove entry ${i + 1}`}
                    className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded border border-red-200 bg-red-50 px-2 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <TrashIcon />
                    Remove
                  </button>
                </div>
                {hasError ? (
                  <ul className="ml-7 mt-1.5 list-none p-0 text-xs text-red-700">
                    {itemErrors.map((msg, idx) => <li key={idx}>{msg}</li>)}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      {items.length > 0 ? (
        <button
          type="button"
          onClick={addItem}
          disabled={locked}
          className="mt-2.5 inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PlusIcon />
          Add another entry
        </button>
      ) : null}

      {topErrors.length > 0 ? (
        <ul className="mt-2 list-none p-0 text-sm text-red-700">
          {topErrors.map((msg, i) => <li key={i}>{msg}</li>)}
        </ul>
      ) : null}
    </div>
  );
}
