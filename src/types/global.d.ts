export {}; // makes this a module so `declare global` is valid

declare global {
  type AuthUser = {
    username: string;
  };

  type UserCredentials = {
    username: string;
    password: string;
  };

  type Project = {
    id: string;
    slug: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string | null;
    use_of_funds: string[];
    city: string;
    state: string;
    zip_code: string;
    street: string;
    /** Present on API responses (Blueprinter). */
    line?: string | null;
    /** Request body field alias for `line` (Rails strong params). */
    line1?: string | null;
  };

  type NewProject = Omit<Project, "id", "slug">;

  type UpdateProject = {
    payload: Omit<Project, "id">;
    id: string;
  };

  type AuthContextData = {
    authUser: AuthUser | undefined;
    isLoading: boolean;
  };

  type ApiErrorResponseData = {
    errors?: Record<string, string[]>;
    message: string;
  };

  interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
  }

  interface FormState {
    status: "idle" | "loading" | "success" | "error";
    message: string;
  }
}
