import { useState } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import { SITE } from "../site"

const navClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-md px-3 py-2 text-base font-semibold transition-colors sm:text-sm",
    isActive
      ? "text-mb-accent"
      : "text-mb-text-on-dark/90 hover:text-mb-accent",
  ].join(" ")

const subNavClass = ({ isActive }: { isActive: boolean }) =>
  [
    "block rounded-md py-2 pl-3 pr-3 text-sm sm:py-1.5",
    isActive ? "text-mb-accent" : "text-mb-text-muted hover:text-mb-accent",
  ].join(" ")

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const projectsActive = pathname.startsWith("/projects")

  return (
    <header className="sticky top-0 z-50 border-b border-mb-surface-elevated/80 bg-mb-surface shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:py-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={SITE.logoSrc}
            alt=""
            width={48}
            height={48}
            className="h-10 w-10 rounded-xl object-cover sm:h-12 sm:w-12"
          />
          <span className="font-display text-lg font-bold tracking-tight text-mb-text-on-dark sm:text-xl">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Main">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/services" className={navClass}>
            Services
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/history" className={navClass}>
            History
          </NavLink>
          <div className="group relative">
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `${navClass({ isActive: isActive || projectsActive })} inline-flex items-center gap-1`
              }
            >
              Projects
              <span className="text-xs opacity-70" aria-hidden>
                ▾
              </span>
            </NavLink>
            <div className="invisible absolute left-0 top-full z-50 min-w-[14rem] pt-1 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="rounded-lg border border-mb-surface-elevated bg-mb-surface py-1 shadow-lg">
                <NavLink to="/projects/winter-warmth-drive" className={subNavClass}>
                  Winter Warmth Drive
                </NavLink>
                <NavLink to="/projects/love-in-action" className={subNavClass}>
                  Love In Action
                </NavLink>
              </div>
            </div>
          </div>
          <NavLink to="/contact-us" className={navClass}>
            Contact
          </NavLink>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-mb-accent lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={[
          "border-t border-mb-surface-elevated bg-mb-surface lg:hidden",
          open ? "block" : "hidden",
        ].join(" ")}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4" aria-label="Mobile">
          <NavLink to="/" className={navClass} end onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/services" className={navClass} onClick={() => setOpen(false)}>
            Services
          </NavLink>
          <NavLink to="/about" className={navClass} onClick={() => setOpen(false)}>
            About
          </NavLink>
          <NavLink to="/history" className={navClass} onClick={() => setOpen(false)}>
            History
          </NavLink>
          <NavLink to="/projects" className={navClass} onClick={() => setOpen(false)}>
            Projects
          </NavLink>
          <div className="ml-3 flex flex-col border-l border-mb-surface-elevated pl-3">
            <NavLink
              to="/projects/winter-warmth-drive"
              className={subNavClass}
              onClick={() => setOpen(false)}
            >
              Winter Warmth Drive
            </NavLink>
            <NavLink to="/projects/love-in-action" className={subNavClass} onClick={() => setOpen(false)}>
              Love In Action
            </NavLink>
          </div>
          <NavLink to="/contact-us" className={navClass} onClick={() => setOpen(false)}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
