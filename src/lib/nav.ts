export const NAV_LINKS: { to: string; end?: boolean; label: string }[] = [
  { to: "/", end: true, label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/history", label: "History" },
  { to: "/team", label: "Team" },
  { to: "/contact-us", label: "Contact" },
];

export function normalizePathname(pathname: string) {
  const p = pathname.replace(/\/$/, "");
  return p === "" ? "/" : p;
}

export function isNavActive(pathname: string, to: string, end?: boolean) {
  const path = normalizePathname(pathname);
  if (end) return path === normalizePathname(to);
  const t = normalizePathname(to);
  return path === t || (t !== "/" && path.startsWith(`${t}/`));
}
