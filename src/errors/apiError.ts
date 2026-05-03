export class ApiError extends Error {
  status: number;
  errors: Record<string, string[]>;

  constructor(
    message: string,
    status: number,
    errors?: Record<string, string[]>,
    cause?: Error,
  ) {
    super(message, { cause });
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}
