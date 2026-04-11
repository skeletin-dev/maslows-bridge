import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { SITE } from "../site"

const FOOTER_NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/history", label: "History" },
  { to: "/team", label: "Team" },
  { to: "/contact-us", label: "Contact" },
] as const

const linkClass =
  "text-sm font-medium text-mb-text-muted transition-colors hover:text-mb-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mb-accent"

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-mb-surface-elevated/40 text-mb-accent/90 transition-colors hover:border-mb-accent/30 hover:bg-mb-surface-elevated hover:text-mb-text-on-dark"
      aria-label={label}
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-mb-surface-elevated bg-mb-surface">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-mb-accent/40 to-transparent opacity-90" aria-hidden />

      <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 sm:pb-12 sm:pt-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-5">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-lg outline-offset-4 transition-opacity hover:opacity-90"
            >
              <img
                src={SITE.logoSrc}
                alt=""
                width={52}
                height={52}
                className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/10"
              />
              <span className="font-display text-xl font-bold tracking-tight text-mb-text-on-dark">{SITE.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mb-text-muted">{SITE.footerTagline}</p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-mb-accent">Explore</h2>
            <ul className="mt-5 flex flex-col gap-2.5" role="list">
              {FOOTER_NAV.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-mb-accent">Connect</h2>
            <p className="mt-5 text-sm leading-relaxed text-mb-text-muted">
              Follow along or reach out—we read every message.
            </p>
            <Link
              to="/contact-us"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mb-accent transition-colors hover:text-mb-text-on-dark"
            >
              Contact us
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <div className="mt-6 flex flex-wrap gap-3">
              <SocialIcon href={SITE.social.facebook} label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.473h3.047V9.428c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.473h-2.796v8.413C19.612 23.027 24 18.034 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={SITE.social.instagram} label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </SocialIcon>
              <SocialIcon href={SITE.social.youtube} label="YouTube">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-mb-text-muted sm:text-left">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
