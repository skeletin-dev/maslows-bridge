import type { ReactNode } from "react"
import { Link } from "react-router-dom"

type Breadcrumb = { label: string; to?: string }

type AdminPageHeaderProps = {
  title: string
  description?: string
  eyebrow?: string
  breadcrumbs?: Breadcrumb[]
  actions?: ReactNode
}

export function AdminPageHeader({
  title,
  description,
  eyebrow = "Administration",
  breadcrumbs,
  actions,
}: AdminPageHeaderProps) {
  return (
    <header className="border-b border-slate-200/80 pb-6">
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav
          className="mb-3 flex flex-wrap items-center gap-x-2 text-xs text-slate-500"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 ? <span className="text-slate-300" aria-hidden>/</span> : null}
              {crumb.to ? (
                <Link
                  to={crumb.to}
                  className="font-medium text-slate-600 hover:text-slate-900"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-slate-700">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      ) : (
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-1.5 text-sm text-slate-600">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0 sm:pt-0.5">{actions}</div> : null}
      </div>
    </header>
  )
}
