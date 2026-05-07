import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSiteMotion } from "../hooks/useSiteMotion";
import { SITE } from "../site";
import { ScrollProgress } from "./ScrollProgress";

const NAV_LINKS: { to: string; end?: boolean; label: string }[] = [
  { to: "/", end: true, label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/history", label: "History" },
  { to: "/team", label: "Team" },
  { to: "/contact-us", label: "Contact" },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [heroSolid, setHeroSolid] = useState(false);
  const location = useLocation();
  const m = useSiteMotion();
  const isHome = location.pathname === "/";
  const isTransparent = isHome && !heroSolid;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setHeroSolid(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (isHome) setHeroSolid(false);
  }, [isHome]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    [
      "focus-ring cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
      isActive
        ? "text-mb-accent"
        : isTransparent
          ? "text-white/80 hover:text-mb-accent"
          : "text-mb-text-muted hover:text-mb-accent",
    ].join(" ");

  const positionClass = isHome ? "fixed top-0 left-0 right-0" : "sticky top-0";

  return (
    <>
    <ScrollProgress />
    <header
      aria-label={SITE.name}
      className={[
        positionClass,
        "z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "border-b border-mb-accent/20 bg-mb-surface/98 backdrop-blur-md",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6">
        {/* Logo — LEFT */}
        <Link
          to="/"
          className="focus-ring flex shrink-0 cursor-pointer items-center gap-2.5 rounded-lg p-1 outline-offset-2 transition-opacity duration-200 hover:opacity-85"
        >
          <img
            src={SITE.logoSrc}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg object-cover ring-1 ring-white/15"
          />
          <span
            className={`font-sans text-sm font-semibold tracking-tight transition-colors duration-200 ${
              isTransparent ? "text-white" : "text-mb-text-on-dark"
            }`}
          >
            {SITE.name}
          </span>
        </Link>

        {/* Divider */}
        <div
          className={`mx-1 hidden h-5 w-px shrink-0 lg:block ${
            isTransparent ? "bg-white/18" : "bg-white/10"
          }`}
          aria-hidden
        />

        {/* Desktop Nav — CENTER */}
        <nav
          className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ to, end, label }) => (
            <NavLink key={to} to={to} end={end} className={navClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Spacer (mobile only — pushes hamburger right) */}
        <div className="flex-1 lg:flex-none" aria-hidden />

        {/* Social icons — desktop */}
        <div
          className={`hidden items-center gap-0.5 border-r pr-4 sm:flex ${
            isTransparent ? "border-white/15" : "border-white/10"
          }`}
        >
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="focus-ring cursor-pointer rounded-lg p-2 text-mb-text-muted transition-colors duration-200 hover:text-mb-accent"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a
            href={SITE.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="focus-ring cursor-pointer rounded-lg p-2 text-mb-text-muted transition-colors duration-200 hover:text-mb-accent"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.473h3.047V9.428c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.473h-2.796v8.413C19.612 23.027 24 18.034 24 12.073z" />
            </svg>
          </a>
          <a
            href={SITE.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="focus-ring cursor-pointer rounded-lg p-2 text-mb-text-muted transition-colors duration-200 hover:text-mb-accent"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>

        {/* CTA — RIGHT */}
        <Link
          to="/contact-us"
          className="focus-ring hidden shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-mb-accent px-5 py-2.5 text-sm font-semibold text-mb-surface transition-[background-color,transform] duration-200 hover:bg-mb-accent-hover motion-safe:hover:scale-[1.02] sm:inline-flex"
        >
          Get involved
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          className="focus-ring flex h-11 min-h-11 w-11 min-w-11 cursor-pointer items-center justify-center rounded-lg text-mb-accent transition-colors duration-200 hover:bg-white/8 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h11" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-nav"
            id="mobile-nav"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={
              m.isReduced
                ? { duration: 0.2, ease: m.ease }
                : { height: { duration: 0.38, ease: easeOut } }
            }
            className="overflow-hidden border-t border-white/10 bg-mb-surface/98 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={m.isReduced ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                m.isReduced
                  ? { duration: 0 }
                  : {
                      opacity: { duration: 0.25, ease: easeOut },
                      y: { type: "spring", stiffness: 400, damping: 32, mass: 0.7 },
                    }
              }
              className="will-change-transform"
            >
              <nav className="flex flex-col gap-0.5 px-4 py-4" aria-label="Mobile">
                {NAV_LINKS.map(({ to, end, label }, i) =>
                  m.isReduced ? (
                    <NavLink
                      key={to}
                      to={to}
                      end={end}
                      className={navClass}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </NavLink>
                  ) : (
                    <motion.div
                      key={to}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.28, ease: easeOut }}
                    >
                      <NavLink
                        to={to}
                        end={end}
                        className={navClass}
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </NavLink>
                    </motion.div>
                  ),
                )}
              </nav>
              <div className="flex items-center gap-3 border-t border-white/10 px-4 py-4">
                <Link
                  to="/contact-us"
                  onClick={() => setOpen(false)}
                  className="focus-ring w-full cursor-pointer rounded-lg bg-mb-accent py-3 text-center text-sm font-semibold text-mb-surface transition-colors duration-200 hover:bg-mb-accent-hover"
                >
                  Get involved
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
