import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../network/api";

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconFolders({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-5.8a2 2 0 0 1-1.6-.8l-1-1.2A2 2 0 0 0 9.2 3H5a2 2 0 0 0-2 2Z" />
    </svg>
  );
}

function IconFilePlus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2Z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="18" x2="12" y2="12" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  );
}

function IconLogOut({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function IconExternalLink({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700"
      aria-hidden
    >
      {initials || "?"}
    </span>
  );
}

// ── Nav helpers ───────────────────────────────────────────────────────────────

const navItem =
  "group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors duration-150";
const navActive = "bg-slate-800 text-white";
const navInactive = "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200";

// ── Layout ────────────────────────────────────────────────────────────────────

export function AdminLayout() {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: api.auth.logout,
    onSuccess: () => {
      navigate("/admin/login", { replace: true });
      queryClient.setQueryData(["authUser"], null);
      queryClient.clear();
    },
  });

  return (
    <div className="flex min-h-dvh bg-slate-50 font-sans text-slate-900">

      {/* ── Top bar ─────────────────────────────────────────── */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#141d2e]">
            <span className="text-[10px] font-bold text-amber-400">MB</span>
          </div>
          <span className="hidden text-sm font-semibold text-slate-800 sm:block">
            Maslow&apos;s Bridge
          </span>
          <IconChevronRight className="hidden h-4 w-4 text-slate-300 sm:block" />
          <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
            Admin Console
          </span>
        </div>

        {/* User controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2.5 sm:flex">
            <UserAvatar name={authUser?.username ?? ""} />
            <div className="min-w-0 text-right">
              <p className="truncate text-xs font-semibold text-slate-800">
                {authUser?.username}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">
                Administrator
              </p>
            </div>
          </div>
          <div className="hidden h-4 w-px bg-slate-200 sm:block" aria-hidden />
          <button
            type="button"
            onClick={() => mutate()}
            className="flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
          >
            <IconLogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="flex flex-1 pt-14">

        {/* Sidebar — desktop */}
        <aside className="hidden w-56 shrink-0 flex-col bg-slate-900 sm:flex lg:w-60">
          <nav className="flex flex-1 flex-col px-3 pt-5" aria-label="Admin navigation">
            <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Content
            </p>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => `${navItem} ${isActive ? navActive : navInactive}`}
            >
              {({ isActive }) => (
                <>
                  <IconFolders className={`h-4 w-4 shrink-0 transition-colors ${isActive ? "text-slate-300" : "text-slate-500 group-hover:text-slate-300"}`} />
                  Projects
                </>
              )}
            </NavLink>
            <NavLink
              to="/admin/projects/new"
              className={({ isActive }) => `${navItem} ${isActive ? navActive : navInactive}`}
            >
              {({ isActive }) => (
                <>
                  <IconFilePlus className={`h-4 w-4 shrink-0 transition-colors ${isActive ? "text-slate-300" : "text-slate-500 group-hover:text-slate-300"}`} />
                  New project
                </>
              )}
            </NavLink>
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-slate-800 px-3 py-3">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-300"
            >
              <IconExternalLink className="h-3.5 w-3.5 shrink-0" />
              View public site
            </Link>
          </div>
        </aside>

        {/* Mobile bottom nav */}
        <nav
          className="fixed bottom-0 left-0 right-0 z-40 flex items-stretch border-t border-slate-200 bg-white sm:hidden"
          aria-label="Admin navigation"
        >
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${isActive ? "text-blue-600" : "text-slate-500"}`
            }
          >
            <IconFolders className="h-5 w-5" />
            Projects
          </NavLink>
          <NavLink
            to="/admin/projects/new"
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${isActive ? "text-blue-600" : "text-slate-500"}`
            }
          >
            <IconFilePlus className="h-5 w-5" />
            New
          </NavLink>
        </nav>

        {/* Main content */}
        <main className="flex min-w-0 flex-1 flex-col overflow-auto">
          <div className="mx-auto w-full max-w-5xl p-4 pb-24 sm:p-6 sm:pb-8 lg:p-8">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <Outlet />
            </div>
            <p className="mt-3 text-center text-xs text-slate-400 sm:text-left">
              For authorized staff only. Activity may be logged.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
