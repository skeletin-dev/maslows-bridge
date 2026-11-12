export {}; // makes this a module so `declare global` is valid

declare global {
  type AuthUser = {
    username: string;
  };

  type UserCredentials = {
    username: string;
    password: string;
  };

  /** "month" = only the month and year of `start_date` are meaningful (stored as the 1st). */
  type DatePrecision = "day" | "month";

  type ProjectImage = {
    id: string;
    url: string;
    filename: string;
    content_type: string;
    byte_size: number;
  };

  type Project = {
    id: string;
    slug: string;
    title: string;
    description: string;
    start_date: string;
    start_date_precision: DatePrecision;
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
    /** In display order; the first image is the cover. */
    images: ProjectImage[];
  };

  type NewProject = Omit<Project, "id" | "slug" | "images">;

  type UpdateProject = {
    payload: NewProject;
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
