import { type ReactNode } from "react";
import { AuthContext } from "./authContext";
import { useQuery } from "@tanstack/react-query";
import api from "../network/api";
import { useLocation } from "react-router-dom";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: api.auth.loggedIn,
    retry: false,
    enabled: pathname.startsWith("/admin"),
  });

  const value: AuthContextData = {
    authUser: data,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
