import handleResponse from "./handleResponse";
import { API } from "../../constants";
import { NetworkError } from "../../errors/networkError";

const REQUEST_TIMEOUT = 10000;

function createTimeoutPromise(): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), REQUEST_TIMEOUT),
  );
}

export async function handleRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const response = await Promise.race([
      fetch(API + path, options),
      createTimeoutPromise(),
    ]);

    return await handleResponse<T>(response);
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError || error instanceof Error) {
      const message = error.message.includes("timeout")
        ? "Request timed out. Please check your connection."
        : "Unable to connect to server. Please check your internet.";

      throw new NetworkError(message, error);
    }

    throw error;
  }
}
