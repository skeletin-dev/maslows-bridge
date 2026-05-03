import { useContext } from "react";
import { AuthContext } from "./authContext";

export function useAuth(): AuthContextData {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
