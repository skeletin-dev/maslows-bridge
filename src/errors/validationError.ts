export default class ValidationError extends Error {
  status: number;
  fieldErrors?: Record<string, string[]>;

  constructor(message: string, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.name = "ValidationError";
    this.status = 422;
    this.fieldErrors = fieldErrors;
  }
}
