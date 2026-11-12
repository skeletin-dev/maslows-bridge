import { useRef, useState } from "react";
import type { WidgetProps } from "@rjsf/utils";

/**
 * Form values: "YYYY-MM-DD" for an exact date, "YYYY-MM" for month + year only.
 * ProjectForm converts these to `start_date` + `start_date_precision` for the API.
 */
const MONTH_ONLY = /^\d{4}-\d{2}$/;
const FULL_DATE = /^\d{4}-\d{2}-\d{2}$/;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function yearOptions(selected: string) {
  const current = new Date().getFullYear();
  const years: number[] = [];
  for (let y = current + 5; y >= 2000; y--) years.push(y);
  const sel = Number(selected);
  if (sel && !years.includes(sel)) years.push(sel);
  return years.sort((a, b) => b - a);
}

const segmentBase =
  "flex-1 cursor-pointer rounded px-3 py-1.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500 disabled:cursor-not-allowed sm:flex-none";

export function StartDateWidget({ id, value, onChange, onBlur, disabled, readonly, rawErrors }: WidgetProps) {
  const str = typeof value === "string" ? value : "";
  const [mode, setMode] = useState<DatePrecision>(MONTH_ONLY.test(str) ? "month" : "day");
  // Month/year are kept locally so a half-filled pair (month chosen, no year yet) isn't lost.
  const [month, setMonth] = useState(str.length >= 7 ? str.slice(5, 7) : "");
  const [year, setYear] = useState(str.length >= 4 ? str.slice(0, 4) : "");
  // Remember the exact day so toggling month -> day -> month -> day doesn't drop it.
  const lastDay = useRef(FULL_DATE.test(str) ? str.slice(8, 10) : "01");

  const locked = Boolean(disabled || readonly);
  const invalid = Boolean(rawErrors?.length);

  function emitMonth(nextMonth: string, nextYear: string) {
    onChange(nextMonth && nextYear ? `${nextYear}-${nextMonth}` : undefined);
  }

  function switchMode(next: DatePrecision) {
    if (next === mode) return;
    setMode(next);
    if (next === "month") {
      if (FULL_DATE.test(str)) {
        lastDay.current = str.slice(8, 10);
        setYear(str.slice(0, 4));
        setMonth(str.slice(5, 7));
        onChange(str.slice(0, 7));
      } else {
        emitMonth(month, year);
      }
    } else {
      onChange(month && year ? `${year}-${month}-${lastDay.current}` : undefined);
    }
  }

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Start date format"
        className="mb-2 flex w-full gap-1 rounded-md bg-slate-100 p-1 sm:inline-flex sm:w-auto"
      >
        {(
          [
            ["day", "Exact date"],
            ["month", "Month & year only"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={mode === key}
            disabled={locked}
            onClick={() => switchMode(key)}
            className={`${segmentBase} ${
              mode === key
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "day" ? (
        <input
          id={id}
          type="date"
          className="form-control"
          value={FULL_DATE.test(str) ? str : ""}
          disabled={locked}
          aria-invalid={invalid || undefined}
          onChange={(e) => {
            const v = e.target.value;
            if (v) {
              lastDay.current = v.slice(8, 10);
              setYear(v.slice(0, 4));
              setMonth(v.slice(5, 7));
            }
            onChange(v || undefined);
          }}
          onBlur={() => onBlur(id, value)}
        />
      ) : (
        <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-2 sm:max-w-sm">
          <select
            id={id}
            className="form-control"
            aria-label="Start month"
            value={month}
            disabled={locked}
            aria-invalid={invalid || undefined}
            onChange={(e) => {
              setMonth(e.target.value);
              emitMonth(e.target.value, year);
            }}
            onBlur={() => onBlur(id, value)}
          >
            <option value="">Month</option>
            {MONTHS.map((name, i) => (
              <option key={name} value={String(i + 1).padStart(2, "0")}>
                {name}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            aria-label="Start year"
            value={year}
            disabled={locked}
            aria-invalid={invalid || undefined}
            onChange={(e) => {
              setYear(e.target.value);
              emitMonth(month, e.target.value);
            }}
            onBlur={() => onBlur(id, value)}
          >
            <option value="">Year</option>
            {yearOptions(year).map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
        </div>
      )}

      <p className="mt-1.5 text-xs text-slate-500">
        {mode === "month"
          ? "The site will show only the month and year, e.g. “March 2026”."
          : "Use “Month & year only” if the exact day isn’t known."}
      </p>
    </div>
  );
}

export function EndDateWidget({ id, value, onChange, onBlur, disabled, readonly, rawErrors }: WidgetProps) {
  const str = typeof value === "string" ? value : "";
  const locked = Boolean(disabled || readonly);

  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="date"
          className="form-control"
          value={str}
          disabled={locked}
          aria-invalid={rawErrors?.length ? true : undefined}
          aria-describedby={`${id}__hint`}
          onChange={(e) => onChange(e.target.value || undefined)}
          onBlur={() => onBlur(id, value)}
        />
        {str ? (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            disabled={locked}
            className="shrink-0 cursor-pointer rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear
          </button>
        ) : null}
      </div>
      <p id={`${id}__hint`} className="mt-1.5 text-xs text-slate-500">
        Optional. Leave blank if the project is ongoing; the site will show “Present”.
      </p>
    </div>
  );
}
