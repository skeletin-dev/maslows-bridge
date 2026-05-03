import { useState, type SubmitEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../network/api";
import { useAuth } from "../../auth/useAuth";

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
      <div className="font-sans flex min-h-dvh items-center justify-center bg-slate-100 text-slate-800">
        <div className="h-1 w-48 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-500" />
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
    <div className="font-sans flex min-h-dvh text-slate-900">
      <div className="relative hidden w-[42%] max-w-lg flex-col justify-end bg-mb-surface p-10 text-mb-text-on-dark lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #fff, #fff 1px, transparent 1px, transparent 10px)",
          }}
        />
        <p className="text-xs font-semibold uppercase tracking-widest text-mb-text-muted">
          Internal portal
        </p>
        <h1 className="mt-2 font-display text-2xl font-medium leading-tight text-mb-text-on-dark sm:text-3xl">
          Administration console
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-mb-text-muted">
          Access is restricted to authorized team accounts. This environment is
          for managing portfolio projects and is not part of the public website.
        </p>
        <p className="mt-8 text-xs text-mb-text-muted/90">
          © {new Date().getFullYear()} Maslow&apos;s Bridge
        </p>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center bg-slate-100 px-4 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Sign in
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Enter your credentials
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Accounts are provisioned by the team&mdash;there is no self-service
            registration.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            {error ? (
              <p
                className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                role="alert"
              >
                {error.message}
              </p>
            ) : null}
            <div>
              <label
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500"
                htmlFor="admin-username"
              >
                Username
              </label>
              <input
                id="admin-username"
                autoComplete="username"
                className="w-full rounded-md border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none ring-slate-900/0 transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500"
                htmlFor="admin-password"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-md border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-slate-900 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50"
            >
              {isPending ? "Signing in…" : "Sign in to dashboard"}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-slate-500">
            <Link
              to="/"
              className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500"
            >
              Back to public site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
