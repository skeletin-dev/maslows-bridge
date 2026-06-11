export default class UnauthorizedError extends Error {
  status: number;

  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}
