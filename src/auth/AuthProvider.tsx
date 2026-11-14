import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./authContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../network/api";
import { useLocation } from "react-router-dom";
import UnauthorizedError from "../errors/unauthorizedError";

const SESSION_ENDED =
  "You were signed out. Sign in again to continue. If you were saving something, it wasn't saved.";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const [notice, setNotice] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: api.auth.loggedIn,
    retry: false,
    enabled: pathname.startsWith("/admin"),
  });

  // If any admin request comes back 401 while signed in, the session is gone. Sign out locally
  // so RequireAuth sends the user to the login page with an explanation, instead of leaving
  // them on a page where every save fails.
  useEffect(() => {
    function endSession(error: unknown) {
      if (!(error instanceof UnauthorizedError)) return;
      // Not signed in (e.g. a wrong password on the login page): nothing to end.
      if (!queryClient.getQueryData(["authUser"])) return;
      setNotice(SESSION_ENDED);
      queryClient.setQueryData(["authUser"], null);
    }

    const unsubscribeQueries = queryClient.getQueryCache().subscribe((event) => {
      if (event.type !== "updated" || event.action.type !== "error") return;
      if (event.query.queryKey[0] === "authUser") return;
      endSession(event.action.error);
    });
    const unsubscribeMutations = queryClient.getMutationCache().subscribe((event) => {
      if (event.type === "updated" && event.action.type === "error") endSession(event.action.error);
    });

    return () => {
      unsubscribeQueries();
      unsubscribeMutations();
    };
  }, [queryClient]);

  const clearNotice = useCallback(() => setNotice(null), []);

  const value: AuthContextData = {
    authUser: data,
    isLoading,
    notice,
    clearNotice,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
