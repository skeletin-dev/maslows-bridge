import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../network/api";

function IconFolder({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-5.8a2 2 0 0 1-1.6-.8l-1-1.2A2 2 0 0 0 9.2 3H5a2 2 0 0 0-2 2Z" />
    </svg>
  );
}

function IconPlus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-200 text-xs font-semibold text-slate-700"
      aria-hidden
    >
      {initials || "—"}
    </span>
  );
}

const navItem =
  "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors";
const navInactive = "text-slate-600 hover:bg-white hover:text-slate-900";
const navActive = "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80";

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

  async function handleLogout() {
    mutate();
  }

  return (
    <div className="font-sans flex min-h-dvh flex-col bg-slate-100 text-slate-900">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-md bg-mb-surface sm:flex"
            aria-hidden
          >
            <span className="text-[10px] font-bold text-mb-accent">MB</span>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="truncate text-sm font-semibold text-slate-900">
                Maslow&apos;s Bridge
              </span>
              <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Admin
              </span>
            </div>
            <p className="hidden text-xs text-slate-500 sm:block">
              Internal operations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden h-6 w-px bg-slate-200 sm:block" aria-hidden />
          <div className="hidden items-center gap-2.5 sm:flex">
            <UserAvatar name={authUser?.username ?? ""} />
            <div className="min-w-0 text-right">
              <p className="truncate text-sm font-medium text-slate-900">
                {authUser?.username}
              </p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Log out
          </button>
        </div>
      </header>

      <nav
        className="flex border-b border-slate-200 bg-slate-50/95 px-2 py-1.5 sm:hidden"
        aria-label="Admin shortcuts"
      >
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            [
              "flex-1 rounded-md px-3 py-2 text-center text-sm font-medium",
              isActive
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                : "text-slate-600",
            ].join(" ")
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/admin/projects/new"
          className={({ isActive }) =>
            [
              "ml-1 flex-1 rounded-md px-3 py-2 text-center text-sm font-medium",
              isActive
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                : "text-slate-600",
            ].join(" ")
          }
        >
          New
        </NavLink>
      </nav>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-slate-50/90 pb-6 pt-5 sm:flex lg:w-64">
          <p className="px-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Portfolio
          </p>
          <nav className="mt-3 flex flex-col gap-0.5 px-2" aria-label="Admin">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                [navItem, isActive ? navActive : navInactive].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <IconFolder
                    className={
                      isActive
                        ? "text-slate-800"
                        : "text-slate-400 group-hover:text-slate-600"
                    }
                  />
                  <span>Projects</span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/admin/projects/new"
              className={({ isActive }) =>
                [navItem, isActive ? navActive : navInactive].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <IconPlus
                    className={
                      isActive
                        ? "text-slate-800"
                        : "text-slate-400 group-hover:text-slate-600"
                    }
                  />
                  <span>New project</span>
                </>
              )}
            </NavLink>
          </nav>
        </aside>

        <div className="min-w-0 flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-5xl">
            <div className="min-h-[min(60vh,480px)] rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-8">
              <Outlet />
            </div>
            <p className="mt-4 text-center text-xs text-slate-400 sm:text-left">
              For authorized staff only. Activity may be logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
