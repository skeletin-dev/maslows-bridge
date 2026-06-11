import { handleRequest } from "../helpers/handleRequest";

export default {
  async loggedIn() {
    return handleRequest<AuthUser>("/logged_in", { credentials: "include" });
  },

  async login(credentials: UserCredentials) {
    return handleRequest<AuthUser>("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user: credentials }),
      credentials: "include",
    });
  },

  async logout() {
    return handleRequest("/logout", {
      method: "DELETE",
      credentials: "include",
    });
  },
};
