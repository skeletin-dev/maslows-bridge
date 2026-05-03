import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export function RequireAuth() {
  const { authUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="font-sans flex min-h-dvh flex-col items-center justify-center gap-3 bg-slate-100 text-slate-800">
        <div className="h-1 w-48 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-500" />
        </div>
        <p className="text-sm text-slate-500">Verifying your session…</p>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
