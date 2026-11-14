import { useMemo, useState, type ReactNode } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import type {
  CustomValidator,
  ErrorSchema,
  RJSFSchema,
  RJSFValidationError,
  UiSchema,
} from "@rjsf/utils";
import { UseOfFundsField } from "./UseOfFundsField";
import { EndDateWidget, StartDateWidget } from "./ProjectDateWidgets";

const customFields = {
  useOfFunds: UseOfFundsField,
};

const customWidgets = {
  startDate: StartDateWidget,
  endDate: EndDateWidget,
};

/** Form value for a month-only start date, e.g. "2026-03". */
const MONTH_ONLY = /^\d{4}-\d{2}$/;

type ProjectFormData = {
  title?: string;
  description?: string;
  /** "YYYY-MM-DD", or "YYYY-MM" when only the month and year are known. */
  start_date?: string;
  end_date?: string;
  use_of_funds?: string[];
  city?: string;
  state?: string;
  zip_code?: string;
  street?: string;
  line1?: string;
};

const FIELD_LABELS: Record<string, string> = {
  title: "Title",
  description: "Description",
  start_date: "Start date",
  end_date: "End date",
  use_of_funds: "Use of funds",
  street: "Street",
  line1: "Line 1",
  city: "City",
  state: "State",
  zip_code: "ZIP / postal code",
};

const projectSchema: RJSFSchema = {
  type: "object",
  required: [
    "title",
    "description",
    "start_date",
    "city",
    "state",
    "zip_code",
    "street",
  ],
  properties: {
    title: { type: "string", title: "Title", minLength: 1, maxLength: 255 },
    description: {
      type: "string",
      title: "Description",
      minLength: 1,
      maxLength: 10000,
    },
    start_date: {
      type: "string",
      title: "Start date",
      pattern: "^\\d{4}-(0[1-9]|1[0-2])(-(0[1-9]|[12]\\d|3[01]))?$",
    },
    end_date: {
      type: "string",
      title: "End date",
      format: "date",
    },
    use_of_funds: {
      type: "array",
      title: "Use of funds",
      description: "One entry per use; blank entries are ignored.",
      items: { type: "string", title: " " },
      default: [],
    },
    street: { type: "string", title: "Street", minLength: 1, maxLength: 255 },
    line1: { type: "string", title: "Line 1 (optional)", maxLength: 255 },
    city: { type: "string", title: "City", minLength: 1, maxLength: 255 },
    state: { type: "string", title: "State", minLength: 1, maxLength: 32 },
    zip_code: {
      type: "string",
      title: "ZIP / postal code",
      minLength: 1,
      maxLength: 20,
    },
  },
};

const projectUiSchema: UiSchema = {
  "ui:submitButtonOptions": {
    norender: true,
  },
  description: {
    "ui:widget": "textarea",
    "ui:options": { rows: 5 },
  },
  start_date: {
    "ui:widget": "startDate",
  },
  end_date: {
    "ui:widget": "endDate",
  },
  use_of_funds: {
    "ui:field": "useOfFunds",
  },
};

function toFormData(p: Project | null): ProjectFormData {
  if (!p) return { use_of_funds: [] };
  return {
    title: p.title,
    description: p.description,
    start_date:
      p.start_date_precision === "month" ? p.start_date.slice(0, 7) : p.start_date,
    end_date: p.end_date ?? undefined,
    use_of_funds: p.use_of_funds ?? [],
    street: p.street,
    line1: p.line1 ?? p.line ?? "",
    city: p.city,
    state: p.state,
    zip_code: p.zip_code,
  };
}

function toPayload(f: ProjectFormData): NewProject {
  const funds = (f.use_of_funds ?? [])
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter(Boolean);
  const start = f.start_date ?? "";
  const monthOnly = MONTH_ONLY.test(start);
  return {
    title: (f.title ?? "").trim(),
    description: (f.description ?? "").trim(),
    start_date: monthOnly ? `${start}-01` : start,
    start_date_precision: monthOnly ? "month" : "day",
    end_date: f.end_date && f.end_date.trim() ? f.end_date : null,
    use_of_funds: funds,
    city: (f.city ?? "").trim(),
    state: (f.state ?? "").trim(),
    zip_code: (f.zip_code ?? "").trim(),
    street: (f.street ?? "").trim(),
    line1: (f.line1 ?? "").trim(),
  };
}

