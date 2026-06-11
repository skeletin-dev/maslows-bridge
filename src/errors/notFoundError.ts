export default class NotFoundError extends Error {
  status: number;
  constructor(message = "Not Found") {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
  }
}
