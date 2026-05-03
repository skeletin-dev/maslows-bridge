export class NetworkError extends Error {
  constructor(message: string, cause?: Error) {
    super(message, { cause });
    this.name = "NetworkError";
  }
}
