export default class ServerError extends Error {
  status: number;
  constructor(message = "Something went wrong on our end.") {
    super(message);
    this.name = "ServerError";
    this.status = 500;
  }
}
