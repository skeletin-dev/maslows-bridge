import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Breadcrumb = { label: string; to?: string };

type AdminPageHeaderProps = {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
};

function IconChevronRight() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function AdminPageHeader({
  title,
  description,
  eyebrow,
  breadcrumbs,
  actions,
}: AdminPageHeaderProps) {
  const hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;

  return (
    <header className="border-b border-slate-200 bg-white px-6 py-5">
      {/* Breadcrumbs or eyebrow */}
      {hasBreadcrumbs ? (
        <nav className="mb-3 flex flex-wrap items-center gap-1 text-xs" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 ? <IconChevronRight /> : null}
              {crumb.to ? (
                <Link
                  to={crumb.to}
                  className="font-medium text-blue-600 transition-colors hover:text-blue-800"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-slate-500">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      ) : eyebrow ? (
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-blue-600">
          {eyebrow}
        </p>
      ) : (
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Administration
        </p>
      )}

      {/* Title row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-sans text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
        {actions ? (
          <div className="shrink-0 sm:pt-0.5">{actions}</div>
        ) : null}
      </div>
    </header>
  );
}
