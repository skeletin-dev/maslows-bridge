import { useState, type SubmitEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../network/api";
import { useAuth } from "../../auth/useAuth";

function IconShield() {
  return (
    <svg
      className="h-10 w-10 text-slate-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconAlertCircle() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-red-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function AdminLoginPage() {
  const { isLoading, authUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: api.auth.login,
    onSuccess: (authUser) => queryClient.setQueryData(["authUser"], authUser),
    onError: () => queryClient.setQueryData(["authUser"], null),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-slate-50 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-500/60" />
          </div>
          <p className="text-xs text-slate-400">Verifying session…</p>
        </div>
      </div>
    );
  }

  if (authUser) return <Navigate to={"/admin"} replace />;

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    mutate({ username, password });
  }

  return (
    <div className="flex min-h-dvh font-sans text-slate-900">
      {/* ── Left panel ──────────────────────────────────── */}
      <div className="relative hidden w-[42%] max-w-sm flex-col justify-between bg-slate-900 p-10 lg:flex">
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Top brand */}
        <div className="relative flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#141d2e] ring-1 ring-white/10">
            <span className="text-[11px] font-bold text-amber-400">MB</span>
          </div>
          <span className="text-sm font-semibold text-white/90">
            Maslow&apos;s Bridge
          </span>
        </div>
        {/* Center content */}
        <div className="relative">
          <IconShield />
          <h1 className="mt-6 font-sans text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Administration
            <br />
            Console
          </h1>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
            Restricted to authorized accounts.
          </p>
        </div>
        {/* Bottom */}
        <p className="relative text-xs text-slate-600">
          © {new Date().getFullYear()} Maslow&apos;s Bridge &mdash; Internal use
          only
        </p>
      </div>

      {/* ── Right panel / form ───────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col justify-center bg-slate-50 px-4 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-sm">
          {/* Mobile brand header */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#141d2e]">
              <span className="text-[10px] font-bold text-amber-400">MB</span>
            </div>
            <span className="text-sm font-semibold text-slate-800">
              Maslow&apos;s Bridge Admin
            </span>
          </div>

          <div className="mb-6">
            <h2 className="font-sans text-2xl font-semibold text-slate-900">
              Sign in
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter your credentials to access the console.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
          >
            {error ? (
              <div
                className="flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-800"
                role="alert"
              >
                <IconAlertCircle />
                <span>{error.message}</span>
              </div>
            ) : null}

            <div>
              <label
                className="mb-1.5 block text-sm font-medium text-slate-700"
                htmlFor="admin-username"
              >
                Username
              </label>
              <input
                id="admin-username"
                autoComplete="username"
                autoFocus
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 disabled:opacity-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isPending}
              />
            </div>

            <div>
              <label
                className="mb-1.5 block text-sm font-medium text-slate-700"
                htmlFor="admin-password"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15 disabled:opacity-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isPending}
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full cursor-pointer rounded-md bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:ring-3 focus:ring-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Sign in to console"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            <Link
              to="/"
              className="font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline"
            >
              ← Back to public site
            </Link>
          </p>
          <p className="mt-2 text-center text-xs text-slate-400">
            Accounts are provisioned by the team — no self-service registration.
          </p>
        </div>
      </div>
    </div>
  );
}
