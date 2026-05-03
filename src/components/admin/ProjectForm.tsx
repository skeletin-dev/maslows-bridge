import { useMemo, useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import type {
  ErrorSchema,
  RJSFSchema,
  RJSFValidationError,
  UiSchema,
} from "@rjsf/utils";
import { UseOfFundsField } from "./UseOfFundsField";

const customFields = {
  useOfFunds: UseOfFundsField,
};

type ProjectFormData = {
  title?: string;
  description?: string;
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
      format: "date",
      minLength: 1,
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
    "ui:options": { rows: 4 },
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
    start_date: p.start_date,
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
  return {
    title: (f.title ?? "").trim(),
    description: (f.description ?? "").trim(),
    start_date: f.start_date ?? "",
    end_date: f.end_date && f.end_date.trim() ? f.end_date : null,
    use_of_funds: funds,
    city: (f.city ?? "").trim(),
    state: (f.state ?? "").trim(),
    zip_code: (f.zip_code ?? "").trim(),
    street: (f.street ?? "").trim(),
    line1: (f.line1 ?? "").trim(),
  };
}

// Treat empty strings on top-level scalar fields as missing values so
// `required` validation fires (and `format: date` doesn't complain about "").
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
        message = limit
          ? `must be ${limit} characters or fewer`
          : "is too long";
        break;
      }
      case "format":
        if (err.params?.format === "date") message = "must be a valid date";
        break;
      case "type":
        message = "has an invalid value";
        break;
    }

    const stack = `${label} ${message}`;
    const dedupeKey = `${property}|${err.name}|${message}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    out.push({
      ...err,
      message,
      stack,
    });
  }
  return out;
}

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
};

export function ProjectForm({
  project,
  submitLabel,
  submitting = false,
  formError = null,
  fieldErrors,
  onSubmit,
}: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>(() =>
    toFormData(project),
  );

  const extraErrors = useMemo(() => toExtraErrors(fieldErrors), [fieldErrors]);

  return (
    <div className="rjsf-admin">
      {formError ? (
        <p
          className="mb-4 rounded-md border border-red-200/90 bg-red-50 px-3 py-2.5 text-sm text-red-900"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <Form
        schema={projectSchema}
        uiSchema={projectUiSchema}
        validator={validator}
        fields={customFields}
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
        <div className="mt-6">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-w-36 items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50"
          >
            {submitting ? "Saving…" : submitLabel}
          </button>
        </div>
      </Form>
    </div>
  );
}
