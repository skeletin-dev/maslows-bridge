import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSiteMotion } from "../hooks/useSiteMotion";
import { SITE } from "../site";

const navClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-md px-3 py-2 text-base font-semibold transition-colors sm:text-sm",
    isActive
      ? "text-mb-accent"
      : "text-mb-text-on-dark/90 hover:text-mb-accent",
  ].join(" ");

const mobileLinks: { to: string; end?: boolean; label: string }[] = [
  { to: "/", end: true, label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/history", label: "History" },
  { to: "/team", label: "Team" },
  { to: "/contact-us", label: "Contact" },
]

const easeOut = [0.22, 1, 0.36, 1] as const

export function Header() {
  const [open, setOpen] = useState(false);
  const m = useSiteMotion();

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

        <nav
          className="hidden lg:flex lg:items-center lg:gap-1"
          aria-label="Main"
        >
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
          <NavLink to="/team" className={navClass}>
            Team
          </NavLink>
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
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={
              m.isReduced
                ? { duration: 0.2, ease: m.ease }
                : {
                    height: { duration: 0.4, ease: easeOut },
                  }
            }
            className="overflow-hidden border-t border-mb-surface-elevated bg-mb-surface lg:hidden"
          >
            <motion.div
              initial={m.isReduced ? false : { opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                m.isReduced
                  ? { duration: 0 }
                  : {
                      opacity: { duration: 0.28, ease: easeOut },
                      y: { type: "spring", stiffness: 420, damping: 34, mass: 0.7 },
                    }
              }
              className="will-change-transform"
            >
              <nav
                className="mx-auto flex max-w-6xl flex-col px-4 py-4"
                aria-label="Mobile"
              >
                {mobileLinks.map(({ to, end, label }, i) =>
                  m.isReduced ? (
                    <NavLink
                      key={to}
                      to={to}
                      className={navClass}
                      end={end}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </NavLink>
                  ) : (
                    <motion.div
                      key={to}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.06 + i * 0.055,
                        duration: 0.32,
                        ease: easeOut,
                      }}
                      className="[&:not(:first-child)]:mt-0.5"
                    >
                      <NavLink
                        to={to}
                        className={navClass}
                        end={end}
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </NavLink>
                    </motion.div>
                  ),
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