function normalizeFormData(f: ProjectFormData): ProjectFormData {
  const next: ProjectFormData = { ...f };
  for (const key of Object.keys(next) as (keyof ProjectFormData)[]) {
    const v = next[key];
    if (typeof v === "string" && v.trim() === "") {
      delete next[key];
    }
  }
  return next;
}

function fieldLabel(property: string | undefined): string {
  if (!property) return "Field";
  const cleaned = property.replace(/^[./]/, "").split(/[./]/)[0] ?? property;
  return FIELD_LABELS[cleaned] ?? cleaned;
}

function transformErrors(errors: RJSFValidationError[]): RJSFValidationError[] {
  const seen = new Set<string>();
  const out: RJSFValidationError[] = [];
  for (const err of errors) {
    const property = err.property ?? "";
    const label = fieldLabel(property);
    let message = err.message ?? "is invalid";
    switch (err.name) {
      case "required":
        message = `${fieldLabel(`/${err.params?.missingProperty ?? ""}`)} is required`;
        break;
      case "minLength":
        message = "is required";
        break;
      case "maxLength": {
        const limit = err.params?.limit;
        message = limit ? `must be ${limit} characters or fewer` : "is too long";
        break;
      }
      case "format":
        if (err.params?.format === "date") message = "must be a valid date";
        break;
      case "pattern":
        message = "must be a valid date";
        break;
      case "type":
        message = "has an invalid value";
        break;
    }
    // "required" messages already start with the field label.
    const stack = err.name === "required" ? message : `${label} ${message}`;
    const dedupeKey = `${property}|${err.name}|${message}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);
    out.push({ ...err, message, stack });
  }
  return out;
}

const validateDates: CustomValidator<ProjectFormData> = (formData, errors) => {
  const start = formData?.start_date;
  const end = formData?.end_date;
  if (start && end) {
    // A month-only start counts from the 1st of that month (same rule as the API).
    const startDay = MONTH_ONLY.test(start) ? `${start}-01` : start;
    if (end < startDay) errors.end_date?.addError("must be on or after the start date");
  }
  return errors;
};

function toExtraErrors(
  fieldErrors: Record<string, string[]> | undefined,
): ErrorSchema | undefined {
  if (!fieldErrors) return undefined;
  const out: Record<string, { __errors: string[] }> = {};
  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (Array.isArray(messages) && messages.length) {
      out[field] = { __errors: messages };
    }
  }
  return Object.keys(out).length ? (out as unknown as ErrorSchema) : undefined;
}

type ProjectFormProps = {
  project: Project | null;
  submitLabel: string;
  submitting?: boolean;
  formError?: string | null;
  fieldErrors?: Record<string, string[]>;
  onSubmit: (payload: NewProject) => void;
  /** Rendered inside the form, just above the submit button. */
  beforeSubmit?: ReactNode;
  /** Button text while submitting (default "Saving…"). */
  submittingLabel?: string;
};

export function ProjectForm({
  project,
  submitLabel,
  submitting = false,
  formError = null,
  fieldErrors,
  onSubmit,
  beforeSubmit,
  submittingLabel = "Saving…",
}: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>(() =>
    toFormData(project),
  );

  const extraErrors = useMemo(() => toExtraErrors(fieldErrors), [fieldErrors]);

  return (
    <div className="rjsf-admin">
      {formError ? (
        <div
          className="mb-5 flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {formError}
        </div>
      ) : null}

      <Form
        schema={projectSchema}
        uiSchema={projectUiSchema}
        validator={validator}
        fields={customFields}
        widgets={customWidgets}
        customValidate={validateDates}
        formData={formData}
        extraErrors={extraErrors}
        disabled={submitting}
        showErrorList="top"
        noHtml5Validate
        focusOnFirstError
        transformErrors={transformErrors}
        onChange={(e) =>
          setFormData(normalizeFormData((e.formData ?? {}) as ProjectFormData))
        }
        onSubmit={(e) => {
          if (!e.formData) return;
          onSubmit(toPayload(e.formData as ProjectFormData));
        }}
      >
        {beforeSubmit}
        <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:ring-3 focus:ring-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {submittingLabel}
              </>
            ) : submitLabel}
          </button>
          <p className="text-xs text-slate-400">
            {submitting ? "Submitting to API…" : "All required fields must be valid before saving."}
          </p>
        </div>
      </Form>
    </div>
  );
}
